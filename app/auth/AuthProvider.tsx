'use client'

import { SessionProvider } from "next-auth/react"

import React from 'react'
//Next auth session provider, so that we can access session using useSession hook in the frontend
const AuthProvider = ({children}:{children:React.ReactNode}) => {
  return (
   <SessionProvider>
    {children}
   </SessionProvider>
  )
}

export default AuthProvider