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
        console.error("Ошибка при загрузке поста:", error);
        setError("Не удалось загрузить пост");
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
        if (typeof post.content === 'string') {
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
        editor.commands.setContent('<p>Ошибка загрузки контента поста</p>');
      }
    }
  }, [editor, post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-white">Загрузка поста...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-white">Пост не найден</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <EditorContext.Provider value={{ editor }}>
        
        <div className="content-wrapper">
          {/* Заголовок поста */}
          <div className="px-2 flex justify-center ml-4 mt-8 mb-6">
            <h1 className="text-center font-bold text-3xl text-white w-full">
              {post.heading}
            </h1>
          </div>
          
          {/* Контент поста - используем те же стили что в SimpleEditor */}
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content flex! flex-col bg-[#302F3F] rounded-3xl"
          />
        </div>
        
        {/* Дополнительная информация о посте */}
        {post.createdAt && (
          <div className="mt-8 pt-4 border-t border-gray-600 text-gray-400 text-sm text-center">
            Создано: {new Date(post.createdAt).toLocaleDateString('ru-RU')}
          </div>
        )}
        
      </EditorContext.Provider>
    </div>
  );
}