import { useEffect, useState } from "react";
import React from 'react'
import Select from 'react-select'

export default function PepperStake() {
    const [stake, setStake] = useState('');
    const [days, setDays] = useState('');
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      
    //insert new input field 
    const [supervisorList, setSupervisorList] = useState<string[]>(['0x424242424242']);
    // handle input change
    const handleChange = (idx:number) => (e:any) => {
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
                    type="text" name="stake" id="stake" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-lg focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-md"/>
            </div>
            
            <div className="mt-4">
            <p className="font-bold text-xs pb-2">{`Supervisor(s)`}</p> 

            <table>
            <tbody>
                {supervisorList.map(supervisor => (
                <tr>
                    <td>
                    <input 
                    placeholder={supervisor}
                    onChange={handleChange(supervisorList.indexOf(supervisor))}
                    type="text" name="stake" id="stake" 
                    className="mt-2 text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-lg focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-md"/>
                    </td>
                    <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={RemoveSpecificSupervisor(supervisorList.indexOf(supervisor))}
                        >
                          <img className='h-10 w-10 mx-2 mt-4' src='https://s2.loli.net/2022/11/05/K97QFX5nyMfuYCN.png' />
                        </button>
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
                        <div className="  border border-2 border-[#4A2222] w-11 h-6 bg-[#E9DDD1] rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full peer-checked:after:border-[#4A2222] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-[#4A2222] after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#CE8888]"></div>
                        </label>
                    </div>
                </div>
                <div className="flex">

                <input 
                    onChange={(e) => setDays(e.target.value)} 
                    placeholder="30"
                    type="text" name="days" id="days" className="flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-l-md focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 "/>
                

                <span className="font-bold text-[#4A2222] inline-flex items-center px-3 text-lg  bg-[#FAEEE2] rounded-r-md border border-l-0  ">
                    days
                </span>
                </div>
            </div>

            
        </div>

        {/* 03 */}

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

            <select className="appearance-none flex text-[#4A2222] text-lg font-bold placeholder:text-[#4A2222] border-r-0 placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-md focus:ring-indigo-500 focus:border-indigo-500  border-gray-300" name="cars" id="cars">
                <option value="false">False</option>
                <option value="true">True</option>
            </select>
      
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
                    onChange={(e) => setStake(e.target.value)} 
                    placeholder="Project Name"
                    type="text" name="stake" id="stake" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-lg focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-md"/>
            </div>
            <div className="mt-4">
                <textarea
                    onChange={(e) => setStake(e.target.value)} 
                    placeholder="Description"
                    rows={5} name="stake" id="stake" className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-lg focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-md"/>

                </div>
             </div>
         
        </div>
        </div>
        
        </form>
        </>
    );
}