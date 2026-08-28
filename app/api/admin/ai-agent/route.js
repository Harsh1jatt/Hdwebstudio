import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import { runAgent, handleConfirmation } from "@/lib/ai/agent";
import { listTools } from "@/lib/ai/tools";

// In-memory conversation store (per-server instance)
// In production, use Redis or a database collection
const conversations = new Map();

function getConversation(adminId) {
  if (!conversations.has(adminId)) {
    conversations.set(adminId, {
      messages: [],
      pendingConfirmation: null,
    });
  }
  return conversations.get(adminId);
}

// Clean up old conversations every 30 minutes (simple GC)
let lastCleanup = Date.now();
function cleanupConversations() {
  if (Date.now() - lastCleanup > 30 * 60 * 1000) {
    // Keep only the last 50 conversations
    if (conversations.size > 50) {
      const keys = [...conversations.keys()];
      for (let i = 0; i < keys.length - 50; i++) {
        conversations.delete(keys[i]);
      }
    }
    lastCleanup = Date.now();
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();
    cleanupConversations();

    const body = await req.json();
    const { message, confirm } = body;

    if (!message?.trim() && confirm === undefined) {
      return NextResponse.json(
        { success: false, error: "Please enter a message." },
        { status: 400 }
      );
    }

    const adminId = auth._id?.toString() || auth.id || "admin";
    const conversation = getConversation(adminId);

    // Handle confirmation responses
    if (confirm !== undefined && conversation.pendingConfirmation) {
      const { action, params } = conversation.pendingConfirmation;
      conversation.pendingConfirmation = null;

      const result = await handleConfirmation(action, params, confirm, {
        adminId,
        adminName: auth.name || "Admin",
      });
      conversation.messages.push({ role: "user", content: confirm ? "Yes, confirm" : "No, cancel" });
      conversation.messages.push({ role: "assistant", content: result.message, actions: result.actions });

      return NextResponse.json({
        success: true,
        response: result.message,
        actions: result.actions || [],
        state: result.state,
      });
    }

    // Store user message
    conversation.messages.push({ role: "user", content: message.trim() });

    // Keep conversation history manageable (last 20 messages)
    if (conversation.messages.length > 20) {
      conversation.messages = conversation.messages.slice(-20);
    }

    // Run the agent
    const result = await runAgent(message.trim(), {
      adminId,
      adminName: auth.name || "Admin",
      conversationHistory: conversation.messages.slice(0, -1), // exclude current message
    });

    // Store confirmation if needed
    if (result.state === "waiting_confirmation" && result.confirmAction) {
      conversation.pendingConfirmation = {
        action: result.confirmAction,
        params: result.confirmParams,
      };
    }

    // Store assistant response
    conversation.messages.push({ role: "assistant", content: result.message });

    return NextResponse.json({
      success: true,
      response: result.message,
      actions: result.actions || [],
      state: result.state,
      steps: result.steps || [],
      needsConfirmation: result.needsConfirmation || false,
    });
  } catch (error) {
    console.error("[AI Agent] Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    // Return agent status and available tools
    const tools = listTools();
    const adminId = auth._id?.toString() || auth.id || "admin";
    const conversation = getConversation(adminId);

    return NextResponse.json({
      success: true,
      status: "active",
      toolsCount: tools.length,
      tools: tools.map((t) => t.name),
      conversationLength: conversation.messages.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
