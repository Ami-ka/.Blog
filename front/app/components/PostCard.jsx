import { Heart } from "lucide-react";

export default function PostCard({ title, date, description, likes, author }) {
    return (
      <div className=" rounded-2xl bg-[var(--card)] shadow p-4 flex flex-col gap-2 hover:shadow-xl transition ">
        <div className="flex justify-between items-center text-sm text-gray-500">
          
          <span>{date}</span>
        </div>
        <h2 className="text-lg font-semibold ">{title}</h2>
        <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
        <div className="flex justify-end text-gray-500 text-sm">
        <Heart size={20} strokeWidth={2.5}  color="#b4499d"/>{likes}
        
        </div>
      </div>
    )
  }
  