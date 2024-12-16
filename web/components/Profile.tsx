"use client";

import { useAuth, UserButton } from "@clerk/nextjs";

export function Profile() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="absolute w-6 h-6 top-4 right-4">
      <UserButton />
    </div>
  );
}
