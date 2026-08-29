"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bot,
  Send,
  Loader2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  History,
  MessageSquare,
  Wand2,
  BookOpen,
  Layers,
  HelpCircle,
  BarChart3,
  RefreshCw,
  Sliders,
  Settings,
  ShieldCheck,
} from "lucide-react";

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMessage(text) {
  if (!text) return "";
  const safe = escapeHtml(text);
  return safe
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">$1</code>')
    .replace(/^• (.+)$/gm, '<div class="ml-2 flex items-start gap-1.5"><span class="mt-0.5 text-blue-500">•</span><span>$1</span></div>')
    .replace(/^✅ (.+)$/gm, '<div class="flex items-start gap-1.5 text-green-700"><span>✅</span><span>$1</span></div>')
    .replace(/^❌ (.+)$/gm, '<div class="flex items-start gap-1.5 text-red-600"><span>❌</span><span>$1</span></div>')
    .replace(/^📋 (.+)$/gm, '<div class="flex items-start gap-1.5"><span>📋</span><span>$1</span></div>')
    .replace(/^📊 (.+)$/gm, '<div class="flex items-start gap-1.5"><span>📊</span><span>$1</span></div>')
    .replace(/^🔍 (.+)$/gm, '<div class="flex items-start gap-1.5"><span>🔍</span><span>$1</span></div>')
    .replace(/^⚠️ (.+)$/gm, '<div class="flex items-start gap-1.5 text-amber-600"><span>⚠️</span><span>$1</span></div>')
    .replace(/\n/g, "<br>");
}

const SUGGESTIONS = [
  "Create a service for Website Development for Manufacturing Companies in Punjab",
  "Create a blog about How Much a Business Website Costs in India",
  "Create a project for Solar Energy Customer Portal",
  "Audit website at https://google.com",
  "Check SEO for Business Website Development",
  "Show content clusters and pillar mappings",
  "Check CMS audit summary and inventory",
];

export default function HdAiCommandCenter() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams?.get("prompt") || "";

  const [tab, setTab] = useState("chat"); // 'chat' | 'tools' | 'history' | 'memory'
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 **Welcome to HD AI Operations Command Center**\n\nI am grounded in HD Web Studios brand positioning, multi-step content pipelines, deterministic 100-point SEO scoring, and keyword cannibalization protection.\n\nTell me what you would like to create or manage across services, blogs, portfolio case studies, or SEO diagnostics.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLogs, setActionLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);
  const messagesEndRef = useRef(null);

  async function handleTestConnection() {
    setTestingConnection(true);
    setConnectionResult(null);
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: "test_connection" }),
      });
      const data = await res.json();
      setConnectionResult(data);
    } catch (err) {
      setConnectionResult({ status: "error", error: err.message, provider: "unknown" });
    } finally {
      setTestingConnection(false);
    }
  }

  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function loadActionLogs() {
    setLogsLoading(true);
    try {
      const res = await fetch("/api/admin/ai-actions");
      const data = await res.json();
      if (data.success) {
        setActionLogs(data.logs || []);
      }
    } catch (e) {
      console.error("Failed to load action history", e);
    } finally {
      setLogsLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "history") {
      loadActionLogs();
    }
  }, [tab]);

  async function handleSendMessage(customText) {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to execute AI instruction.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || data.message,
          steps: data.steps,
          actions: data.actions,
          state: data.state,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ **Execution Error:** ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-950">HD AI Command Center</h2>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Central Engine</span>
            </div>
            <p className="text-[11px] text-slate-500">Content Strategist &amp; Admin Operations Engine</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-200/60 p-1 text-xs">
          <button
            onClick={() => setTab("chat")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 font-bold transition ${
              tab === "chat" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare size={13} />
            Command Chat
          </button>
          <button
            onClick={() => setTab("tools")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 font-bold transition ${
              tab === "tools" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wand2 size={13} />
            Quick Launchers
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 font-bold transition ${
              tab === "history" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <History size={13} />
            Generation Log
          </button>
        </div>
      </div>

      {/* ─── TAB 1: COMMAND CHAT ─── */}
      {tab === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-xs shadow-xs"
                  }`}
                >
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />

                  {/* Execution Timeline Steps */}
                  {msg.steps?.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-slate-200/60 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Execution Timeline</p>
                      {msg.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          {step.status === "completed" && <CheckCircle2 size={13} className="text-emerald-500" />}
                          {step.status === "failed" && <AlertCircle size={13} className="text-red-500" />}
                          {step.status === "warning" && <AlertCircle size={13} className="text-amber-500" />}
                          {step.status === "executing" && <Loader2 size={13} className="animate-spin text-blue-500" />}
                          <span>{step.label || step.tool}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Human-in-the-loop Actions */}
                  {msg.actions?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200/60 pt-3">
                      {msg.actions.map((act, idx) => (
                        <Link
                          key={idx}
                          href={act.href}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                        >
                          {act.label} <ExternalLink size={12} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-slate-400 text-xs pl-2">
                <Loader2 size={16} className="animate-spin text-blue-600" />
                <span>HD AI Engine is executing strategy, scoring, and saving...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-2.5 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Quick Commands:</span>
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
                >
                  {sug.length > 38 ? sug.substring(0, 38) + "..." : sug}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-slate-200 p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command (e.g. 'Create a service called Google Ads Management' or 'Audit website at https://example.com')..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/10 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-sm"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </form>
        </>
      )}

      {/* ─── TAB 2: QUICK LAUNCHERS ─── */}
      {tab === "tools" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">CMS Content Generators &amp; Tools</h3>
            <p className="text-xs text-slate-500">Direct shortcuts to create and refine content with HD AI.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/services/new"
              className="rounded-2xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-blue-600 mb-2">
                <Sparkles size={18} />
                <span className="font-bold text-slate-900 text-sm">Service Generator</span>
              </div>
              <p className="text-xs text-slate-500">
                Generate high-converting service landing pages with deliverables, FAQs, and schema.
              </p>
            </Link>

            <Link
              href="/admin/blog/new"
              className="rounded-2xl border border-slate-200 p-4 hover:border-purple-300 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-purple-600 mb-2">
                <BookOpen size={18} />
                <span className="font-bold text-slate-900 text-sm">Blog Writer &amp; Outline</span>
              </div>
              <p className="text-xs text-slate-500">
                Generate in-depth blog posts directly or with an Outline-First strategy.
              </p>
            </Link>

            <Link
              href="/admin/projects/new"
              className="rounded-2xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
                <Layers size={18} />
                <span className="font-bold text-slate-900 text-sm">Case Study Generator</span>
              </div>
              <p className="text-xs text-slate-500">
                Generate factual portfolio case studies with technical challenge and solution.
              </p>
            </Link>

            <Link
              href="/admin/faqs/new"
              className="rounded-2xl border border-slate-200 p-4 hover:border-amber-300 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-amber-600 mb-2">
                <HelpCircle size={18} />
                <span className="font-bold text-slate-900 text-sm">FAQ Generator</span>
              </div>
              <p className="text-xs text-slate-500">
                Generate context-tailored FAQs addressing specific customer questions.
              </p>
            </Link>

            <Link
              href="/admin/seo"
              className="rounded-2xl border border-slate-200 p-4 hover:border-sky-300 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-sky-600 mb-2">
                <BarChart3 size={18} />
                <span className="font-bold text-slate-900 text-sm">SEO Dashboard &amp; Audit</span>
              </div>
              <p className="text-xs text-slate-500">
                100-point deterministic SEO analysis, keyword cannibalization check, and site audits.
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="rounded-2xl border border-slate-200 p-4 hover:border-slate-400 hover:shadow-xs transition bg-white"
            >
              <div className="flex items-center gap-2.5 text-slate-700 mb-2">
                <Settings size={18} />
                <span className="font-bold text-slate-900 text-sm">Brand Voice Settings</span>
              </div>
              <p className="text-xs text-slate-500">
                Configure brand positioning, forbidden claims, and tone rules in MongoDB.
              </p>
            </Link>

            {/* Diagnostic Connection Tester */}
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/30 p-4 transition">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-blue-700">
                  <ShieldCheck size={18} />
                  <span className="font-bold text-slate-900 text-sm">Provider Diagnostics</span>
                </div>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {testingConnection ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
                  <span>Test Connection</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Ping real server-side AI provider and verify API response status.
              </p>
              {connectionResult && (
                <div
                  className={`rounded-xl border p-2.5 text-[11px] ${
                    connectionResult.status === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-red-50 border-red-200 text-red-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {connectionResult.status === "success" ? (
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle size={13} className="text-red-600 shrink-0" />
                    )}
                    <span>
                      Provider: <strong>{connectionResult.provider}</strong> | Model:{" "}
                      <strong>{connectionResult.model}</strong> | Status:{" "}
                      <strong>{connectionResult.status}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: ACTION & GENERATION LOG ─── */}
      {tab === "history" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-950">AI Generation &amp; Tool History</h3>
              <p className="text-xs text-slate-500">Server-side audit log of all generation tasks.</p>
            </div>
            <button
              onClick={loadActionLogs}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          {logsLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading audit history...</div>
          ) : actionLogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No actions recorded yet.</div>
          ) : (
            <div className="space-y-3">
              {actionLogs.map((log) => (
                <div key={log.id || log._id} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.action || log.tool}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-bold ${
                        log.status === "completed" || log.status === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600">{log.summary || log.prompt}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/40 pt-2">
                    <span>Admin: {log.adminName || "Admin"}</span>
                    <span>{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
