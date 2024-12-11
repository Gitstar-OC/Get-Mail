"use client";

import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <p className="text-neutral-400 max-w-lg mx-auto my-4 text-lg text-center relative z-10">
          Just a simple {""}
          <a
            href="https://github.com/Hackclub-OC/Get-Mail"
            target="_blank"
            className="relative before:content-[''] before:absolute before:left-[-0.1px] before:right-[-0.1px] before:h-full before:transition-transform before:duration-[0.6s] before:ease-[cubic-bezier(0.53,0.21,0,1)] text-white before:origin-bottom before:bg-blue-600 before:opacity-60 before:scale-y-[0.3] before:bottom-0 hover:before:scale-y-100"
          >
            <span className="relative">open source</span>
          </a>{" "}
          plugin you can use to send email when something happens.
        </p>
        <form onSubmit={handleSubmit} className="relative z-10 mt-8">
          <div className="relative flex-grow">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="input-22"
                  className="flex-1 relative z-10 text-white"
                  placeholder="Email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="bg-[hsl(222,100%,95%)] text-[hsl(243,80%,62%)] relative overflow-hidden z-[1] px-6 py-3 rounded-md before:content-[''] before:absolute before:w-[140px] before:h-[140px] before:bg-[hsl(243,80%,62%)] before:opacity-0 before:rounded-[50%] before:left-2/4 before:top-2/4 hover:before:opacity-100 hover:before:duration-[0.85s] before:transform before:translate-x-[-50%] before:translate-y-[-50%] before:scale-0 hover:before:scale-[1.2] before:transition-[opacity_0.4s_cubic-bezier(0.19,1,0.22,1),transform_0.75s_cubic-bezier(0.19,1,0.22,1)]"
                >
                  <span className="z-[1] relative text-[hsl(222,100%,95%)]">
                    <Send className="w-4 h-4" />
                  </span>
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
