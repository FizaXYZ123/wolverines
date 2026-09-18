"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  RotateCcw,
  RotateCw,
  Code,
  Eye,
  RemoveFormatting,
  ChevronDown,
  Check,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const FORMAT_OPTIONS = [
  { value: "p", label: "Paragraph", desc: "Normal text" },
  { value: "h2", label: "Heading 2 (H2)", desc: "Main section" },
  { value: "h3", label: "Heading 3 (H3)", desc: "Subsection" },
  { value: "h4", label: "Heading 4 (H4)", desc: "Minor header" },
  { value: "blockquote", label: "Quote", desc: "Blockquote callout" },
  { value: "pre", label: "Code Block", desc: "Monospaced code" },
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
  minHeight = "280px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value || "");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [currentFormat, setCurrentFormat] = useState("p");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initialize and sync content with external value
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setHtmlSource(value || "");
    updateCounts(value || "");
  }, [value, isSourceMode]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const updateCounts = (textOrHtml: string) => {
    // Strip tags to count real text
    const text = textOrHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    setCharCount(text.length);
    setWordCount(text ? text.split(/\s+/).length : 0);
  };

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setHtmlSource(html);
      updateCounts(html);
    }
  }, [onChange]);

  const exec = (command: string, val: string | undefined = undefined) => {
    if (isSourceMode) return;
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  const handleSelectFormat = (tag: string) => {
    if (isSourceMode) return;
    if (tag === "p") {
      exec("formatBlock", "<p>");
    } else {
      exec("formatBlock", `<${tag}>`);
    }
    setCurrentFormat(tag);
    setIsDropdownOpen(false);
  };

  const handleAddLink = () => {
    if (isSourceMode) return;
    const url = prompt("Enter the link URL (https://...):");
    if (url) {
      exec("createLink", url);
    }
  };

  const handleAddImage = () => {
    if (isSourceMode) return;
    const url = prompt("Enter Image URL (https://...):");
    if (url) {
      exec("insertImage", url);
    }
  };

  const handleToggleSource = () => {
    if (isSourceMode) {
      // Switching from Code to Visual
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlSource;
      }
      onChange(htmlSource);
      setIsSourceMode(false);
    } else {
      // Switching from Visual to Code
      if (editorRef.current) {
        setHtmlSource(editorRef.current.innerHTML);
      }
      setIsSourceMode(true);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlSource(val);
    onChange(val);
    updateCounts(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  const activeOption = FORMAT_OPTIONS.find((o) => o.value === currentFormat) || FORMAT_OPTIONS[0];

  return (
    <div className="w-full rounded-2xl bg-[#141414] border border-white/10 overflow-hidden shadow-lg focus-within:border-[#D32F2F] transition-all">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-[#0f0f0f] border-b border-white/10 text-neutral-300 select-none">
        {/* Left Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Custom Styled Block Format Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isSourceMode}
              className={`px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border ${
                isDropdownOpen ? "border-[#D32F2F] ring-1 ring-[#D32F2F]" : "border-white/10"
              } text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer disabled:opacity-30`}
            >
              <span>{activeOption.label}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Custom Dark Dropdown Popover */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 z-50 w-52 rounded-2xl bg-[#181818] border border-white/15 p-1.5 shadow-2xl shadow-black/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                {FORMAT_OPTIONS.map((opt) => {
                  const isSelected = opt.value === currentFormat;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectFormat(opt.value)}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#D32F2F] text-white font-bold shadow-md shadow-red-950"
                          : "text-neutral-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{opt.label}</div>
                        <div className={`text-[10px] ${isSelected ? "text-red-100" : "text-neutral-500"}`}>
                          {opt.desc}
                        </div>
                      </div>
                      {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Inline Styles */}
          <button
            type="button"
            onClick={() => exec("bold")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("formatBlock", "<blockquote>")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Quote Block"
          >
            <Quote className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Media & Inserts */}
          <button
            type="button"
            onClick={handleAddLink}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleAddImage}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Insert Image by URL"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Horizontal Divider"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("removeFormat")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => exec("undo")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Undo"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            disabled={isSourceMode}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-30"
            title="Redo"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Toggle */}
        <button
          type="button"
          onClick={handleToggleSource}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isSourceMode
              ? "bg-[#D32F2F] text-white"
              : "bg-white/5 hover:bg-white/10 text-neutral-300"
          }`}
          title={isSourceMode ? "Switch to Visual Mode" : "Switch to HTML Code Mode"}
        >
          {isSourceMode ? (
            <>
              <Eye className="h-3.5 w-3.5" />
              Visual
            </>
          ) : (
            <>
              <Code className="h-3.5 w-3.5" />
              HTML
            </>
          )}
        </button>
      </div>

      {/* Editor Body */}
      {isSourceMode ? (
        <textarea
          value={htmlSource}
          onChange={handleSourceChange}
          placeholder="Edit raw HTML source code here..."
          className="w-full p-4 bg-[#101010] text-emerald-400 font-mono text-xs focus:outline-none resize-y leading-relaxed"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          data-placeholder={placeholder}
          className="p-4 text-white text-sm focus:outline-none overflow-y-auto leading-relaxed prose prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-neutral-500 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-white [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-2 [&_h4]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_blockquote]:border-l-2 [&_blockquote]:border-[#D32F2F] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-300 [&_blockquote]:my-3 [&_a]:text-[#D32F2F] [&_a]:underline [&_img]:rounded-xl [&_img]:max-h-72 [&_img]:my-3 [&_hr]:border-white/10 [&_hr]:my-4"
          style={{ minHeight }}
        />
      )}

      {/* Editor Footer Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] border-t border-white/10 text-[11px] text-neutral-500">
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
        <div>
          <span className="text-neutral-400 font-mono">
            {isSourceMode ? "HTML Source Mode" : "WYSIWYG Visual Mode"}
          </span>
        </div>
      </div>
    </div>
  );
}
