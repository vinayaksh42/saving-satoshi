'use client'

import LangBtn from 'public/assets/icons/langBtn.svg'
import { i18n } from 'i18n/config'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCurrentLocale, generateNewUrl } from 'hooks'

export default function LangSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<any>(1)

  useEffect(() => {
    setCurrentLanguage(getCurrentLocale(pathname))
  }, [])

  const handleLanguageClick = (language) => {
    setCurrentLanguage(language)
    setIsOpen(false)
    const newLocale = i18n.locales[language]
    router.replace(generateNewUrl(pathname, newLocale))
  }

  return (
    <div className="relative inline-block text-left">
      <div className="ml-4 h-10 w-10">
        <button
          type="button"
          className="text-grey-300 h-10 cursor-pointer"
          id="language-menu"
          aria-label="profile"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LangBtn />
        </button>
      </div>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute right-0 mt-2 w-[125px] origin-top-right  border border-white border-opacity-25 bg-back shadow-lg`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div className="py-1" role="none">
          {i18n.languages.map((language, index) => (
            <button
              key={index}
              className={`${
                currentLanguage == i18n.locales[index]
                  ? 'text-white'
                  : 'text-white text-opacity-75'
              }  px-5 py-2 text-left font-nunito text-lg font-bold `}
              role="menuitem"
              onClick={() => handleLanguageClick(index)}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
