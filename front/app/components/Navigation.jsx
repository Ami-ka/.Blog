"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { Menu } from "lucide-react";

export default function Header() {
  const logState = useContext(AuthContext);

  return (
    <header className="bg-[var(--background)] sticky top-0 flex justify-between items-center px-[16px] border-1 border-[#302F3F] py-[12px] ">
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
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <div className="rounded-[8px] m-0 p-0.5 hover:bg-gradient-to-r hover:from-[var(--fiolet)] hover:to-[var(--orange)] transition-colors duration-300">
                  <Menu size={32} strokeWidth={2.5} />
                </div>
              </MenubarTrigger>
              <MenubarContent className="bg-[#302F3F] rounded-[8px] text-center  py-4 bg-[#302F3F] rounded-[8px] text-center text-base p-2  mr-2 mt-2">
                <Link href="/profile" className="">
                  <MenubarItem className="w-20 hover:bg-[#403E55] py-1 rounded-[8px]">
                    Profile
                  </MenubarItem>
                </Link>
                <MenubarSeparator className="h-2"></MenubarSeparator>
                <Link href="/blog" className="">
                  <MenubarItem className="w-20 py-1 hover:bg-[#403E55] rounded-[8px]">
                    blog
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
    </header>
  );
}
