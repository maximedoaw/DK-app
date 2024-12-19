"use client"

import Image from "next/image";
import 'animate.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import useAuthModalStore from "@/hooks/useAuthModalStore";
import { useRouter } from "next/navigation";
import Hero from "@/components/Section/Hero";
import Services from "@/components/Section/Services";
import Testimonial from "@/components/Section/Testimonial";
import FAQ from "@/components/Section/FAQ";
import ContactUs from "@/components/Section/ContactUs";


export default function Home() {

  return (
    <>
      <Hero />
      <Services />
      <Testimonial />
      <FAQ />
      <ContactUs />
    </>
  );
}
