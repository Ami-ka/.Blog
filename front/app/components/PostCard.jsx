import {
  getPostLikes,
  getUserById,
  likePost,
  unlikePost,
} from "@/services/api";
import alertAuthorizePlease from "@/services/utility";
import { extractTextFromTiptapJSON } from "@/utils/formatingjson";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function formatLikeCount(LikeCount) {
  // Добавляем проверку на undefined/null
  if (LikeCount === undefined || LikeCount === null || isNaN(LikeCount)) {
    return '0';
  }
  
  // Преобразуем в число если это строка
  const count = typeof LikeCount === 'string' ? parseInt(LikeCount, 10) : LikeCount;
  
  if (count >= 1000000) {
    return `${Math.floor(count / 1000000)}M`; // Для миллионов
  } else if (count >= 1000) {
    return `${Math.floor(count / 1000)}K`; // Для тысяч
  }
  return count.toString(); // Для чисел меньше 1000
}

function convertTime(date_str) {
  const past = new Date(date_str);
  const now = new Date();
  const diffMs = now - past;
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result = "";

  if (days > 0) {
    if (days == 1) {
      result = `${days} day ago`;
    } else {
      result = `${days} days ago`;
    }
  } else if (hours > 0) {
    if (hours == 1) {
      result = `${hours} hour ago`;
    } else {
      result = `${hours} hours ago`;
    }
  } else if (minutes > 0) {
    if (minutes == 1) {
      result = `${minutes} minute ago`;
    } else {
      result = `${minutes} minutes ago`;
    }
  } else {
    result = "just now";
  }
  return result;
}

export default function PostCard({
  heading,
  created_at,
  content,
  id,
  user_id,
  is_liked = false, // добавляем значение по умолчанию
  likes_count = 0, // добавляем значение по умолчанию
  user_name = '', // добавляем значение по умолчанию
  children,
}) {
  const post_id = id;
  const plainText = extractTextFromTiptapJSON(content);
  const truncatedContent =
    plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;
  
  // Инициализируем состояние с безопасными значениями
  const [isLiked, setIsLiked] = useState(Boolean(is_liked));
  const [LikeCount, setLikeCount] = useState(Number(likes_count) || 0);
  const [user, setUser] = useState(user_name || '');
  const router = useRouter();
  
  // Обновляем состояние когда пропсы изменяются
  useEffect(() => {
    setIsLiked(Boolean(is_liked));
    setLikeCount(Number(likes_count) || 0);
    setUser(user_name || '');
  }, [is_liked, likes_count, user_name]);

  async function handleLike() {
    // Implement like functionality here
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      alert("please Authorize for all functionality");
    } else {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      if (newIsLiked) {
        setLikeCount((likes) => likes + 1);
        await likePost(post_id);
      } else {
        setLikeCount((likes) => likes - 1);
        await unlikePost(post_id);
      }
    }
  }

 
  return (
  <article className="group relative bg-[#44435a] rounded-2xl p-6 transition-all duration-700 ease-out hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(180,73,157,0.15)] border border-[#44435a] hover:border-[#b4499d]/30 overflow-hidden">
    
    
    <div className="relative z-10 space-y-5">
      
      {/* Header section */}
      <header className="flex items-center justify-between">
        <Link 
          href={`/user/${user_id}`}
          className="flex items-center gap-3 group/user transition-all duration-300"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#b4499d] to-[#f07e7f] flex items-center justify-center text-white font-medium text-sm shadow-lg">
              {user?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b4499d] to-[#f07e7f] opacity-0 group-hover/user:opacity-20 scale-150 transition-all duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm group-hover/user:text-[#f07e7f] transition-colors duration-300">
              {user ? `@${user}` : " "}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{convertTime(created_at)}</span>
            </div>
          </div>
        </Link>
      </header>

      {/* Content section */}
      <div className="space-y-4">
        <Link href={`/blog/post/${post_id}`} className="block group/title">
          <h2 className="text-xl font-bold text-white leading-snug group-hover/title:bg-gradient-to-r group-hover/title:from-[#b4499d] group-hover/title:to-[#f07e7f] group-hover/title:bg-clip-text group-hover/title:text-transparent transition-all duration-400">
            {heading}
          </h2>
        </Link>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {truncatedContent}
        </p>
      </div>

      {/* Action section */}
      <footer className="flex items-center gap-3 pt-4 border-t border-gray-600/30">
        
        {/* Read more button */}
        <Link className="flex-1" href={`/blog/post/${post_id}`}>
          <button className="group/btn relative w-full bg-gradient-to-r from-[#b4499d] to-[#f07e7f] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(180,73,157,0.4)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative flex items-center justify-center gap-2 text-sm text-center">
              Read more
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </Link>
        
        {/* Additional children */}
        {children && (
          <div className="flex items-center">
            {children}
          </div>
        )}
        
        {/* Like button */}
        <button 
          className="group/like flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-[#b4499d]/10 transition-all duration-300 min-w-fit"
          onClick={handleLike}
        >
          <div className="relative">
            <Heart
              size={18}
              strokeWidth={2}
              className={`transition-all duration-300 ${
                isLiked 
                  ? "fill-[#f07e7f] stroke-[#f07e7f] scale-110" 
                  : "stroke-[#b4499d] group-hover/like:stroke-[#f07e7f] group-hover/like:scale-110"
              }`}
            />
            {/* Like animation ring */}
            <div className={`absolute inset-0 rounded-full border-2 scale-150 opacity-0 transition-all duration-300 ${
              isLiked ? "border-[#f07e7f] animate-pulse" : "border-[#b4499d]"
            } group-hover/like:opacity-30 group-hover/like:scale-125`}></div>
          </div>
          
          <span className={`text-sm font-medium transition-all duration-300 ${
            isLiked 
              ? "text-[#f07e7f]" 
              : "text-[#b4499d] group-hover/like:text-[#f07e7f]"
          }`}>
            {formatLikeCount(LikeCount)}
          </span>
        </button>
        
      </footer>
      
    </div>
  </article>
);
}