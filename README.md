# Project Setup

Welcome to the Email Classifier! Follow the instructions below to set up the project on your local machine.

## Getting Started

1.  Clone the project repository from GitHub to your local machine.
2.  Copy the env.example file to create a new .env file. This file contains all the environment variables required for the project.
3.  Install all the necessary dependencies for the project using npm install.
4.  Start the development server to run the project locally using npm run dev.

## Notes
   
This project makes parallel calls to the Gemini API to increase the speed of execution, which may cause an error due to the API quota limit if you are classifying more than 15 emails at a time. It works well with 5-15 emails.
