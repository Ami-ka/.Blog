"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/services/api";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Underline } from "lucide-react";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Selection from "@/components/tiptap-extension/selection-extension";
import TrailingNode from "@/components/tiptap-extension/trailing-node-extension";
import Link from "@tiptap/extension-link";
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const toolbarRef = React.useRef(null);
   const isMobile = useMobile();
    const windowSize = useWindowSize();
    const [mobileView, setMobileView] = React.useState("main");
  
  const editor = useEditor({
    immediatelyRender: false,
    editable:false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
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
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    // Don't set content here - we'll update it after loading
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        setPost(response.data.post);
        console.log(response);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  // Update editor content when post is loaded
  useEffect(() => {
    if (editor && post && post.content) {
      try {
        // Parse the JSON string into an object
        const contentJson = JSON.parse(post.content);
        editor.commands.setContent(contentJson);
      } catch (error) {
        console.error("Error parsing post content JSON:", error);
        // Fallback to using the string directly if parsing fails
        editor.commands.setContent(post.content);
      }
    }
  }, [editor, post]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post Not Found</div>;

  return (
    <div className="">
      <EditorContext.Provider value={{ editor }}>
        
          <h1 className="text-center font-bold text-2xl mt-3">{post.heading}</h1>
        <div className="content-wrapper">
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content flex! flex-col-reverse! "
            >
             
          </EditorContent>
        </div>
      </EditorContext.Provider>
    </div>
  );
}