import {useEffect, useState} from 'react';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const data = [
        {address: '0x1234', message: 'Give me mai money baku!'},
        {address: '0x1234', message: 'Just want to say hi!'},
        {address: '0x1234', message: 'When moon?'},
    ];
    useEffect(() => {
        console.log("hey");
    }, [isOpen]);
    
    return <>
    <div className="mr-4">
     <img className="h-10" onClick={()=>setIsOpen(!isOpen)} style={{ cursor: "pointer" }} src="https://s2.loli.net/2022/11/06/Xj5N8JQ7AImOtgh.png"/>
     {isOpen &&
     <>
     <div className='mt-2 h-96 w-60 absolute bg-[#E9DDD1] border border-2 border-black rounded-xl'>
        {isOpen && 
            data.map((d:any) => (
                <>
                    <div className=' mx-2 my-2 border border-2 border-black rounded-xl bg-[#FDBBBB]'>
                        <div className='mx-2 my-2'>
                        <p>{d.address}</p>
                        <p>{d.message}</p>
                        </div>
                    </div>

                </>

            ))
        }
     </div>
     </>
     }
     </div>
    </>
}