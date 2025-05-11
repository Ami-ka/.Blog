"use client";
import Card from "@/app/components/Card";
import { getUser, getUserPosts } from "@/services/api"; // Added missing import for getPosts
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // Added missing import for Plus icon
import PostCard from "../../components/PostCard"; // Added missing import for PostCard
import Button from "@/app/components/Button";

export default function Profile() {
  
  const [userData, setUserData] = useState(null);
  const [blogname, setBlogname] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      try {
        const response = await getUser();
        console.log("response:", response.data);
        setUserData(response.data);
      } catch (err) {
        console.log("problem with getting user ", err);
        router.push("/");
      }
    }
    fetchUserData();
  }, [router]); // Added router as dependency

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getUserPosts();
        const user = await getUser();
        setBlogname(user.data.blogname);
        
        console.log(response);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке постов");
        setLoading(false);
      }
    }

    
    if (userData) {
      fetchPosts();
    }
  }, [userData]); 

  function handleCreate() {
    router.push("/blog/new");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="flex justify-center items-center xl:max-w-[1280px] xl:m-auto mt-6 xl:p-20  ">
      <Card className="">
        <div className="min-h-[90vh] xl:min-w-90">
          <div className="flex flex-col  items-center">
            <Image
              src="/icons/user.svg"
              width={100}
              height={100}
              alt="user.png"
            />
            <div className="text-center">
              <div className="text-3xl">{userData.name}</div>
              <div className="text-sm ">
                @{userData.name} <>·</> _ posts{" "}
                {/*TO-do save number of posts */}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="font-bold text-xl">{blogname}</h1>
              <Button onClick={handleCreate} className="mt-2">
                <div className="flex text-base items-center justify-between gap-1 ">
                  New post <Plus size={20} strokeWidth={2.75} />
                </div>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-10 px-5">
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
