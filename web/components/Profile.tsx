"use client";

import { useAuth, UserButton } from "@clerk/nextjs";

export function Profile() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="inset-0 flex justify-end items-center">
      <UserButton  />
    </div>
  );
}
