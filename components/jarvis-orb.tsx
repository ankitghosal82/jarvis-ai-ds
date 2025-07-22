"use client"

import { cn } from "@/lib/utils"
import { Mic, MicOff } from "lucide-react"

interface JarvisOrbProps {
  listening: boolean
  onClick: () => void
  disabled?: boolean
}

export function JarvisOrb({ listening, onClick, disabled }: JarvisOrbProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg transition-all duration-300 ease-in-out",
        "hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50",
        disabled && "cursor-not-allowed opacity-60",
        listening && "animate-pulse-glow from-blue-400 to-purple-400",
      )}
      aria-label={listening ? "Stop listening" : "Start listening"}
    >
      <div
        className={cn(
          "absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center",
          listening && "bg-opacity-80",
        )}
      >
        {listening ? (
          <Mic className="h-10 w-10 text-blue-300 animate-bounce" />
        ) : (
          <MicOff className="h-10 w-10 text-gray-400" />
        )}
      </div>
      {listening && (
        <>
          <div className="absolute h-full w-full rounded-full border-4 border-blue-500 animate-ping-slow opacity-75" />
          <div className="absolute h-full w-full rounded-full border-4 border-purple-500 animate-ping-medium opacity-75" />
        </>
      )}
    </button>
  )
}
