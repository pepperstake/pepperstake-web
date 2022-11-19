
export default function StakeAmount({ register }: {register: any}) {
    return (
        <>
            <div className="bg-[#FDBBBB] mx-44 my-6 border border-2 rounded-3xl border-[#4A2222]">
  
                <div className="flex justify-center">
                    <p className="font-bold text-xl mt-4 font-mono ">Stake Amount</p>
                </div>
                <div>
                <div className="flex justify-center pt-2 pb-4">

                    <input
                    placeholder="0"
                    type="text"
                    id="stake"
                    className="text-[#4A2222] text-lg font-bold placeholder:text-[#CE8888] placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-[#FAEEE2] rounded-xl focus:ring-indigo-500 focus:border-indigo-500  border-gray-300"
                      {...register("stakeAmount", { required: true })}
                    />
                </div>
              </div>
            </div>

        
        </>
    )
}