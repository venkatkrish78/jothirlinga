"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { languages } from '@/app/i18n/settings'
import { useTranslation } from '@/app/i18n/client'

interface LanguageSwitcherProps {
  lng: string
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation(lng)
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const changeLanguage = (language: string) => {
    // Get the current path without the language prefix
    const currentPath = pathname.replace(/^\/[^\/]+/, '')
    router.push(`/${language}${currentPath}`)
    closeDropdown()
  }

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = () => {
      closeDropdown()
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation()
          toggleDropdown()
        }}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
      >
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="text-sm hidden md:inline">{t(`language.${lng}`)}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              {t('language.select_language')}
            </div>
            {languages.map((language) => (
              <button
                key={language}
                onClick={(e) => {
                  e.stopPropagation()
                  changeLanguage(language)
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === lng 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t(`language.${language}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher