"use client";

import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import PostCard from "@/app/components/PostCard";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Editor() {
  const router = useRouter(); 
  function handleCreate(){
    router.push("/")
  }
  const posts = [
    {
      title: "Как использовать TinyMCE в Next.js",
      date: "16 апр 2025",
      description:
        "В этом посте мы рассмотрим интеграцию текстового редактора TinyMCE в проект Next.js с учетом SSR и client components.",
      likes: 24,
      author: "Алексей",
    },
    {
      title: "Flexbox или Grid?",
      date: "12 апр 2025",
      description:
        "Разбираем случаи, когда лучше использовать Flexbox, а когда Grid Layout. Примеры из реальных проектов.",
      likes: 15,
      author: "Катя",
    },
    {
      title: "Tailwind Tips & Tricks",
      date: "10 апр 2025",
      description:
        "Небольшая подборка хитростей и классных приёмов при работе с Tailwind CSS.",
      likes: 42,
      author: "Игорь",
    },
    {
      title: "Как использовать TinyMCE в Next.js",
      date: "16 апр 2025",
      description:
        "В этом посте мы рассмотрим интеграцию текстового редактора TinyMCE в проект Next.js с учетом SSR и client components.",
      likes: 24,
      author: "Алексей",
    },
    {
      title: "Flexbox или Grid?",
      date: "12 апр 2025",
      description:
        "Разбираем случаи, когда лучше использовать Flexbox, а когда Grid Layout. Примеры из реальных проектов.",
      likes: 15,
      author: "Катя",
    },
    {
      title: "Tailwind Tips & Tricks",
      date: "10 апр 2025",
      description:
        "Небольшая подборка хитростей и классных приёмов при работе с Tailwind CSS.",
      likes: 42,
      author: "Игорь",
    },{
      title: "Как использовать TinyMCE в Next.js",
      date: "16 апр 2025",
      description:
        "В этом посте мы рассмотрим интеграцию текстового редактора TinyMCE в проект Next.js с учетом SSR и client components.",
      likes: 24,
      author: "Алексей",
    },
    {
      title: "Flexbox или Grid?",
      date: "12 апр 2025",
      description:
        "Разбираем случаи, когда лучше использовать Flexbox, а когда Grid Layout. Примеры из реальных проектов.",
      likes: 15,
      author: "Катя",
    },
    {
      title: "Tailwind Tips & Tricks",
      date: "10 апр 2025",
      description:
        "Небольшая подборка хитростей и классных приёмов при работе с Tailwind CSS.",
      likes: 42,
      author: "Игорь",
    },{
      title: "Как использовать TinyMCE в Next.js",
      date: "16 апр 2025",
      description:
        "В этом посте мы рассмотрим интеграцию текстового редактора TinyMCE в проект Next.js с учетом SSR и client components.",
      likes: 24,
      author: "Алексей",
    },
    {
      title: "Flexbox или Grid?",
      date: "12 апр 2025",
      description:
        "Разбираем случаи, когда лучше использовать Flexbox, а когда Grid Layout. Примеры из реальных проектов.",
      likes: 15,
      author: "Катя",
    },
    {
      title: "Tailwind Tips & Tricks",
      date: "10 апр 2025",
      description:
        "Небольшая подборка хитростей и классных приёмов при работе с Tailwind CSS.",
      likes: 42,
      author: "Игорь",
    },
  ];

  return (
    <div className=" h-100">
      <div className="lg:mx-50 mx-0 md:mx-15 mt-10">
        <Card className=" ">
          <header className="flex justify-between items-center">
            <h1 className="font-bold  text-xl">Blog Name</h1>
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
