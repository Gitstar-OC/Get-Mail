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
          from: "Get Mail <no-reply@theme-verse.com>",
          to: email,
          subject: "Warning: Action Required",
          html: "<p>This is a warning email. Please take necessary action.</p>",
        });
        message = "Warning email sent successfully";
        break;
      case "newsletter":
        await resend.emails.send({
          from: "Get Mail <oc@theme-verse.com>",
          to: email,
          subject:
            "List of small and useful programming principles that will help you!",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    <h1 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
        Essential Programming Principles
    </h1>
    
    <p style="font-size: 16px; line-height: 1.5;">
        Here are some fundamental programming principles that will help you write better code:
    </p>

    <ul style="list-style-type: none; padding: 0;">
        <li style="background: #f8f9fa; margin: 10px 0; padding: 15px; border-left: 4px solid #3498db; border-radius: 4px;">
            <strong>DRY (Don't Repeat Yourself)</strong><br>
            Avoid code duplication by abstracting common functionality
        </li>
        
        <li style="background: #f8f9fa; margin: 10px 0; padding: 15px; border-left: 4px solid #2ecc71; border-radius: 4px;">
            <strong>KISS (Keep It Simple, Stupid)</strong><br>
            Simple solutions are easier to maintain and understand
        </li>
        
        <li style="background: #f8f9fa; margin: 10px 0; padding: 15px; border-left: 4px solid #e74c3c; border-radius: 4px;">
            <strong>YAGNI (You Aren't Gonna Need It)</strong><br>
            Don't implement features until they're actually needed
        </li>
        
        <li style="background: #f8f9fa; margin: 10px 0; padding: 15px; border-left: 4px solid #f1c40f; border-radius: 4px;">
            <strong>Single Responsibility Principle</strong><br>
            Each component should have only one reason to change
        </li>
        
                <li style="background: #f8f9fa; margin: 10px 0; padding: 15px; border-left: 4px solid #9b59b6; border-radius: 4px;">
            <strong>Write Clean Code</strong><br>
            Code should be readable, well-documented, and maintainable
        </li>
    </ul>

    <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
        Remember: Following these principles will help you write more maintainable and efficient code!
    </p>
</div>`,
        });
        message = "Newsletter sent successfully";
        break;
      case "schedule":
        await resend.emails.send({
          from: "Get Mail <no-reply@theme-verse.com>",  
          to: email,
          subject: "Scheduling Mail",
          html: "<p>This is a email scheduled 30 seconds ago!</p>",
        });
        message = "Scheduled email sent successfully";
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
