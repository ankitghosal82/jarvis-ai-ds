"use client"

import { cn } from "@/lib/utils"
import { Mic, MicOff } from "lucide-react"

interface JarvisOrbProps {
  listening: boolean
  onClick: () => void
  disabled: boolean
}

export function JarvisOrb({ listening, onClick, disabled }: JarvisOrbProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300",
        listening ? "bg-red-500 animate-pulse" : "bg-blue-600 hover:bg-blue-700",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      aria-label={listening ? "Stop listening" : "Start listening"}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full border-4",
          listening ? "border-red-400 animate-ping-slow" : "border-blue-500",
        )}
      />
      {listening ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
    </button>
  )
}
