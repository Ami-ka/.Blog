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
import {
  CircleUserRound,
  LogOut,
  Menu,
  NotebookPen,
  Search,
  SortAsc,
} from "lucide-react";
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
  <header className="sticky top-0 z-50 bg-[#21202a]/95 backdrop-blur-md border-b border-[#302F3F]/50 px-4 py-3">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      
      {/* Logo */}
      <Link
        href="/"
        className="group relative"
      >
        <span className="bg-gradient-to-r from-[#f07e7f] to-[#b4499d] bg-clip-text text-transparent font-bold text-2xl transition-all duration-300 group-hover:scale-105">
          .Blog
        </span>
        {/* Logo glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f07e7f] to-[#b4499d] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
      </Link>

      {/* Search Bar */}
      {
        logState.isLogIn && (
          <div className="flex-1 max-w-md  mx-8 ">
        <div className="relative group">
          <div className="flex items-center bg-[#44435a] border border-[#44435a] rounded-2xl overflow-hidden transition-all duration-300 group-focus-within:border-[#b4499d]/50 group-focus-within:shadow-[0_0_20px_rgba(180,73,157,0.15)]">
            <input 
              className="flex-1 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 text-sm focus:outline-none"
              placeholder="Search..."
              type="text"
            />
            <button className="group/search p-2 sm:p-3 m-1 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] rounded-xl transition-all duration-300 hover:shadow-[0_4px_15px_rgba(180,73,157,0.4)] hover:scale-105 active:scale-95">
              <Search 
                size={16} 
                className="sm:w-[18px] sm:h-[18px] text-white transition-transform duration-300 group-hover/search:rotate-12" 
              />
            </button>
          </div>
        </div>
      </div>
        )
      }

      {/* Auth Section */}
      <nav className="flex items-center">
        {!logState.isLogIn && (
          <Link
            href="/login"
            className="group relative px-6 py-2.5 bg-[#44435a] text-white font-medium text-sm rounded-xl border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d] hover:to-[#f07e7f] hover:shadow-[0_8px_25px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Log in</span>
          </Link>
        )}
        
        {logState.isLogIn && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="group p-0 border-0 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                <div className="relative p-3 bg-[#44435a] rounded-xl border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 hover:shadow-[0_4px_15px_rgba(180,73,157,0.2)] group-hover:scale-105">
                  <Menu 
                    size={20} 
                    strokeWidth={2.5} 
                    className="text-white transition-all duration-300 group-hover:text-[#f07e7f]" 
                  />
                  {/* Menu glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                </div>
              </MenubarTrigger>
              
              <MenubarContent className="bg-[#44435a]/95 backdrop-blur-md border border-[#302F3F] rounded-2xl p-2 mt-2 mr-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] min-w-[200px]">
                
                <Link href="/profile">
                  <MenubarItem className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-[#b4499d]/20 focus:to-[#f07e7f]/20">
                    <CircleUserRound 
                      size={18} 
                      className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300" 
                    />
                    <span className="text-white text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300">
                      Profile
                    </span>
                  </MenubarItem>
                </Link>
                
                <MenubarSeparator className="my-2 h-px bg-[#302F3F]" />
                
                <Link href="/blog/new">
                  <MenubarItem className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-[#b4499d]/20 focus:to-[#f07e7f]/20">
                    <NotebookPen 
                      size={18} 
                      className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300" 
                    />
                    <span className="text-white text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300">
                      New Post
                    </span>
                  </MenubarItem>
                </Link>
                
                <MenubarSeparator className="my-2 h-px bg-[#302F3F]" />
                
                <MenubarItem
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-red-500/20 focus:to-red-400/20"
                  onClick={handleLogOut}
                >
                  <LogOut 
                    size={18} 
                    className="text-[#b4499d] group-hover:text-red-400 transition-colors duration-300" 
                  />
                  <span className="text-[#b4499d] text-sm font-medium group-hover:text-red-400 transition-colors duration-300">
                    Log Out
                  </span>
                </MenubarItem>
                
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </nav>
    </div>
  </header>
);}
