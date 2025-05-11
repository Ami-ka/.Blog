"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/services/api";

export default function PostView() {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await getPost(id);
        setResponse(post);
        console.log(post);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;

  if (!response) {
    return <div>Загрузка...</div>;
  }
  return (
    <div>
      <h1>{response.data.post.heading}</h1>
      <p>{response.data.post.content}</p>
    </div>
  );
}
