import {useState, useEffect} from 'react';
const ProjectDetails = ({ register, preview }: {register: any, preview:any} ) => {

    return (
        <>
            <div className="bg-[#FDBBBB] mx-44 my-6 border border-2 rounded-3xl border-[#4A2222]">
                <div className="flex justify-center">
                    <p className="font-bold text-xl mt-4 font-mono ">Project Details</p>
                </div>
              <div className="flex justify-center mt-4">
                <input
                  placeholder="Project Name"
                  type="text"
                  id="projectName"
                  className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"
                  {...register("projectName")}
                />
              </div>

              <div className="mt-4 flex justify-center">
                <textarea
                  placeholder="Description"
                  rows={5}
                  id="description"
                  className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 rounded-xl"
                  {...register("projectDescription")}
                />
              </div>

              <div className="mt-4 mb-4 flex justify-center  ">
                <label
                        htmlFor="file-upload"
                        className="custom-file-upload"
                        style={{ cursor: "pointer" }}
                >
                    <div className='h-40 w-40 my-10'>
                    {preview? <img src={preview} alt="avatar"/> : <img src={'https://s2.loli.net/2022/11/19/qeyLJlnr2xv9mts.png'} alt='default' />}
                    </div>
                <a style={{ cursor: "pointer" }}>
                  
                <p className="text-[#CE8888] px-4 font-bold text-lg border border-black border-2 rounded-3xl bg-[#FAEEE2]">
                    Upload Logo
                </p>
                </a>
                  
                        <input
                        id="file-upload"
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                          {...register("image")}
                        />
                </label>
              </div>


             
            </div>
        
        
        </>
    )
    
}

export default ProjectDetails