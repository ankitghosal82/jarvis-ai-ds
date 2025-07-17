"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface JarvisOrbProps {
  listening: boolean
  onClick: () => void
  disabled?: boolean
}

export function JarvisOrb({ listening, onClick, disabled }: JarvisOrbProps) {
  return (
    <Button
      className={cn(
        "relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
        listening ? "bg-red-500 hover:bg-red-600 animate-pulse-slow" : "bg-blue-600 hover:bg-blue-700",
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={listening ? "Stop listening" : "Start listening"}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full border-4",
          listening ? "border-red-400 animate-ping-slow" : "border-blue-400",
        )}
      />
      {listening ? <MicOff className="w-16 h-16 text-white" /> : <Mic className="w-16 h-16 text-white" />}
    </Button>
  )
}
