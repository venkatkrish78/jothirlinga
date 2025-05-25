"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, ArrowRight, Search, Filter, BookMarked } from 'lucide-react'
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

interface TemplatesPageProps {
  lng: string
}

export default function TemplatesPage({ lng }: TemplatesPageProps) {
  const { t } = useTranslation(lng)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState(t('temples.all_states'))
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [templesRef, templesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const templeData = [
    {
      id: 'somnath',
      name: 'Somnath',
      location: 'Prabhas Patan, Gujarat',
      state: 'Gujarat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg',
      description: 'The first among the twelve Jyotirlinga shrines of Shiva, located on the western coast of Gujarat.',
      bestTime: 'October to March'
    },
    {
      id: 'mallikarjuna',
      name: 'Mallikarjuna',
      location: 'Srisailam, Andhra Pradesh',
      state: 'Andhra Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/APSS303_Srisailam_town_zoom_view_from_welcome_center2.jpg',
      description: 'Located on the Nallamala Hills in Andhra Pradesh, this temple is dedicated to both Lord Shiva and Goddess Parvati.',
      bestTime: 'November to March'
    },
    {
      id: 'mahakaleshwar',
      name: 'Mahakaleshwar',
      location: 'Ujjain, Madhya Pradesh',
      state: 'Madhya Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Mahakaleshwar_Mandir_in_Ujjain.jpg',
      description: 'One of the most sacred temples situated on the banks of the holy river Shipra in the ancient city of Ujjain.',
      bestTime: 'October to March'
    },
    {
      id: 'omkareshwar',
      name: 'Omkareshwar',
      location: 'Mandhata Island, Madhya Pradesh',
      state: 'Madhya Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Le_fleuve_Narmada_%C3%A0_Omkareshwar_temple_Madhya_Pradesh_India.jpg',
      description: 'Situated on an island shaped like Om in the Narmada River, this temple is dedicated to Lord Shiva.',
      bestTime: 'September to March'
    },
    {
      id: 'kedarnath',
      name: 'Kedarnath',
      location: 'Kedarnath, Uttarakhand',
      state: 'Uttarakhand',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg',
      description: 'Located in the Himalayan range near the Mandakini river, this temple is open only from April to November due to extreme weather conditions.',
      bestTime: 'May to June, September to October'
    },
    {
      id: 'bhimashankar',
      name: 'Bhimashankar',
      location: 'Pune, Maharashtra',
      state: 'Maharashtra',
      image: 'https://i.pinimg.com/originals/3d/4a/01/3d4a01f9a9c5b04849f710b721619c8a.jpg',
      description: 'Situated in the Sahyadri range, this temple is surrounded by dense forests and is also a wildlife sanctuary.',
      bestTime: 'October to March'
    },
    {
      id: 'kashi-vishwanath',
      name: 'Kashi Vishwanath',
      location: 'Varanasi, Uttar Pradesh',
      state: 'Uttar Pradesh',
      image: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/02/24/551301-kashi-vishwanath-2.jpg',
      description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi.',
      bestTime: 'October to March'
    },
    {
      id: 'trimbakeshwar',
      name: 'Trimbakeshwar',
      location: 'Nashik, Maharashtra',
      state: 'Maharashtra',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhb2wOv1FiUhcdpP7_ZtQ3OwRPODQ-At8FPWvHsgb0FtN2NcLzukW8zzf74pYG4wtbGNevjEyR0QDWHGG8hCklDPurgKAU1M5wi__njLtkVVq7dZgFS9aqkyQnT8ECjJMHXTBHihdCE1tR0jfJoAhlgfvm5FuXz9R59m9Goh3GISPjmULZ1hxT0BX6lDg/w1200-h630-p-k-no-nu/k.jpg',
      description: 'Located near the source of the Godavari River, this temple features a unique three-faced lingam representing Brahma, Vishnu, and Shiva.',
      bestTime: 'October to March'
    },
    {
      id: 'vaidyanath',
      name: 'Vaidyanath',
      location: 'Deoghar, Jharkhand',
      state: 'Jharkhand',
      image: 'https://i.ytimg.com/vi/uun-iF1R700/maxresdefault.jpg',
      description: 'Also known as Baba Baidyanath Dham, this temple complex comprises the main shrine along with 21 additional temples.',
      bestTime: 'October to March'
    },
    {
      id: 'nageshwar',
      name: 'Nageshwar',
      location: 'Dwarka, Gujarat',
      state: 'Gujarat',
      image: 'https://i.pinimg.com/736x/66/d6/23/66d623443bfc18d024d35bb043099c9e.jpg',
      description: 'Located near Dwarka, this temple houses one of the 12 Jyotirlingas and features a massive statue of Lord Shiva.',
      bestTime: 'October to February'
    },
    {
      id: 'rameshwaram',
      name: 'Rameshwaram',
      location: 'Rameshwaram, Tamil Nadu',
      state: 'Tamil Nadu',
      image: 'https://apnayatra.com/wp-content/uploads/2023/07/Rameshwaram-Jyotirlinga-Shivam-Temple0.jpg',
      description: 'Located on Rameswaram island, this temple is known for its magnificent corridors and is an important pilgrimage site.',
      bestTime: 'October to April'
    },
    {
      id: 'grishneshwar',
      name: 'Grishneshwar',
      location: 'Ellora, Aurangabad, Maharashtra',
      state: 'Maharashtra',
      image: 'https://i.pinimg.com/originals/56/56/65/565665a6d2034ab402dddcd3ea3b60ee.jpg',
      description: 'The last of the 12 Jyotirlinga shrines, located near the famous Ellora Caves in Maharashtra.',
      bestTime: 'October to March'
    }
  ]

  const states = [
    t('temples.all_states'),
    'Gujarat',
    'Andhra Pradesh',
    'Madhya Pradesh',
    'Uttarakhand',
    'Maharashtra',
    'Uttar Pradesh',
    'Jharkhand',
    'Tamil Nadu'
  ]

  const filteredTemples = templeData.filter(temple => {
    const matchesSearch = temple.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         temple.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temple.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesState = selectedState === t('temples.all_states') || temple.state === selectedState
    
    return matchesSearch && matchesState
  })

  return (
    <div>
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="bg-red-600 text-white py-16 md:py-24"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('temples.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {t('temples.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 sticky top-16 z-10 shadow-md">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('temples.search_placeholder')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temples Grid Section */}
      <section 
        ref={templesRef}
        className="section"
      >
        <div className="container-custom">
          {filteredTemples.length > 0 ? (
            <motion.div
              initial="hidden"
              animate={templesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTemples.map((temple) => (
                <motion.div
                  key={temple.id}
                  variants={fadeIn}
                  className="temple-card"
                >
                  <div className="relative">
                    <Image 
                      src={temple.image} 
                      alt={temple.name} 
                      width={400} 
                      height={250}
                      className="temple-card-image"
                    />
                  </div>
                  <div className="temple-card-content">
                    <h3 className="temple-card-title">{temple.name}</h3>
                    <p className="temple-card-location">
                      <MapPin size={16} />
                      {temple.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium">{t('temples.best_time')}</span> {temple.bestTime}
                    </p>
                    <p className="temple-card-description">{temple.description}</p>
                    <div className="temple-card-footer">
                      <Link 
                        href={`/${lng}/temples/${temple.id}`}
                        className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center gap-1"
                      >
                        {t('temple_detail.view_details')}
                        <ArrowRight size={16} />
                      </Link>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                        <BookMarked size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">{t('temples.no_temples_found')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('temples.adjust_search')}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedState(t('temples.all_states'))
                }}
                className="btn-primary mx-auto"
              >
                {t('temples.reset_filters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('temples.plan_pilgrimage')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t('temples.plan_subtitle')}
          </p>
          <Link href={`/${lng}/travel-planning`} className="btn-primary">
            <MapPin size={20} />
            {t('temples.view_circuits')}
          </Link>
        </div>
      </section>
    </div>
  )
}