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
import { CircleUserRound, LogOut, Menu, NotebookPen } from "lucide-react";
import { logOutUser } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Header() {
  const logState = useContext(AuthContext);
  const router = useRouter();

  async function handleLogOut() {
    const response = await logOutUser();

    if (response) {
      logState.setIsLogIn(false);
      router.push("/");
    }
  }

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
              <MenubarContent className="bg-[#302F3F] rounded-[8px] text-center  py-4 bg-[#302F3F] rounded-[8px] text-center text-base py-2 px-3 mr-2 mt-2 shadow-xl">
                <Link href="/profile" className="">
                  <MenubarItem className="flex space-x-2  w-30 hover:bg-[#403E55] py-2 px-2.5 rounded-[8px]">
                    <CircleUserRound /> <span>Profile</span>
                  </MenubarItem>
                </Link>
                <MenubarSeparator className="h-2"></MenubarSeparator>
                <Link href="/blog/new" className="">
                  <MenubarItem className="flex justify-between space-x-2 w-30 hover:bg-[#403E55] py-2 px-2.5 rounded-[8px]">
                    <NotebookPen />
                    New Post
                  </MenubarItem>
                </Link>
                <MenubarSeparator className="h-2"></MenubarSeparator>
                <MenubarItem
                  className="flex space-x-2 w-30 hover:bg-[#403E55] py-2 px-2.5 rounded-[8px] text-[var(--fiolet)]"
                  onClick={handleLogOut}
                >
                  <LogOut color="#B4499D" />
                  <span>Log Out</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
    </header>
  );
}
