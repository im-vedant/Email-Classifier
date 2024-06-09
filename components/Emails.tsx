"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Label, Select } from "flowbite-react";
import Skeleton from "./LoadingSkeleton";
type Session ={
  access_token: string;
  refresh_token: string;
}
type EmailType={
  id : string,
  sender : string,
  content : string | null,
  subject : string | null,
  classification : string | null
}
const Emails = ({ session }: {session : Session}) => {
  const [emails, setEmails] = useState<EmailType[]>([]);//stores the list of email with id, sender, content, subject and classification fields.
  const [loading, setLoading] = useState(false);//loading state
  const [isClassifying,setIsClassifying]=useState(false)//isClassifying state to know if the email is being classified or not
  useEffect(() => {
    fetchData(null);
  }, []);

  async function fetchData(e: any) // This function fetches the list of emails from the server and updates the state.
  {
    setLoading(true)
    try{
      const response = await axios.post("/api/email", {
        access_token: session.access_token,
        refresh_token: session.refresh_token,//sending access token and refresh token to the server for fetchin user's mails
        maxResponse: e?.target?.value || 15,// default value is 15 if no event is passed
      });
      setEmails(response.data?.emailsContents);
      localStorage.setItem("email", JSON.stringify(response.data.emailsContents));//saving the emails in the localstorage for later use
    }catch(error){
      console.log("Error while fetching emails",error)
      setEmails([]);//if there is an error then set the state to empty
    }
    setLoading(false)
  }

  async function classifyHandler()//This handler function is triggered when the classify button is clicked.
  //It makes a post request to the server with the list of emails and updates the state with the classified emails.
   {
    setLoading(true)
    setIsClassifying(true)
    try{
      const response = await axios.post(`/api/classify`, {
        emails: emails,
        api_key : localStorage.getItem('api_key'),// sending the gemini key
      });
      console.log(response.data.data);
      setEmails(response.data.data);//updated data with classification
      localStorage.setItem("email", JSON.stringify(response.data.data));//saving the emails in the localstorage for later use
    }catch(error)
    {
      console.log("Error while fetching emails",error)
    }
    setIsClassifying(false)
    setLoading(false)
  }
 
  return (
    <div>
      <div className="flex flex-row items-center mb-5 justify-between">
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label
              className="text-white text-[16px]"
              htmlFor="countries"
              value="Select number of mails you want to classify"
            />
          </div>
          <Select
          disabled={isClassifying }
            id="countries"
            className="w-[100px]"
            defaultValue={15}
            onChange={fetchData}
            required
          >
            {/* Custom options */}
            {[5, 10, 15, 20, 25, 30].map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
          </Select>
        </div>
        <button
          onClick={classifyHandler}
          disabled={isClassifying || loading}
          className=" bg-green-400 h-fit text-[20px] text-white px-3 py-2 rounded-md"
        >
         {
          isClassifying ? "Classifying..." : "Classify Email"
         }
        </button>
      </div>
      {emails !== null && !loading &&
        emails?.map((e: any, index: number) => {
          return (
            <div
              className=" px-[30px] py-[20px]  text-white border-[2px] rounded-md border-white mb-[40px] overflow-hidden"
              key={index}
            >
              {/* Link tag will redirect it to other page, so that user can see the full email */}
              <Link href={`/email/${index}`}> 
                <div className="flex flex-row justify-between">
                  <h2 className="text-3xl">{e?.sender}</h2>
                  <h2 className="text-3xl">{e?.classification}</h2>
                </div>
                <div className="text-[20px] my-[10px]">{e?.subject}</div>
                {/* If the content is not null then display the content */}
                {e.content !== null ? (
                  <pre
                    className="text-wrap h-[150px] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: e?.content }}
                  >
                      {/* 
                        The content of the email is displayed using dangerouslySetInnerHTML because it is html content
                      */}
                  </pre>
                ) : (
                  <div>No body available.</div>//if the content is null then display this
                )}
              </Link>
            </div>
          );
        })}
        {
          loading && <Skeleton isClassifying={isClassifying} />
        }
      {emails === null && !loading && <div>No emails available.</div>}
      {/* When we no mails are available then display this */}
    </div>
  );
};

export default Emails;
