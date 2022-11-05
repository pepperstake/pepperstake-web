import Link from 'next/link'

type Props = {
  children: React.ReactNode;
};
export default function FrontPage({children} : Props){
   
    return <>
 <div className="relative flex flex-col min-h-screen  bg-[#FAEEE1] 
    divide-y-2 divide-[#4A2222] ">

              <nav className="mt-5 mb-5 ml-10 relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href='/'>
                    <a>
                      <span className="sr-only">PepperStake</span>
                      <img className="h-16 w-auto sm:h-16" src="https://s2.loli.net/2022/11/05/vgrkLelaPV3ncuz.png"/>
                    </a>
                    </Link>

                  </div>
                </div>

                <div className="mr-0 items-center flex justify-end sm:flex md:flex md:flex-1 lg:w-0">
              
                
                   <Link href={'/stake'}>
                    <a style={{ cursor: "pointer" }}>
                        <img className='w-3/4' src='https://s2.loli.net/2022/11/05/nOS1Zxv5fDi2tlJ.png' />
                   </a>
                   </Link>

          </div>
              </nav>

            

    <div >
        {children}
        
    </div>
    </div>

    </>

}