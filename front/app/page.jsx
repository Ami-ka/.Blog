"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { getPostsByIndex, getUser } from "@/services/api";
import PostCard from "./components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchInfo() {
      const token = localStorage.getItem("token");
      let response2 = null;
      if (!token) {
        response2 = await getPostsByIndex(0, -1);
      } else {
        const response1 = await getUser();
        console.log(response1)
        response2 = await getPostsByIndex(0, response1.data.userData.id);
      }

      setPosts(response2.data.page.data);
      setLoading(false);
    }
    fetchInfo();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center xl:max-w-[1280px] xl:m-auto mt-6 xl:p-20  ">
      <Card className="">
        <div className="min-h-[90vh] xl:min-w-90">
          <div className="flex flex-col  items-center">
            <div className="grid grid-cols-1 gap-6 mt-10 px-5">
              {posts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
