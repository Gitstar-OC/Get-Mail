'use client'

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Profile } from "@/components/Profile";

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
    <div className="min-h-screen p-8 font-sans">
      <Profile />
      <main className="pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">
              This space will be filled with more content in the future.
            </p>
          </div>
      </main>
    </div>
  );
}

