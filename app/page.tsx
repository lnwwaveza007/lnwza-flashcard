"use client";

import FlashcardSelect from "@/components/flashcard_select";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Cpu, Database, Loader2 } from "lucide-react";

function HomeContent() {
  const router = useRouter();
  const show = useSearchParams().get("show");
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(`/api/?_=${new Date().getTime()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-cache'
    });
    const data = await response.json();

    setData(data);
  };

  const onSubmit = (subject: string) => {
    router.push(`/flashcard?subject=${subject}`);
  }

  const showModal = () => {
    router.push(`/?show=true`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Glowing orbs in background */}
      <div className="fixed top-1/4 -left-20 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="fixed bottom-1/4 -right-20 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10 flex h-screen justify-center items-center gap-5 flex-col px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-cyan-400 font-mono tracking-wider">
              LNWZA FLASHCARD
            </h1>
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-cyan-500/70 font-mono">Create for me. using by me!</p>
        </div>

        {data.length !== 0 ? (
          <button
            className="mt-5 bg-gray-800 text-cyan-400 rounded-lg px-6 py-3 font-mono
                     border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]
                     hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]
                     transition-all duration-300 hover:scale-105
                     flex items-center gap-2"
            onClick={showModal}
          >
            <Database className="w-4 h-4" />
            ACCESS DATABASE
          </button>
        ) : (
          <div className="flex items-center gap-2 text-cyan-400 font-mono">
            <Loader2 className="w-5 h-5 animate-spin" />
            INITIALIZING...
          </div>
        )}
      </div>
      
      {show && <FlashcardSelect data={data} sumbitFunc={onSubmit} />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="flex items-center gap-2 text-cyan-400 font-mono">
          <Loader2 className="w-5 h-5 animate-spin" />
          INITIALIZING SYSTEM...
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}