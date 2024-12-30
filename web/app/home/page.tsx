"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Profile } from "@/components/Profile";
import { WarningMail } from "@/components/core/WarningMail";
import { NewsletterMail } from "@/components/core/NewsletterMail";
import { SchedulingMail } from "@/components/core/SchedulingMail";
import { Email } from "@/components/Email";
import { CodeWrapper } from "@/components/core/wrapper";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 font-sans flex justify-center items-start bg-background">
      <div className="w-full max-w-4xl md:px-8 relative border-l border-r border-neutral-400/50">

        <div className="space-y-8 ">
          <div className="flex justify-end mb-8">
            <Profile />
          </div>

          <main className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4 text-primary">
                Intro to emails and backend!
              </h2>
              <p className="text-muted-foreground">
                See what can be done with emails and backend.
              </p>
            </div>

            <BorderedLine />
            <CodeWrapper
              title="Warning Email"
              description="Send warning emails when important actions occur"
              component={<WarningMail />}
              clientCode={`"use client";

import { useState } from "react";
import { MailWarning } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const WarningMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "warning",
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: {error}, 
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-card rounded-lg flex flex-col items-center text-center">
      <MailWarning className="text-red-500 h-12 w-12 mb-4 text-primary" />
      <h3 className="font-medium mb-2 text-foreground text-xl">
        Send Warning Email
      </h3>
      <p className="text-muted-foreground mb-4 text-balance">
        Companies use this one as an attached option and send you a mail when
        you do something like change your password, sign in or sign out or
        someone log in to your account.
      </p>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={handleAction}
              disabled={isLoading}
              className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              {isLoading ? "Sending..." : "Send Warning"}
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black px-2 py-1 text-md w-80">
            {" "}
            Consider that this button is a signout / change password button and
            you will receive a warning mail when you click it.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
`}
              serverCode={`import { NextResponse } from "next/server";
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
`}
            />
            <BorderedLine />
            <CodeWrapper
              title="Sens Newsletter"
              description="Send newsletter when someone subscribes"
              component={<NewsletterMail />}
              clientCode={`"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const NewsletterMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast(); 

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "newsletter",
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:  {error},
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-8 bg-card rounded-lg flex flex-col items-center text-center">
      <Send className="text-blue-500 h-12 w-12 mb-4 text-primary " />
      <h3 className="font-medium mb-2 text-foreground text-xl">
        Send Newsletter
      </h3>
      <p className="text-muted-foreground mb-4 text-balance">
        This button is like adding up in a subscrition list for newsletter or
        some particular thing. This could also work for unsubscribing from it.
      </p>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={handleAction}
              disabled={isLoading}
              className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              {isLoading ? "Sending..." : "Send Newsletter"}
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black px-2 py-1 w-64 text-md">
            Clicking this is going to send you a newsletter with a list of some
            good principles generated by AI.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
`}
              serverCode={`import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { action, email } = await req.json();
    let message = "";

    if (!email) throw new Error("Email is required");

    switch (action) {
      case "newsletter":
        await resend.emails.send({
          from: "Get Mail <oc@theme-verse.com>",
          to: email,
          subject:
            "List of small and useful programming principles that will help you!",
          html: "Newsletter Data you want to send",
        });
        message = "Newsletter sent successfully";
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
`}
            />
            <BorderedLine />
            <CodeWrapper
              title="Delay Emails"
              description="Delay or Scedule emails when you want to. "
              component={<SchedulingMail />}
              clientCode={`"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const SchedulingMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleEmailSend();
    }
    return () => clearInterval(timer);
  }, [isLoading, countdown]);

  const handleAction = () => {
    setIsLoading(true);
  };

  const handleEmailSend = async () => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "schedule",
          email: "Get Mail no-reply@theme-verse.com", // Replace with actual email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:  {error}, 
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCountdown(30);
    }
  };
  return (
    <div className="p-8 bg-card rounded-lg flex flex-col items-center text-center">
      <Timer className="text-purple-500 h-12 w-12 mb-4 text-primary" />
      <h3 className="font-medium mb-2 text-foreground text-xl">
        Schedule or Delay Email
      </h3>
      <p className="text-muted-foreground text-balance mb-4">
        Maybe you can see this button as an vercel deployment one button and
        consider that your deployment is going to fail or succeed. When it is
        completed you get an mail regarding the deployment or atleast I do and
        this is how it is done.
      </p>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={handleAction}
              disabled={isLoading}
              className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              {isLoading ? Waiting... {countdown}s : "Start Process"}
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-balance text-black px-2 py-1 text-md w-60">
            {" "}
            You will get a mail half minute after you click this button!
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
`}
              serverCode={`import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { action, email } = await req.json();
    let message = "";

    if (!email) throw new Error("Email is required");

    switch (action) {
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
`}
            />
            <BorderedLine />

            <CodeWrapper
              title=" Send it to an email"
              description=""
              component={<Email heading="" />}
              clientCode={`import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function Email({heading}: {heading: string}) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          description: data.message,
        });
      } else {
        toast({
          description: data.error || data.details,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: {error},
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative sm:px-10 md:px-20 lg:px-36 z-10 mt-8"
    >
      <div className="relative flex-grow">
        <div className="space-y-2">
          <Label htmlFor="input" className="text-slate-300 font-lg font-bold">
            {heading}
          </Label>

          <div className="flex gap-2">
            <Input
              id="input"
              className="flex-1 relative z-10 text-white"
              placeholder="Enter your email."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="ghost"
              disabled={isLoading}
              className="border-2 border-solid border-cyan-500 relative overflow-hidden p-2 group hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Send</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary-foreground" />
                ) : (
                  <>
                    <Send className="absolute w-5 h-5 transition-all duration-300 ease-out transform group-hover:rotate-[15deg] group-hover:translate-x-full group-hover:opacity-0 text-primary-foreground" />
                    <span className="absolute w-5 h-5 transition-all duration-300 ease-out transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-primary-foreground">
                      <Send className="animate-pulse" />
                    </span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

`}
              serverCode={`import { NextResponse } from "next/server";
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
                      html: "Content",
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
                      html:  "Content",
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
              `}
            />
            <div className="h-10"></div>
          </main>
        </div>
      </div>
    </div>
  );
}

const BorderedLine = () => (
  // <div className="flex w-full  justify-center my-8">
  //   {[...Array(80)].map((_, i) => (
  //     <div key={i} className="h-[1px]  w-[8px] bg-border mx-[2px]" />
  //   ))}
  // </div>
  <div className="border-[0.1px] mt-2 mb-2 border-solid border-neutral-400/20"></div>
);
