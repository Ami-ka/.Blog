import { Heart } from "lucide-react";


function stripHtmlTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function PostCard({ heading, date, content, likes }) {
  const plainText = stripHtmlTags(content);
  const truncatedContent = plainText.length > 200
    ? plainText.slice(0, 200) + "..."
    : plainText;

  return (
    <div className="rounded-2xl bg-[var(--card)] shadow p-4 flex flex-col gap-2 hover:shadow-xl transition">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{date}</span>
      </div>
      <h2 className="text-lg font-semibold">{heading}</h2>
      <p className="text-gray-400 text-sm line-clamp-3">
        {truncatedContent}
      </p>
      <div className="flex justify-end text-gray-500 text-sm">
        <Heart size={20} strokeWidth={2.5} color="#b4499d" />
        {likes}
      </div>
    </div>
  );
}
