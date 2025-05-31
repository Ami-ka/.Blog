"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Card from "./components/Card";
import { getPostsByIndex, getUser } from "@/services/api";
import PostCard from "./components/PostCard";
import Button from "./components/Button";
import NewButton from "./components/newButton";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // Функция для загрузки дополнительных постов
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore || !nextPageUrl) return;

    setLoadingMore(true);
    try {
      const token = localStorage.getItem('token');
      let response = null;
      
      if (!token) {
        response = await getPostsByIndex(0, -1, nextPageUrl);
      } else {
        const user = await getUser();
        response = await getPostsByIndex(0, user.data.userData.id, nextPageUrl);
      }

      console.log('Loading more posts:', response);
      
      // Добавляем новые посты к существующим
      setPosts(prevPosts => [...prevPosts, ...response.data.page.data]);
      
      // Обновляем URL следующей страницы
      const newNextPageUrl = response.data.page.next_page_url;
      setNextPageUrl(newNextPageUrl);
      
      // Проверяем, есть ли еще страницы
      setHasMore(!!newNextPageUrl);
      
    } catch (error) {
      console.error('Error loading more posts:', error);
      setError(error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, nextPageUrl]);

  // Обработчик скролла
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingMore) {
      return;
    }
    loadMorePosts();
  }, [loadMorePosts, loadingMore]);

  // Загрузка первых постов
  useEffect(() => {
    async function fetchInfo() {
      try {
        const token = localStorage.getItem("token");
        let response2 = null;
        
        if (!token) {
          response2 = await getPostsByIndex(0, -1);
        } else {
          const response1 = await getUser();
          console.log(response1);
          response2 = await getPostsByIndex(0, response1.data.userData.id);
        }

        setPosts(response2.data.page.data);
        setNextPageUrl(response2.data.page.next_page_url);
        setHasMore(!!response2.data.page.next_page_url);
        setLoading(false);
        console.log("ответ", response2);
        
      } catch (error) {
        console.error('Error fetching initial posts:', error);
        setError(error);
        setLoading(false);
      }
    }
    fetchInfo();
  }, []);

  // Добавляем/удаляем обработчик скролла
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#21202a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#b4499d] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400">Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#21202a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#b4499d]/5 to-[#f07e7f]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#f07e7f]/5 to-[#b4499d]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#b4499d]/3 to-[#f07e7f]/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f07e7f] to-[#b4499d] bg-clip-text text-transparent mb-4">
            Latest Posts
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing stories and insights from our community
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#b4499d]/50 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#f07e7f]/50 to-transparent w-32"></div>
          </div>
        </header>

        {/* Posts container */}
        <main className="relative">
          {/* Posts grid */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div
                key={`${index}`}
                className="transform transition-all duration-700 ease-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {/* Loading indicator for more posts */}
          {loadingMore && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#44435a]/50 backdrop-blur-sm rounded-2xl border border-[#44435a]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#b4499d] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#f07e7f] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-[#b4499d] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  Loading more posts...
                </span>
              </div>
            </div>
          )}

          {/* End of posts indicator */}
          {!hasMore && posts.length > 0 && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-1 h-1 bg-[#b4499d] rounded-full"></div>
                <span>You've reached the end of posts</span>
                <div className="w-1 h-1 bg-[#f07e7f] rounded-full"></div>
              </div>
            </div>
          )}

          {/* Side decorations */}
          <div className="absolute -left-4 top-20 w-1 h-32 bg-gradient-to-b from-[#b4499d]/20 to-transparent rounded-full hidden lg:block"></div>
          <div className="absolute -right-4 top-64 w-1 h-24 bg-gradient-to-b from-[#f07e7f]/20 to-transparent rounded-full hidden lg:block"></div>
        </main>

        {/* Footer section */}
        <footer className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="w-1 h-1 bg-[#b4499d] rounded-full"></div>
            <span>Scroll down to load more amazing content</span>
            <div className="w-1 h-1 bg-[#f07e7f] rounded-full"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}