"use client";
import Card from "@/app/components/Card";
import { getUser } from "@/services/api";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function profile() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fn() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      try {
        const response = await getUser();
        console.log("response:", response.data);

        setUserData(response.data);
      } catch (err) {
        console.log("problem with getting user ", err);
        router.push("/");
      }
    }
    fn();
  }, []);

  if (!userData) {
    return <>loading</>;
  }
  return (

    <div className="flex justify-center items-center h-[85vh]">
    <Card>
      <div className="xl:h-150 xl:w-90 h-100">
        <div className="flex">
          <Image
            src="/icons/user.svg"
            width={100}
            height={100}
            alt="user.png"
          />

          <div className="pt-2 pl-4">
            <div className="text-3xl">{userData.name}</div>
            <div className="text-sm ">
              @{userData.name} <>·</> 12 posts {/*TO-do save number of posts */}
            </div>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}
