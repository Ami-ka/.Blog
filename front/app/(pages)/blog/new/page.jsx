"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";


export default function newBlog() {
  return (
    <div>
      <SimpleEditor className={"min-h-[100vh]"} editable={true} heading="" IsPosting={true}></SimpleEditor>

    </div>
  );
}
