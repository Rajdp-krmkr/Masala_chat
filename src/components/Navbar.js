'use client'
import React from "react";
import { SignOutButton } from "@/app/page";
import { auth } from "@/lib/firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <nav className="p-4">
          <ul className="flex flex-row justify-between items-center">
            <li>Papri-chat</li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
