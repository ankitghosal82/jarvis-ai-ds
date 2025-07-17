"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (lang: string) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en-US">English (US)</SelectItem>
        <SelectItem value="en-GB">English (UK)</SelectItem>
        <SelectItem value="es-ES">Español (España)</SelectItem>
        <SelectItem value="fr-FR">Français (France)</SelectItem>
        <SelectItem value="de-DE">Deutsch (Deutschland)</SelectItem>
        <SelectItem value="hi-IN">हिन्दी (भारत)</SelectItem>
      </SelectContent>
    </Select>
  )
}
