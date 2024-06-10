# Email Classification Web Application

This web application allows users to log in using Google OAuth, fetch their recent emails from Gmail, and classify them into different categories using Google Gemini.

## Features

- **User Authentication**: Log in using Google OAuth with NextAuth.
- **Fetch Emails**: Retrieve the last X emails from Gmail using the Gmail API.
- **Classify Emails**: Categorize emails into important, promotional, social, marketing, and spam using Google Gemini.
- **Local Storage**: Store the OpenAI key and fetched emails in the user's local storage for convenience and privacy.

## Tech Stack

- **Next.js**: For the Full Stack framework.
- **NextAuth**: For user authentication with Google OAuth.
- **Gmail API**: To fetch emails.
- **Google Gemini**: For email classification.
- **Tailwind CSS**: For modern UI design.
  
## Getting Started

1.  Clone the project repository from GitHub to your local machine.
2.  Copy the env.example file to create a new .env file. This file contains all the environment variables required for the project.
3.  Install all the necessary dependencies for the project using npm install.
4.  Start the development server to run the project locally using npm run dev.

## Notes
   
This project makes parallel calls to the Gemini API to increase the speed of execution, which may cause an error due to the API quota limit if you are classifying more than 15 emails at a time. It works well with 5-15 emails.
