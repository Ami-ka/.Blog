'use client'
import Card from '@/app/components/Card';
import { getUser, setUserData } from '@/services/api';
import { Link } from 'lucide-react';
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
            className="bg-[#B4499D] hover:bg-gradient-to-r hover:from-[#B4499D] hover:to-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submit..." : "Submit"}
          </button>
          
        </div>
      </form>
    </Card>

    </div>
  )
}

export default page