import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center md:px-12 h-[90px] justify-between fixed top-0 w-full z-50 shadow bg-[#ffff]">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={150} height={140} />
        <h1 className="text-red-400">hhh</h1>
      </Link>
      <div className="flex items-center space-x-2.5 text-sm ">
        <button className="button bg-blue-600 text-white border border-transparent  hover:border-blue-600 hover:bg-transparent hover:text-black">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
