"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, XCircle } from "lucide-react"
import { JarvisOrb } from "@/components/jarvis-orb"
import { LanguageSelector } from "@/components/language-selector"
import { PdfReader } from "@/components/pdf-reader"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  sender: "user" | "jarvis"
  text: string
}

export default function JarvisAssistant() {
  const [userName, setUserName] = useState<string>("")
  const [isNameSet, setIsNameSet] = useState<boolean>(false)
  const [conversation, setConversation] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState<string>("")
  const [listening, setListening] = useState<boolean>(false)
  const [speaking, setSpeaking] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US")
  const [pdfContent, setPdfContent] = useState<string>("")
  const [isPdfReading, setIsPdfReading] = useState<boolean>(false)

  const recognitionRef = useRef<any>(null) // Use 'any' for SpeechRecognition due to browser variations
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Helper function to render text with Markdown links
  const renderMessageContent = (text: string) => {
    const linkRegex = /\[(.*?)\]$$(.*?)$$/g // Standard Markdown link regex
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      const [fullMatch, linkText, url] = match
      const precedingText = text.substring(lastIndex, match.index)
      if (precedingText) {
        parts.push(<span key={`text-${lastIndex}`}>{precedingText}</span>)
      }
      parts.push(
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200"
        >
          {linkText}
        </a>,
      )
      lastIndex = match.index + fullMatch.length
    }

    const remainingText = text.substring(lastIndex)
    if (remainingText) {
      parts.push(<span key={`text-${lastIndex}`}>{remainingText}</span>)
    }

    return <>{parts}</>
  }

  // Load state from localStorage on mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("jarvisUserName")
    const storedLanguage = localStorage.getItem("jarvisLanguage")
    const storedConversation = localStorage.getItem("jarvisConversation")

    if (storedUserName) {
      setUserName(storedUserName)
      setIsNameSet(true)
    }
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage)
    }
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation))
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem("jarvisUserName", userName)
    }
  }, [userName])

  useEffect(() => {
    localStorage.setItem("jarvisLanguage", selectedLanguage)
  }, [selectedLanguage])

  useEffect(() => {
    localStorage.setItem("jarvisConversation", JSON.stringify(conversation))
  }, [conversation])

  // Initialize Speech Recognition and Synthesis
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = selectedLanguage

      recognition.onstart = () => {
        setListening(true)
        console.log("Speech recognition started")
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        console.log("Speech recognized:", transcript)
        setCurrentInput(transcript)
        setListening(false) // Stop listening after a result
        processCommand(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setListening(false)
        if (event.error === "no-speech") {
          speakText("I didn't catch that. Please try again.")
        } else if (event.error === "not-allowed") {
          speakText("Please grant microphone permission to use voice commands.")
        }
      }

      recognition.onend = () => {
        setListening(false)
        console.log("Speech recognition ended")
      }

      recognitionRef.current = recognition
    } else {
      console.warn("Web Speech API not supported in this browser.")
    }

    // Initialize Speech Synthesis
    const utterance = new SpeechSynthesisUtterance()
    utterance.onend = () => {
      setSpeaking(false)
      setIsPdfReading(false) // Stop PDF reading state when speech ends
      console.log("Speech synthesis ended")
    }
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error)
      setSpeaking(false)
      setIsPdfReading(false) // Stop PDF reading state on error
    }
    utteranceRef.current = utterance

    return () => {
      recognitionRef.current?.stop()
      window.speechSynthesis.cancel()
    }
  }, [selectedLanguage]) // Re-initialize if language changes

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  const speakText = useCallback(
    (text: string) => {
      if (window.speechSynthesis && utteranceRef.current) {
        window.speechSynthesis.cancel() // Stop any ongoing speech
        const voices = window.speechSynthesis.getVoices()
        const voice =
          voices.find((v) => v.lang === selectedLanguage) ||
          voices.find((v) => v.lang.startsWith(selectedLanguage.split("-")[0])) ||
          voices[0]
        utteranceRef.current.voice = voice
        utteranceRef.current.lang = selectedLanguage
        utteranceRef.current.text = text
        setSpeaking(true)
        window.speechSynthesis.speak(utteranceRef.current)
      } else {
        console.warn("Speech Synthesis API not supported or not ready.")
      }
    },
    [selectedLanguage],
  )

  const processCommand = useCallback(
    async (command: string) => {
      if (!command.trim()) return

      setConversation((prev) => [...prev, { sender: "user", text: command }])
      setCurrentInput("")

      // Handle specific commands client-side first
      if (command.toLowerCase().startsWith("play ") && command.length > 5) {
        const query = command.substring(5).trim()
        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
        window.open(youtubeUrl, "_blank")
        const responseText = `Opening YouTube for "${query}".`
        setConversation((prev) => [...prev, { sender: "jarvis", text: responseText }])
        speakText(responseText)
        return
      }

      if (command.toLowerCase().includes("read pdf") || command.toLowerCase().includes("summarize pdf")) {
        const responseText = "Please upload a PDF file using the upload button, and I can read its content."
        setConversation((prev) => [...prev, { sender: "jarvis", text: responseText }])
        speakText(responseText)
        return
      }

      // Send to AI API, including PDF content if available
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: command, language: selectedLanguage, userName, pdfContent }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        let jarvisResponse = data.text

        // Check for special commands from AI (only YouTube remains client-side triggered from AI)
        if (jarvisResponse.startsWith("YOUTUBE_SEARCH:")) {
          const query = jarvisResponse.substring("YOUTUBE_SEARCH:".length).trim()
          const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
          window.open(youtubeUrl, "_blank")
          jarvisResponse = `Opening YouTube for "${query}".`
        }

        setConversation((prev) => [...prev, { sender: "jarvis", text: jarvisResponse }])
        speakText(jarvisResponse)
      } catch (error) {
        console.error("Error communicating with AI:", error)
        const errorMessage = "I'm sorry, I couldn't process that request right now. Please try again."
        setConversation((prev) => [...prev, { sender: "jarvis", text: errorMessage }])
        speakText(errorMessage)
      }
    },
    [selectedLanguage, speakText, userName, pdfContent],
  )

  const handleMicClick = () => {
    if (listening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  const handleSendClick = () => {
    processCommand(currentInput)
  }

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setIsNameSet(true)
      setConversation([
        {
          sender: "jarvis",
          text: `Hello ${userName}! I am JARVIS, your personal AI assistant. How can I help you today?`,
        },
      ])
      speakText(`Hello ${userName}! I am JARVIS, your personal AI assistant. How can I help you today?`)
    }
  }

  const handlePdfContentExtracted = useCallback(
    (content: string) => {
      setPdfContent(content)
      if (content) {
        setConversation((prev) => [
          ...prev,
          {
            sender: "jarvis",
            text: "PDF content extracted. You can now ask me questions about it, or ask me to read it aloud.",
          },
        ])
        speakText("PDF content extracted. You can now ask me questions about it, or read it aloud.")
      } else {
        setConversation((prev) => [...prev, { sender: "jarvis", text: "Failed to extract content from PDF." }])
        speakText("Failed to extract content from PDF.")
      }
    },
    [speakText],
  )

  const readPdfContent = useCallback((content: string) => {
    if (content && window.speechSynthesis && utteranceRef.current) {
      window.speechSynthesis.cancel()
      utteranceRef.current.text = content
      setIsPdfReading(true)
      window.speechSynthesis.speak(utteranceRef.current)
    }
  }, [])

  const stopReadingPdf = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsPdfReading(false)
    }
  }, [])

  const clearPdfContent = useCallback(() => {
    setPdfContent("")
    setIsPdfReading(false)
    window.speechSynthesis.cancel()
    setConversation((prev) => [...prev, { sender: "jarvis", text: "PDF content cleared." }])
    speakText("PDF content cleared.")
  }, [speakText])

  if (!isNameSet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-4">
        <Card className="w-full max-w-md bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-blue-400">Welcome to JARVIS</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-center text-gray-300">Please enter your name to begin your personalized session.</p>
            <Input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
              className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button onClick={handleNameSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Start Session
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-900 dark:to-gray-700 light:from-gray-100 light:to-gray-300 p-4 text-white dark:text-white light:text-gray-900">
      <Card className="w-full max-w-3xl h-[90vh] flex flex-col bg-gray-800 dark:bg-gray-800 light:bg-white text-white dark:text-white light:text-gray-900 border-gray-700 dark:border-gray-700 light:border-gray-300 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700 dark:border-gray-700 light:border-gray-200 pb-4">
          <CardTitle className="text-2xl font-bold text-blue-400 dark:text-blue-400 light:text-blue-600">
            JARVIS AI Assistant
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User Avatar" />
              <AvatarFallback className="bg-blue-500 text-white">{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-300 dark:text-gray-300 light:text-gray-700">{userName}</span>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={cn("flex items-start gap-3", msg.sender === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.sender === "jarvis" && (
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="JARVIS Avatar" />
                      <AvatarFallback className="bg-gray-600 text-blue-400">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-lg",
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 dark:bg-gray-700 light:bg-gray-100 text-gray-100 dark:text-gray-100 light:text-gray-900 rounded-bl-none",
                    )}
                  >
                    <p className="text-sm">{renderMessageContent(msg.text)}</p>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t border-gray-700 dark:border-gray-700 light:border-gray-200 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 w-full">
            <Input
              type="text"
              placeholder="Type your command or question..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendClick()}
              className="flex-1 bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
              disabled={listening || speaking}
            />
            <Button
              onClick={handleSendClick}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            <JarvisOrb listening={listening} onClick={handleMicClick} disabled={speaking} />
            <PdfReader
              onPdfContentExtracted={handlePdfContentExtracted}
              onReadPdf={readPdfContent}
              isReading={isPdfReading}
              stopReading={stopReadingPdf}
              pdfContent={pdfContent}
            />
            {pdfContent && (
              <Button
                onClick={clearPdfContent}
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600 bg-transparent"
                aria-label="Clear PDF content"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </main>
  )
}
