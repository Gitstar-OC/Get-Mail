"use client";
import React, { useState } from "react";
// import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          // title: 'Success',
          description: data.message,
        });
      } else {
        toast({
          // title: 'Error',
          description: data.error || data.details,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
        variant: 'destructive',
      });
    }
    setEmail('');
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className=" mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl xl:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-primary-foreground text-center font-sans font-bold">
          <video src="https://resend.com/static/landing-page/3d-integrate-morning.mp4" muted loop autoPlay className="z-10 rounded-lg md:rounded-3xl xl:rounded-[2rem] w-12 h-12 md:w-20 md:h-20 xl:w-24 xl:h-24 mb-4 inline-block mr-4 relative" />
          Get Mail
        </h1>
        <p className="text-slate-300/90 max-w-lg mx-auto my-4 text-lg md:text-xl text-center relative z-10">
          Simple {""}
          <a
            href="https://github.com/Hackclub-OC/Get-Mail"
            target="_blank"
            className="relative before:content-[''] before:absolute before:left-[-0.1px] before:right-[-0.1px] before:h-full before:transition-transform before:duration-[0.6s] before:ease-[cubic-bezier(0.53,0.21,0,1)] text-slate-200 hover:text-white before:origin-bottom before:bg-primary-foreground before:opacity-60 before:scale-y-[0.3] before:bottom-0 hover:before:scale-y-100"
          >
            <span className="relative">Open Source</span>
          </a>{" "}
          plugin you can use to send email when something happens.
        </p>
        <form onSubmit={handleSubmit} className="relative z-10 mt-8 md:mx-14">
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="border-2 border-solid border-white relative overflow-hidden p-2 group hover:scale-105 transition-transform"
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
      {/* <BackgroundBeams /> */}
    </div>
  );
}
