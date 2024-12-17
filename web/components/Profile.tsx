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

// import { useAuth, useUser, SignOutButton, UserButton } from "@clerk/nextjs";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User } from 'lucide-react';

  // const { user } = useUser();

// <div className="absolute top-4 right-4">
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Avatar className="h-10 w-10 cursor-pointer">
//         <AvatarImage src={user?.profileImageUrl} alt="Profile" />
//         <AvatarFallback>
//           {/* <User className="h-6 w-6" /> */}
//           UP
//         </AvatarFallback>
//       </Avatar>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent align="end">
//       <DropdownMenuItem>
//         <span className="font-medium">{user?.fullName}</span>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
//         <span className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
//         <SignOutButton>
//           <button className="w-full text-left">
//             Sign out
//           </button>
//         </SignOutButton>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
// <UserButton>
// </UserButton>
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// </div>
