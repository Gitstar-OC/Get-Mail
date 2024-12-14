import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if email already exists in Supabase
    const { data: existingEmail, error: checkError } = await supabase
      .from('emails')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Supabase Check Error:', checkError);
      return NextResponse.json(
        { error: 'Failed to check email', details: checkError.message }, 
        { status: 500 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Oops, Email has already been sent to this address' }, 
        { status: 200 }
      );
    }

    // Store email in Supabase
    const { error: supabaseError } = await supabase
      .from('emails')
      .insert({ email });

    if (supabaseError) {
      if (supabaseError.code === '23505') {
        return NextResponse.json(
          { error: 'Oops, Mail has already been sent to this email' }, 
          { status: 400 }
        );
      }
      console.error('Supabase Error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to send an email', details: supabaseError.message }, 
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: 'OC <no-reply@theme-verse.com>',
      to: email,
      subject: 'Welcome to Get Mail !',
      html: `    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
        <p>Visit our website: <a href="https://get-mail.vercel.app" style="color: #4299e1;">Get-Mail.vercel.app</a></p>
        <p>Have a great day! More Coming Soon ✨</p>
      </div>
    </div>`,
    });

return NextResponse.json({ message: 'Email sent successfully 🎉 ' });
} catch (error) {
  console.error('Error:', error);
  if (error instanceof Error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { error: 'Internal server error', details: 'Unknown error' }, 
      { status: 500 }
    );
  }
}
}