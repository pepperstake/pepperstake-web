import { CreateProjectFormInputs } from "pages/projects/create/CreateProjectPage";
import { UseFormRegister } from "react-hook-form";
const MISC: React.FC<{
  register: UseFormRegister<CreateProjectFormInputs>,
  onSubmit: () => void,
  }>= ({register, onSubmit}) => (

    
        <>
            <div className="bg-[#FDBBBB] mx-44 my-6 border border-2 rounded-3xl border-[#4A2222]">
              <div className="">
                <div className="flex relative justify-center">
                  <p className="flex relative justify-center font-bold text-xl mt-4 font-mono  pb-2">
                    {`Participants Share Unreturned Stake?  `}{" "}
                  </p>

                  
                </div>
                <div className="flex justify-center">
                  <select
                    className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                    id="unreturnedStakeShare"
                    {...register("shouldParticipantsShareUnreturnedStake")}

                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-center ">
                <p className=" font-mono text-[#994B4B] bg-[#BBD8FB] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span>
                    <img
                      className="h-7 w-7 float-left mr-3"
                      src="https://s2.loli.net/2022/11/05/6JubND7Q3afLn4x.png"
                    />
                  </span>
                  if you choose true, unreturned stake beneficiaries will
                  default to participants who completed the task and the stake
                  will be equally divided and distributed to them as well.{" "}
                </p>
              </div>

              <div className="mt-4">
                  <p className="flex justify-center font-bold text-xl mt-4 font-mono  pb-2">
                    {`Supervisor Inaction Guard? `}
                  </p>

                  

                <div className="flex justify-center">
                  <select
                    className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                    id="cars"
                    {...register("shouldUseSupervisorInactionGuard")}

                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="mt-4 flex justify-center">
                  <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full rounded-xl border border-2 border-[#4A2222] ">
                    <span>
                      <img
                        className="h-7 w-7 float-left mr-3"
                        src="https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png"
                      />
                    </span>
                    if you choose false, this project might considered riskier
                    to the participants
                  </p>
                </div>
              </div>

              <div className="mt-4">
                  <p className="flex relative justify-center font-bold text-xl mt-4 font-mono  pb-2">
                    {`Max Participants`}
                  </p>

                

                <div className="flex justify-center">
                  <input
                    placeholder="200"
                    type="text"
                    id="maxParticipants"
                    className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
                    {...register("maxParticipants")}
                  />

                  <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                    people
                  </span>
                </div>
              </div>

              <div className="mt-4 ">
                  <p className="flex relative justify-center font-bold text-xl mt-4 font-mono pb-2 pr-1.5">
                    {`Creator Fee Percentage`}{" "}
                  </p>

                <div className="flex justify-center">
                  <input
                    placeholder="2.5"
                    type="text"
                    name="creatorFee"
                    id="creatorFee"
                    className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
                  />

                  <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                    %
                  </span>
                </div>
              </div>

              <div className="mt-4">
                  <p className="flex relative justify-center font-bold text-xl mt-4 font-mono pb-2 pr-1.5 ">
                    {`Supervisor Tip Percentage`}{" "}
                  </p>

                 

                <div className="flex justify-center mb-4">
                  <input
                    placeholder="2.5"
                    type="text"
                    name="tip"
                    id="tip"
                    className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
                  />

                  <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                    %
                  </span>
                </div>
              </div>

                <div className="flex justify-center mb-4" onClick={onSubmit}>
                    <button className="text-black px-4 font-bold text-lg border border-black border-2 rounded-3xl bg-[#FF8181] ">
                        Create PepperStake
                    </button>
                 </div>
            </div>

        
        </>
   )


export default MISC;