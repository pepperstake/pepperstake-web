import { useState } from "react";

export default function PepperStake() {
  const [stake, setStake] = useState("");
  return (
    <>
      <form>
        <div className="mx-6 my-4">
          <div className="grid grid-cols-4 gap-4">
            {/* first column */}
            <div className="">
              <input
                onChange={(e) => setStake(e.target.value)}
                placeholder="My Community"
                type="text"
                name="stake"
                id="stake"
                className="block max-w-lg w-full bg-[#FAEEE2] rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* second column */}
            <div>02</div>

            {/* third column */}

            <div>03</div>

            {/* fourth column */}
            <div>04</div>
          </div>
        </div>
      </form>
    </>
  );
}
