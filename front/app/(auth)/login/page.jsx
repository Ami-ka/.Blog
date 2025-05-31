"use client";
import Card from "@/app/components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
              disabled={isLoading}
              type="submit"
              className="group relative px-6 py-2.5 bg-[#44435a] text-white font-medium text-sm rounded-xl border border-[#44435a] transition-all duration-300 hover:border-[#b4499d]/50 hover:bg-gradient-to-r hover:from-[#b4499d] hover:to-[#f07e7f] hover:shadow-[0_8px_25px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">{isLoading? "Submit...":"Log in"  }</span>
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
