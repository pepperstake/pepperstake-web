import SummaryStats from "components/SummaryStats";
import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <>
    <div className="flex">
      <div className=" absolute w-3/4"></div>
      <SummaryStats />
      <div className=" absolute right-[38rem] top-[36rem]">
        <Link href={"/projects/create"}>
          <a style={{ cursor: "pointer" }}>
            <img
              className="pl-4 h-14"
              src="https://s2.loli.net/2022/11/06/ABJ1q8CbnK4TEdG.png"
            />
          </a>
        </Link>
      </div>
      <div className=" absolute right-[26rem] top-[36rem]">
        <Link href={"/projects"}>
          <a style={{ cursor: "pointer" }}>
            <img
              className="pl-4 h-14"
              src="https://s2.loli.net/2022/11/06/UluWRnCcYrgENO1.png"
            />
          </a>
        </Link>
      </div>

  

    </div>
        <img src="https://s2.loli.net/2022/11/06/INauPdXBgLEJ1iw.png" />
        <img src="https://s2.loli.net/2022/11/06/u3OAtkxsh2YNgpo.png" />
        <img src="https://s2.loli.net/2022/11/06/cFYWaiv6lyMoTrz.png" />
        <img src="https://s2.loli.net/2022/11/06/D7PNMiLdhHwsB8x.png" />
        {/* <img src="https://s2.loli.net/2022/11/06/ho13NKupa76Jn59.png" /> */}

        </>
  );
};

export default Home;
