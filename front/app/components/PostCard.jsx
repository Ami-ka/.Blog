import {
  getPostLikes,
  getUserById,
  likePost,
  unlikePost,
} from "@/services/api";
import alertAuthorizePlease from "@/services/utility";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function stripHtmlTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function formatLikeCount(LikeCount) {
  if (LikeCount >= 1000000) {
    return `${Math.floor(LikeCount / 1000000)}M`; // Для миллионов
  } else if (LikeCount >= 1000) {
    return `${Math.floor(LikeCount / 1000)}K`; // Для тысяч
  }
  return LikeCount.toString(); // Для чисел меньше 1000
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
  is_liked,
  children,
}) {
  const post_id = id;
  const plainText = stripHtmlTags(content);
  const truncatedContent =
    plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;
  const [isLiked, setIsLiked] = useState(is_liked);
  const [LikeCount, setLikeCount] = useState(" ");
  const [user, setUser] = useState();
  const router = useRouter();
  

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

  useEffect(() => {
    async function fetchInfo() {
      try {
        const username = await getUserById(user_id);
        console.log(username);
        const likes = await getPostLikes(post_id);

        setLikeCount(likes.data.likeCount);

        setUser(username);
      } catch (err) {
        console.log("erorr:", err);
      }
    }
    fetchInfo();
  }, []);
  return (
    <div
      className="rounded-2xl bg-[var(--card)] shadow p-4 flex flex-col gap-3 hover:shadow-xl transition justify-between"
      onClick={() => {
        console.log(post_id);
      }}
    >
      <div className="flex justify-between items-center text-sm text-gray-500">
        <Link href={`/user/${user_id}`}>
          {user ? `@${user.data.userName}` : " "}
        </Link>
        <span>{convertTime(created_at)}</span>
      </div>
      <Link href={`/post/${post_id}`}>
        <h2 className="text-lg font-semibold">{heading}</h2>
      </Link>
      <p className="text-gray-400 text-sm line-clamp-3">{truncatedContent}</p>
      <div className="flex items-center text-center justify-between text-sm gap-4">
        <Link className="w-full" href={`/post/${post_id}`}>
          <button className="w-full bg-gradient-to-r from-[#F07E7F] to-[#B4499D] hover:bg-gradient-to-l transition-colors duration-300 p-2 rounded-2xl cursor-pointer ">
            Read more
          </button>
        </Link>
        {children}
        <button className="flex gap-2 cursor-pointer" onClick={handleLike}>
          <Heart
            size={20}
            strokeWidth={2.5}
            color={isLiked ? "#f07e7f" : "#b4499d"}
          />
          {formatLikeCount(LikeCount)}
        </button>
      </div>
    </div>
  );
}
