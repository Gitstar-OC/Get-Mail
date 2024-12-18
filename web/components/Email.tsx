import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function Email() {
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
        description: `${error}`,
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
            Know more about us.
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
              className="border-2 border-solid border-white relative overflow-hidden p-2 group hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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

