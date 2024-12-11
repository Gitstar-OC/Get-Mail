"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement backend submission logic
    console.log("Submitting email:", email);
    // Reset email field after submission
    setEmail("");
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          <Mail size={72} className="inline-block mb-4 mr-4 text-gray-300 " />
          Get a Mail
        </h1>
        <p className="text-slate-300/90 max-w-lg mx-auto my-4 text-lg text-center relative z-10">
          A simple {""}
          <a
            href="https://github.com/Hackclub-OC/Get-Mail"
            target="_blank"
            className="relative before:content-[''] before:absolute before:left-[-0.1px] before:right-[-0.1px] before:h-full before:transition-transform before:duration-[0.6s] before:ease-[cubic-bezier(0.53,0.21,0,1)] text-slate-200 hover:text-white before:origin-bottom before:bg-blue-600 before:opacity-60 before:scale-y-[0.3] before:bottom-0 hover:before:scale-y-100"
          >
            <span className="relative">open source</span>
          </a>{" "}
          plugin you can use to send email when something happens.
        </p>
        <form onSubmit={handleSubmit} className="relative z-10 mt-8">
          <div className="relative flex-grow">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-slate-300">
                Enter an email.
              </Label>

              <div className="flex gap-2">
                <Input
                  id="input"
                  className="flex-1 relative z-10 text-white"
                  placeholder="Email"
                  type="email"
                />
                <Button
                  // variant="secondary"
                  type="submit"
                  className="relative overflow-hidden p-2 group hover:scale-105 transition-transform"
                >
                  <span className="sr-only">Send</span>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <Send
                      className="
        absolute 
        w-5 h-5
        transition-all duration-300 ease-out transform
        group-hover:rotate-[15deg] group-hover:translate-x-full group-hover:opacity-0
        text-primary-foreground
      "
                    />
                    <span
                      className="
        absolute 
        w-5 h-5
        transition-all duration-300 ease-out transform
        -translate-x-full opacity-0
        group-hover:translate-x-0 group-hover:opacity-100
        text-primary-foreground
      "
                    >
                      <Send className="animate-pulse" />
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
