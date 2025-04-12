'use client'
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import Card from "@/app/components/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function registerpage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [isLoading, setIsLoading] =  useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try{
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await axios.post('http://localhost:8000/api/v1/register',
        {email, password},
        {
         headers:{
           Accept:"application/json",
           "Content-Type": "application/json",
         },
         withCredentials: true,
        }
       );
    }
  }

  return (
    <Card>
      <form className="space-y-4 " action={signup}>
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#B4499D] hover:bg-gradient-to-r hover:from-[#B4499D] hover:to-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
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
  );
}
