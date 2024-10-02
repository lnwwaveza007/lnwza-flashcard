'use client'

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react";

export default function Flashcard() {
    const searchParam = useSearchParams();
    const subjectParam = searchParam.get('subject');
    const [data, setData] = useState([]);
    const [qNumber, setQNumber] = useState(-1);

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
        }

        fetchData();
    }
    ,[])

    return <>
        <div className="h-screen flex items-center px-5 flex-col">
            <h1 className="flex justify-center text-3xl pt-5">Flashcard : {subjectParam}</h1>
            <div className="flex justify-center items-center flex-grow text-xl">
            
                { qNumber == -1 ?
                <div>
                    <p>Loading . . .</p>
                </div> 
                :
                <div>
                    <p>{data[qNumber]}</p>
                </div>
                }
            </div>
        </div>
    </>
}