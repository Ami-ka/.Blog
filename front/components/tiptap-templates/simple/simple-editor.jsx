"use client";

import * as React from "react";
import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
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

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-templates/simple/data/content.json";
import { Send, SendHorizonal } from "lucide-react";
import { postPosts, updatePost } from "@/services/api";
import { stringifyError } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";

const MainToolbarContent = ({ onHighlighterClick, onLinkClick, isMobile }) => {
  return (
    <>
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
      <ToolbarSeparator />

      <Spacer />
      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

// async function handleSubmit(editor, heading){

//   const json = editor.getJSON();

  
//   const response = postPosts(json,heading);

// }

export function SimpleEditor({editable, content, heading,IsPosting, postId, className=""}) {
  className = "simple-editor-content flex! flex-col bg-[#302F3F] rounded-3xl mt-100 " + className  

  async function handleSubmit(e){
    
    e.preventDefault();
    if(!editor) return;
    const json = JSON.stringify(editor.getJSON());
  
    
    if(IsPosting){
      const response = await postPosts(json,heading2);
    router.push("/profile");
    }
    else{
      console.log(heading2);
      const response = await updatePost(postId, heading2, json);
      router.push("/profile");
      
      
    }
  
  }
  const router = useRouter();



  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState("main");
  const toolbarRef = React.useRef(null);
  const [heading2, setHeading] = React.useState(heading);

 
  const editor = useEditor({
    immediatelyRender: false,
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
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
  });
  
  React.useEffect(() => {
    if (heading !== heading2) {
      setHeading(heading);
    }
  }, [heading]);

  React.useEffect(() => {
    if (editor && content) {
      console.log("Setting editor content:", content);
      
      // Make sure we handle both string and object content
      try {
        if (typeof content === 'string') {
          // If content is already a JSON string
          editor.commands.setContent(JSON.parse(content));
        } else {
          // If content is already an object
          editor.commands.setContent(content);
        }
        
        // Set editable status after content is set
        editor.setEditable(editable !== false);
      } catch (error) {
        console.error("Error setting editor content:", error);
      }
    }
  }, [editor, editable, content]);

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
    
    
    // if(!editable){
    //   editor.setEditable(false);
    // }
  }, [isMobile, mobileView]);

  return (
    <div>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={
            isMobile
              ? {
                  bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
                }
              : {}
          }
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>
        <div className="content-wrapper">
          
          <EditorContent
            editor={editor}
            role="presentation"
            className={className}
          >
            <form className=" px-2 flex justify-center  ml-4 mt-8" >
              <Button onClick={handleSubmit} className="h-[36px] w-[36px]  mr-4  bg-[#B4499D]!  rounded-full! hover:bg-[var(--orange)]! transition-colors! duration-300 font-bold!    " >
                <SendHorizonal color="white"></SendHorizonal>
              </Button>
              <input
            name="heading"
            required
            placeholder="Enter heading of post"
            className=" appearance-none border-0 rounded w-full  text-white   leading-tight focus:outline-none focus:shadow-md"
            value={heading2}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
            </form>
          </EditorContent>
          
        </div>
      </EditorContext.Provider>
    </div>
  );
}
