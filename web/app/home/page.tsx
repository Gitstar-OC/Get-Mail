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
      <div className="w-full max-w-4xl md:px-8 relative">
        <div className="absolute left-0 top-8 bottom-0 hidden lg:flex flex-col gap-[4px]">
          {[...Array(125)].map((_, i) => (
            <div key={i} className="h-[14px] w-[1px] bg-border" />
          ))}
        </div>
        <div className="absolute right-0 top-8 bottom-0 hidden lg:flex flex-col gap-[4px]">
          {[...Array(125)].map((_, i) => (
            <div key={i} className="h-[14px] w-[0.5px] bg-border" />
          ))}
        </div>

        <div className="space-y-8">
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

            {/* <div className="flex">
              {[...Array(80)].map((_, i) => (
                <div key={i} className="h-[1px] w-[8px] bg-border mx-[2px]" />
              ))}
            </div> */}

            <BorderedLine />
            <CodeWrapper
              title="Warning Email"
              description="Send warning emails when important actions occur"
              component={<WarningMail />}
              clientCode={`export const WarningMail = () => { /* code */ }`}
              serverCode={`export async function POST(req: Request) { /* code */ }`}
            />
            <BorderedLine />
            <CodeWrapper
              title="Sens Newsletter"
              description="Send warning emails when important actions occur"
              component={<NewsletterMail />}
              clientCode={`export const WarningMail = () => { /* code */ }`}
              serverCode={`export async function POST(req: Request) { /* code */ }`}
            />
            <BorderedLine />
            <CodeWrapper
              title="Warning Email"
              description="Send warning emails when important actions occur"
              component={<SchedulingMail />}
              clientCode={`export const WarningMail = () => { /* code */ }`}
              serverCode={`export async function POST(req: Request) { /* code */ }`}
            />
            <BorderedLine />

            <CodeWrapper
              title=" Send it to an email"
              description=""
              component={<Email heading="" />}
              clientCode={`export const WarningMail = () => { /* code */ }`}
              serverCode={`export async function POST(req: Request) { /* code */ }`}
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
  <div className="border-[0.1px] border-solid border-neutral-400"></div>
);
