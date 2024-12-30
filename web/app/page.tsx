"use client";
import React, { useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Email } from "@/components/Email";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push("/home");

      // Prepare user data to send
      const userData = {
        auth_id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.firstName,
        full_name: user.fullName,
        profile_picture: user.imageUrl,
        created_at: user.createdAt,
      };

      // Call the API to store user data
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="mx-auto p-4 max-w-2xl w-full">
        <h1 className="relative z-10 text-4xl md:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-primary-foreground text-center font-sans font-bold mb-8">
          <video
            src="https://resend.com/static/landing-page/3d-integrate-weekend.mp4"
            muted
            loop
            autoPlay
            className="z-10 rounded-lg md:rounded-3xl xl:rounded-[2rem] w-12 h-12 md:w-20 md:h-20 xl:w-24 xl:h-24 mb-4 inline-block mr-4 relative"
          />
          Get Mail
        </h1>
        <p className="text-slate-300/90 max-w-lg mx-auto my-4 text-lg md:text-xl lg:text-2xl text-center relative z-10">
          Simple{" "}
          <a
            href="https://github.com/Hackclub-OC/Get-Mail"
            target="_blank"
            className="relative before:content-[''] before:absolute before:left-[-0.1px] before:right-[-0.1px] before:h-full before:transition-transform before:duration-[0.6s] before:ease-[cubic-bezier(0.53,0.21,0,1)] text-slate-200 hover:text-white before:origin-bottom before:bg-primary-foreground before:opacity-60 before:scale-y-[0.3] before:bottom-0 hover:before:scale-y-100"
          >
            <span className="relative">Open Source</span>
          </a>{" "}
          plugin you can use to send email when something happens.
        </p>

        <div className="flex relative z-10 flex-col items-center space-y-4 mt-8">
          <p className="font-bold font-sans text-lg relative group overflow-hidden">
            <span className="relative z-10 block px-4 py-2 text-white">
              *Sign in to get code for each component !
            </span>
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" className="w-40">
              <SignInButton mode="modal">
                <span className="flex">
                  <FaGithub className="mr-2" />
                  GitHub
                </span>
              </SignInButton>
            </Button>
            <Button variant="outline" className="w-40">
              <SignInButton mode="modal">
                <span className="flex">
                  <FaGoogle className="mr-2" />
                  Google
                </span>
              </SignInButton>
            </Button>
          </div>
        </div>

        <div className="relative w-full sm:px-10 md:px-20 lg:px-36 text-center">
          <hr className="border-t border-primary-foreground/30 my-8" />
          <span className="px-2 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            OR
          </span>
        </div>
        <Email heading={"Know more about us!"} />
      </div>
      <BackgroundBeams />
    </div>
  );
}
