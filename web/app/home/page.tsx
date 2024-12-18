"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Profile } from "@/components/Profile";
import { Button } from "@/components/ui/button";
import { Mail, Send, Calendar, Zap } from "lucide-react";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleAction = async (action: string) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform action");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while performing the action");
    }
  };
  const actions = [
    {
      name: "Send Warning Email",
      color: "destructive",
      icon: Mail,
      action: "warning",
    },
    {
      name: "Send Newsletter",
      color: "green",
      icon: Send,
      action: "newsletter",
    },
    {
      name: "Schedule Email",
      color: "blue",
      icon: Calendar,
      action: "schedule",
    },
    { name: "Quick Action", color: "yellow", icon: Zap, action: "quick" },
  ];

  return (
    <div className="min-h-screen p-8 font-sans flex justify-center items-start bg-background">
      <div className="w-full max-w-4xl md:px-8 relative">
        {/* Custom vertical borders */}
        <div className="absolute left-0 top-8 bottom-0 hidden lg:flex flex-col gap-[4px]">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="h-[14px] w-[1px] bg-border" />
          ))}
        </div>
        <div className="absolute right-0 top-8 bottom-0 hidden lg:flex flex-col gap-[4px]">
          {[...Array(100)].map((_, i) => (
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
                Your Email Dashboard
              </h2>
              <p className="text-muted-foreground">
                Choose an action to manage your emails.
              </p>
            </div>

            <div className="flex">
              {[...Array(80)].map((_, i) => (
                <div key={i} className="h-[1px] w-[8px] bg-border mx-[2px]" />
              ))}
            </div>

            <div className="space-y-0">
              {actions.map((action, index) => (
                <div key={index} className="relative py-8">
                  {index !== 0 && (
                    <div className="absolute top-0 left-0 right-0 flex">
                      {[...Array(80)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[1px] w-[8px] bg-border mx-[2px]"
                        />
                      ))}
                    </div>
                  )}

                  <div className="p-8 bg-card rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-2 text-foreground text-xl">
                        {action.name}
                      </h3>
                      <p className="text-muted-foreground">
                        Click to perform this action
                      </p>
                    </div>
                    <Button
                      variant={
                        action.color as
                          | "destructive"
                          | "default"
                          | "outline"
                          | "secondary"
                          | "ghost"
                          | "link"
                      }
                      size="lg"
                      onClick={() => handleAction(action.action)}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      Perform Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
