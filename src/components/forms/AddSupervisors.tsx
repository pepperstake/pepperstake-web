import { ChangeEvent, useEffect, useState } from "react";

interface CreateProjectFormInputs {
    supervisors: string[];
    stakeAmount: string;
    unreturnedStakeBeneficiaries: string[];
    returnWindowDays: string;
    maxParticipants: string;
    shouldParticipantsShareUnreturnedStake: boolean;
    shouldUseSupervisorInactionGuard: boolean;
    projectName: string;
    projectDescription: string;
    image: any;
  }

const AddSupervisors: React.FC<{
    supervisors:string[], 
    setElemAtIndex: (index: number, event: ChangeEvent<HTMLInputElement>,formKey: keyof CreateProjectFormInputs,formVal: string[] ) => void,
    removeElemAtIndex: (index: number, event: any, formKey: keyof CreateProjectFormInputs, formVal: string[]) => void,
    addNewElem: (event: any, formKey: keyof CreateProjectFormInputs,formVal: string[]) => void
    }>= ({supervisors, setElemAtIndex, removeElemAtIndex, addNewElem}) => (

<>
<div className="bg-[#FDBBBB] mx-44 my-6 border border-2 rounded-3xl border-[#4A2222]">

<div className="mt-4">
<p className="font-bold text-xl mt-4 font-mono flex justify-center">{`Supervisor(s)`}</p>

<table className=" flex justify-center">
  <tbody>
    {supervisors.map((supervisor, idx) => (
      <tr key={idx}>
        <td>
          <div className="flex mt-2">
            <input
              type="text"
              name="stake"
              id="stake"
              value={supervisor}
              className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
              onChange={(e) =>
                setElemAtIndex(
                  idx,
                  e,
                  "supervisors",
                  supervisors
                )
              }
            />

            <span className="font-bold text-[#4A2222] inline-flex items-center text-lg  bg-[#FAEEE2] rounded-r-xl border-l-0  ">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={(e) =>
                  removeElemAtIndex(
                    idx,
                    e,
                    "supervisors",
                    supervisors
                  )
                }
              >
                <img
                  className="h-10 w-10 mx-4 mr-8 my-2"
                  src="https://s2.loli.net/2022/11/05/K97QFX5nyMfuYCN.png"
                />
              </button>
            </span>
          </div>
        </td>
      </tr>
    ))}
    <tr>
      <td className="">
        <button
          onClick={(e) =>
            addNewElem(e, "supervisors", supervisors)
          }
        >
          <img
            className="h-10 w-10 mt-4"
            src="https://s2.loli.net/2022/11/05/2VLlNJo64cSwzpu.png"
          />
        </button>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div>
</>

)
export default AddSupervisors