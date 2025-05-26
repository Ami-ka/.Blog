'use client'
import Link from "next/link";
import Card from "@/app/components/Card";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/api";
import AuthContext from "@/app/context/AuthContext";
export default function registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [isLoading, setIsLoading] =  useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const logState = useContext(AuthContext);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try{
      const response = await registerUser(name, email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      logState.setIsLogIn(true);
      router.push('/profile');

    }
    catch (err){
      setError(err.response?.data?.message || "ошибка регистрации")
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-[85vh]">
    <Card>
      <form className="space-y-4 " onSubmit={handleSubmit}>
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
            User name:
          </label>
          <input
            id="login"
            name="username"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="login"
            className="block text-white text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            id="login"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            name="password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
           <button
              disabled={isLoading}
              type="submit"
              className="group relative px-6 py-2.5 bg-[#44435a] text-white font-medium text-sm rounded-xl border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d] hover:to-[#f07e7f] hover:shadow-[0_8px_25px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">{isLoading? "Submit...":"Sign up"  }</span>
            </button>
          <Link
            className="inline-block align-baseline font-semibold text-sm text-[#B4499D] hover:text-[#F07E7F]"
            href="/login"
          >
            Log in
          </Link>
        </div>
      </form>
    </Card>
    </div>
  );
}
