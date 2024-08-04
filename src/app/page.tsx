"use client";
import { PersonalIntroduction } from "@/components/PersonalIntroduction";
import { AuthProvider } from "@/context";
import { StyleProvider } from "@ant-design/cssinjs";
import { useEffect } from "react";

export default function Home() {
  // useWebVital();

  return (
    <StyleProvider hashPriority="high">
      <AuthProvider>
        <main className="flex min-h-screen flex-col items-center justify-between ">
          <PersonalIntroduction></PersonalIntroduction>
        </main>
      </AuthProvider>
    </StyleProvider>
  );
}
