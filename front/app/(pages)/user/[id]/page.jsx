'use client'


import PostCard from "@/app/components/PostCard";
import { getUserById, getUserPosts, getUserPostsById } from "@/services/api";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  
  const [userData, setUserData] = useState("user");
  
  const [posts, setPosts] = useState([]);
  
  const {id} = useParams();
  
  
  
  useEffect(()=>{
    async function fetchInfo() {
      try{
        const user = await getUserById(id);
        setUserData(user.data);
        const posts = await getUserPostsById(id); 
        console.log(user.data);
        setPosts(posts.data.posts)
      }catch(e){
        throw e;
      }
    }
    
    fetchInfo();
  },[])

  return (
      <div className="min-h-screen p-4 xl:p-8">
        <div className="flex justify-center items-center">
          {/* Основной контейнер профиля */}
          <div className="group relative bg-[#302F3F] rounded-3xl p-8 xl:p-12 overflow-hidden w-full max-w-[1280px] min-h-[90vh]">
            <div className="relative z-10">
              {/* Секция профиля */}
              <header className="flex flex-col items-center space-y-6 mb-12">
                {/* Аватар с эффектами */}
                <div className="relative group/avatar">
                  <div className="relative">
                    {/* Основной аватар */}
                    <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(180,73,157,0.3)] transition-all duration-500 group-hover/avatar:shadow-[0_20px_40px_rgba(180,73,157,0.5)] group-hover/avatar:scale-105">
                      <Image
                        src="/icons/user.svg"
                        width={80}
                        height={80}
                        alt="user avatar"
                        className="rounded-full"
                      />
                    </div>
                    
                    {/* Анимированное кольцо */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#b4499d]/30 scale-110 opacity-0 group-hover/avatar:opacity-100 group-hover/avatar:scale-125 transition-all duration-500"></div>
                    
                    
                  </div>
                </div>
  
                {/* Информация о пользователе */}
                <div className="text-center space-y-3">
                  <h1 className="text-3xl xl:text-4xl font-bold text-white bg-gradient-to-r from-[#b4499d] to-[#f07e7f] bg-clip-text ">
                    {userData.userName}
                  </h1>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-300 text-sm xl:text-base">
                    <span className="text-[#f07e7f] font-medium">@{userData.userName}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#b4499d] rounded-full animate-pulse"></span>
                      {userData.postsNumber || posts.length} posts
                    </span>
                  </div>
                </div>
  
                {/* Название блога и кнопка создания поста */}
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="font-bold text-2xl xl:text-3xl text-center text-white">
                    {userData.blogName || `${userData.userName}'s Blog`}
                  </h2>
                  
                  
                </div>
              </header>
  
              {/* Разделитель */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b4499d]/30 to-transparent mb-10"></div>
  
              {/* Секция постов */}
              <section className="space-y-6">
                {/* Заголовок секции постов */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-gradient-to-b from-[#b4499d] to-[#f07e7f] rounded-full"></span>
                    {userData.userName}'s posts
                  </h3>
                </div>
  
                {/* Сетка постов */}
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <div key={post.id} className="relative group/post">
                        <PostCard {...post}>
                          
                        </PostCard>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Пустое состояние */
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#b4499d]/20 to-[#f07e7f]/20 flex items-center justify-center">
                      <Plus size={32} className="text-[#b4499d]" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-lg font-medium text-white">No posts yet</h4>
                      <p className="text-gray-400 text-sm">Create your first post to share your thoughts</p>
                    </div>
                    
                    
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
}
