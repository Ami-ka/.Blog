"use client";

import BlogEditor from "@/app/components/BlogEditor";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function newBlog() {
  return (
    <div>
      <SimpleEditor></SimpleEditor>
    </div>
  );
}
