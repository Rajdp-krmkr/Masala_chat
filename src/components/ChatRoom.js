"use client";
import {
  collection,
  getFirestore,
  orderBy,
  limit,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
// import { auth , firestore } from "@/app/page";
import { db } from "@/lib/firebaseConfig";
import { auth } from "@/lib/firebaseConfig";

const ChatRoom = () => {
  const dummy = useRef();

  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { uid, photoURL } = user;
    

    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
      setFormValue("");

    } catch (error) {
      console.log("Error sending message: ", error);
      alert("Error sending message. Please try again.");
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="lg:w-[50vh]">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">🍕</button>
      </form>
    </>
  );
};

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <Image src={`${photoURL}`} alt="user-photo" width={50} height={50} />
      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
