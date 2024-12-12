import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
// import { Resend } from 'resend';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);
// const resend = new Resend(process.env.RESEND_API_KEY);

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
        { message: 'Email has already been sent to this address' }, 
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
          { error: 'Mail has already been sent to this email' }, 
          { status: 400 }
        );
      }
      console.error('Supabase Error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to send an email', details: supabaseError.message }, 
        { status: 500 }
      );
    }

    // Comment out or remove the email sending code
    // await resend.emails.send({
    //   from: 'OC <no-reply@theme-verse.com>',
    //   to: email,
    //   subject: 'Welcome!',
    //   html: '<p>Thank you for signing up!</p>',
    // });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error: any);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  }
}