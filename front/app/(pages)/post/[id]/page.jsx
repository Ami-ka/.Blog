"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Импортируем useParams для получения параметров из URL
import { getPost } from "@/services/api";

export default function PostView() {
  const { id } = useParams(); // Получаем id из параметров маршрута
  const [response, setResponse] = useState(null); // Для хранения данных поста
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

  useEffect(() => {
    // Асинхронная загрузка поста
    const fetchPost = async () => {
      try {
        setLoading(true); // Начинаем загрузку
        const post = await getPost(id); // Получаем пост по id
        setResponse(post); // Сохраняем ответ
        console.log(post);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      } finally {
        setLoading(false); // Останавливаем индикатор загрузки
      }
    };

    fetchPost(); // Вызываем асинхронную функцию
  }, [id]); // Запускаем эффект при изменении id

  if (loading) return <div>Загрузка...</div>; // Показываем загрузку, пока не получены данные

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
