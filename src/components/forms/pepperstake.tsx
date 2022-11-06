import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent } from "react";
import React from "react";
import { parseEther } from "ethers/lib/utils";
import { useDeployPepperStake } from "hooks/contract/deployer/useDeployPepperStake";
import { PinMetadataRequestPayload } from "pages/api/pin-metadata";
import axios from "axios";

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

export default function PepperStake() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateProjectFormInputs>({
    defaultValues: {
      supervisors: [""],
      stakeAmount: "0.05",
      unreturnedStakeBeneficiaries: [""],
      returnWindowDays: "30",
      maxParticipants: "100",
      shouldParticipantsShareUnreturnedStake: false,
      shouldUseSupervisorInactionGuard: true,
      projectName: "",
      projectDescription: "",
      image: undefined,
    },
  });

  const supervisors = watch("supervisors");
  const unreturnedStakeBeneficiaries = watch("unreturnedStakeBeneficiaries");
  const [metadataUri, setMetadataUri] = React.useState<string>("");
  const deployData = {
    supervisors: supervisors,
    stakeAmount: parseEther(watch("stakeAmount")),
    unreturnedStakeBeneficiaries: [
      "0x2c8A7A737155e04c9fEc639520ed72626040763B",
    ],
    returnWindowDays: parseInt(watch("returnWindowDays")),
    maxParticipants: parseInt(watch("maxParticipants")),
    shouldParticipantsShareUnreturnedStake: watch(
      "shouldParticipantsShareUnreturnedStake"
    ),
    shouldUseSupervisorInactionGuard: watch("shouldUseSupervisorInactionGuard"),
    metadataUri,
  };

  const { write } = useDeployPepperStake(deployData);

  const addNewElem = (
    event: any,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(formKey, [...formVal, ""]);
  };

  const setElemAtIndex = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    setValue(formKey, [
      ...formVal.slice(0, index),
      event.target.value,
      ...formVal.slice(index + 1),
    ]);
  };

  const removeElemAtIndex = (
    index: number,
    event: any,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(
      formKey,
      formVal.filter((e, i) => i !== index)
    );
  };

  const uploadImage = async () => {
    const data = new FormData();
    const file = getValues("image");
    data.append("file", file[0]);
    const res = await axios.post("/api/pin-image", data, {
      maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    });
    return res.data.cid;
  };

  const uploadMetadata = async (imageCid: string) => {
    const { projectName, projectDescription } = getValues();
    const data: PinMetadataRequestPayload = {
      name: projectName,
      description: projectDescription,
      imageCid,
    };
    const res = await axios.post("/api/pin-metadata", data);
    setMetadataUri(`ipfs://${res.data.cid}`);
  };

  const onSubmit = async () => {
    try {
      const imageCid = await uploadImage();
      await uploadMetadata(imageCid);
      console.log(deployData);
      write?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form>
        <div className="mx-6 my-4">
          <div className="grid grid-cols-4 gap-4">
            {/* 01*/}
            <div>
              <div className="">
                <p className="font-bold text-xs pb-3">Stake Amount</p>
                <input
                  placeholder="0"
                  type="text"
                  id="stake"
                  className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                  {...register("stakeAmount", { required: true })}
                />
              </div>

              <div className="mt-4">
                <p className="font-bold text-xs pb-2">{`Supervisor(s)`}</p>

                <table>
                  <tbody>
                    {supervisors.map((supervisor, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="flex mt-2">
                            <input
                              type="text"
                              name="stake"
                              id="stake"
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

            {/* 02 */}
            <div>
              <div className="">
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-3">
                    {`Return Window Days `}{" "}
                  </p>

                  <div className="flex relative  ml-36 justify-end ">
                    <label
                      htmlFor="checked-toggle"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-xl peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>
                <div className="flex">
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

              <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span>
                    {" "}
                    <img
                      className="h-7 w-7 float-left mr-3"
                      src="https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png"
                    />
                  </span>
                  If you choose not to set a duration for returning the stake,
                  your project might considered riskier to the participants.
                </p>
              </div>

              <div className="mt-4">
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-3">
                    {`Unreturned Stake Beneficiaries `}{" "}
                  </p>

                  <div className="flex relative  ml-20 justify-end ">
                    <label
                      htmlFor="checked-toggle4"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle4"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-xl peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>

                <table>
                  <tbody>
                    {unreturnedStakeBeneficiaries.map((beneficiary, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="flex mt-2">
                            <input
                              type="text"
                              name="stake"
                              id="stake"
                              className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "
                              onChange={(e) =>
                                setElemAtIndex(
                                  idx,
                                  e,
                                  "unreturnedStakeBeneficiaries",
                                  unreturnedStakeBeneficiaries
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
                                    "unreturnedStakeBeneficiaries",
                                    unreturnedStakeBeneficiaries
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
                            addNewElem(
                              e,
                              "unreturnedStakeBeneficiaries",
                              unreturnedStakeBeneficiaries
                            )
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

              <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#BBD8FB] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span>
                    {" "}
                    <img
                      className="h-7 w-7 float-left mr-3"
                      src="https://s2.loli.net/2022/11/05/6JubND7Q3afLn4x.png"
                    />
                  </span>
                  You can enter beneficiaries in for unreturned stake, by defult
                  it’s set to our DAO treasuray.
                </p>
              </div>
            </div>

            {/* 03 */}
            <div>
              <div className="">
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2">
                    {`Participants Share Unreturned Stake?  `}{" "}
                  </p>

                  <div className="flex relative  ml-10 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle2"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle2"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>
                <div className="flex">
                  <select
                    className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                    name="cars"
                    id="cars"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#BBD8FB] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span>
                    {" "}
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
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2">
                    {`Supervisor Inaction Guard? `}{" "}
                  </p>

                  <div className="flex relative  ml-24 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle5"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle5"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <select
                    className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                    name="cars"
                    id="cars"
                  >
                    <option value="false">True</option>
                    <option value="true">False</option>
                  </select>
                </div>

                <div className="mt-4 ">
                  <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                    <span>
                      {" "}
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
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2">
                    {`Max Participants`}{" "}
                  </p>

                  <div className="flex relative  ml-40 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle6"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle6"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex">
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

              <div className="mt-4">
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2 pr-1.5">
                    {`Creator Fee Percentage`}{" "}
                  </p>

                  <div className="flex relative  ml-28 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle8"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle8"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <input
                    // onChange={(e) => setDays(e.target.value)}
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
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2 pr-1.5 ">
                    {`Supervisor Tip Percentage`}{" "}
                  </p>

                  <div className="flex relative  ml-24 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle7"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle7"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <input
                    // onChange={(e) => setDays(e.target.value)}
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
            </div>

            {/* 04 */}
            <div>
              <div className="">
                <div className="flex relative flex-row">
                  <p className="flex relative justify-start font-bold text-xs pb-2">
                    {`Metadata  `}{" "}
                  </p>

                  <div className="flex relative  ml-52 mb-1 justify-end ">
                    <label
                      htmlFor="checked-toggle3"
                      className=" relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="checked-toggle3"
                        className="sr-only peer"
                      />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                  </div>
                </div>
                <input
                  placeholder="Project Name"
                  type="text"
                  id="projectName"
                  className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"
                  {...register("projectName")}
                />
              </div>

              <div className="mt-4">
                <textarea
                  placeholder="Description"
                  rows={5}
                  name="description"
                  id="description"
                  className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"
                  {...register("projectDescription")}
                />
              </div>

              <div className="content-center mt-4 h-48 text-lg font-bold  py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl  border-gray-300">
                <div className="my-16 mx-20 ">
                  <a style={{ cursor: "pointer" }}>
                    <img
                      className=""
                      src="https://s2.loli.net/2022/11/05/Ae5VFnuwxQp8ok1.png"
                    />
                  </a>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    {...register("image")}
                  />
                </div>
              </div>

              <div
                className="absolute w-60 bottom-16 right-14"
                onClick={onSubmit}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src="https://s2.loli.net/2022/11/06/36iXh17WrmDNuJw.png"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
