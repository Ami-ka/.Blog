import { Content } from "@radix-ui/react-dropdown-menu";
import axios from "axios";

import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

export const registerUser = (name, email, password) => {
  return api.post("/register", { name, email, password });
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  try{
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }catch(err){
    throw err;
  }
};
export async function getUserById(id) {
  return api.get(`/user/${id}`);
}

export async function setUserData(name, blogName){
  const token = localStorage.getItem('token');
  try{
    const response = await api.put('/user', {name: `${name}`, blogName: `${blogName}`},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }catch(err){
    throw err;
  }
};

export const logOutUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.log("logout failed", error);
    localStorage.removeItem("token");
    throw error;
  }
};

export async function getUserPosts() {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserPostsById(id){
  try{
    const response = await api.get(`/user/${id}/posts`);
    return response;
  }catch(error){
    throw error;
  }
}

export async function getPost(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postPosts(json, heading) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      "/post",
      { heading: `${heading}`, content: `${json}` },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `/post/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Post not found");
    }
    throw error;
  }
}

export async function unlikePost(postId){
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `/post/${postId}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Post not found");
    }
    throw error;
  }
}

export async function updatePost(postId, heading, content){
  const token = localStorage.getItem('token');
  try{
    console.log(heading, content);
    const response = await api.post(`/post/${postId}/edit`, 
      {heading: `${heading}`, content: `${content}`}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  }
  catch(err){
    throw err;
  }
}

export async function getPostLikes(postId) {
  try{
    const response = api.get(
      `/post/${postId}/like`
    );
    return response;
  }catch(err){
    if(err.response.status === 403){
      throw new Error("Post not found");
    }
    throw err;
  
  }
}

export async function getPostsByIndex(pageNum, userId = -1,url){
  if(url){
    const response = await axios.post(url, {id:`${userId}`})
    return response;
  }
    try{
      const response = await api.post(
        `/posts/${pageNum}`,{
          id: `${userId}`,
        }
      );
      return response;

    }catch (error){
      throw error;
    }
}


export async function searchPosts(searchValue, userId, orderBy = "", url = null){
  if(url){
    const response = await axios.get(url, {
      params: {
        id: userId
      }
    });
    return response;
  }
  
  try{
    const response = await api.get(
      `/posts/search/${searchValue}`, {
        params: {
          id: userId,
          orderBy: orderBy
        }
      }
    );
    return response;
  } catch (error){
    throw error;
  }
}

export default api;
