import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { resend } from "@/lib/resend";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: auth_id, emailAddresses, firstName, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress;

    // Upsert user data into Supabase
    const { error } = await supabase.from("users").upsert({
      auth_id,
      email,
      name: firstName,
      profile_picture: imageUrl,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to store user data" },
        { status: 500 }
      );
    }

    // Send welcome email using Resend
    await resend.emails.send({
      from: "Get Mail <no-reply@theme-verse.com>",
      to: email,
      subject: "Welcome to Get Mail!",
      html: `<p>Hi ${firstName},</p><p>Welcome to Get Mail!</p>`,
    });

    return NextResponse.json({ message: "User data stored and email sent" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}