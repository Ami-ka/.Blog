'use client'
import Card from '@/app/components/Card';
import { getUser, setUserData } from '@/services/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  const [name, setName] = useState("");
  const [blogName, setBlogName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router= useRouter();
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await setUserData(name, blogName);
    router.push("/profile");
  }

  useEffect(()=>{
    async function fetchInfo() {
      setIsLoading(true);
      const user = await getUser();
      console.log(user);
      setIsLoading(false);
      if(user.data.userData.blogname){
        setBlogName(user.data.userData.blogname)
      }
      setName(user.data.userData.name);
    }
    fetchInfo();
    
  },[]) 



  return (
    <div className='flex justify-center items-center xl:max-w-[1280px] xl:m-auto xl:min-h-200'>
      <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="login"
            className="block text-white text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            name="login"
            
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Blog Name:
          </label>
          <input
            id="password"
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={blogName}
            onChange={(e) => {
              setBlogName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
              disabled={isLoading}
              type="submit"
              className="group relative px-6 py-2.5 bg-[#44435a] text-white font-medium text-sm rounded-xl border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d] hover:to-[#f07e7f] hover:shadow-[0_8px_25px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">{isLoading? "Submit...":"Submit"  }</span>
            </button>
          
        </div>
      </form>
    </Card>

    </div>
  )
}

export default page