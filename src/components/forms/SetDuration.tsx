import { CreateProjectFormInputs } from "pages/projects/create/CreateProjectPage";
import { UseFormRegister } from "react-hook-form";

export default function SetDuration({register}: {register: UseFormRegister<CreateProjectFormInputs>}) {
    return (
        <>
            <div className="bg-[#FDBBBB] mx-44 my-6 border border-2 rounded-3xl border-[#4A2222]">

                <div className="flex justify-center">
                    <p className="font-bold text-xl mt-4 font-mono ">Return Window Days</p>
                </div>
                <div className="mt-4 mb-4 flex justify-center">
                <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full  rounded-xl border border-2 border-[#4A2222] ">
                  <span>
                    <img
                      className="h-7 w-7 float-left mr-3"
                      src="https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png"
                    />
                  </span>
                  If you choose not to set a duration for returning the stake,
                  your project might considered riskier to the participants.
                </p>
              </div>
                <div className="flex justify-center pt-2 pb-4">
                  <input
                    placeholder="30"
                    type="text"
                    id="days"
                    className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
                    {...register("returnWindowDays", { required: true })}
                  />

                  <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                    days
                  </span>
                </div>
                
                </div>


        
        </>
    )
}