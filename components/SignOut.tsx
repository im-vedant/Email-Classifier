"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      className="bg-blue-500 w-fit text-[20px] text-white px-3 py-2 rounded-md"
      onClick={() => {
        console.log("working");
        signOut({ callbackUrl: "/" });//after signout the user is directed to the home page
      }}
    >
      SignOut
    </button>
  );
};

export default SignOut;
