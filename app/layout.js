import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from 'next/font/google' 
import { Montserrat } from "next/font/google";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { SymptomInputProvider } from "./_context/SymptomInputContext";




export const metadata = {
  title: "AI Healthcare"
};

const outfit = Montserrat({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
   
      <body
        className={outfit.className}
      >
        <SymptomInputProvider>
      
          {children}
        
        </SymptomInputProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
