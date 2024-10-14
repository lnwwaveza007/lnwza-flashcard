'use client'

import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react";

export default function Flashcard() {
    const searchParam = useSearchParams();
    const subjectParam = searchParam.get('subject');
    const [data, setData] = useState([]);
    const [qNumber, setQNumber] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [displayText, setDisplayText] = useState("");

    const getdata = async function() {
        const formData = new FormData();
        formData.append('subject', subjectParam ?? "none");

        const res = await fetch('/api/flashcard', {
            method: 'POST',
            body: formData
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
    }
    ,[])

    function showClicked() {
        setShowResult(!showResult)
        if (showResult == false) {
            setDisplayText(data[qNumber][1])
            
        }else {
            setDisplayText(data[qNumber][0])
        }
    }

    function nextOrBack(next: boolean) {
        let tempNumber = qNumber;
        // Back
        if (next == false) {
            if (tempNumber != 0) {
                setQNumber(tempNumber-=1)
                setShowResult(false)
                setDisplayText(data[tempNumber][0])
            }else {
                console.log("B")
                setQNumber(data.length - 1)
                setShowResult(false)
                setDisplayText(data[data.length - 1][0])
            }
        }else {
            if (tempNumber == (data.length - 1)) {
                setQNumber(0)
                setShowResult(false)
                setDisplayText(data[0][0])
            }else {
                setQNumber(tempNumber+=1)
                setShowResult(false)
                setDisplayText(data[tempNumber][0])
            }
        }
    }

    return <Suspense fallback={<p>Loading . . .</p>}><>
        <div className="h-screen flex justify-between items-center px-5 flex-col">
            <h1 className="flex justify-center text-3xl pt-5">Flashcard : {subjectParam}</h1>
            <div className="flex justify-between items-center flex-grow text-xl">
            
                { qNumber == -1 ?
                <div>
                    <p>Loading . . .</p>
                </div> 
                :
                <div>
                    <p>{displayText}</p>
                    <div className="flex flex-row justify-center gap-3 mt-10">
                        <button className=" bg-pink-200 text-black p-2 rounded-md" onClick={() => nextOrBack(false)}>Back</button>
                        <button id="showBtn" className=" bg-white text-black p-2 rounded-md" onClick={() => showClicked()}>
                            {showResult ? "Hide" : "Show"}
                        </button>
                        <button className=" bg-pink-200 text-black p-2 rounded-md" onClick={() => nextOrBack(true)}>Next</button>
                    </div>
                </div>
                }
            </div>
            <a href="/" className=" mb-5 text-black bg-white p-2 rounded-md">Go back to main menu</a>
        </div>
    </></Suspense>
}