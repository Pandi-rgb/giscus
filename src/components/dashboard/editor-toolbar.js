"use client";

import { useEffect, useState } from "react";
import {
  Bold,
  Heading2,
  Image as ImageIcon,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
} from "lucide-react";

export default function EditorToolbar({ editor }) {
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      setUpdateTrigger((prev) => prev + 1);
    };

    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  if (!editor) return null;

  function insertImage() {
    const src = window.prompt("Image URL");

    if (!src) return;

    const alt = window.prompt("Alt text") || "";
    editor.chain().focus().setImage({ src, alt }).run();
  }

  function insertInlineMath() {
    const latex = window.prompt("Inline LaTeX", "E = mc^2");

    if (!latex) return;

    editor.chain().focus().insertInlineMath({ latex }).run();
  }

  function insertBlockMath() {
    const latex = window.prompt("Block LaTeX", "\\sum_{i=1}^{n} x_i");

    if (!latex) return;

    editor.chain().focus().insertBlockMath({ latex }).run();
  }

  function insertText() {
    const text = window.prompt("Text");

    if (!text) return;

    editor.chain().focus().insertText(text).run();

  }

  function insertMarkdown() {
    const markdown = window.prompt(
      "Markdown",
      "## Heading\n\n```js\nconsole.log('hello')\n```"
    );

    if (!markdown) return;

    editor.commands.insertContent(markdown, {
      contentType: "markdown",
    });
  }

  const buttonClass = (isActive) => `
    p-2 rounded-md transition-all text-sm font-medium border
    ${
      isActive
        ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm"
        : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
    }
  `;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-gray-300 p-2">
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

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={buttonClass(editor.isActive({ textAlign: "left" }))}
        title="AlignLeft"
      >
        <AlignLeft className="h-4 w-4" />

      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={buttonClass(editor.isActive({ textAlign: "center" }))}
        title="AlignCenter"
      >
        <AlignCenter className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={buttonClass(editor.isActive({ textAlign: "right" }))}
        title="AlignRight"
      >
        <AlignRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={buttonClass(editor.isActive({ textAlign: "justify" }))}
        title="AlignJustify"
      >
        <AlignJustify className="h-4 w-4" />
      </button>
    </div>
  );
}
