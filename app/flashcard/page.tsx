'use client'

import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react";
import { Zap, ChevronLeft, ChevronRight, Home } from "lucide-react";

function FlashcardContent() {
    const searchParam = useSearchParams();
    const subjectParam = searchParam.get('subject');
    const [data, setData] = useState([]);
    const [qNumber, setQNumber] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [isFlipping, setIsFlipping] = useState(false);

    const getdata = async function() {
        const formData = new FormData();
        formData.append('subject', subjectParam ?? "none");

        const res = await fetch('/api/flashcard', {
            method: 'POST',
            body: formData,
            cache: 'no-store'
        })

        const data = await res.json();
        return data.values;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getdata();
            setData(result);
            setQNumber(0);
            setDisplayText(result[0][0])
        }

        fetchData();
    }, [])

    function showClicked() {
        setIsFlipping(true);
        setTimeout(() => {
            setShowResult(!showResult)
            if (showResult == false) {
                setDisplayText(data[qNumber][1])
            } else {
                setDisplayText(data[qNumber][0])
            }
            setIsFlipping(false);
        }, 300);
    }

    function nextOrBack(next: boolean) {
        let tempNumber = qNumber;
        if (next == false) {
            if (tempNumber != 0) {
                setQNumber(tempNumber -= 1)
            } else {
                setQNumber(data.length - 1)
            }
        } else {
            if (tempNumber == (data.length - 1)) {
                setQNumber(0)
            } else {
                setQNumber(tempNumber += 1)
            }
        }
        setShowResult(false);
        setDisplayText(next ? 
            (tempNumber == data.length - 1 ? data[0][0] : data[tempNumber + 1][0]) :
            (tempNumber == 0 ? data[data.length - 1][0] : data[tempNumber][0])
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-between items-center px-5 flex-col">
            {/* Animated background grid */}
            <div className="fixed z-[-1] inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            <div className="w-full max-w-2xl px-4 py-8 relative z-10">
                <h1 className="flex justify-center text-3xl font-bold text-cyan-400 mb-8 animate-pulse">
                    <Zap className="mr-2 text-cyan-500" size={32} />
                    <span className="font-mono tracking-wider">{subjectParam}</span>
                    <Zap className="ml-2 text-cyan-500" size={32} />
                </h1>

                {qNumber == -1 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-cyan-400 animate-pulse font-mono">Loading...</div>
                    </div>
                ) : (
                    <div className="w-full">
                        <div 
                            className={`bg-gray-800 p-8 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-500/30 min-h-64 flex items-center justify-center mb-8 transform transition-all duration-300 ${
                                isFlipping ? 'scale-95 opacity-60 rotate-1' : 'scale-100 opacity-100 rotate-0'
                            }`}
                        >
                            <p className="text-xl text-center text-cyan-50 font-mono">{displayText}</p>
                        </div>

                        <div className="flex flex-row justify-center gap-4 mb-8">
                            <button 
                                className="bg-gray-800 hover:bg-gray-700 text-cyan-400 p-3 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-500/30 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                onClick={() => nextOrBack(false)}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            
                            <button 
                                id="showBtn"
                                className="bg-gray-800 hover:bg-gray-700 text-cyan-400 px-6 py-3 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-500/30 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] min-w-24 font-mono"
                                onClick={showClicked}
                            >
                                {showResult ? "HIDE" : "SHOW"}
                            </button>
                            
                            <button 
                                className="bg-gray-800 hover:bg-gray-700 text-cyan-400 p-3 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-500/30 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                onClick={() => nextOrBack(true)}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-gray-800 rounded-full px-4 py-2 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                <span className="text-cyan-400 font-mono">
                                    CARD {qNumber + 1} / {data.length}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <a 
                href="/" 
                className="mb-8 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 px-6 py-3 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-500/30 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] font-mono"
            >
                <Home size={20} />
                MAIN MENU
            </a>
        </div>
    );
}

export default function Flashcard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-900 flex justify-center items-center">
                <div className="text-xl text-cyan-400 animate-pulse font-mono">Loading...</div>
            </div>
        }>
            <FlashcardContent />
        </Suspense>
    );
}