import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl =  process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  // Store email in Supabase
  const { error: supabaseError } = await supabase.from('emails').insert({ email });
  if (supabaseError) {
    console.error('Supabase Error:', supabaseError);
    return NextResponse.json({ error: 'Failed to store email' }, { status: 500 });
  }

  // Send email using Resend
  try {
    await resend.emails.send({
      from: 'OC <no-reply@theme-verse.com>',
      to: email,
      subject: 'Welcome!',
      html: '<p>Thank you for signing up!</p>',
    });
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (resendError) {
    console.error('Resend Error:', resendError);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}