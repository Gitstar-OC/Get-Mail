"use client";

import { useState } from "react";
import { MailWarning  } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const WarningMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

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

      if (!response.ok) {
        throw new Error("Failed to perform action");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while performing the action");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-card rounded-lg flex flex-col items-center text-center">
      <MailWarning  className="text-red-500 h-12 w-12 mb-4 text-primary" />
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
              className="px-4 py-2 text-primary-foreground rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 active:scale-95 transition-transform shadow-lg"
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
