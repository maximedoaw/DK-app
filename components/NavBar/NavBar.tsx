"use client"

import { NavLinks } from '@/constant'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import { useState } from "react";
import { Button } from '../ui/button';
import useAuthModalStore from '@/hooks/useAuthModalStore';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from 'next/link';
import SignOut from '../Modal/AuthModal/SignOut';

const NavBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { changeView, isOpen } = useAuthModalStore();
    const [user] = useAuthState(auth);

    const pathname = usePathname();
    const handleChangeView = (view: 'Login' | 'SignUp' | 'ResetPassword') => {
      changeView(view);
      isOpen();
    };
  
    return (
      <div className="p-4 lg:flex  bg-gray-900 text-white sticky top-0 z-50">
        {/* Logo et Bouton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="lg:text-[20px] sm:text-[15px] font-extrabold text-blue-400 drop-shadow-[0_0_15px_rgba(0,192,255,0.8)]">
              DK.com
            </p>
            <Image
              src="/images/logo.png"
              alt="Ball"
              width={30}
              height={30}
              className="ml-2"
            />
          </div>
  
          {/* Bouton de Menu */}
          <button
            className="lg:hidden text-white text-xl"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? "✖" : "☰"}
          </button>
        </div>
  
        {/* Menu Desktop */}
        <div className="hidden lg:flex gap-4 ml-auto items-center">
          {NavLinks.map((item, index) => (
            <Link
              key={index}
              className={`hover:text-blue-400 cursor-pointer font-medium select-none ${
                pathname === item.href ? "text-blue-500 underline select-none" : ""
              }`}
              href={"/admin"}
            >
              {item.link}
            </Link>
          ))}
            {
              user ? (
                <>
                  <SignOut />
                  <Avatar>
                    <AvatarImage src={user?.photoURL as string}alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </>
              ):(
                <>
                  <Button className='mr-1 bg-blue-400 hover:bg-blue-500 hover:brightness-105'  onClick={() => handleChangeView('Login')}>Log In</Button>
                  <Button className='bg-blue-400 hover:bg-blue-500 hover:brightness-105' onClick={() => handleChangeView('SignUp')}>Sign Up</Button>
                </>
              )
            }
        </div>
  
        {/* Menu Déroulant Mobile */}
        {isDropdownOpen && (
          <div
            className="flex flex-col gap-4 mt-4 bg-gray-800 p-4 rounded-md lg:hidden transition-all duration-300"
          >
            {NavLinks.map((item, index) => (
                <Link
                key={index}
                className={`hover:text-blue-400 cursor-pointer font-medium select-none ${
                  pathname === item.href ? "text-blue-500 underline" : ""
                }`}
                href={item.href}
              >
                {item.link}
              </Link>
            ))}
            {
              user ? (
                <>
                <Avatar className="mx-auto cursor-pointer">
                  <AvatarImage src={user?.photoURL as string} alt="Avatar" />
                  <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-gray-600 font-bold text-center text-2xl">{user?.displayName}</p>
                <p className="text-gray-400 font-bold text-center text-sm">{user?.email}</p>
                  <SignOut />

                </>
              ):(
                <>
                  <Button className='mr-1 bg-blue-400 hover:bg-blue-500 hover:brightness-105'  onClick={() => handleChangeView('Login')}>Log In</Button>
                  <Button className='bg-blue-400 hover:bg-blue-500 hover:brightness-105' onClick={() => handleChangeView('SignUp')}>Sign Up</Button>
                </>
              )
            }
     
          </div>
        )}
      </div>
    );
  };



export default NavBar