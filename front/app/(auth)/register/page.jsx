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
            className="bg-[#B4499D] hover:bg-gradient-to-r hover:from-[#B4499D] hover:to-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled = {isLoading}
          >
            {isLoading? "Submit...":"Sign up"}
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
