"use client"

import React from 'react'
import Login from "./AuthModalContent/Login"
import SignUp from "./AuthModalContent/SignUp"
import ResetPassword from "./AuthModalContent/ResetPassword"
import useAuthModalStore from "@/hooks/useAuthModalStore"

type AuthModalProps = {}

const AuthModal : React.FC<AuthModalProps> = () => {
 const { view } = useAuthModalStore()
 return (
    <>
    
     {view === 'Login' && <Login />}
     {view === 'SignUp' && <SignUp />}
     {view === 'ResetPassword' && <ResetPassword />}
     
    </>
  )

}

export default AuthModal
