"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Mathematics } from "@tiptap/extension-mathematics";
import { Markdown } from "@tiptap/markdown";
import { common, createLowlight } from "lowlight";
import EditorToolbar from "./editor-toolbar";

const lowlight = createLowlight(common);

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
        HTMLAttributes: {
          class: "hljs",
        },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg border",
        },
      }),
      Mathematics.configure({
        katexOptions: {
          throwOnError: false,
        },
      }),
      Markdown.configure({
        markedOptions: {
          gfm: true,
          breaks: true,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[280px] p-4 focus:outline-none bg-white rounded-b-lg text-sm",
      },
    },
    immediatelyRender: false, //untuk mencegah error saat editor belum siap, terutama untuk ekstensi yang memerlukan akses DOM seperti Image
  });

  return (
    <div className="w-full rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-black">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
