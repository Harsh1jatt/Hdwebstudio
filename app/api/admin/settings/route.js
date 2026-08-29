import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import SiteSettings from "@/models/SiteSettings";
import { settingsPayloadSchema } from "@/utils/settingsValidation";
import { clearSettingsCache } from "@/lib/settings";
import { revalidateContent } from "@/lib/revalidation";

export async function GET(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  await connectDB();
  const settings = await SiteSettings.getSettings();
  return NextResponse.json({ success: true, settings: { ...settings, id: settings._id.toString(), _id: undefined } });
}

export async function PUT(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  await connectDB();
  const body = await req.json();
  const result = settingsPayloadSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ success: false, error: "Validation failed", details: result.error.flatten() }, { status: 400 });

  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();

  const sections = ["brand", "contact", "social", "seo", "business", "analytics", "brandVoice", "footer", "homepage", "servicePage"];
  for (const section of sections) {
    if (result.data[section]) {
      if (section === "servicePage" || section === "homepage") {
        settings[section] = result.data[section];
      } else {
        if (!settings[section]) settings[section] = {};
        for (const [key, value] of Object.entries(result.data[section])) {
          if (value !== undefined) {
            settings[section][key] = value;
          }
        }
      }
    }
  }

  await settings.save();
  clearSettingsCache(); // Invalidate cache so public site picks up new values
  await revalidateContent({ type: "settings" });

  const updated = settings.toObject();
  return NextResponse.json({ success: true, settings: { ...updated, id: updated._id.toString(), _id: undefined } });
}
