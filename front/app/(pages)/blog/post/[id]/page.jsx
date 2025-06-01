"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/services/api";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions (используем те же, что в SimpleEditor) ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";

// --- Styles (те же что в SimpleEditor) ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false, // Отключаем редактирование для просмотра
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Post content view",
      },
    },
    extensions: [
      // Используем те же расширения, что и в SimpleEditor
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: true }), // Включаем клики по ссылкам для просмотра
    ],
  });

  // Загружаем пост
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPost(id);
        console.log("Fetched post:", response);
        setPost(response.data.post);
      } catch (error) {
        console.error("Loading error:", error);
        setError("Post wasn't loaded");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Устанавливаем контент в редактор (используем ту же логику, что в SimpleEditor)
  useEffect(() => {
    if (editor && post?.content) {
      console.log("Setting editor content:", post.content);

      try {
        if (typeof post.content === "string") {
          // Если контент - это JSON строка, парсим её
          const parsedContent = JSON.parse(post.content);
          editor.commands.setContent(parsedContent);
          console.log("Content set as parsed JSON:", parsedContent);
        } else {
          // Если контент уже объект, используем как есть
          editor.commands.setContent(post.content);
          console.log("Content set as object:", post.content);
        }

        // Убеждаемся, что редактор не редактируемый
        editor.setEditable(false);
      } catch (error) {
        console.error("Error setting editor content:", error);
        // Fallback - устанавливаем сообщение об ошибке
        editor.commands.setContent("<p>Ошибка загрузки контента поста</p>");
      }
    }
  }, [editor, post]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#44435a" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-pulse">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "#f07e7f" }}
            ></div>
          </div>
          <div className="text-white text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#44435a" }}
      >
        <div
          className="text-center p-8 rounded-2xl border-2"
          style={{ backgroundColor: "#3a3950", borderColor: "#f07e7f" }}
        >
          <div className="text-6xl mb-4">⚠️</div>
          <div
            className="text-xl font-semibold mb-2"
            style={{ color: "#f07e7f" }}
          >
            {error}
          </div>
          <div className="text-gray-300">Please try again later</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#44435a" }}
      >
        <div
          className="text-center p-8 rounded-2xl"
          style={{ backgroundColor: "#3a3950" }}
        >
          <div className="text-6xl mb-4">📝</div>
          <div className="text-xl font-semibold text-white mb-2">
            Пост не найден
          </div>
          <div className="text-gray-300">
            The post you're looking for doesn't exist
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <EditorContext.Provider value={{ editor }}>
          {/* Hero Section with Post Title */}
          <div className="text-center mb-12">
            <div
              className="inline-block p-1 rounded-3xl mb-6"
              style={{
                background: "linear-gradient(135deg, #f07e7f 0%, #b4499d 100%)",
              }}
            >
              <div
                className="px-8 py-4 rounded-3xl"
                style={{ backgroundColor: "#44435a" }}
              >
                <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl  font-bold text-white leading-tight">
                  {post.heading}
                </h2>
              </div>
            </div>

            
            <div className="flex items-center justify-center mt-8 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-[#b4499d]/50 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-[#b4499d] to-[#f07e7f] rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#f07e7f]/50 to-transparent w-32"></div>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="relative">
            <EditorContent
              editor={editor}
              role="presentation"
              className="simple-editor-content prose prose-invert max-w-none"
            />
          </div>
          {/* Post Metadata */}
          {post.created_at && (
            <div className="mt-12 text-center">
              <div
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-full"
                style={{ backgroundColor: "#3a3950" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#b4499d" }}
                ></div>
                <span className="text-gray-300 text-sm font-medium">
                  Created:{" "}
                  {new Date(post.created_at).toLocaleDateString("en-En", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#f07e7f" }}
                ></div>
              </div>
            </div>
          )}
        </EditorContext.Provider>
      </div>
    </div>
  );
}
