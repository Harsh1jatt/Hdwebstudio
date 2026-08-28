"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Wrench,
  Zap,
  History,
  MessageSquare,
  ShieldCheck,
  Check,
  RefreshCw,
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
  "Create a blog about How Much a Business Website Costs in Punjab",
  "Audit website at https://google.com",
  "Check SEO for Business Website Development",
  "Find high priority leads and recommend followups",
  "Show content clusters and pillar mappings",
  "Scan CMS for keyword cannibalization",
  "Suggest internal links for ecommerce website development",
];

export default function AgentChat() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams?.get("prompt") || "";

  const [tab, setTab] = useState("chat"); // 'chat' | 'history'
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 **Welcome to HD AI Command Center**\n\nI am grounded in HD Web Studios brand intelligence, deterministic 100-point SEO evaluation, and keyword cannibalization protection.\n\nTell me what you would like to create or improve across services, blogs, portfolio case studies, or lead intelligence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLogs, setActionLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
        setActionLogs(data.actions || []);
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
        throw new Error(data.message || "Failed to execute AI instruction.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
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
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-950">HD AI Command Center</h2>
            <p className="text-[11px] text-slate-500">Your agency operating system &amp; content engine</p>
          </div>
        </div>

        {/* Tab switcher */}
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
            onClick={() => setTab("history")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 font-bold transition ${
              tab === "history" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <History size={13} />
            Action Audit Log
          </button>
        </div>
      </div>

      {tab === "chat" ? (
        <>
          {/* Chat Messages */}
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

                  {/* Human in the loop Actions */}
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
                <span>HD AI is executing multi-step strategy &amp; scoring...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips */}
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
                  {sug.length > 36 ? sug.substring(0, 36) + "..." : sug}
                </button>
              ))}
            </div>
          </div>

          {/* Command Input Form */}
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
                placeholder="What would you like to create or improve?"
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
      ) : (
        /* Action Audit Trail View */
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-950">AI Action History &amp; Audit Trail</h3>
              <p className="text-xs text-slate-500">Persistent record of all server-side tools invoked by the AI agent.</p>
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
                <div key={log._id} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.toolName}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-bold ${
                        log.status === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600">{log.summary}</p>
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
