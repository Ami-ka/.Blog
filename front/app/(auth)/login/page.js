'use client';
import Card from "@/app/components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function loginpage() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] =  useState(false);
  const router = useRouter();

  const handleSubit = async (e) =>{
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try{
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const response = await axios.post('http://localhost:8000/api/v1/login',
       {email, password},
       {
        headers:{
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
       }
      );
      if(response.data.user){
        router.push("/")
      }
    }
    catch (err){
      setError(err.response?.data?.message || "ошибка входа, попробуйте еще раз позже")
    }
    finally{
      setIsLoading(false);
    }
  }  



  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubit}>
      {error && (
          <div className="bg-red-500 text-white p-2 rounded text-sm">
            {error}
          </div>
        )}
          <div>
            <label
              htmlFor="login"
              className="block text-white text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              name="login"
              type="email"
              placeholder="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Passowrd:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#B4499D] hover:bg-gradient-to-r hover:from-[#B4499D] hover:to-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading? "Log in...": "Log in"}
            </button>
            <Link className="inline-block align-baseline font-semibold text-sm text-[#B4499D] hover:text-[#F07E7F]" href="/register">Sign up</Link>
          </div>
        </form>
    </Card>
        
      
  );
}
