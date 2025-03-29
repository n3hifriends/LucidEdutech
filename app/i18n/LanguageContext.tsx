import React, { createContext, useContext, useEffect, useState } from "react"
import I18n from "i18n-js"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Type for language context
type LanguageContextType = {
  language: string
  changeLanguage: (language: string) => void
}

// Create context with default value

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

//Language provider component
export const LanguageProvider: React.FC = ({ children }) => {
  // const [language, setLanguage] = useState<string>(I18n.locale)
  const [language, setLanguage] = useState<string>("en")

  //Local language
  async function loadLanguage() {
    const savedLanguage = await AsyncStorage.getItem("language")
    if (savedLanguage) {
      I18n.locale = savedLanguage
      setLanguage(savedLanguage)
    }
  }

  // Save language to AsyncStorage
  const saveLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem("language", lang)
    } catch (e) {
      console.error("Failed to save language", e)
    }
  }

  // Change language function
  const changeLanguage = (lang: string) => {
    I18n.locale = lang
    setLanguage(lang)
    saveLanguage(lang) // Persist the language change
  }

  useEffect(() => {
    loadLanguage()
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
