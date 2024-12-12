"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import 'animate.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { useRouter } from "next/navigation";


export default function Home() {

  const [user] = useAuthState(auth)
  const { isOpen, changeView } = useAuthModalStore();
  const router = useRouter();

  const handleChangeView = (view: 'Login' | 'SignUp' | 'ResetPassword') => {
    changeView(view);
    isOpen();
  };

  return (
    <div className="flex flex-col lg:flex-row justify-end items-center  mt-10">
      <Image
        src="/images/player.png"
        alt="Messi"
        width={450}
        height={450}
        className="rounded-full drop-shadow-[0_0_15px_rgba(0,192,255,0.8)] leading-relaxed 
        animate__animated animate__fadeInUp animate__delay-1s"
      />

    <div className=" flex flex-col items-center font-extrabold text-white text-[20px] max-w-2xl mx-auto mt-20 p-4">
      <p className="text-center text-xl md:text-2xl lg:text-3xl leading-relaxed 
        animate__animated animate__fadeInUp animate__delay-1s">
        Bienvenue sur <span className="text-blue-400">DK.com</span>, soyez une star du <span className="text-blue-600">Football</span>
      </p>
      <Button variant="secondary" className="mt-4 bg-blue-400 text-white
        w-1/2 mx-auto leading-relaxed 
        animate__animated animate__fadeInUp animate__delay-1s"
        onClick={() => user ? router.push('/admin') : handleChangeView('Login')}
        >Essayer maintenant</Button>
    </div>

  </div>


  );
}
