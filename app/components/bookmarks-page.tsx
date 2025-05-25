"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Trash2, BookMarked } from 'lucide-react'
import { useTranslation } from '@/app/i18n/client'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface BookmarksPageProps {
  lng: string
}

export default function BookmarksPage({ lng }: BookmarksPageProps) {
  const { t } = useTranslation(lng)
  
  // Sample bookmarked temples data (in a real app, this would come from a database)
  const sampleBookmarks = [
    {
      id: 'somnath',
      name: 'Somnath',
      location: 'Prabhas Patan, Gujarat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg',
      description: 'The first among the twelve Jyotirlinga shrines of Shiva, located on the western coast of Gujarat.'
    },
    {
      id: 'kedarnath',
      name: 'Kedarnath',
      location: 'Kedarnath, Uttarakhand',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg',
      description: 'Located in the Himalayan range near the Mandakini river, this temple is open only from April to November due to extreme weather conditions.'
    },
    {
      id: 'rameshwaram',
      name: 'Rameshwaram',
      location: 'Rameshwaram, Tamil Nadu',
      image: 'https://apnayatra.com/wp-content/uploads/2023/07/Rameshwaram-Jyotirlinga-Shivam-Temple0.jpg',
      description: 'Located on Rameswaram island, this temple is known for its magnificent corridors and is an important pilgrimage site.'
    }
  ]

  const [bookmarks, setBookmarks] = useState(sampleBookmarks)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from a database
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
  }

  return (
    <div>
      {/* Header Section */}
      <section className="bg-red-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('bookmarks.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('bookmarks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bookmarks Section */}
      <section className="section">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">{t('bookmarks.loading')}</p>
            </div>
          ) : bookmarks.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {bookmarks.map((temple) => (
                <motion.div
                  key={temple.id}
                  variants={fadeIn}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image 
                      src={temple.image} 
                      alt={temple.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{temple.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-1">
                      <MapPin size={16} />
                      {temple.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{temple.description}</p>
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`/${lng}/temples/${temple.id}`}
                        className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center gap-1"
                      >
                        {t('bookmarks.view_details')}
                        <ArrowRight size={16} />
                      </Link>
                      <button 
                        onClick={() => removeBookmark(temple.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookMarked size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('bookmarks.no_bookmarks')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {t('bookmarks.no_bookmarks_desc')}
              </p>
              <Link 
                href={`/${lng}/temples`}
                className="btn-primary mx-auto"
              >
                {t('bookmarks.explore_temples')}
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('bookmarks.plan_pilgrimage')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('bookmarks.explore_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('bookmarks.explore_desc')}
              </p>
              <Link 
                href={`/${lng}/temples`}
                className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center justify-center gap-1"
              >
                {t('bookmarks.view_all')}
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('bookmarks.travel_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('bookmarks.travel_desc')}
              </p>
              <Link 
                href={`/${lng}/travel-planning`}
                className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center justify-center gap-1"
              >
                {t('bookmarks.view_circuits')}
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('bookmarks.pilgrim_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('bookmarks.pilgrim_desc')}
              </p>
              <Link 
                href={`/${lng}/pilgrim-info`}
                className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center justify-center gap-1"
              >
                {t('bookmarks.view_guide')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}