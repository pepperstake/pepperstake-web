import { useSponsor } from "hooks/contract/useSponsor";
import React from "react";

const SponsorSectionContent = () => {
  const [sponsorReward, setSponsorReward] = React.useState("");
  // const { write } = useSponsor();

  const handleSponsor = () => {};
  return (
    <>
      <div className="flex pr-10">
        <img
          className="mx-10 my-20 w-48"
          src="https://s2.loli.net/2022/11/06/SOy7rixhpgqWkML.png"
        />
        <div className=" mx-5 mt-20">
          <p className=" font-mono font-bold text-black">
            ADD REWARD TO PEOPLE WHO COMPLETED THE TASK
          </p>
          <div className="flex">
            <input
              onChange={(e) => setSponsorReward(e.target.value)}
              placeholder="0.5"
              className="pl-4 text-lg font-mono font-bold  placeholder:text-lg  placeholder:font-mono placeholder:text-[#3081FB] placeholder:font-bold w-3/4 bg-[#BBD8FB] h-16 mt-2 rounded-xl"
            ></input>
            <div className="w-1/4 ml-2 mt-5">
              <img
                style={{ cursor: "pointer" }}
                onClick={handleSponsor}
                src="https://s2.loli.net/2022/11/06/eMs6RuL7VN4821w.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorSectionContent;
