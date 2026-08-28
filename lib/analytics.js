/**
 * Google Analytics & Conversion Event Tracking Utility
 * Safely fires events when Google Tag is loaded in the browser.
 */

export function trackEvent(action, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", action, params);
  } catch (err) {
    console.debug("Analytics event tracking error:", err);
  }
}

export const AnalyticsEvents = {
  LEAD_SUBMITTED: "generate_lead",
  AUDIT_REQUESTED: "request_audit",
  WHATSAPP_CLICKED: "click_whatsapp",
  PHONE_CLICKED: "click_phone",
  EMAIL_CLICKED: "click_email",
  PORTFOLIO_VIEWED: "view_portfolio_item",
  SERVICE_VIEWED: "view_service_item",
};
