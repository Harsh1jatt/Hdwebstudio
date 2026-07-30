import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import bcrypt from "bcryptjs";
import { signToken, COOKIE_NAME } from "../../../../lib/jwt";

export async function POST(req) {
  try {
    const { email, password, rememberMe } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();

    const admin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const token = signToken(
      {
        adminId: admin._id.toString(),
      },
      {
        expiresIn: rememberMe ? "30d" : "1d",
      }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe
        ? 60 * 60 * 24 * 30
        : 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while signing in.",
      },
      {
        status: 500,
      }
    );
  }
}