import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Contact from "@/models/Contact";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Media from "@/models/Media";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const startTime = Date.now();
    await connectDB();
    const dbLatencyMs = Date.now() - startTime;

    const dbState = mongoose.connection.readyState;
    const dbStateMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    const [
      totalLeads,
      totalServices,
      totalProjects,
      totalMedia,
    ] = await Promise.all([
      Contact.countDocuments(),
      Service.countDocuments(),
      Project.countDocuments(),
      Media.countDocuments(),
    ]);

    const hasCloudinary = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );

    const hasMail = Boolean(
      process.env.EMAIL_USER &&
      (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD)
    );

    const hasJwtSecret = Boolean(process.env.JWT_SECRET);

    return NextResponse.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      database: {
        status: dbStateMap[dbState] || "unknown",
        latencyMs: dbLatencyMs,
      },
      services: {
        cloudinaryConfigured: hasCloudinary,
        emailConfigured: hasMail,
        jwtConfigured: hasJwtSecret,
      },
      counts: {
        leads: totalLeads,
        services: totalServices,
        projects: totalProjects,
        media: totalMedia,
      },
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        success: false,
        status: "unhealthy",
        error: "Health check failed",
      },
      { status: 500 }
    );
  }
}
