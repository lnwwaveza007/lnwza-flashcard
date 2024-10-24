import Link from "next/link";

interface flashcard_select_props {
    data: Array<string>;
    sumbitFunc: (subject: string) => void;
}
export const dynamic = 'force-dynamic';
export default function flashcard_select(props: flashcard_select_props) {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Select the subject</h3>
          <div className="mt-2 px-7 py-3 flex flex-col gap-2 overflow-y-scroll h-50">
            {props.data.map(e => 
                <button onClick={() => props.sumbitFunc(e)} className="text-black rounded-sm p-1 bg-pink-200" key={e}>{e}</button>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Link
              href="/"
              className="px-4 py-2 bg-black text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
