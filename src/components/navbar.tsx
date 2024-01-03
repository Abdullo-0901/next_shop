import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center md:px-12 h-[90px] justify-between fixed top-0 w-full z-50 shadow bg-[#ffff]">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={150} height={140} />
      </Link>
      <div className="flex items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Home page
          </Link>
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            All productsk
          </Link>
        </nav>
        <div className="flex items-center space-x-2.5 text-sm ">
          <button className="button bg-blue-600 text-white border border-transparent  hover:border-blue-600 hover:bg-transparent hover:text-black">
            Log in
          </button>
          <button className="button bg-transparent   border-blue-600  hover:border-transparent  hover:bg-blue-600  hover:text-white ">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
