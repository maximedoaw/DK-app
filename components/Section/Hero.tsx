"use client"

import Image from 'next/image'
import 'animate.css';
import { useRouter } from 'next/navigation';
import useAuthModalStore from '@/hooks/useAuthModalStore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { Button } from "@/components/ui/button";


export default function Hero() {
      const [user] = useAuthState(auth)
      const { isOpen, changeView } = useAuthModalStore();
      const router = useRouter();
    
      const handleChangeView = (view: 'Login' | 'SignUp' | 'ResetPassword') => {
        changeView(view);
        isOpen();
      };
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Image d'arrière-plan */}
      <Image
        src="/images/stade.jpg"
        alt="Stade de football"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      
      {/* Superposition sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Contenu de la hero section */}
      <div className="relative z-20 text-center text-white px-4 leading-relaxed 
            animate__animated animate__fadeInUp animate__delay-1s">
        <div className=" flex flex-col items-center font-extrabold text-white text-[20px] max-w-2xl mx-auto mt-20 p-4">
        <p className="text-center text-xl md:text-2xl lg:text-3xl leading-relaxed 
            animate__animated animate__fadeInUp animate__delay-1s">
            Bienvenue sur <span className="text-blue-400">DK-Advice-and-Management.com</span>, soyez une star du <span className="text-blue-600">Football</span>
        </p>

      </div>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Nous propulsons les carrières des footballeurs vers de nouveaux sommets avec un management personnalisé et innovant.
        </p>

        <Button variant="secondary" className="mt-4 bg-blue-400 text-white
        w-1/2 mx-auto leading-relaxed 
        animate__animated animate__fadeInUp animate__delay-1s"
        onClick={() => user ? router.push('/admin') : handleChangeView('Login')}
        >Essayer maintenant</Button>
      </div>
    </div>
  )
}

