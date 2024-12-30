import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, isAuthFlow, name } = await req.json();

    if (isAuthFlow) {
      // Auth flow
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Create or update user
      const { data: userData, error: userError } = await supabase
        .from("users")
        .upsert({
          auth_id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.firstName,
          // profile_url: user.,
        })
        .select()
        .single();

      if (userError) {
        console.error("User Creation Error:", userError);
        return NextResponse.json(
          { error: "Failed to create user", details: userError.message },
          { status: 500 }
        );
      }

      // Create email record
      const { error: emailError } = await supabase.from("emails").insert({
        email,
        user_id: userData.id,
      });

      if (emailError) {
        console.error("Email Record Error:", emailError);
      }

      await resend.emails.send({
        from: "OC <no-reply@theme-verse.com>",
        to: email,
        subject: "Welcome to Get Mail !",
        html: `    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
      return NextResponse.json({
        message: "User created successfully",
        redirect: "/home",
      });
    } else {
      // Email-only flow
      // Check if email exists
      const { data: existingEmail } = await supabase
        .from("emails")
        .select("email")
        .eq("email", email)
        .single();

      if (existingEmail) {
        return NextResponse.json({
          message: "Email already registered",
          exists: true,
        });
      }

      // Store email
      const { error: emailError } = await supabase
        .from("emails")
        .insert({ email });

      if (emailError) {
        console.error("Email Storage Error:", emailError);
        return NextResponse.json(
          { error: "Email already exists! ", details: emailError.message },
          { status: 500 }
        );
      }

      await resend.emails.send({
        from: "OC <no-reply@theme-verse.com>",
        to: email,
        subject: "Welcome to Get Mail!",
        html: `  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d3748; text-align: center;">Welcome to Get Mail! 🎉</h1>
      
      <div style="padding: 20px; background-color: #f7fafc; border-radius: 8px; margin: 20px 0;">
        <p>Hey there!</p>
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

      return NextResponse.json({
        message: "Email sent successfully 🎉",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
