'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [notLogined, setLogined] = useState(true) 
  function navHandler(){
    setLogined(s => !s);
  }
  return (
    <header className="sticky top-0 flex justify-between px-[16px] border-1 border-[#302F3F] py-[16px] ">
      <Link
        href="/"
        className="bg-gradient-to-r from-[#F07E7F] to-[#B4499D] bg-clip-text text-transparent font-bold text-xl"
      >
        .Blog
      </Link>
      <div>
        {notLogined && <Link
          href="/login"
          className="px-3 bg-gray-600 rounded-full p-2 font-bold text-l hover:bg-gradient-to-r hover:from-[#F07E7F] hover:to-[#B4499D] transition-colors duration-300"
        >
          Log in
        </Link>}
      </div>
    </header>
  );
}
