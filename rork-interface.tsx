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

export default function Component() {
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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-gray-950 transition-colors duration-300" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] transition-colors duration-300" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/95 backdrop-blur-sm transition-colors duration-300">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center transition-colors duration-300">
                  <span className="text-white dark:text-black font-bold text-sm">R</span>
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
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-sm bg-white dark:bg-black border-gray-200 dark:border-gray-700 transition-colors duration-300 p-8">
            <div className="text-center space-y-6">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white dark:text-black font-bold text-xl">R</span>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">Welcome to Rork</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to start building your mobile apps</p>
              </div>
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 text-black dark:text-white"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{" "}
                <span className="underline cursor-pointer hover:text-black dark:hover:text-white transition-colors">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:text-black dark:hover:text-white transition-colors">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </DialogContent>
        </Dialog>



        {/* Loading Modal */}
        <Dialog open={isGenerating} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md bg-black border-gray-800 text-center p-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-2xl">R</span>
              </div>
              <div>
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-white text-lg font-medium mb-2">Generating your app...</h3>
                <p className="text-gray-400 text-sm">This may take a few moments</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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

            {/* Input Section */}
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
              {/* Empty state */}
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
