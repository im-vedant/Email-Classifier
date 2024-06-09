import { NextResponse } from "next/server";

import { gmail_v1, google } from "googleapis";

export async function POST(request: Request) {
  const body: {
    access_token: string;
    refresh_token: string;
    maxResponse: number;
  } = await request.json();

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({
      access_token: body?.access_token,
      refresh_token: body?.refresh_token,
    });//setting the access token and refresh token in the oauth2Client object to login into user's account
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });//initializing the gmail object
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: body?.maxResponse || 15,
    });//if there is no maxResponse in the body, then 15 mails will be fetched by default
    const messages = response.data.messages!;
    const emailsContents = await Promise.all(
      messages.map((msg) => getMailContent(msg.id!, gmail))
    );//fetching the mail content for each message parallelly
    return NextResponse.json({success : true, emailsContents },{status : 200});
  } catch (error: any) {
   
    return NextResponse.json({ success: false,error: error.message },{status : 500});
  }
}

async function getMailContent(messageId: string, gmail: gmail_v1.Gmail) {
  try {
    const res = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });//getting the mail content

    const emailData = res.data;
    const headers = emailData?.payload?.headers;
    const fromHeader = headers?.find((header) => header.name === "From");//getting the sender email
    const sender = fromHeader ? fromHeader.value : "Unknown";//getting the sender email
    const subjectHeader = headers?.find((header) => header.name === "Subject");//getting the subject of the email
    const subject = subjectHeader ? subjectHeader.value : "No subject";
    const parts = emailData?.payload?.parts !
    const body = parts?.find((part) => part.mimeType === "text/plain")?.body?.data || null//getting mail body if it is text/plain, otherwise null
    if (!body) {
      console.log(`No text/plain body for message ID: ${messageId}`);//in case there is no body, content will be null
      return {
        id: messageId,
        sender,
        content: null,
        subject,
        classification: null,
      };
    }

    // Decode base64 body
    const decodedBody = Buffer.from(body, "base64").toString("utf-8");//decoding the base64 body
    return {
      id: messageId,
      sender,
      content: decodedBody,
      subject,
      classification: null,
    };
  } catch (error) {
    console.error("Error fetching email content:", error);
    return {
      id : messageId,
      sender : null,
      content : null,
      subject : null,
      classification : null
    }
  }
}
