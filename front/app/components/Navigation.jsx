"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { CircleUserRound } from "lucide-react";

export default function Header() {
  const logState = useContext(AuthContext);
  return (
    <header className="sticky top-0 flex justify-between px-[16px] border-1 border-[#302F3F] py-[16px] ">
      <Link
        href="/"
        className="bg-gradient-to-r from-[#F07E7F] to-[#B4499D] bg-clip-text text-transparent font-bold text-xl"
      >
        .Blog
      </Link>
      <div>
        {!logState.isLogIn && (
          <Link
            href="/login"
            className="px-3 bg-gray-600 rounded-full p-2 font-bold text-l hover:bg-gradient-to-r hover:from-[#F07E7F] hover:to-[#B4499D] transition-colors duration-300"
          >
            Log in
          </Link>
        )}
        {logState.isLogIn && (
          <Link href="/profile">
            <CircleUserRound size={36} color="#F07E7F" strokeWidth={1.75} />
          </Link>
        )}
      </div>
    </header>
  );
}
