import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const userData = await req.json();

    // Validate required fields
    const { auth_id, email, name } = userData;
    if (!auth_id || !email || !name) {
      return NextResponse.json(
        { error: "Missing required user data" },
        { status: 400 }
      );
    }

    // Upsert user data into Supabase
    const { error } = await supabase.from("users").upsert(userData);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to store user data", details: error.message },
        { status: 500 }
      );
    }

    // Send welcome email using Resend
    await resend.emails.send({
      from: "Get Mail <no-reply@theme-verse.com>",
      to: email,
      subject: "Welcome to Get Mail!",
      html: `<p>Hi ${name},</p><p>Welcome to Get Mail!</p>`,
    });

    return NextResponse.json({ message: "User data stored and email sent" });

  } catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json(
      { error: "Internal server error", details: `${error}` },
      { status: 500 }
    );
  }
}
