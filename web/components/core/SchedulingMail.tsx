"use client";

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
        description: error.message,
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
              {isLoading ? `Waiting... ${countdown}s` : "Start Process"}
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
