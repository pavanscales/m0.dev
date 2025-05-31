"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageIcon, Send, Sparkles, Sun, Moon } from "lucide-react";

export default function Landingpage() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleGenerateApp = async () => {
    if (!inputValue.trim()) return;

    setIsGenerating(true);
    setResponseMessage(null);

    try {
      const formData = new FormData();
      formData.append("description", inputValue);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponseMessage(
        `Success! Server responded: ${data.message}, file: ${data.fileName || "No file"}`
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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="relative">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/95 backdrop-blur-sm transition-colors duration-300">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center transition-colors duration-300">
                <span className="text-white dark:text-black font-bold text-sm">M0</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                onClick={() => alert("Sign In functionality not implemented")}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
              >
                Sign In
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
              <Sparkles className="w-4 h-4" />
              AI-Powered Mobile Development
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent leading-tight transition-colors duration-300">
              Build any mobile app, fast.
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              Rork builds complete, cross-platform mobile apps using AI and React Native.
            </p>

            <Card className="max-w-4xl mx-auto p-1 shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-colors duration-300">
              <div className="relative">
                <Textarea
                  placeholder="Describe the mobile app you want to build..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full min-h-[140px] border-0 focus-visible:ring-0 text-lg p-6 resize-none bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                  disabled={isGenerating}
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                    onClick={handleImageIconClick}
                    disabled={isGenerating}
                    aria-label="Upload image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isGenerating}
                  />

                  {selectedFile && (
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                      {selectedFile.name}
                    </span>
                  )}
                </div>

                <Button
                  size="icon"
                  onClick={handleGenerateApp}
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute bottom-4 right-4 h-8 w-8 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                  aria-label="Generate App"
                >
                  {isGenerating ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>

            {responseMessage && (
              <div className="max-w-4xl mx-auto text-center text-sm text-gray-700 dark:text-gray-300 my-6">
                {responseMessage}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              {suggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
