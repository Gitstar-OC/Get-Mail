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
      html: `<p>Hi ${name}, <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d3748; text-align: center;">Welcome to Get Mail! 🎉</h1>
      
      <div style="padding: 20px; background-color: #f7fafc; border-radius: 8px; margin: 20px 0;">
        <p>Hey ${name || "there"}!</p>
        <p>I am OC and Thank you for trying out Get Mail plugin. We're excited to have you here!</p>
        <p>This is how companies send you mail when something happens. You can explore our source code on <a href="https://github.com/Hackclub-OC/Get-Mail" style="color: #4299e1;">GitHub</a>.</p>
      </div>

      <div style="margin-top: 20px; padding: 15px; background-color: #fff5f5; border-radius: 8px;">
        <p style="color: #e53e3e; margin: 0;"><strong>Note:</strong> This is an automated message. Please do not reply to this email as it is sent from an unmonitored account.</p>
      </div>

      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p>Visit our website: <a href="https://get-mail.vercel.app" style="color: #4299e1;">Get-Mail</a></p>
        <p>Have a great day! More Coming Soon ✨</p>
      </div>
    </div>`,
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
