// src/components/dashboard/editor-toolbar.js
"use client";

import { useState, useEffect } from "react"; // 🆕 Tambah useState dan useEffect
import { Bold, Italic, List, ListOrdered, Heading2, Quote } from "lucide-react";

export default function EditorToolbar({ editor }) {
  // 🆕 State buatan untuk memicu render ulang komponen secara instan
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (!editor) return;

    // 🆕 Setiap kali ada interaksi (klik tombol / kursor pindah), paksa Toolbar untuk update warna
    const handleTransaction = () => {
      setUpdateTrigger((prev) => prev + 1);
    };

    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  if (!editor) return null;

  const buttonClass = (isActive) => `
    p-2 rounded-md transition-all text-sm font-medium border
    ${
      isActive
        ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm" // Aktif: Biru
        : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900" // Mati: Abu-abu
    }
  `;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </button>
    </div>
  );
}
