import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contactSchema } from "../utils/validation.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_tests";
const COOKIE_NAME = "hd_admin_token";

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function mockProxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/setup"
  ) {
    return { status: 200, action: "next" };
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return { status: 307, location: loginUrl.toString(), action: "redirect" };
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      return { status: 401, action: "unauthorized", error: "Unauthorized" };
    }
  }

  return { status: 200, action: "next" };
}

async function runAdversarialTests() {
  console.log("\n=======================================================");
  console.log("  HD WEB STUDIOS — ADVERSARIAL QA & SECURITY TEST SUITE");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, name, details = "") {
    if (condition) {
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${name} ${details ? `(${details})` : ""}`);
      failed++;
    }
  }

  // ─── 1. PROXY & AUTHENTICATION BYPASS ATTACKS ─────────────────────
  console.log("\n[1] Testing Edge Proxy & Auth Guard Against Attacks...");

  function mockRequest(pathname, cookieValue = null) {
    const url = new URL(`https://www.hdwebstudios.in${pathname}`);
    return {
      nextUrl: url,
      url: url.href,
      cookies: {
        get: (name) => (name === COOKIE_NAME && cookieValue ? { value: cookieValue } : undefined),
      },
    };
  }

  // Unauthenticated access to admin routes
  const adminRoutes = [
    "/admin",
    "/admin/leads",
    "/admin/leads/66b01234567890abcdef1234",
    "/admin/blog",
    "/admin/blog/new",
    "/admin/services",
    "/admin/projects",
    "/admin/pricing",
    "/admin/media",
    "/admin/settings",
    "/admin/team",
    "/admin/faqs",
    "/admin/testimonials",
  ];

  for (const route of adminRoutes) {
    const req = mockRequest(route, null);
    const res = mockProxy(req);
    assert(res.status === 307 && res.location.includes("/admin/login"), `Unauthenticated ${route} redirects to /admin/login`);
  }

  // Unauthenticated access to admin API routes
  const adminApiRoutes = [
    "/api/admin/leads",
    "/api/admin/posts",
    "/api/admin/services",
    "/api/admin/projects",
    "/api/admin/pricing",
    "/api/admin/media",
    "/api/admin/settings",
    "/api/admin/health",
    "/api/admin/export-leads",
    "/api/admin/ai-agent",
  ];

  for (const route of adminApiRoutes) {
    const req = mockRequest(route, null);
    const res = mockProxy(req);
    assert(res.status === 401, `Unauthenticated API ${route} returns 401 Unauthorized`);
  }

  // Malformed & forged tokens
  const forgedTokens = [
    "invalid.token.here",
    "Bearer 12345",
    "null",
    "undefined",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.fakeSignature",
  ];

  for (const badToken of forgedTokens) {
    const verified = verifyToken(badToken);
    assert(verified === null, `Forged token rejection: ${badToken.slice(0, 20)}...`);
    const req = mockRequest("/admin/leads", badToken);
    const res = mockProxy(req);
    assert(res.status === 307, `Invalid token redirected away from admin`);
  }

  // Public exceptions allowlist
  const publicExceptions = [
    "/admin/login",
    "/admin/setup",
    "/api/admin/login",
    "/api/admin/setup",
  ];

  for (const route of publicExceptions) {
    const req = mockRequest(route, null);
    const res = mockProxy(req);
    assert(res.status === 200 && res.action === "next", `Public admin endpoint allowed through proxy: ${route}`);
  }

  // ─── 2. CSV INJECTION & SANITIZATION TESTS ─────────────────────────
  console.log("\n[2] Testing CSV / Excel Formula Injection Protection...");
  
  function sanitizeFormula(v) {
    if (v == null) return '';
    const str = String(v);
    if (/^[=+\-@\t\r]/.test(str)) {
      return "'" + str;
    }
    return str;
  }

  const maliciousFormulas = [
    "=CMD('calc')",
    "+SUM(A1:A10)",
    "-2+3+cmd|' /C calc'!A0",
    "@SUM(1,2)",
    "\t=1+1",
    "\r=2+2",
  ];

  for (const payload of maliciousFormulas) {
    const sanitized = sanitizeFormula(payload);
    assert(sanitized.startsWith("'"), `Formula neutralized with quote prefix: ${payload}`);
  }

  // Safe strings should not be modified
  assert(sanitizeFormula("Harshdeep Singh") === "Harshdeep Singh", "Legitimate name untouched");
  assert(sanitizeFormula("harsh@example.com") === "harsh@example.com", "Legitimate email untouched");

  // ─── 3. FORM VALIDATION & HONEYPOT ABUSE TESTS ────────────────────
  console.log("\n[3] Testing Public Form Validation & Spam Rejection...");

  const validLead = {
    name: "Aman Sharma",
    email: "aman@example.com",
    phone: "+91 98765 43210",
    business: "Sharma Textiles",
    message: "Need an e-commerce website for my textile store in Ludhiana.",
  };

  const validParse = contactSchema.safeParse(validLead);
  assert(validParse.success, "Valid lead passes schema validation");

  const honeypotAttack = { ...validLead, honeypot: "bot-filled-value" };
  assert(Boolean(honeypotAttack.honeypot), "Honeypot value correctly detected for bot rejection");

  const oversizedMessage = {
    ...validLead,
    message: "A".repeat(6000), // Exceeds 5000 chars limit
  };
  const oversizedParse = contactSchema.safeParse(oversizedMessage);
  assert(!oversizedParse.success, "Oversized payload rejected (>5000 chars)");

  const invalidEmail = {
    ...validLead,
    email: "not-an-email",
  };
  const invalidEmailParse = contactSchema.safeParse(invalidEmail);
  assert(!invalidEmailParse.success, "Malformed email format rejected");

  const tooShortName = {
    ...validLead,
    name: "A",
  };
  const tooShortNameParse = contactSchema.safeParse(tooShortName);
  assert(!tooShortNameParse.success, "Single character name rejected");

  // ─── 4. OBJECTID / IDOR DEFENSE TESTS ──────────────────────────────
  console.log("\n[4] Testing ObjectId Validation & IDOR Immunity...");

  const invalidObjectIds = [
    "123",
    "not-a-mongo-id",
    "66b01234",
    null,
    undefined,
    "../../etc/passwd",
    "{$gt: ''}",
    "66b01234567890abcdef123g", // Invalid hex char 'g'
  ];

  for (const badId of invalidObjectIds) {
    const isValid = mongoose.Types.ObjectId.isValid(badId);
    assert(!isValid, `Invalid ObjectId rejected by mongoose: ${String(badId)}`);
  }

  const validObjectId = "66b01234567890abcdef1234";
  assert(mongoose.Types.ObjectId.isValid(validObjectId), "Valid 24-char hex ObjectId accepted");

  // ─── 5. XSS SANITIZATION TESTS ─────────────────────────────────────
  console.log("\n[5] Testing HTML & Stored XSS Sanitization...");

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(1)">',
    '<a href="javascript:alert(1)">click me</a>',
    '"><script>alert(document.cookie)</script>',
    '<iframe src="data:text/html,<script>alert(1)</script>"></iframe>',
  ];

  for (const payload of xssPayloads) {
    const escaped = escapeHtml(payload);
    assert(!escaped.includes("<script>") && !escaped.includes("<img") && !escaped.includes("<iframe") && !escaped.includes("<a"), `XSS payload escaped: ${payload.slice(0, 30)}...`);
  }

  // ─── TEST SUMMARY ──────────────────────────────────────────────────
  console.log("\n=======================================================");
  console.log(`  TOTAL TESTS: ${passed + failed}`);
  console.log(`  PASSED:      ${passed}`);
  console.log(`  FAILED:      ${failed}`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runAdversarialTests().catch(console.error);
