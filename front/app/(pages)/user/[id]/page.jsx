'use client'

import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import PostCard from "@/app/components/PostCard";
import { getUserById, getUserPosts, getUserPostsById } from "@/services/api";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [userData, setUserData] = useState("user");
  const [blogname, setBlogname] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const {id} = params;
  
  
  
  useEffect(()=>{
    async function fetchInfo() {
      try{
        const user = await getUserById(id);
        setUserData(user.data);
        const posts = await getUserPostsById(id);// to-do fix getting the posts 
        
        setPosts(posts.data.posts)
      }catch(e){
        throw e;
      }
    }
    console.log(params);
    fetchInfo();
  },[])

  return (
    <div className="flex justify-center items-center xl:max-w-[1280px] xl:m-auto mt-6 xl:p-20  ">
      <Card className="">
        <div className="min-h-[90vh] xl:min-w-90">
          <div className="flex flex-col  items-center">
            <Image
              src="/icons/user.svg"
              width={100}
              height={100}
              alt="user.png"
            />
            <div className="text-center">
              <div className="text-3xl">{userData.userName}</div>
              <div className="text-sm ">
                @{userData.name} <>·</> {userData.postsNumber} posts{" "}
                {/*TO-do save number of posts */}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="font-bold text-xl">{blogname}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-10 px-5">
              {posts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
