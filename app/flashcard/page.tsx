'use client'

import { useSearchParams } from "next/navigation"


export default function Flashcard() {
    const searchParam = useSearchParams();
    const subject = searchParam.get('subject');

    const getdata = async function() {
        const res = await fetch('/api/flashcard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        console.log(data);
    }

    return <>
        <h1>Flashcard : {subject}</h1>
        <button onClick={getdata}>Get Data</button>
    </>
}