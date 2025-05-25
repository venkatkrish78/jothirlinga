"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, Clock, Users, Compass, Info, ArrowRight, Search, BookMarked } from 'lucide-react'
import { useTranslation } from '../i18n/client'

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
      staggerChildren: 0.2
    }
  }
}

interface ClientPageProps {
  lng: string
}

export default function ClientPage({ lng }: ClientPageProps) {
  const { t } = useTranslation(lng)
  const [activeTab, setActiveTab] = useState('all')
  const [count, setCount] = useState(0)
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [templesRef, templesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [circuitsRef, circuitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev < 12) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [statsInView]);

  const templeData = [
    {
      id: 'somnath',
      name: 'Somnath',
      location: 'Prabhas Patan, Gujarat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg',
      description: 'The first among the twelve Jyotirlinga shrines of Shiva, located on the western coast of Gujarat.'
    },
    {
      id: 'mallikarjuna',
      name: 'Mallikarjuna',
      location: 'Srisailam, Andhra Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/APSS303_Srisailam_town_zoom_view_from_welcome_center2.jpg',
      description: 'Located on the Nallamala Hills in Andhra Pradesh, this temple is dedicated to both Lord Shiva and Goddess Parvati.'
    },
    {
      id: 'mahakaleshwar',
      name: 'Mahakaleshwar',
      location: 'Ujjain, Madhya Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Mahakaleshwar_Mandir_in_Ujjain.jpg',
      description: 'One of the most sacred temples situated on the banks of the holy river Shipra in the ancient city of Ujjain.'
    },
    {
      id: 'omkareshwar',
      name: 'Omkareshwar',
      location: 'Mandhata Island, Madhya Pradesh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Le_fleuve_Narmada_%C3%A0_Omkareshwar_temple_Madhya_Pradesh_India.jpg',
      description: 'Situated on an island shaped like Om in the Narmada River, this temple is dedicated to Lord Shiva.'
    }
  ]

  const features = [
    {
      title: t('home.features.temple_profiles.title'),
      description: t('home.features.temple_profiles.description'),
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: t('home.features.travel_planning.title'),
      description: t('home.features.travel_planning.description'),
      icon: <Compass className="w-6 h-6" />
    },
    {
      title: t('home.features.pilgrim_info.title'),
      description: t('home.features.pilgrim_info.description'),
      icon: <Info className="w-6 h-6" />
    },
    {
      title: t('home.features.festival_calendar.title'),
      description: t('home.features.festival_calendar.description'),
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: t('home.features.temple_timings.title'),
      description: t('home.features.temple_timings.description'),
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: t('home.features.bookmark_favorites.title'),
      description: t('home.features.bookmark_favorites.description'),
      icon: <BookMarked className="w-6 h-6" />
    }
  ]

  const circuits = [
    {
      name: 'Western Circuit',
      temples: 'Somnath, Nageshwar, Trimbakeshwar, Bhimashankar, Grishneshwar',
      duration: '7-8 days',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg'
    },
    {
      name: 'Central Circuit',
      temples: 'Mahakaleshwar, Omkareshwar',
      duration: '3-4 days',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Mahakaleshwar_Mandir_in_Ujjain.jpg'
    },
    {
      name: 'Northern Circuit',
      temples: 'Kashi Vishwanath, Kedarnath',
      duration: '5-6 days',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg"
            alt="Jyotirlinga Temples"
            fill
            priority
            className="object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.hero_title')}
            </h1>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('home.hero_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={`/${lng}/temples`} className="btn-primary">
              <MapPin size={20} />
              {t('home.explore_temples')}
            </Link>
            <Link href={`/${lng}/travel-planning`} className="btn-secondary">
              <Compass size={20} />
              {t('home.plan_pilgrimage')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="section bg-gray-50 dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('home.section_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.section_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="feature-card"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Temples Section */}
      <section 
        ref={templesRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={templesInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('home.explore_jyotirlinga')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.explore_subtitle')}
            </p>
          </motion.div>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                {t('home.all_temples')}
              </button>
              <button 
                className={`tab-button ${activeTab === 'north' ? 'active' : ''}`}
                onClick={() => setActiveTab('north')}
              >
                {t('home.north_india')}
              </button>
              <button 
                className={`tab-button ${activeTab === 'south' ? 'active' : ''}`}
                onClick={() => setActiveTab('south')}
              >
                {t('home.south_india')}
              </button>
            </div>
          </div>
          
          <motion.div
            initial="hidden"
            animate={templesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {templeData.map((temple, index) => (
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
                    height={225}
                    className="temple-card-image"
                  />
                </div>
                <div className="temple-card-content">
                  <h3 className="temple-card-title">{temple.name}</h3>
                  <p className="temple-card-location">
                    <MapPin size={16} />
                    {temple.location}
                  </p>
                  <p className="temple-card-description">{temple.description}</p>
                  <div className="temple-card-footer">
                    <Link 
                      href={`/${lng}/temples/${temple.id}`}
                      className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center gap-1"
                    >
                      {t('home.view_details')}
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
          
          <div className="text-center mt-12">
            <Link href={`/${lng}/temples`} className="btn-outline">
              {t('home.view_all_temples')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Circuits Section */}
      <section 
        ref={circuitsRef}
        className="section bg-gray-50 dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={circuitsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('home.pilgrimage_circuits')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.circuits_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={circuitsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {circuits.map((circuit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="card overflow-hidden"
              >
                <div className="relative h-48">
                  <Image 
                    src={circuit.image} 
                    alt={circuit.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{circuit.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <Clock size={16} />
                    <span>{circuit.duration}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{circuit.temples}</p>
                  <Link 
                    href={`/${lng}/travel-planning#${circuit.name.toLowerCase().replace(' ', '-')}`}
                    className="text-red-600 dark:text-red-400 font-medium hover:underline flex items-center gap-1"
                  >
                    {t('home.view_itinerary')}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href={`/${lng}/travel-planning`} className="btn-outline">
              {t('home.explore_all_circuits')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-red-600 text-white"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="text-5xl font-bold mb-2">{count}</div>
              <div className="text-xl">{t('home.stats.sacred_temples')}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-5xl font-bold mb-2">5</div>
              <div className="text-xl">{t('home.stats.pilgrimage_circuits')}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6"
            >
              <div className="text-5xl font-bold mb-2">9</div>
              <div className="text-xl">{t('home.stats.indian_states')}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6"
            >
              <div className="text-5xl font-bold mb-2">∞</div>
              <div className="text-xl">{t('home.stats.spiritual_blessings')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lng}/temples`} className="btn-primary">
              <MapPin size={20} />
              {t('home.explore_temples')}
            </Link>
            <Link href={`/${lng}/travel-planning`} className="btn-secondary">
              <Compass size={20} />
              {t('home.plan_pilgrimage')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}