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
  ChevronDown,
  Calendar,
  Heart,
  Zap
} from "lucide-react";
import { logOutUser } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Header() {
  const logState = useContext(AuthContext);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'date', 'likes'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: Zap, orderBy: '' },
    { value: 'date', label: 'Date', icon: Calendar, orderBy: 'date' },
    { value: 'likes', label: 'Likes', icon: Heart, orderBy: 'likes' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy);

  async function handleLogOut() {
    const response = await logOutUser();

    if (response) {
      logState.setIsLogIn(false);
      router.push("/");
    }
  }

  const handleSearch = () => {
    if (searchValue) {
      const orderByParam = currentSort.orderBy ? `?orderBy=${currentSort.orderBy}` : '';
      router.push(`/search/${searchValue}${orderByParam}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
return (
 <header className="sticky top-0 z-50 bg-[#21202a]/95 backdrop-blur-md border-b border-[#302F3F]/50 px-2 sm:px-4 py-3">
<div className="max-w-7xl mx-auto">
{/* Desktop Layout */}
<div className="hidden lg:flex justify-between items-center">
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
{/* Search Bar with Sort */}
<div className="flex-1 max-w-2xl mx-8">
<div className="flex items-stretch gap-3 h-12">
{/* Sort Dropdown */}
<div className="relative h-full">
<button
onClick={() => setIsDropdownOpen(!isDropdownOpen)}
className="group flex items-center gap-2 px-4 h-full bg-[#44435a] border border-[#44435a] rounded-2xl transition-all duration-300 hover:border-[#b4499d]/50 hover:shadow-[0_0_15px_rgba(180,73,157,0.1)] min-w-[120px]"
>
<currentSort.icon
size={16}
className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300"
/>
<span className="text-gray-300 text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300">
{currentSort.label}
</span>
<ChevronDown
size={14}
className={`text-gray-400 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-[#b4499d]' : 'group-hover:text-[#f07e7f]'}`}
/>
</button>
{/* Dropdown Menu */}
{isDropdownOpen && (
<div className="absolute top-full left-0 mt-2 bg-[#44435a]/95 backdrop-blur-md border border-[#302F3F] rounded-xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] min-w-[140px] z-50">
{sortOptions.map((option) => (
<button
key={option.value}
onClick={() => {
setSortBy(option.value);
setIsDropdownOpen(false);
 }}
className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
sortBy === option.value
 ? 'bg-gradient-to-r from-[#b4499d]/20 to-[#f07e7f]/20 text-[#f07e7f]'
 : 'hover:bg-gradient-to-r hover:from-[#b4499d]/10 hover:to-[#f07e7f]/10 text-gray-300 hover:text-[#f07e7f]'
}`}
>
<option.icon
size={16}
className={`transition-colors duration-300 ${
sortBy === option.value ? 'text-[#f07e7f]' : 'text-gray-400 group-hover:text-[#f07e7f]'
}`}
/>
<span className="text-sm font-medium">
{option.label}
</span>
</button>
 ))}
</div>
 )}
</div>
{/* Search Input */}
<div className="flex-1 relative group">
<div className="flex items-center bg-[#44435a] border border-[#44435a] rounded-2xl overflow-hidden transition-all duration-300 group-focus-within:border-[#b4499d]/50 group-focus-within:shadow-[0_0_20px_rgba(180,73,157,0.15)] h-full">
<input
className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none"
placeholder="Search..."
type="text"
value={searchValue}
onChange={(e) => setSearchValue(e.target.value)}
onKeyPress={handleKeyPress}
/>
<button
onClick={handleSearch}
className="group/search p-2.5 m-1 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] rounded-xl transition-all duration-300 hover:shadow-[0_4px_15px_rgba(180,73,157,0.4)] hover:scale-105 active:scale-95"
>
<Search
size={18}
className="text-white transition-transform duration-300 group-hover/search:rotate-12"
/>
</button>
</div>
</div>
</div>
</div>
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
{/* Mobile Layout */}
<div className="lg:hidden">
{/* Top row - Logo + Auth */}
<div className="flex justify-between items-center mb-3">
<Link
href="/"
className="group relative"
>
<span className="bg-gradient-to-r from-[#f07e7f] to-[#b4499d] bg-clip-text text-transparent font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-105">
 .Blog
</span>
{/* Logo glow effect */}
<div className="absolute inset-0 bg-gradient-to-r from-[#f07e7f] to-[#b4499d] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
</Link>
{/* Auth Section Mobile */}
<nav className="flex items-center">
{!logState.isLogIn && (
<Link
href="/login"
className="group relative px-3 sm:px-4 py-2 bg-[#44435a] text-white font-medium text-xs sm:text-sm rounded-lg border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d] hover:to-[#f07e7f] hover:shadow-[0_8px_25px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
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
<div className="relative p-2 sm:p-2.5 bg-[#44435a] rounded-lg border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 hover:shadow-[0_4px_15px_rgba(180,73,157,0.2)] group-hover:scale-105">
<Menu
size={18}
strokeWidth={2.5}
className="text-white transition-all duration-300 group-hover:text-[#f07e7f]"
/>
{/* Menu glow effect */}
<div className="absolute inset-0 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
</div>
</MenubarTrigger>
<MenubarContent className="z-50 bg-[#44435a]/95 backdrop-blur-md border border-[#302F3F] rounded-2xl p-2 mt-2 mr-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] min-w-[180px]">
<Link href="/profile">
<MenubarItem className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-[#b4499d]/20 focus:to-[#f07e7f]/20">
<CircleUserRound
size={16}
className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300"
/>
<span className="text-white text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300">
 Profile
</span>
</MenubarItem>
</Link>
<Link href="/blog/new">
<MenubarItem className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#b4499d]/20 hover:to-[#f07e7f]/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-[#b4499d]/20 focus:to-[#f07e7f]/20">
<NotebookPen
size={16}
className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300"
/>
<span className="text-white text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300">
 New Post
</span>
</MenubarItem>
</Link>
<MenubarItem
className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 transition-all duration-300 cursor-pointer border-0 focus:bg-gradient-to-r focus:from-red-500/20 focus:to-red-400/20"
onClick={handleLogOut}
>
<LogOut
size={16}
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
{/* Bottom row - Search + Sort */}
<div className="flex items-stretch gap-2 h-10">
{/* Sort Dropdown Mobile */}
<div className="relative h-full">
<button
onClick={() => setIsDropdownOpen(!isDropdownOpen)}
className="group flex items-center gap-1.5 px-2.5 sm:px-3 h-full bg-[#44435a] border border-[#44435a] rounded-xl transition-all duration-300 hover:border-[#b4499d]/50 hover:shadow-[0_0_15px_rgba(180,73,157,0.1)]"
>
<currentSort.icon
size={14}
className="text-gray-300 group-hover:text-[#f07e7f] transition-colors duration-300"
/>
<span className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-[#f07e7f] transition-colors duration-300 hidden xs:block">
{currentSort.label}
</span>
<ChevronDown
size={12}
className={`text-gray-400 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-[#b4499d]' : 'group-hover:text-[#f07e7f]'}`}
/>
</button>
{/* Dropdown Menu Mobile */}
{isDropdownOpen && (
<div className="absolute top-full left-0 mt-2 bg-[#44435a]/95 backdrop-blur-md border border-[#302F3F] rounded-xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] min-w-[140px] z-50">
{sortOptions.map((option) => (
<button
key={option.value}
onClick={() => {
setSortBy(option.value);
setIsDropdownOpen(false);
 }}
className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 ${
sortBy === option.value
 ? 'bg-gradient-to-r from-[#b4499d]/20 to-[#f07e7f]/20 text-[#f07e7f]'
 : 'hover:bg-gradient-to-r hover:from-[#b4499d]/10 hover:to-[#f07e7f]/10 text-gray-300 hover:text-[#f07e7f]'
}`}
>
<option.icon
size={14}
className={`transition-colors duration-300 ${
sortBy === option.value ? 'text-[#f07e7f]' : 'text-gray-400 group-hover:text-[#f07e7f]'
}`}
/>
<span className="text-sm font-medium">
{option.label}
</span>
</button>
 ))}
</div>
 )}
</div>
{/* Search Input Mobile */}
<div className="flex-1 relative group">
<div className="flex items-center bg-[#44435a] border border-[#44435a] rounded-xl overflow-hidden transition-all duration-300 group-focus-within:border-[#b4499d]/50 group-focus-within:shadow-[0_0_20px_rgba(180,73,157,0.15)] h-full">
<input
className="flex-1 bg-transparent px-3 text-white placeholder-gray-400 text-sm focus:outline-none"
placeholder="Search..."
type="text"
value={searchValue}
onChange={(e) => setSearchValue(e.target.value)}
onKeyPress={handleKeyPress}
/>
<button
onClick={handleSearch}
className="group/search p-2 m-0.5 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] rounded-lg transition-all duration-300 hover:shadow-[0_4px_15px_rgba(180,73,157,0.4)] hover:scale-105 active:scale-95"
>
<Search
size={14}
className="text-white transition-transform duration-300 group-hover/search:rotate-12"
/>
</button>
</div>
</div>
</div>
</div>
</div>
{/* Click outside to close dropdown */}
{isDropdownOpen && (
<div
className="fixed inset-0 z-40"
onClick={() => setIsDropdownOpen(false)}
/>
 )}
</header>
);}