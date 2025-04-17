"use client";
import Card from "@/app/components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "@/app/context/AuthContext";
import { loginUser } from "@/services/api";
import { sleep } from "@/utils/sleep";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const logState = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);

      const token = response.data.token;
      localStorage.setItem("token", token);
      await sleep(1000);
      router.replace("/"); //TO-DO when profile will be finished redirect to profile
      logState.setIsLogIn(true);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        setError("wrong password or email");
      } else {
        setError("Authentifictaion failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#B4499D] hover:bg-gradient-to-r hover:from-[#B4499D] hover:to-[#F07E7F] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submit..." : "Log in"}
          </button>
          <Link
            className="inline-block align-baseline font-semibold text-sm text-[#B4499D] hover:text-[#F07E7F]"
            href="/register"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Card>
    </div>
  );
}
