import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { action, email } = await req.json();
    let message = "";

    if (!email) throw new Error("Email is required");

    switch (action) {
      case "warning":
        await resend.emails.send({
          from: "no-reply@theme-verse.com",
          to: email,
          subject: "Warning: Action Required",
          html: "<p>This is a warning email. Please take necessary action.</p>",
        });
        message = "Warning email sent successfully";
        break;
      case "newsletter":
        await resend.emails.send({
          from: "onboarding@x.com",
          to: email,
          subject: "Warning: Action Required",
          html: "<p>This is a warning email. Please take necessary action.</p>",
        });
        message = "Warning email sent successfully";
        break;
      case "schedule":
        await resend.emails.send({
          from: "no-reply@theme-verse.com",
          to: email,
          subject: "Warning: Action Required",
          html: "<p>This is a warning email. Please take necessary action.</p>",
        });
        message = "Warning email sent successfully";
        break;
      case "quick":
        await resend.emails.send({
          from: "no-reply@theme-verse.com",
          to: email,
          subject: "Warning: Action Required",
          html: "<p>This is a warning email. Please take necessary action.</p>",
        });
        message = "Warning email sent successfully";
        break;
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}
