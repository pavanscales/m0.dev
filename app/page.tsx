

"use client"

import React, { useState, useRef, useCallback, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ImageIcon, Send } from "lucide-react"

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
]

export default function Landingpage() {
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, startGenerating] = useTransition()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dark mode once
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const handleImageIconClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }, [])

  const handleGenerateApp = useCallback(() => {
    if (!inputValue.trim()) return

    startGenerating(() => {
      setResponseMessage(null)

      const formData = new FormData()
      formData.append("description", inputValue)
      if (selectedFile) formData.append("image", selectedFile)

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`)
          const data = await res.json()
          setResponseMessage(`✅ ${data.message}, file: ${data.fileName || "No file"}`)
          setInputValue("")
          setSelectedFile(null)
        })
        .catch((err) => {
          setResponseMessage(`❌ ${err.message || "Unknown error"}`)
        })
    })
  }, [inputValue, selectedFile])

  return (
    <div className="min-h-screen bg-black transition-colors duration-300">
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Build any mobile app, fast.
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>

          <Card className="max-w-4xl mx-auto p-1 shadow-lg border-gray-700 bg-black">
            <div className="relative">
              <Textarea
                placeholder="Describe the mobile app you want to build..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full min-h-[100px] border-0 focus-visible:ring-0 text-lg p-6 resize-none bg-black text-white placeholder:text-gray-500"
                disabled={isGenerating}
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={handleImageIconClick}
                  disabled={isGenerating}
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
                  <span className="text-sm text-gray-400 ml-2 truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                )}
              </div>

              <Button
                size="icon"
                onClick={handleGenerateApp}
                disabled={!inputValue.trim() || isGenerating}
                className="absolute bottom-4 right-4 h-8 w-8 bg-white text-black hover:bg-gray-200"
              >
                {isGenerating ? (
                  <svg
                    className="animate-spin h-5 w-5"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800">
              <div className="text-sm text-gray-400">
                5 free messages left today.
              </div>
            </div>
          </Card>

          {responseMessage && (
            <div className="max-w-4xl mx-auto text-center text-sm text-gray-400 my-6 animate-fadeIn">
              {responseMessage}
            </div>
          )}

          <div className="flex flex-wrap justify-center mt-10 gap-4">
            {suggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-gray-700 transition"
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
