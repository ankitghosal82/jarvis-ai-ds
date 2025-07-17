"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px] bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 dark:bg-gray-800 light:bg-white text-white dark:text-white light:text-gray-900 border-gray-700 dark:border-gray-700 light:border-gray-300">
        <SelectItem value="en-US">English (US)</SelectItem>
        <SelectItem value="en-GB">English (UK)</SelectItem>
        <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
        <SelectItem value="fr-FR">French (France)</SelectItem>
        <SelectItem value="de-DE">German (Germany)</SelectItem>
        <SelectItem value="it-IT">Italian (Italy)</SelectItem>
        <SelectItem value="pt-BR">Portuguese (Brazil)</SelectItem>
        <SelectItem value="ja-JP">Japanese (Japan)</SelectItem>
        <SelectItem value="ko-KR">Korean (Korea)</SelectItem>
        <SelectItem value="zh-CN">Chinese (Mandarin)</SelectItem>
      </SelectContent>
    </Select>
  )
}
