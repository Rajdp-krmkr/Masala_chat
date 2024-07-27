"use client";
import Image from "next/image";
import React from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "../components/ChatRoom.js";
import { useToast } from "@/components/ui/use-toast.js";

import { auth } from "@/lib/firebaseConfig.js";
import { db } from "@/lib/firebaseConfig.js";
import WelcomePage from "@/components/WelcomePage.jsx";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div>
        {user ? (
          <>
            <ChatRoom />
          </>
        ) : (
          <>
            <WelcomePage />
            <SignIn />
          </>
        )}
      </div>
    </>
  );
}

const SignIn = () => {
  const toast = useToast();
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="sign-in">
      Sign in with Google
    </button>
  );
};

export function SignOutButton() {
  return (
    auth.currentUser && (
      <button className="signOutbtn" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    )
  );
}
