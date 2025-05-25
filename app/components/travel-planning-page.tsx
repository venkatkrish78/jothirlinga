"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Compass, 
  ArrowRight, 
  ChevronDown,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
  CheckCircle2
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

interface TravelPlanningPageProps {
  lng: string
}

export default function TravelPlanningPage({ lng }: TravelPlanningPageProps) {
  const { t } = useTranslation(lng)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [circuitsRef, circuitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [weatherRef, weatherInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [packingRef, packingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const toggleAccordion = (id: string) => {
    if (activeAccordion === id) {
      setActiveAccordion(null)
    } else {
      setActiveAccordion(id)
    }
  }

  const circuits = [
    {
      id: 'western-circuit',
      name: 'Western Circuit',
      temples: ['Somnath', 'Nageshwar', 'Trimbakeshwar', 'Bhimashankar', 'Grishneshwar'],
      duration: '7-8 days',
      description: 'This circuit covers the Jyotirlinga temples in Western India, primarily in Gujarat and Maharashtra.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg',
      itinerary: [
        {
          day: 'Day 1',
          title: 'Somnath',
          activities: 'Morning darshan, visit Bhalka Tirth, evening aarti'
        },
        {
          day: 'Day 2',
          title: 'Nageshwar',
          activities: 'Morning darshan, visit Dwarka in the afternoon'
        },
        {
          day: 'Day 3',
          title: 'Travel day',
          activities: 'Travel to Nashik (flight or train via Mumbai)'
        },
        {
          day: 'Day 4',
          title: 'Trimbakeshwar',
          activities: 'Morning darshan, visit Godavari River source'
        },
        {
          day: 'Day 5',
          title: 'Bhimashankar',
          activities: 'Full day visit, trek in surrounding forest (optional)'
        },
        {
          day: 'Day 6',
          title: 'Travel day',
          activities: 'Travel to Aurangabad'
        },
        {
          day: 'Day 7',
          title: 'Grishneshwar',
          activities: 'Morning darshan, visit Ellora Caves in the afternoon'
        }
      ]
    },
    {
      id: 'central-circuit',
      name: 'Central Circuit',
      temples: ['Mahakaleshwar', 'Omkareshwar'],
      duration: '3-4 days',
      description: 'This circuit covers the Jyotirlinga temples in Central India, both located in Madhya Pradesh.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Mahakaleshwar_Mandir_in_Ujjain.jpg',
      itinerary: [
        {
          day: 'Day 1',
          title: 'Mahakaleshwar',
          activities: 'Early morning Bhasma Aarti, explore Ujjain'
        },
        {
          day: 'Day 2',
          title: 'Travel day',
          activities: 'Travel to Omkareshwar (3-4 hours drive)'
        },
        {
          day: 'Day 3',
          title: 'Omkareshwar',
          activities: 'Temple darshan, boat ride on Narmada River'
        }
      ]
    },
    {
      id: 'northern-circuit',
      name: 'Northern Circuit',
      temples: ['Kashi Vishwanath', 'Kedarnath'],
      duration: '5-6 days',
      description: 'This circuit covers the Jyotirlinga temples in Northern India, in Uttar Pradesh and Uttarakhand.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg',
      itinerary: [
        {
          day: 'Day 1',
          title: 'Kashi Vishwanath',
          activities: 'Morning darshan, evening Ganga Aarti'
        },
        {
          day: 'Day 2',
          title: 'Explore Varanasi',
          activities: 'Visit other temples, boat ride on Ganges'
        },
        {
          day: 'Day 3',
          title: 'Travel day',
          activities: 'Travel to Rishikesh/Haridwar'
        },
        {
          day: 'Day 4',
          title: 'Travel to Kedarnath',
          activities: 'Helicopter or trek to Kedarnath (seasonal)'
        },
        {
          day: 'Day 5',
          title: 'Kedarnath',
          activities: 'Temple darshan, return to Haridwar/Rishikesh'
        }
      ]
    },
    {
      id: 'eastern-circuit',
      name: 'Eastern Circuit',
      temples: ['Vaidyanath'],
      duration: '2-3 days',
      description: 'This circuit covers the Jyotirlinga temple in Eastern India, in Jharkhand.',
      image: 'https://i.ytimg.com/vi/uun-iF1R700/maxresdefault.jpg',
      itinerary: [
        {
          day: 'Day 1',
          title: 'Travel day',
          activities: 'Travel to Deoghar'
        },
        {
          day: 'Day 2',
          title: 'Vaidyanath',
          activities: 'Temple darshan, visit nearby attractions'
        }
      ]
    },
    {
      id: 'southern-circuit',
      name: 'Southern Circuit',
      temples: ['Mallikarjuna', 'Rameshwaram'],
      duration: '5-6 days',
      description: 'This circuit covers the Jyotirlinga temples in Southern India, in Andhra Pradesh and Tamil Nadu.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/APSS303_Srisailam_town_zoom_view_from_welcome_center2.jpg',
      itinerary: [
        {
          day: 'Day 1',
          title: 'Travel day',
          activities: 'Travel to Srisailam'
        },
        {
          day: 'Day 2',
          title: 'Mallikarjuna',
          activities: 'Temple darshan, visit Srisailam Dam'
        },
        {
          day: 'Day 3',
          title: 'Travel day',
          activities: 'Travel to Rameshwaram (flight via Chennai/Madurai)'
        },
        {
          day: 'Day 4',
          title: 'Rameshwaram',
          activities: 'Temple darshan, ritual bath in 22 wells'
        },
        {
          day: 'Day 5',
          title: 'Explore Rameshwaram',
          activities: 'Visit Dhanushkodi, Pamban Bridge'
        }
      ]
    },
    {
      id: 'complete-circuit',
      name: 'Complete 12 Jyotirlinga Circuit',
      temples: ['All 12 Jyotirlinga Temples'],
      duration: '25-30 days',
      description: 'This comprehensive circuit covers all 12 Jyotirlinga temples across India.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg',
      itinerary: [
        {
          day: 'Days 1-7',
          title: 'Western Circuit',
          activities: 'Somnath, Nageshwar, Trimbakeshwar, Bhimashankar, Grishneshwar'
        },
        {
          day: 'Days 8-11',
          title: 'Central Circuit',
          activities: 'Mahakaleshwar, Omkareshwar'
        },
        {
          day: 'Days 12-17',
          title: 'Northern Circuit',
          activities: 'Kashi Vishwanath, Kedarnath'
        },
        {
          day: 'Days 18-20',
          title: 'Eastern Circuit',
          activities: 'Vaidyanath'
        },
        {
          day: 'Days 21-26',
          title: 'Southern Circuit',
          activities: 'Mallikarjuna, Rameshwaram'
        },
        {
          day: 'Days 27-30',
          title: 'Buffer days',
          activities: 'For travel connections, rest, or unexpected delays'
        }
      ]
    }
  ]

  const weatherData = [
    {
      temple: 'Somnath',
      state: 'Gujarat',
      bestTime: 'October to March',
      conditions: 'Mild winters (15-25°C), hot summers (30-40°C), monsoon from June to September',
      avoid: 'Summer months (April-June) due to extreme heat',
      festivals: 'Maha Shivaratri (February/March), Kartik Purnima (November)'
    },
    {
      temple: 'Mallikarjuna',
      state: 'Andhra Pradesh',
      bestTime: 'November to March',
      conditions: 'Mild winters (15-25°C), hot summers (30-40°C), monsoon from June to September',
      avoid: 'Summer months (April-June) due to extreme heat',
      festivals: 'Maha Shivaratri, Karthika Masam (November)'
    },
    {
      temple: 'Mahakaleshwar',
      state: 'Madhya Pradesh',
      bestTime: 'October to March',
      conditions: 'Mild winters (10-25°C), hot summers (30-45°C), monsoon from June to September',
      avoid: 'Summer months (April-June) due to extreme heat',
      festivals: 'Maha Shivaratri, Nagpanchami, Shravan month celebrations'
    },
    {
      temple: 'Omkareshwar',
      state: 'Madhya Pradesh',
      bestTime: 'September to March',
      conditions: 'Mild winters (10-25°C), hot summers (30-45°C), monsoon from June to September',
      avoid: 'Summer months (April-June) due to extreme heat',
      festivals: 'Maha Shivaratri, Shravan month celebrations'
    },
    {
      temple: 'Kedarnath',
      state: 'Uttarakhand',
      bestTime: 'May to June, September to October',
      conditions: 'Cold throughout the year with temperatures ranging from -10°C to 20°C',
      avoid: 'Winter months (November-April) due to snow closure',
      festivals: 'Maha Shivaratri, Temple opening ceremony (April/May)'
    },
    {
      temple: 'Bhimashankar',
      state: 'Maharashtra',
      bestTime: 'October to March',
      conditions: 'Mild winters (10-25°C), hot summers (25-35°C), heavy rainfall during monsoon',
      avoid: 'Monsoon season (June to September) due to heavy rainfall',
      festivals: 'Maha Shivaratri, Shravan month celebrations'
    }
  ]

  const packingItems = [
    {
      category: 'Essential Documents',
      items: [
        'Government-issued ID (Aadhar Card, Passport, etc.)',
        'Travel tickets (train/flight/bus)',
        'Accommodation bookings',
        'Emergency contact information',
        'Travel insurance',
        'List of temple timings and special rituals',
        'Small notebook for temple information and experiences',
        'Cash and cards (many temples and small towns may not accept cards)'
      ]
    },
    {
      category: 'Clothing',
      items: [
        'Traditional attire for temple visits (dhoti/kurta for men, saree/salwar kameez for women)',
        'Comfortable walking shoes',
        'Extra pairs of socks',
        'Light jacket or shawl (for air-conditioned travel and cool evenings)',
        'Rain gear during monsoon season',
        'Head covering (caps, scarves) for sun protection',
        'Warm clothing for northern temples (especially Kedarnath)',
        'Comfortable sleepwear'
      ]
    },
    {
      category: 'Personal Care',
      items: [
        'Toiletries (toothbrush, toothpaste, soap, shampoo)',
        'Hand sanitizer and wet wipes',
        'Sunscreen (SPF 30 or higher)',
        'Insect repellent',
        'Personal medications',
        'First aid kit (bandages, antiseptic, pain relievers)',
        'Prescription glasses/contact lenses and supplies',
        'Face masks'
      ]
    },
    {
      category: 'Temple Offerings',
      items: [
        'Flowers',
        'Incense sticks',
        'Coconut',
        'Sweets (as prasad)',
        'Red cloth/chunari',
        'Gangajal (holy water)',
        'Donation money in small denominations'
      ]
    },
    {
      category: 'Technology',
      items: [
        'Mobile phone and charger',
        'Power bank',
        'Camera (if not using phone)',
        'Travel adapter',
        'Headphones',
        'Flashlight or torch'
      ]
    },
    {
      category: 'Food and Water',
      items: [
        'Reusable water bottle',
        'Water purification tablets',
        'Dry snacks for long journeys',
        'Fruits that don\'t spoil easily',
        'Electrolyte powder/tablets for hydration'
      ]
    }
  ]

  return (
    <div>
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="bg-blue-700 text-white py-16 md:py-24"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('travel_planning.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {t('travel_planning.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pilgrimage Circuits Section */}
      <section 
        ref={circuitsRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={circuitsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('travel_planning.circuits_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('travel_planning.circuits_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={circuitsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {circuits.map((circuit) => (
              <motion.div
                key={circuit.id}
                id={circuit.id}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="relative h-64 md:h-auto">
                    <Image 
                      src={circuit.image} 
                      alt={circuit.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">{circuit.name}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={16} />
                        <span>{circuit.temples.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Clock size={16} />
                        <span>{circuit.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{circuit.description}</p>
                    
                    <div>
                      <button 
                        className="flex items-center justify-between w-full text-left font-medium text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        onClick={() => toggleAccordion(circuit.id)}
                      >
                        <span>{t('travel_planning.view_itinerary')}</span>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${activeAccordion === circuit.id ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      {activeAccordion === circuit.id && (
                        <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <h4 className="font-medium mb-3">{t('travel_planning.suggested_itinerary')}</h4>
                          <div className="space-y-3">
                            {circuit.itinerary.map((item, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="w-20 font-medium text-gray-700 dark:text-gray-300">{item.day}</div>
                                <div>
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.activities}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Weather Information Section */}
      <section 
        ref={weatherRef}
        className="section bg-gray-50 dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={weatherInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('travel_planning.weather_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('travel_planning.weather_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={weatherInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {weatherData.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">{item.temple}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.state}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{t('travel_planning.best_time')}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.bestTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{t('travel_planning.weather_conditions')}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.conditions}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Umbrella className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{t('travel_planning.periods_avoid')}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.avoid}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{t('travel_planning.major_festivals')}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.festivals}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href={`/${lng}/temples`} className="btn-secondary">
              {t('travel_planning.view_temple_details')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Packing Checklist Section */}
      <section 
        ref={packingRef}
        className="section"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={packingInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              {t('travel_planning.packing_title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('travel_planning.packing_subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={packingInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {packingItems.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={packingInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{t('travel_planning.kedarnath_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('travel_planning.kedarnath_subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Trekking shoes with good grip</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Trekking pole</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Thermal wear (even in summer, nights can be cold)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Waterproof jacket and pants</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Gloves and woolen cap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">High-energy snacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Oxygen can (for those with breathing difficulties at high altitude)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Poncho (during rainy season)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="heading-3 text-center mb-12">{t('travel_planning.travel_tips')}</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Advance Planning</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Book accommodations and transportation in advance, especially during peak pilgrimage seasons and festivals.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Temple Etiquette</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Dress modestly (traditional attire preferred), remove footwear before entering temples, and maintain silence in the sanctum sanctorum.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Photography Restrictions</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Many temples restrict photography inside the main sanctum. Always check for permission before taking photos.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Local Guides</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Consider hiring local guides who can provide historical and mythological context for each temple.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <p className="font-medium">Prasad Offerings</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Carry appropriate offerings for each temple. Common offerings include flowers, bilva leaves, and sweets.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <p className="font-medium">Accommodation Options</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Most temple towns offer a range of accommodations from budget dharamshalas to luxury hotels. Temple trusts often maintain guest houses for pilgrims.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      7
                    </div>
                    <div>
                      <p className="font-medium">Health Precautions</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Carry necessary medications, stay hydrated, and be prepared for long queues and walking.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      8
                    </div>
                    <div>
                      <p className="font-medium">Special Considerations for Kedarnath</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        This temple is located at a high altitude and is only accessible during specific months (May to October). Helicopter services are available, but weather-dependent.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      9
                    </div>
                    <div>
                      <p className="font-medium">Language Assistance</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        While Hindi is widely understood, having a translation app can help in southern states where local languages predominate.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      10
                    </div>
                    <div>
                      <p className="font-medium">Spiritual Preparation</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Read about the significance of each Jyotirlinga before visiting to enhance your spiritual experience.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('travel_planning.begin_journey')}
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            {t('travel_planning.journey_subtitle')}
          </p>
          <Link href={`/${lng}/temples`} className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2 mx-auto w-fit">
            <MapPin size={20} />
            {t('temple_detail.view_all')}
          </Link>
        </div>
      </section>
    </div>
  )
}