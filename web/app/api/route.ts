import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  // Store email in Supabase
  const { error } = await supabase.from('emails').insert({ email });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email using Resend
  try {
    await resend.emails.send({
      from: 'Your Name <no-reply@example.com>',
      to: email,
      subject: 'Welcome!',
      html: '<p>Thank you for signing up!</p>',
    });
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}