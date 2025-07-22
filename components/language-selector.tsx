"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (lang: string) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "es-ES", label: "Spanish (Spain)" },
    { value: "fr-FR", label: "French (France)" },
    { value: "de-DE", label: "German (Germany)" },
    { value: "it-IT", label: "Italian (Italy)" },
    { value: "pt-BR", label: "Portuguese (Brazil)" },
    { value: "ja-JP", label: "Japanese (Japan)" },
    { value: "ko-KR", label: "Korean (Korea)" },
    { value: "zh-CN", label: "Chinese (Mandarin)" },
  ]

  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px] bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 dark:bg-gray-800 light:bg-white text-white dark:text-white light:text-gray-900 border-gray-700 dark:border-gray-700 light:border-gray-300">
        {languages.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-200"
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
