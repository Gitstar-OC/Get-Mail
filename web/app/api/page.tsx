import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Store email in Supabase
    const { error } = await supabase.from('emails').insert({ email });
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Your Name <no-reply@example.com>',
        to: email,
        subject: 'Welcome!',
        html: '<p>Thank you for signing up!</p>',
      });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}