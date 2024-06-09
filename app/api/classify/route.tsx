import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

//Function for generating the prompt for the model
const prompt = (emailContent: any) => `
Classify the following email into one of the following categories:
1. Important: Emails that are personal or work-related and require immediate attention.
2. Promotions: Emails related to sales, discounts, and marketing campaigns.
3. Social: Emails from social networks, friends, and family.
4. Marketing: Emails related to marketing, newsletters, and notifications.
5. Spam: Unwanted or unsolicited emails.
6. General: If none of the above are matched, use General.

Email content:
"${emailContent}"

Output the classification as a JSON object with a field called "classification".
Just return the classification without any other text.
Output 
{
    "classification": "classification"
}
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailContent = body.emails;//fetching the emails from the request body
    const data = await Promise.all(
      emailContent.map((emailContent: any) => getClassification(emailContent, body.api_key))
    );//fetching the classification for each email parallelly
    return NextResponse.json({ data ,success : true},{status : 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success : false},{status : 500});
  }
}

async function getClassification(email: any,api_key : string) {
  try {
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); //Initializing the model
    const response = await model.generateContent(prompt(email.content));//sending the prompt to the model and getting the response
    return {
      classification: JSON.parse(response.response.text()).classification,//parsing the response to get the classification in the object format
      id: email.id,
      sender: email.sender,
      subject: email.subject,
      content: email.content,
    };
  } catch (error) {
    console.log(error);
    return {
      classification: null,//In case of error, the classification will be null
      id: email.id,
      sender: email.sender,
      subject: email.subject,
      content: email.content,
    };
  }
}
