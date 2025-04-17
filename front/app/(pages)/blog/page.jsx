"use client";

import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import PostCard from "@/app/components/PostCard";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getPosts, getUser } from "@/services/api";

export default function Editor() {
  const router = useRouter();
  const [blogname, setBlogname] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getPosts();
        const user = await getUser();
        setBlogname(user.data.blogname)
        console.log(response); 
        setPosts(response.data.posts); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке постов");
        setLoading(false);
      }
    }

    fetchPosts(); 
  }, []); 

  function handleCreate() {
    router.push("/");
  }

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className=" h-100">
      <div className="lg:mx-50 mx-0 md:mx-15 mt-10">
        <Card className=" ">
          <header className="flex justify-between items-center">
            <h1 className="font-bold text-xl">{blogname}</h1>
            <Button className="" onClick={handleCreate}>
              <div className="flex text-base items-center justify-between gap-1">
                New post <Plus size={20} strokeWidth={2.75} />
              </div>
            </Button>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-10">
            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
