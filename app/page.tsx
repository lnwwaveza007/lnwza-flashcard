"use client";

import FlashcardSelect from "@/components/flashcard_select";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HomeCotent() {
  const router = useRouter();
  const show = useSearchParams().get("show");
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/api/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setData(data);
  };

  const onSumbit = (subject: string) => {
    router.push(`/flashcard?subject=${subject}`);
  }

  const showModal = () => {
    //
    router.push(`/?show=true`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (<>      
      <div className="flex h-screen justify-center items-center gap-5 flex-col">
        <h1 className="text-2xl">Lnwza Flashcard</h1>
        {/* <form className="flex flex-col">
          <select name="subjects" id="subject" onChange={(e) => setSubject(e.target.value)}>
            <option value="" defaultChecked>Select Subject</option>
            {data.map((value) => (
              <option key={value[0]} value={value[0]}>{value[0]}</option>
            ))}
          </select>

        </form> */}
        {data.length != 0 ? (
          <button
            className="mt-5 bg-white rounded-md p-2 text-black"
            onClick={showModal}
          >
            Select
          </button>
        ) : (
          <p>Loading . . .</p>
        )}
      </div>
      
      {show && <FlashcardSelect data={data} sumbitFunc={onSumbit} />}
      
      </>
  );
}

export default function Home() {
  return (<Suspense fallback={<p>Loading . . .</p>}>
      <HomeCotent />
  </Suspense>)
}
