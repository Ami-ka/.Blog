import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { Bold, Italic, Strikethrough } from "lucide-react";

import { postPosts } from "@/services/api";
import { useRouter } from "next/navigation";

const MenuBar = () => {
  const router = useRouter();
  const { editor } = useCurrentEditor();
  const [heading, setHeading] = useState("");
  if (!editor) {
    return null;
  }
  async function submit() {
    const html = editor.getHTML();
    const response = await postPosts(html, heading);
    if (response.status == 201) {
      router.push("/blog");
    } else {
      console.log(response.status);
      console.log("post submit error");
    }
  }
  return (
    <div className="w-50 bg-[var(--card)] rounded-md pt-2 pl-2 pr-2 pb-2">
      <input
        onChange={(e) => setHeading(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="your post heading"
      />

      <div className="grid grid-cols-3 grid-rows-1 space-x-2   mb-2 ">
        <Button
          className="flex items-center justify-center"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold size={20} strokeWidth={3} />
        </Button>
        <Button
          className="flex items-center justify-center"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic size={20} strokeWidth={3} />
        </Button>

        <Button
          className="flex items-center justify-center"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={20} strokeWidth={3} />
        </Button>

        <div> </div>
      </div>
      <Button onClick={submit}>Submit</Button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
`;

const BlogEditor = () => {
  return (
    <div className="flex justify-center mt-15 h-100 ">
      <div className="">
        <Card className="xl:w-300  w-100">
          <EditorProvider
            slotBefore={<MenuBar />}
            slotAfter={<div className="flex justify-end mt-3"></div>}
            extensions={extensions}
            content={content}
          ></EditorProvider>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditor;
