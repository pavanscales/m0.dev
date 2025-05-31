

"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Send, Sparkles } from "lucide-react";

export default function Landingpage() {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setSelectedFile(files[0]);
  };

  const handleGenerateApp = async () => {
    if (!inputValue.trim()) return;

    setIsGenerating(true);
    setResponseMessage(null);

    try {
      const formData = new FormData();
      formData.append("description", inputValue);
      if (selectedFile) formData.append("image", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setResponseMessage(
        `Success! Server responded: ${data.message}, file: ${
          data.fileName || "No file"
        }`
      );
      setInputValue("");
      setSelectedFile(null);
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message || "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions = [
    "Make a visual novel game",
    "Make an Airbnb-style app",
    "Make an Instagram-style app",
    "Make a meditation timer",
    "Create a habit tracker",
    "Build a calorie tracker",
    "Create a todo list",
    "Design a weather dashboard",
    "Design a fitness tracker",
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center max-w-xl w-full">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Build any mobile app, fast.
        </h1>
        <p className="text-gray-400 mt-3">
          Rork builds complete, cross-platform mobile apps using AI and React
          Native.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative max-w-xl w-full">
        <input
          type="text"
          placeholder="Describe the mobile app you want to build..."
          className="w-full rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-500 text-white text-lg pl-12 pr-12 py-4
            focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isGenerating}
          aria-label="App description input"
        />

        {/* Left icon */}
        <button
          type="button"
          onClick={handleImageIconClick}
          disabled={isGenerating}
          aria-label="Upload image"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isGenerating}
        />

        {/* Right icon */}
        <button
          type="button"
          onClick={handleGenerateApp}
          disabled={!inputValue.trim() || isGenerating}
          aria-label="Generate App"
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-white bg-blue-600 rounded-full p-2
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${isGenerating ? "cursor-wait" : "cursor-pointer"}`}
        >
          {isGenerating ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Info row below input */}
      <div className="flex items-center justify-between max-w-xl w-full mt-3 text-gray-400 text-sm select-none">
        <div>
          5 free messages left today.{" "}
          <button className="underline hover:text-white transition">Upgrade</button>
        </div>

        {/* Public toggle pill */}
        <button
          onClick={() => setIsPublic(!isPublic)}
          className={`select-none cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition
            ${
              isPublic
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          aria-pressed={isPublic}
          aria-label="Toggle Public/Private"
          type="button"
        >
          {isPublic ? "Public" : "Private"}
        </button>
      </div>

      {/* Selected file name */}
      {selectedFile && (
        <div className="max-w-xl w-full mt-2 text-gray-500 text-sm truncate">
          Selected file: {selectedFile.name}
        </div>
      )}

      {/* Response message */}
      {responseMessage && (
        <div className="max-w-xl w-full mt-6 text-center text-gray-400 text-sm">
          {responseMessage}
        </div>
      )}

      {/* Suggestions */}
      <div className="max-w-xl w-full mt-10 flex flex-wrap gap-3 justify-center">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => setInputValue(s)}
            className="rounded-full border border-gray-700 px-4 py-1 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition"
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
