"use client";
import SignOut from "@/components/SignOut";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [disabled, setDisabled] = useState(true);//If there is no key then disabled will be true.
  const [api, setApi] = useState("");
  const { data: session } = useSession();
  if (session) //If there is a session then user is signed in
    {
    return (
      <div className="text-white flex flex-col justify-center items-center text-center my-9">
        Signed in as {session!.user!.email} <br />
        <SignOut />
      </div>
    );
  }
  //else user is not signed in
  return (
    <div className="flex h-screen bg-black flex-col space-y-8 justify-center items-center ">
      <button
        disabled={disabled}
        className={`${
          disabled ? "bg-blue-300" : "bg-blue-500"
        } text-[20px] text-white px-3 py-2 rounded-md`}
        onClick={() => {
          localStorage.setItem("api_key", api);//key is stored in localstorage, so that it can be accessed later
          signIn(undefined, { callbackUrl: `${process.env.NEXT_PUBLIC_PROJECT_URL}/email` });//after signing in user will be redirected to email page
        }}
      >
        Login With Google
      </button>
      <form>
        <input
          onChange={(e) => {
            e.target.value ? setDisabled(false) : setDisabled(true);//if there is a value then disabled will be false else true
            setApi(e.target.value);
          }}
          value={api}
          type="text"
          className="border border-gray-300 w-[300px] text-black focus:outline-none px-3 py-2 rounded-md"
          placeholder="Enter Gemini API Key"
        />
      </form>
    </div>
  );
}
