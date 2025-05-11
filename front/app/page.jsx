"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  return <div></div>;
}
