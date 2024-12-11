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
          Just a simple open source plugin you can use to send email when something happens. 
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
                <Button variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}


// .exampleBtn {
//   @apply bg-[hsl(222,100%,95%)] text-[hsl(243,80%,62%)] relative overflow-hidden z-[1] px-6 py-3 rounded-md before:content-[''] before:absolute before:w-[140px] before:h-[140px] before:bg-[hsl(243,80%,62%)] before:opacity-0 before:rounded-[50%] before:left-2/4 before:top-2/4 hover:before:opacity-100 hover:before:duration-[0.85s];
// }
// .exampleBtn span {
//   @apply z-[1] relative;
// }
// .exampleBtn::before {
//   transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
//   transition: opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1),
//     transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
// }
// .exampleBtn:hover span {
//   @apply text-[hsl(222,100%,95%)];
// }
// .exampleBtn:hover::before {
//   transform: translate3d(-50%, -50%, 0) scale3d(1.2, 1.2, 1.2);
// }
