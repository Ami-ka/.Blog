'use client'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { getPost } from '@/services/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
    const {id} = useParams();
    const [content, setContent] = useState(null);
    const [heading, setHeading] =useState("");
    useEffect(()=>{
        async function fetchPost(){
            const response = await getPost(id);
            console.log(response);
            setContent(response.data.post.content);
            setHeading(response.data.post.heading)
         
            
        }
        fetchPost();
    
    },[id])

  return (
    <div><SimpleEditor content={content} heading={heading} IsPosting={false} postId={id}></SimpleEditor></div>
  );
}

export default page