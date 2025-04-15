'use client'
import Card from "@/app/components/Card";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function profile() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fn(){
        const token = localStorage.getItem('token');
    if (!token) {
      router.push("/");
      return;
    }
    try{
        const response = await axios.get("http://127.0.0.1:8000/api/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response:", response.data);
      
          setUserData(response.data);
    }catch(err){
        console.log("problem with getting user ", err);
        router.push('/');
    } 
    }
    fn();       
  },[]);
  
  if(!userData){
    return <>loading</>
  }
  return (
    <Card>
      <div className=" l:h-150 l:px-50 ">
        <Image src="/icons/user.svg" width={100} height={100} alt="user.png" />
        <div className="text-center">{userData.name}</div>
      </div>
    </Card>
  );
}
