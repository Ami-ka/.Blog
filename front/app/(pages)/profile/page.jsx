"use client";
import Card from "@/app/components/Card";
import { getUser, getUserPosts } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NotebookPen, Pen, Plus } from "lucide-react";
import PostCard from "../../components/PostCard";
import Button from "@/app/components/Button";
import Link from "next/link";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      // Проверяем наличие токена только в браузере
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Получаем данные пользователя
        const userResponse = await getUser();
        const userData = userResponse.data.userData;
        setUserData(userData);
        
        // Получаем посты пользователя
        const postsResponse = await getUserPosts();
        setPosts(postsResponse.data.posts);
        console.log('Posts data:', postsResponse.data.posts);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Ошибка при загрузке данных");
        
        // Если ошибка связана с аутентификацией, перенаправляем на главную
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  function handleCreate() {
    router.push("/blog/new");
  }

  // Состояние загрузки
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  // Состояние отсутствия данных пользователя
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading user data...</div>
      </div>
    );
  }

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
                  
                  {/* Кнопка редактирования */}
                  <Link 
                    href="/profile/edit" 
                    className="group/edit absolute -bottom-2 -right-2 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] p-3 rounded-full shadow-lg hover:shadow-[0_8px_25px_rgba(180,73,157,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden"
                  >
                    {/* Эффект блеска */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/edit:translate-x-full transition-transform duration-700"></div>
                    
                    <Pen size={16} className="text-white relative z-10" />
                  </Link>
                </div>
              </div>

              {/* Информация о пользователе */}
              <div className="text-center space-y-3">
                <h1 className="text-3xl xl:text-4xl font-bold text-white bg-gradient-to-r from-[#b4499d] to-[#f07e7f] bg-clip-text text-transparent">
                  {userData.name}
                </h1>
                
                <div className="flex items-center justify-center gap-2 text-gray-300 text-sm xl:text-base">
                  <span className="text-[#f07e7f] font-medium">@{userData.name}</span>
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
                  {userData.blogname || `${userData.name}'s Blog`}
                </h2>
                
                {/* Стилизованная кнопка создания поста */}
                <button
                  onClick={handleCreate}
                  className="group/btn relative bg-gradient-to-r from-[#b4499d] to-[#f07e7f] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(180,73,157,0.4)] hover:scale-105 active:scale-95 overflow-hidden"
                >
                  {/* Эффект блеска */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                  
                  <span className="relative flex items-center justify-center gap-2 text-base">
                    New post
                    <Plus size={20} strokeWidth={2.75} className="transition-transform duration-300 group-hover/btn:rotate-90" />
                  </span>
                </button>
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
                  {userData.name}'s posts
                </h3>
              </div>

              {/* Сетка постов */}
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="relative group/post">
                      <PostCard {...post}>
                        {/* Кнопка редактирования поста */}
                        <Link href={`/blog/post/${post.id}/edit`}>
                          <button className="group/edit-post relative bg-gradient-to-r from-[#b4499d]/80 to-[#f07e7f]/80 backdrop-blur-sm text-white p-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_6px_20px_rgba(180,73,157,0.3)] hover:scale-110 active:scale-95 overflow-hidden">
                            {/* Эффект блеска */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/edit-post:translate-x-full transition-transform duration-500"></div>
                            
                            <NotebookPen size={16} className="relative z-10" />
                          </button>
                        </Link>
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
                  
                  <button
                    onClick={handleCreate}
                    className="group/empty relative bg-gradient-to-r from-[#b4499d] to-[#f07e7f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_6px_20px_rgba(180,73,157,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/empty:translate-x-full transition-transform duration-700"></div>
                    
                    <span className="relative text-sm">Create first post</span>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}