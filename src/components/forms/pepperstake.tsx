import { useEffect, useState } from "react";
import React from 'react'
import Link from "next/link";
export default function PepperStake() {
    const [stake, setStake] = useState('');
    const [days, setDays] = useState('');
    const [shareUnreturned, setShareUnreturned] = useState(false);
    const [inactionGuard, setInactionGuard] = useState(true);
    const [maxParticipants, setMaxParticipants] = useState(200);
    const [projectName, setProjectName] = useState('');
    const [Description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const changeShareUnreturned = (e:any) => {
        setShareUnreturned(e.target.value);
    }

    useEffect(() => {
      // console.log("sharUnreturned",shareUnreturned);
    }, [shareUnreturned]);



    const changeInactionGuard = (e:any) => {
      setInactionGuard(e.target.value);
  }

  useEffect(() => {
    // console.log("sharUnreturned",shareUnreturned);
  }, [inactionGuard]);



    // Supervisor List
    const [supervisorList, setSupervisorList] = useState<string[]>(['0x424242424242']);
    const handleSupervisorChange = (idx:number) => (e:any) => {
        e.preventDefault();
        const { value } = e.target; // value is address 
        const supervisors:string[] = [...supervisorList];
        supervisors[idx] = value;
        setSupervisorList(supervisors);
      };
    const addSupervisor = (e:any) => {
        e.preventDefault();
        setSupervisorList([...supervisorList, '0x424242424242']);
  
    };
    const RemoveSpecificSupervisor = ( idx:number) => (e:any) => {
        e.preventDefault();
        const supervisors = [...supervisorList]
        supervisors.splice(idx, 1)
        setSupervisorList(supervisors)
      }

    useEffect(() => {
        // console.log(supervisorList);
    }, [supervisorList]);


    // Beneficiary List
    const [beneficiaryList, setBeneficiaryList] = useState<string[]>(['pepperstake.eth']);

    const handleBeneficiaryChange = (idx:number) => (e:any) => {
      e.preventDefault();
      const { value } = e.target; // value is address 
      const beneficiarys:string[] = [...beneficiaryList];
      beneficiarys[idx] = value;
      setBeneficiaryList(beneficiarys);
    };
  const addBeneficiary = (e:any) => {
      e.preventDefault();
      setBeneficiaryList([...beneficiaryList, '0x424242424242']);

  };
  const RemoveSpecificBeneficiary = ( idx:number) => (e:any) => {
      e.preventDefault();
      const beneficiarys = [...beneficiaryList]
      beneficiarys.splice(idx, 1)
      setBeneficiaryList(beneficiarys)
    }

  useEffect(() => {
      // console.log(beneficiaryList);
  }, [beneficiaryList]);

  const uploadImage = (e:any) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  }
    
    return (
        <>
        <form>
        <div className='mx-6 my-4'>
        <div className="grid grid-cols-4 gap-4">

        {/* 01*/}
        <div>
            <div className="">
                <p className="font-bold text-xs pb-3">Stake Amount</p>
                    <input 
                    onChange={(e) => setStake(e.target.value)} 
                    placeholder="0"
                    type="text" name="stake" id="stake" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"/>
            </div>
            
            <div className="mt-4">
            <p className="font-bold text-xs pb-2">{`Supervisor(s)`}</p> 

            <table>
            <tbody>
                {supervisorList.map(supervisor => (
                <tr>
                    <td>
                    <div className="flex mt-2">

                        <input 
                        placeholder={supervisor}
                        onChange={handleSupervisorChange(supervisorList.indexOf(supervisor))}
                        type="text" name="stake" id="stake" 
                        className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>
                        
                        <span className="font-bold text-[#4A2222] inline-flex items-center text-lg  bg-[#FAEEE2] rounded-r-xl border-l-0  ">
                            <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={RemoveSpecificSupervisor(supervisorList.indexOf(supervisor))}
                            >
                            <img className='h-10 w-10 mx-4 mr-8 my-2' src='https://s2.loli.net/2022/11/05/K97QFX5nyMfuYCN.png' />
                            </button>
                        </span>
                    </div>
                    </td>
                    
                </tr>
                ))}
                <tr>
                <td className="" >
                    <button onClick={addSupervisor}>
                    <img  className='h-10 w-10 mt-4' src='https://s2.loli.net/2022/11/05/2VLlNJo64cSwzpu.png' /> 
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
                
                    <p className="flex relative justify-start font-bold text-xs pb-3">{`Return Window Days `} </p>
            
                    <div className="flex relative  ml-36 justify-end ">
                        <label htmlFor="checked-toggle" className=" relative cursor-pointer">
                        <input type="checkbox" value="" id="checked-toggle" className="sr-only peer"  />
                        <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-xl peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                        </label>
                    </div>
                </div>
                <div className="flex">

                <input 
                    onChange={(e) => setDays(e.target.value)} 
                    placeholder="30"
                    type="text" name="days" id="days" className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>
                

                <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                    days
                </span>
                </div>
            </div>

            <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span> <img className='h-7 w-7 float-left mr-3' src='https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png' /></span>
                If you choose not to set a duration for returning the stake, your project might considered riskier to the participants.                
                
                </p>
            </div>

            <div className="mt-4">
              <div className="flex relative flex-row">
                  
                  <p className="flex relative justify-start font-bold text-xs pb-3">{`Unreturned Stake Beneficiaries `} </p>
          
                  <div className="flex relative  ml-20 justify-end ">
                      <label htmlFor="checked-toggle4" className=" relative cursor-pointer">
                      <input type="checkbox" value="" id="checked-toggle4" className="sr-only peer"  />
                      <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-xl peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                      </label>
                  </div>
              </div>                   

              <table>
            <tbody>
                {beneficiaryList.map(beneficiary => (
                <tr>
                    <td>
                    <div className="flex mt-2">

                        <input 
                        placeholder={beneficiary}
                        onChange={handleBeneficiaryChange(beneficiaryList.indexOf(beneficiary))}
                        type="text" name="stake" id="stake" 
                        className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>
                        
                        <span className="font-bold text-[#4A2222] inline-flex items-center text-lg  bg-[#FAEEE2] rounded-r-xl border-l-0  ">
                            <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={RemoveSpecificBeneficiary(beneficiaryList.indexOf(beneficiary))}
                            >
                            <img className='h-10 w-10 mx-4 mr-8 my-2' src='https://s2.loli.net/2022/11/05/K97QFX5nyMfuYCN.png' />
                            </button>
                        </span>
                    </div>
                    </td>
                    
                </tr>
                ))}
                <tr>
                <td className="" >
                    <button onClick={addBeneficiary}>
                    <img  className='h-10 w-10 mt-4' src='https://s2.loli.net/2022/11/05/2VLlNJo64cSwzpu.png' /> 
                    </button>
                </td>
          
                </tr>
            </tbody>
            </table>
            </div>
            
            <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#BBD8FB] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span> <img className='h-7 w-7 float-left mr-3' src='https://s2.loli.net/2022/11/05/6JubND7Q3afLn4x.png' /></span>
                  You can enter beneficiaries in for unreturned stake, by defult it’s set to our DAO treasuray.                
                </p>
            </div>

        </div>

        {/* 03 */}
        <div>
        <div className="">
            <div className="flex relative flex-row">
            
                <p className="flex relative justify-start font-bold text-xs pb-2">{`Participants Share Unreturned Stake?  `} </p>
           
                <div className="flex relative  ml-10 mb-1 justify-end ">
                    <label htmlFor="checked-toggle2" className=" relative cursor-pointer">
                    <input type="checkbox" value="" id="checked-toggle2" className="sr-only peer"  />
                    <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                </div>
             </div>
             <div className="flex">

              <select onChange={changeShareUnreturned} className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300" name="cars" id="cars">
                  <option value="false">False</option>
                  <option value="true">True</option>
              </select>
      
            </div>
        </div>

        <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#BBD8FB] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span> <img className='h-7 w-7 float-left mr-3' src='https://s2.loli.net/2022/11/05/6JubND7Q3afLn4x.png' /></span>
                  if you choose true, unreturned stake beneficiaries will default to participants who completed the task and the stake will be equally divided and distributed to them as well.                </p>
        </div>

        <div className="mt-4">
            <div className="flex relative flex-row">
            
                <p className="flex relative justify-start font-bold text-xs pb-2">{`Supervisor Inaction Guard? `} </p>
           
                <div className="flex relative  ml-24 mb-1 justify-end ">
                    <label htmlFor="checked-toggle5" className=" relative cursor-pointer">
                    <input type="checkbox" value="" id="checked-toggle5" className="sr-only peer"  />
                    <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                </div>
             </div>

             <div className="flex">

              <select onChange={changeInactionGuard}  className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300" name="cars" id="cars">
                  <option value="false">True</option>
                  <option value="true">False</option>
              </select>
      
            </div>

            <div className="mt-4 ">
                <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl border border-2 border-[#4A2222] ">
                  <span> <img className='h-7 w-7 float-left mr-3' src='https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png' /></span>
                    if you choose false, this project might considered riskier to the participants                
                </p>
            </div>
        </div>


        <div className="mt-4">
            <div className="flex relative flex-row">
            
                <p className="flex relative justify-start font-bold text-xs pb-2">{`Max Participants`} </p>
           
                <div className="flex relative  ml-40 mb-1 justify-end ">
                    <label htmlFor="checked-toggle6" className=" relative cursor-pointer">
                    <input type="checkbox" value="" id="checked-toggle6" className="sr-only peer"  />
                    <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                </div>
            </div>

            <div className="flex">
              <input 
                  onChange={(e) => setMaxParticipants(e.target.valueAsNumber)} 
                  placeholder="200"
                  type="text" name="maxParticipants" id="maxParticipants" className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>


              <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                  people
              </span>
            </div>
        </div>

        <div className="mt-4">
            <div className="flex relative flex-row">
            
                <p className="flex relative justify-start font-bold text-xs pb-2 pr-1.5">{`Creator Fee Percentage`} </p>
           
                <div className="flex relative  ml-28 mb-1 justify-end ">
                    <label htmlFor="checked-toggle8" className=" relative cursor-pointer">
                    <input type="checkbox" value="" id="checked-toggle8" className="sr-only peer"  />
                    <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                </div>
            </div>

            <div className="flex">
              <input 
                  // onChange={(e) => setDays(e.target.value)} 
                  placeholder="2.5"
                  type="text" name="creatorFee" id="creatorFee" className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>


              <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-xl border border-l-0  ">
                  %
              </span>
            </div>
        </div>

        <div className="mt-4">
            <div className="flex relative flex-row">
            
                <p className="flex relative justify-start font-bold text-xs pb-2 pr-1.5 ">{`Supervisor Tip Percentage`} </p>
           
                <div className="flex relative  ml-24 mb-1 justify-end ">
                    <label htmlFor="checked-toggle7" className=" relative cursor-pointer">
                    <input type="checkbox" value="" id="checked-toggle7" className="sr-only peer"  />
                    <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                    </label>
                </div>
            </div>

            <div className="flex">
              <input 
                  // onChange={(e) => setDays(e.target.value)} 
                  placeholder="2.5"
                  type="text" name="tip" id="tip" className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>


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
                    
                    <p className="flex relative justify-start font-bold text-xs pb-2">{`Metadata  `} </p>
            
                    <div className="flex relative  ml-52 mb-1 justify-end ">
                        <label htmlFor="checked-toggle3" className=" relative cursor-pointer">
                        <input type="checkbox" value="" id="checked-toggle3" className="sr-only peer"  />
                        <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                        </label>
                    </div>
                </div>
                <input 
                    onChange={(e) => setProjectName(e.target.value)} 
                    placeholder="Project Name"
                    type="text" name="projectName" id="projectName" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"/>
            </div>

            <div className="mt-4">
                <textarea
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description"
                    rows={5} name="description" id="description" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"/>
            </div>

            <div className="content-center mt-4 h-48 text-lg font-bold  py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl  border-gray-300">
                  <div  className="my-16 mx-20 ">
                  <a style={{ cursor: "pointer" }}>

                    <img className='' src='https://s2.loli.net/2022/11/05/Ae5VFnuwxQp8ok1.png' />
                    
                    </a>
                    {/* <input id="file-upload" type="file" onChange={uploadImage} accept="image/x-png,image/gif,image/jpeg"/> */}


                  </div>
            </div>

            <div className="absolute w-60 bottom-16 right-14">
              <Link href={"/projects/1"}>
                  <img style={{ cursor: "pointer" }} src='https://s2.loli.net/2022/11/06/36iXh17WrmDNuJw.png' /> 
              </Link>

            </div>




             </div>
         
        </div>
        </div>
        
        </form>
        </>
    );
}