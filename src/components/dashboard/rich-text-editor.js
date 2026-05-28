"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./editor-toolbar";

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3], // Hanya izinkan H2 dan H3 demi kerapian SEO
        },
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      // Mengirimkan teks berformat HTML ke komponen formulir utama
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // Class styling untuk area mengetik agar mirip textarea rapi
        class:
          "prose max-w-none min-h-[200px] p-4 focus:outline-none bg-white rounded-b-lg text-sm",
      },
    },
  });

  return (
    <div className="w-full rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-black">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
