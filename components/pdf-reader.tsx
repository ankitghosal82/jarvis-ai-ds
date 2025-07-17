"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import * as pdfjs from "pdfjs-dist"

interface PdfReaderProps {
  onPdfContentExtracted: (content: string) => void
  onReadPdf: (content: string) => void
  isReading: boolean
  stopReading: () => void
  pdfContent: string
}

export function PdfReader({ onPdfContentExtracted, onReadPdf, isReading, stopReading, pdfContent }: PdfReaderProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Set the worker source for pdf.js once on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    } else {
      console.error("pdfjs.GlobalWorkerOptions is undefined. PDF.js might not be fully loaded.")
    }
  }, []) // Empty dependency array ensures it runs only once

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        try {
          const loadingTask = pdfjs.getDocument(arrayBuffer)
          const pdf = await loadingTask.promise
          let fullText = ""
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            fullText += textContent.items.map((item: any) => item.str).join(" ") + "\n"
          }
          onPdfContentExtracted(fullText)
        } catch (error) {
          console.error("Error reading PDF:", error)
          alert("Failed to read PDF. Please try again.")
          onPdfContentExtracted("")
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      setFileName(null)
      onPdfContentExtracted("")
      alert("Please upload a valid PDF file.")
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        aria-label="Upload PDF file"
      />
      <Button onClick={handleUploadClick} variant="outline" size="icon" aria-label="Upload PDF">
        <Upload className="h-4 w-4" />
      </Button>
      {fileName && <span className="text-sm text-gray-600 truncate max-w-[100px]">{fileName}</span>}
      {pdfContent && (
        <Button
          onClick={isReading ? stopReading : () => onReadPdf(pdfContent)}
          variant="outline"
          size="icon"
          aria-label={isReading ? "Stop reading PDF" : "Read PDF"}
        >
          {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
}
