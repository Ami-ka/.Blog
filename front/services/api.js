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

export const getUser = () => {
  const token = localStorage.getItem("token");
  return api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export async function getPosts() {
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

export async function postPosts(html, heading) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      "/post",
      { heading: `${heading}`, content: `${html}` },
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

export default api;
