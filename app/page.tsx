"use client"

import { trpc } from "@/lib/trpcClient"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Search, ImageIcon, Send, ArrowRight, Sparkles, Sun, Moon } from "lucide-react"

export default function Landingpage() {
  const [inputValue, setInputValue] = useState("")
  const [isDark, setIsDark] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const generateAppMutation = trpc.app.generate.useMutation({
    onSuccess: (data) => {
      setIsGenerating(false)
      setShowDevModal(true)
      console.log("Generated app data:", data)
      // Optionally store data for display
    },
    onError: (error) => {
      setIsGenerating(false)
      alert("Failed to generate app: " + error.message)
    },
  })

  const handleGenerateApp = () => {
    if (inputValue.trim()) {
      setIsGenerating(true)
      generateAppMutation.mutate({ description: inputValue.trim() })
    }
  }

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
      return next
    })
  }

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked")
    setShowAuthModal(false)
  }

  // Trigger hidden file input click
  const handleImageIconClick = () => {
    fileInputRef.current?.click()
  }

  // Handle file input change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      console.log("Selected file:", file)
      // Handle preview or upload here
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
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/95 backdrop-blur-sm transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center transition-colors duration-300">
                <span className="text-white dark:text-black font-bold text-sm">M0</span>
              </div>
              <span className="font-semibold text-lg text-black dark:text-white transition-colors duration-300"></span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                aria-label="Toggle theme"
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

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="p-1 shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-colors duration-300">
              <div className="relative">
                <Textarea
                  placeholder="Describe the mobile app you want to build..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full min-h-[140px] border-0 focus-visible:ring-0 text-lg p-6 resize-none bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                  aria-label="App description"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                    onClick={handleImageIconClick}
                    aria-label="Upload image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
                <Button
                  size="icon"
                  onClick={handleGenerateApp}
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute bottom-4 right-4 h-8 w-8 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
                  aria-label="Generate app"
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

        <section className="mb-16">
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
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-black dark:text-white transition-colors duration-300">
                Discover AI apps
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
                Use AI to build your app ideas easily and quickly.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                onClick={() => alert("Get Started clicked")}
              >
                Get Started
              </Button>
            </Card>
            {/* Add more project cards here */}
          </div>
        </section>
      </main>

      {/* Sign In Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <div className="flex flex-col items-center gap-6 p-6">
            <h3 className="text-xl font-semibold text-center">Sign In</h3>
            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Development Modal (Shown after generation) */}
      <Dialog open={showDevModal} onOpenChange={setShowDevModal}>
        <DialogContent>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your AI-generated app is ready!</h3>
            <p className="mb-4">You can now explore the generated code and run your app.</p>
            <Button onClick={() => setShowDevModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
