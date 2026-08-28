/**
 * Test live production URLs and trace full redirect chains
 */

async function traceUrl(url) {
  let currentUrl = url;
  const chain = [];

  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetch(currentUrl, {
        method: "HEAD",
        redirect: "manual",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) HDWebStudios-Validator/1.0",
        },
      });

      const status = response.status;
      const location = response.headers.get("location");
      chain.push({ url: currentUrl, status, location });

      if (status >= 300 && status < 400 && location) {
        currentUrl = new URL(location, currentUrl).toString();
      } else {
        break;
      }
    } catch (err) {
      chain.push({ url: currentUrl, error: err.message });
      break;
    }
  }

  return chain;
}

async function run() {
  const targets = [
    "http://hdwebstudios.in",
    "http://www.hdwebstudios.in",
    "https://hdwebstudios.in",
    "https://www.hdwebstudios.in",
    "https://hdwebstudios.in/sitemap.xml",
    "https://hdwebstudios.in/robots.txt",
    "https://hdwebstudios.in/llms.txt",
    "https://hdwebstudios.in/.well-known/security.txt",
    "https://hdwebstudios.in/about",
    "https://hdwebstudios.in/services",
    "https://hdwebstudios.in/blog",
    "https://hdwebstudios.in/admin",
    "https://hdwebstudios.in/admin/login",
  ];

  console.log("\n=======================================================");
  console.log("  LIVE PRODUCTION URL & REDIRECT TRACE RESULTS         ");
  console.log("=======================================================\n");

  for (const t of targets) {
    console.log(`\nTesting: ${t}`);
    const chain = await traceUrl(t);
    for (let i = 0; i < chain.length; i++) {
      const step = chain[i];
      if (step.error) {
        console.log(`  Step ${i + 1}: ${step.url} -> ERROR: ${step.error}`);
      } else {
        console.log(
          `  Step ${i + 1}: ${step.url} [HTTP ${step.status}] ${
            step.location ? `-> Location: ${step.location}` : "(Final Response)"
          }`
        );
      }
    }
  }
}

run();
