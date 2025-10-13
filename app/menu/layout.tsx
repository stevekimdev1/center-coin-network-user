import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/css/global.css";
import "@/src/css/page.css";
import ClientLayout from "@/app/clientLayout";
import { UserProvider } from "@/src/context/UserContext";
import React from "react";
import { Nunito_Sans } from 'next/font/google';
import Navbar from '@/src/components/Navbar';
import Top from '@/src/components/Top';
import MiningRewardPopup from '@/src/components/MiningRewardPopup';
const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
                <div className="content-container">
                  <Top />
                  {/* <MiningRewardPopup /> */}
                  <div className="content-page">
                    {children}
                  </div>
                  <Navbar />
                </div>
  );
}