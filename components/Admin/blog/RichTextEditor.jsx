"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { TableKit } from "@tiptap/extension-table";
import { useCallback, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link2,
  Unlink,
  ImageIcon,
  Youtube as YoutubeIcon,
  Table as TableIcon,
  Undo2,
  Redo2,
  RemoveFormatting,
  Heading2,
  Heading3,
  Heading4,
  Sparkles,
  HelpCircle,
  Megaphone,
  Info,
} from "lucide-react";

import InternalLinkPicker from "./InternalLinkPicker";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import { cleanPastedHtml } from "@/lib/seo/smartPaste";

function ToolbarBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-slate-600 transition ${
        active
          ? "border-blue-300 bg-blue-50 text-blue-700 font-bold"
          : "border-slate-200 bg-white hover:bg-slate-50"
      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start writing your article (paste from Docs/Word/AI for smart semantic conversion)…",
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutube, setShowYoutube] = useState(false);
  const [pasteNotice, setPasteNotice] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4, 5, 6] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-xl max-w-full h-auto my-6 border border-slate-200" },
      }),
      Placeholder.configure({ placeholder }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: { class: "rounded-xl overflow-hidden my-6" },
      }),
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[360px] px-5 py-4 focus:outline-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl",
      },
      transformPastedHTML(html) {
        setPasteNotice(true);
        setTimeout(() => setPasteNotice(false), 3000);
        return cleanPastedHtml(html);
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && value !== undefined) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  const setLink = useCallback(
    (href, text) => {
      if (!editor) return;
      if (!href) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      if (text) {
        editor.chain().focus().insertContent(`<a href="${href}">${text}</a>`).run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
      }
      setLinkOpen(false);
    },
    [editor]
  );

  const insertImage = useCallback(
    (url, alt = "") => {
      if (!editor || !url) return;
      editor.chain().focus().setImage({ src: url, alt }).run();
      setImagePickerOpen(false);
    },
    [editor]
  );

  const insertYoutube = useCallback(() => {
    if (!editor || !youtubeUrl.trim()) return;
    editor.commands.setYoutubeVideo({ src: youtubeUrl.trim() });
    setYoutubeUrl("");
    setShowYoutube(false);
  }, [editor, youtubeUrl]);

  const insertCallout = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent(
        `<div class="p-4 my-4 rounded-xl border border-blue-200 bg-blue-50/70 text-slate-800"><p><strong>💡 Key Takeaway:</strong> Enter critical insight or recommendation here.</p></div>`
      )
      .run();
  }, [editor]);

  const insertFaqBlock = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent(
        `<div class="p-4 my-4 rounded-xl border border-slate-200 bg-slate-50"><h3>Frequently Asked Question</h3><p>Clear, direct factual answer addressing search intent.</p></div>`
      )
      .run();
  }, [editor]);

  const insertCtaBlock = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent(
        `<div class="p-6 my-6 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"><h3>Need help optimizing your website?</h3><p>Get a free digital audit and practical roadmap from HD Web Studios.</p><p><a href="/contact" class="inline-block mt-3 px-5 py-2 bg-white text-blue-700 font-bold rounded-xl no-underline">Book a Free Consultation</a></p></div>`
      )
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Top Smart Paste Notification Bar */}
      {pasteNotice && (
        <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 animate-fadeIn">
          <Sparkles size={13} className="text-emerald-600" />
          <span>Smart Paste active: Cleaned formatting, normalized headings to H2+, and sanitized dangerous attributes.</span>
        </div>
      )}

      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 bg-slate-50 p-2">
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <Undo2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <Redo2 className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2 (Primary Section)"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3 (Sub-section)"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          active={editor.isActive("heading", { level: 4 })}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code block"
        >
          <Code className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal divider">
          <Minus className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarBtn onClick={() => setLinkOpen(true)} active={editor.isActive("link")} title="Insert internal or external link">
          <Link2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          title="Remove link"
        >
          <Unlink className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => setImagePickerOpen(true)} title="Insert image with alt text">
          <ImageIcon className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => setShowYoutube((v) => !v)} title="Embed YouTube video">
          <YoutubeIcon className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          title="Insert table"
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        {/* Custom Semantic Blocks */}
        <ToolbarBtn onClick={insertCallout} title="Insert Highlight Callout Box">
          <Info className="h-4 w-4 text-blue-600" />
        </ToolbarBtn>
        <ToolbarBtn onClick={insertFaqBlock} title="Insert FAQ Block">
          <HelpCircle className="h-4 w-4 text-emerald-600" />
        </ToolbarBtn>
        <ToolbarBtn onClick={insertCtaBlock} title="Insert Conversion CTA Banner">
          <Megaphone className="h-4 w-4 text-purple-600" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-slate-200" />
        <ToolbarBtn
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarBtn>
      </div>

      {showYoutube && (
        <div className="flex gap-2 border-b border-slate-100 bg-amber-50 px-3 py-2">
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-white"
          />
          <button
            type="button"
            onClick={insertYoutube}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Embed
          </button>
        </div>
      )}

      <EditorContent editor={editor} />

      {linkOpen && (
        <InternalLinkPicker
          onSelect={setLink}
          onClose={() => setLinkOpen(false)}
        />
      )}

      {imagePickerOpen && (
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">Insert image</p>
          <MediaPicker
            value=""
            label=""
            onChange={(url) => {
              const alt = window.prompt("Meaningful Alt Text for this image (critical for accessibility & SEO):") || "";
              insertImage(url, alt);
            }}
          />
          <button
            type="button"
            onClick={() => setImagePickerOpen(false)}
            className="mt-2 text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
