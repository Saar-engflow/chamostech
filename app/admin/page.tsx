"use client";
import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";

export default function AdminPage() {
  return (
    <main className="relative w-screen h-screen bg-[#0F172A]">
      <SmokeyBackground 
        className="absolute inset-0" 
        backdropBlurAmount="xl"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <LoginForm />
      </div>
    </main>
  );
}
