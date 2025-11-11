"use client"

import { useState } from "react"
import { Button } from "./ui/button"

interface SynopsisProps {
  text: string
}

export default function Synopsis({ text }: SynopsisProps) {
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const translateSynopsis = async () => {
    setIsLoading(true)
    try {
      const chunks = text.match(/[\s\S]{1,400}/g) || [];
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
              chunk
            )}&langpair=en|es`
          );
          const data = await response.json();
          if (data.responseData) {
            return data.responseData.translatedText;
          }
          return chunk; // Return original chunk on error
        })
      );
      setTranslatedText(translatedChunks.join(""));
    } catch (error) {
      setTranslatedText("Error al traducir la sinopsis.");
    }
    setIsLoading(false)
  }

  return (
    <div>
      <p
        className="text-muted-foreground whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: translatedText || text }}
      ></p>
      {!translatedText && (
        <Button onClick={translateSynopsis} disabled={isLoading} className="mt-4">
          {isLoading ? "Traduciendo..." : "Traducir Sinopsis"}
        </Button>
      )}
    </div>
  )
}
