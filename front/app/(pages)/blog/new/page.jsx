"use client";

import BlogEditor from "@/app/components/BlogEditor";
import Button from "@/app/components/Button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useState } from "react";

export default function newBlog() {
  return (
    <div>
      <SimpleEditor editable={true} heading="" IsPosting={true}></SimpleEditor>

    </div>
  );
}
