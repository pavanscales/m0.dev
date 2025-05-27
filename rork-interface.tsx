"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, ImageIcon, Send, ArrowRight } from "lucide-react"

export default function Component() {
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Build any mobile app, fast.</h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>

          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Textarea
                placeholder="Describe the mobile app you want to build..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder-gray-500 text-lg p-6 rounded-lg resize-none"
              />
              <Button size="icon" className="absolute bottom-4 left-4 bg-gray-800 hover:bg-gray-700">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>
                5 free messages left today. <span className="text-white underline cursor-pointer">Upgrade</span>
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-gray-800 text-white">
                  Public
                </Badge>
                <Button size="icon" className="bg-gray-800 hover:bg-gray-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full px-4 py-2"
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            ))}
          </div>
        </div>

        {/* Your Projects Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          <div className="text-gray-400">{/* Projects would be displayed here */}</div>
        </div>

        {/* Search Bar */}
        <div className="fixed bottom-8 right-8">
          <Card className="bg-white text-black p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Where to?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-0 focus-visible:ring-0 text-sm w-48"
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Anywhere • Any week • Add guests</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
