"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  ArrowRight, 
  Bus, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Home, 
  Phone, 
  Plane, 
  Train, 
  Users, 
  Utensils, 
  AccessibilityIcon, 
  AlertTriangle, 
  Info,
  Clock
} from 'lucide-react'
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

interface PilgrimInfoPageProps {
  lng: string
}

export default function PilgrimInfoPage({ lng }: PilgrimInfoPageProps) {
  const { t } = useTranslation(lng)
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [transportRef, transportInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [accommodationRef, accommodationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [foodRef, foodInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [specialNeedsRef, specialNeedsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [safetyRef, safetyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const transportInfo = [
    {
      title: t('temple_detail.by_air'),
      icon: <Plane className="w-6 h-6" />,
      description: 'Most Jyotirlinga temples are accessible from nearby airports. Major airports serving these temples include:',
      items: [
        'Diu Airport (for Somnath)',
        'Rajiv Gandhi International Airport, Hyderabad (for Mallikarjuna)',
        'Devi Ahilyabai Holkar Airport, Indore (for Mahakaleshwar and Omkareshwar)',
        'Jolly Grant Airport, Dehradun (for Kedarnath)',
        'Pune International Airport (for Bhimashankar)',
        'Lal Bahadur Shastri International Airport, Varanasi (for Kashi Vishwanath)',
        'Mumbai Airport (for Trimbakeshwar)',
        'Deoghar Airport (for Vaidyanath)',
        'Jamnagar Airport (for Nageshwar)',
        'Madurai Airport (for Rameshwaram)',
        'Aurangabad Airport (for Grishneshwar)'
      ]
    },
    {
      title: t('temple_detail.by_train'),
      icon: <Train className="w-6 h-6" />,
      description: 'Indian Railways provides excellent connectivity to most Jyotirlinga temple locations:',
      items: [
        'Veraval Railway Station (for Somnath)',
        'Markapur Road Railway Station (for Mallikarjuna)',
        'Ujjain Junction Railway Station (for Mahakaleshwar)',
        'Khandwa Railway Station (for Omkareshwar)',
        'Rishikesh Railway Station (for Kedarnath)',
        'Pune Railway Station (for Bhimashankar)',
        'Varanasi Junction (for Kashi Vishwanath)',
        'Nashik Road Railway Station (for Trimbakeshwar)',
        'Deoghar Railway Station (for Vaidyanath)',
        'Dwarka Railway Station (for Nageshwar)',
        'Rameshwaram Railway Station (for Rameshwaram)',
        'Aurangabad Railway Station (for Grishneshwar)'
      ]
    },
    {
      title: t('temple_detail.by_road'),
      icon: <Bus className="w-6 h-6" />,
      description: 'State transport and private bus services connect all Jyotirlinga temples to nearby major cities:',
      items: [
        'Regular bus services from Ahmedabad, Rajkot, and Junagadh to Somnath',
        'Buses from Hyderabad, Kurnool, and Vijayawada to Srisailam (Mallikarjuna)',
        'Frequent buses from Indore, Bhopal to Ujjain (Mahakaleshwar)',
        'Bus services from Indore, Khandwa to Omkareshwar',
        'Buses to Gaurikund (for Kedarnath) from Rishikesh, Haridwar, and Dehradun',
        'Regular buses from Mumbai, Pune to Bhimashankar',
        'Extensive bus network to Varanasi (Kashi Vishwanath) from all major cities',
        'Buses from Mumbai, Pune, Nashik to Trimbakeshwar',
        'Bus services from Patna, Ranchi to Deoghar (Vaidyanath)',
        'Buses from Jamnagar, Porbandar to Dwarka (Nageshwar)',
        'Bus services from Chennai, Madurai to Rameshwaram',
        'Regular buses from Mumbai, Pune to Aurangabad (Grishneshwar)'
      ]
    }
  ]

  const accommodationInfo = [
    {
      title: 'Temple Trust Accommodations',
      description: 'Most Jyotirlinga temples have trust-managed guest houses that offer affordable accommodation for pilgrims:',
      items: [
        'Clean and basic facilities',
        'Located close to the temple premises',
        'Advance booking recommended during peak seasons',
        'Vegetarian food often available',
        'Shared and private rooms available'
      ]
    },
    {
      title: 'Dharamshalas',
      description: 'Traditional pilgrim rest houses offering budget-friendly accommodation:',
      items: [
        'Very economical options',
        'Basic amenities',
        'Often run by charitable trusts',
        'Community kitchens or canteens available',
        'Suitable for large groups'
      ]
    },
    {
      title: 'Hotels and Resorts',
      description: 'All temple towns have a range of hotels catering to different budgets:',
      items: [
        'Budget hotels (₹500-1500 per night)',
        'Mid-range hotels (₹1500-3500 per night)',
        'Luxury hotels and resorts (₹3500+ per night)',
        'Online booking available for most properties',
        'Special pilgrim packages often available'
      ]
    },
    {
      title: 'Homestays',
      description: 'Some locations offer homestay options for a more authentic experience:',
      items: [
        'Experience local hospitality and culture',
        'Home-cooked meals',
        'Personal attention and guidance',
        'Insights into local traditions and customs',
        'Comfortable and homely environment'
      ]
    }
  ]

  const foodInfo = [
    {
      title: 'Temple Prasad',
      description: 'The blessed food offered at temples:',
      items: [
        'Simple, sattvic vegetarian food',
        'Often free or available at nominal cost',
        'Traditional recipes specific to each temple',
        'Considered sacred and part of the temple experience',
        'Usually includes sweets, fruits, and cooked items'
      ]
    },
    {
      title: 'Temple Canteens',
      description: 'Most major temples operate canteens serving affordable meals:',
      items: [
        'Pure vegetarian food',
        'Thalis (complete meals) available',
        'Clean and hygienic preparation',
        'Economical pricing',
        'Local specialties often featured'
      ]
    },
    {
      title: 'Local Restaurants',
      description: 'Temple towns have numerous restaurants catering to pilgrims:',
      items: [
        'Predominantly vegetarian options',
        'Regional cuisine specialties',
        'Range from budget eateries to fine dining',
        'Special fasting food during religious occasions',
        'Some international cuisine options in larger towns'
      ]
    },
    {
      title: 'Street Food',
      description: 'Local street food vendors offer quick and tasty options:',
      items: [
        'Traditional snacks and sweets',
        'Fresh fruit juices and lassi',
        'Chaat and other savory items',
        'Choose vendors with good hygiene practices',
        'Opportunity to taste authentic local flavors'
      ]
    }
  ]

  const specialNeedsInfo = [
    {
      title: 'Elderly Pilgrims',
      icon: <Users className="w-6 h-6" />,
      items: [
        'Special queues at most temples for senior citizens',
        'Wheelchair facilities available at major temples',
        'Rest areas with seating arrangements',
        'Assistance personnel available at some locations',
        'Golf cart/battery vehicle services at larger temple complexes',
        'Special accommodation facilities with elevator access'
      ]
    },
    {
      title: 'Differently-Abled Pilgrims',
      icon: <AccessibilityIcon className="w-6 h-6" />,
      items: [
        'Ramps and wheelchair access at many temples',
        'Free wheelchair availability (limited numbers)',
        'Accessible washrooms at major temples',
        'Priority darshan facilities',
        'Assistance personnel available on request',
        'Special parking facilities closer to temple entrance'
      ]
    },
    {
      title: 'Medical Facilities',
      icon: <Heart className="w-6 h-6" />,
      items: [
        'First aid centers at all major temples',
        'Medical rooms with basic equipment',
        'Oxygen facilities at high-altitude temples like Kedarnath',
        'Ambulance services on call',
        'Information about nearby hospitals and clinics',
        'Medical staff available during major festivals and peak seasons'
      ]
    }
  ]

  const safetyTips = [
    {
      title: 'Personal Safety',
      items: [
        'Keep your valuables secure and minimize carrying expensive items',
        'Use hotel safes for passports and extra cash',
        'Be vigilant in crowded areas to avoid pickpocketing',
        'Women travelers should dress modestly and avoid traveling alone at night',
        'Share your itinerary with family or friends',
        'Keep emergency contact numbers handy'
      ]
    },
    {
      title: 'Health Precautions',
      items: [
        'Carry necessary medications, especially if you have pre-existing conditions',
        'Stay hydrated, especially during summer months',
        'Use sunscreen and wear hats during daytime visits',
        'Carry basic first aid supplies',
        'Drink bottled or purified water',
        'Be cautious with street food and wash hands frequently'
      ]
    },
    {
      title: 'Temple-Specific Safety',
      items: [
        'Follow queue systems and avoid pushing in crowded temples',
        'Be careful on wet marble floors, especially during abhishekam rituals',
        'Remove footwear at designated areas and keep them in shoe stands',
        'Follow instructions from temple authorities',
        'Be aware of temple timings to avoid last-minute rushes',
        'Respect local customs and traditions'
      ]
    },
    {
      title: 'Emergency Preparedness',
      items: [
        'Save emergency numbers: Police (100), Ambulance (108), Fire (101)',
        'Note down contact details of local police stations and hospitals',
        'Keep digital and physical copies of important documents',
        'Have a basic understanding of local language or translation app',
        'Carry a power bank for mobile phones',
        'Consider travel insurance for longer pilgrimages'
      ]
    }
  ]

  return (
    <div>
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="bg-green-600 text-white py-16 md:py-24"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pilgrim_info.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {t('pilgrim_info.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transportation Section */}
      <section 
        ref={transportRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={transportInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('pilgrim_info.how_to_reach')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pilgrim_info.reach_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={transportInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {transportInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">{info.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{info.description}</p>
                <ul className="space-y-2">
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href={`/${lng}/travel-planning`} className="btn-outline border-green-600 text-green-600 hover:bg-green-50">
              {t('pilgrim_info.view_planning')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section 
        ref={accommodationRef}
        className="section bg-gray-50 dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={accommodationInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('pilgrim_info.accommodation_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pilgrim_info.accommodation_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={accommodationInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {accommodationInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{info.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{info.description}</p>
                <ul className="space-y-2">
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={accommodationInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{t('pilgrim_info.booking_tips')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Book accommodations well in advance, especially during peak pilgrimage seasons and festivals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Contact temple trusts directly for their guest house bookings as these may not be available on online platforms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Consider staying in nearby larger towns if accommodation in temple towns is full or expensive.</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Check for pilgrim packages offered by hotels that may include temple visits and transportation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Read reviews and check the proximity to the temple before booking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Keep booking confirmations and contact details handy during your journey.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Food Section */}
      <section 
        ref={foodRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={foodInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('pilgrim_info.food_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pilgrim_info.food_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={foodInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {foodInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{info.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{info.description}</p>
                <ul className="space-y-2">
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={foodInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{t('pilgrim_info.dietary_considerations')}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Most temple towns primarily offer vegetarian food. Here are some additional considerations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">During religious festivals like Shravan month, many restaurants serve only sattvic food (no onion, garlic).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Fasting food options are widely available during Navratri and other fasting periods.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Those with specific dietary restrictions should carry some packaged food as backup.</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Larger towns near temples may have more diverse food options including international cuisine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Fresh fruits are generally available and are a safe option for those with sensitive stomachs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Bottled water is recommended for drinking to avoid water-borne illnesses.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Needs Section */}
      <section 
        ref={specialNeedsRef}
        className="section bg-gray-50 dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={specialNeedsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('pilgrim_info.special_needs')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pilgrim_info.special_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={specialNeedsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {specialNeedsInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{info.title}</h3>
                <ul className="space-y-2">
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={specialNeedsInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{t('pilgrim_info.additional_resources')}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              For pilgrims with special needs, these additional resources may be helpful:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Contact temple administration in advance to arrange for special assistance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Consider hiring local guides who can help navigate temple complexes and arrange for facilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">For Kedarnath, helicopter services are available for those who cannot trek.</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Some temples offer special darshan tickets for differently-abled pilgrims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Travel agencies specializing in pilgrimages often have packages designed for elderly pilgrims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Carry medical documents and prescriptions for any specific medical conditions.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section 
        ref={safetyRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={safetyInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('pilgrim_info.safety_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pilgrim_info.safety_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={safetyInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {safetyTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{tip.title}</h3>
                </div>
                <ul className="space-y-2">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={safetyInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{t('pilgrim_info.emergency_numbers')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Phone className="w-10 h-10 text-red-600 mb-2" />
                <h4 className="font-medium mb-1">Police</h4>
                <p className="text-2xl font-bold">100</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Heart className="w-10 h-10 text-red-600 mb-2" />
                <h4 className="font-medium mb-1">Ambulance</h4>
                <p className="text-2xl font-bold">108</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <AlertTriangle className="w-10 h-10 text-red-600 mb-2" />
                <h4 className="font-medium mb-1">Disaster Management</h4>
                <p className="text-2xl font-bold">1070</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('pilgrim_info.ready_journey')}
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            {t('pilgrim_info.ready_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lng}/temples`} className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2">
              <MapPin size={20} />
              {t('temple_detail.view_all')}
            </Link>
            <Link href={`/${lng}/travel-planning`} className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2">
              <Calendar size={20} />
              {t('travel_planning.title')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}