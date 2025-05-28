"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  ImageIcon,
  Send,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Download,
  AlertCircle,
  X,
  Share,
  ChevronDown,
  Play,
  Zap,
  Layers,
  Code,
  Upload,
  Info,
} from "lucide-react"

export default function Landingpage() {
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isDark, setIsDark] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked")
    setShowAuthModal(false)
  }

  const handleGenerateApp = () => {
    if (inputValue.trim()) {
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        setShowDevModal(true)
      }, 2000)
    }
  }

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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">=
      <div className="relative">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/95 backdrop-blur-sm transition-colors duration-300">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center transition-colors duration-300">
                  <span className="text-white dark:text-black font-bold text-sm">M0</span>
                </div>
                <span className="font-semibold text-lg text-black dark:text-white transition-colors duration-300">
                </span>
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
                  onClick={() => setShowAuthModal(true)}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </header>
    

        <div className="container mx-auto px-6 py-20">
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

            <div className="max-w-4xl mx-auto mb-12">
              <Card className="p-1 shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-colors duration-300">
                <div className="relative">
                  <Textarea
                    placeholder="Describe the mobile app you want to build..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full min-h-[140px] border-0 focus-visible:ring-0 text-lg p-6 resize-none bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    onClick={handleGenerateApp}
                    disabled={!inputValue.trim()}
                    className="absolute bottom-4 right-4 h-8 w-8 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card> 

              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  4 free messages left today.
                 
                </span>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Public
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-20">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 transition-all duration-200"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white transition-colors duration-300">
                Your Projects
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-8 text-center border-dashed border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-white dark:bg-black">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-medium mb-2 text-black dark:text-white transition-colors duration-300">
                  Create your first app
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
                  Describe your mobile app idea and let AI build it for you.
                </p>
                <Button
                  size="sm"
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                >
                  Get Started
                </Button>
              </Card>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
