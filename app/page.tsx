"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState('');

  const getData = async () => {
    const response = await fetch('/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const names = data.values;

    setData(names);

  };

  const onSumbit = () => {
    console.log(subject);
    router.push(`/flashcard?subject=${subject}`);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="flex justify-center items-center gap-5 flex-col">
        <h1 className="text-2xl">Lnwza Flashcard</h1>
        <form className="flex flex-col">
          <select name="subjects" id="subject" onChange={(e) => setSubject(e.target.value)}>
            <option value="" defaultChecked>Select Subject</option>
            {data.map((value) => (
              <option key={value[0]} value={value[0]}>{value[0]}</option>
            ))}
          </select>

        </form>
        <button className="mt-5" onClick={onSumbit} >Select</button>
      </div>
    </>
  )
}
