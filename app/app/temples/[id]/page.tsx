"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Info, 
  Phone, 
  Mail, 
  Globe, 
  Plane, 
  Train, 
  Bus, 
  Home, 
  Utensils, 
  AccessibilityIcon, 
  AlertTriangle, 
  BookMarked,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const templeData = {
  'somnath': {
    name: 'Somnath',
    location: 'Prabhas Patan, Veraval, Gujarat',
    address: 'Somnath Mandir Marg, Prabhas Patan, Veraval, Gujarat 362268',
    mapUrl: 'https://maps.google.com/?q=Somnath+Temple',
    history: 'Somnath Temple is a Hindu temple, located in Prabhas Patan, Veraval in Gujarat, India. It is one of the most sacred pilgrimage sites for Hindus and is the first among the twelve jyotirlinga shrines of Shiva. The temple has been destroyed and reconstructed several times in the past after repeated destruction by multiple Muslim invaders and rulers, notably starting with an attack by Mahmud Ghazni in January 1026.',
    significance: 'Somnath is the first among the twelve Jyotirlinga shrines of Lord Shiva. According to Hindu mythology, the Somnath Jyotirlinga holds immense spiritual significance as it is believed to be the place where Lord Shiva appeared as a fiery column of light.',
    mainDeity: 'Lord Shiva as Somnath (Lord of the Moon)',
    uniqueFeatures: 'The temple is designed in the Chalukya style of temple architecture. No land exists between Somnath and Antarctica in a straight line, making it a unique geographical location. The temple has a magnificent Nandi idol and a 50-meter tall flag pole.',
    openingTime: '7:30 AM',
    closingTime: '10:00 PM',
    specialDarshan: 'Aarti timings: 7:00 AM, 12:00 PM, 7:00 PM',
    majorFestivals: 'Maha Shivaratri (February/March), Kartik Purnima (November), Shravan month celebrations',
    dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
    etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
    contactPhone: '+91 2876 231212',
    contactEmail: 'info@somnath.org',
    officialWebsite: 'https://somnath.org/',
    nearestAirport: 'Diu Airport',
    airportDistance: 80,
    nearestRailway: 'Veraval Railway Station',
    railwayDistance: 6,
    busRoutes: 'Regular bus services available from Prabhas Patan bus stand and nearby major cities including Ahmedabad, Rajkot, and Junagadh.',
    localTransport: 'Auto-rickshaws and taxis are readily available for local transportation. The temple is within walking distance from the Somnath bus stand.',
    accommodation: 'The Somnath Trust operates guest houses for pilgrims. Various hotels ranging from budget to luxury are available in Veraval and Prabhas Patan. Advance booking is recommended during peak seasons.',
    foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Gujarati cuisine and other Indian dishes.',
    facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
    safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
    emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 2876 231212',
    bestTimeToVisit: 'October to March',
    weatherInfo: 'Mild winters (15-25°C), hot summers (30-40°C), monsoon from June to September. The region experiences a tropical climate with high humidity throughout the year.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/%22_Somnath_Temple%2C_Gujarat_%22.jpg',
        caption: 'Front view of Somnath Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Prime_Minister_of_Bharat_Shri_Narendra_Damodardas_Modi_performs_Pooja_at_Shree_Somnath_Mandir.jpg',
        caption: 'Interior view of the temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Prime_Minister_of_Bharat_Shri_Narendra_Damodardas_Modi_praying_at_Shree_Somnath_Mandir.jpg',
        caption: 'Prayer ceremony at Somnath Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Somanath_mandir_%28cropped%29.jpg',
        caption: 'Side view of the temple complex'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Somnath_Temple_Gujarat.jpg',
        caption: 'Aerial view of Somnath Temple'
      }
    ]
  },
  'mallikarjuna': {
    name: 'Mallikarjuna',
    location: 'Srisailam, Andhra Pradesh',
    address: 'Srisailam, Kurnool District, Andhra Pradesh 518101',
    mapUrl: 'https://maps.google.com/?q=Mallikarjuna+Temple+Srisailam',
    history: 'Mallikarjuna swamy Temple (romanised: Mallikārjunuḍu) or Srisailam Temple is a Hindu temple dedicated to the deities Shiva and Parvati, located at Srisailam in the Indian state of Andhra Pradesh. It is significant to the Hindu sects of both Shaivism and Shaktism as this temple is referred to as one of the twelve Jyotirlingas of Shiva and as one of the eighteen Shakti pithas, centres of the Hindu goddess.',
    significance: 'Mallikarjuna Temple is one of the 12 Jyotirlinga shrines of Lord Shiva and also one of the 18 Shakti Peethas. It is a rare temple that represents both Shiva and Shakti traditions, making it highly significant for devotees of both traditions.',
    mainDeity: 'Lord Shiva as Mallikarjuna and Goddess Parvati as Bhramaramba',
    uniqueFeatures: 'The temple is situated on the Nallamala Hills on the banks of the Krishna River. It is one of the few temples where both Jyotirlinga and Shakti Peetha are present. The temple architecture showcases the Dravidian style with intricate carvings and sculptures.',
    openingTime: '4:30 AM',
    closingTime: '10:00 PM',
    specialDarshan: 'Abhishekam: 5:30 AM to 6:30 AM, Special Puja: 12:00 PM',
    majorFestivals: 'Maha Shivaratri, Ugadi, Dasara, Karthika Masam celebrations',
    dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
    etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
    contactPhone: '+91 8524 286224',
    contactEmail: 'info@srisailadevasthanam.org',
    officialWebsite: 'https://www.srisailadevasthanam.org/',
    nearestAirport: 'Rajiv Gandhi International Airport, Hyderabad',
    airportDistance: 196,
    nearestRailway: 'Markapur Road Railway Station',
    railwayDistance: 85,
    busRoutes: 'Regular bus services available from Srisailam bus stand to major cities including Hyderabad, Kurnool, and Vijayawada.',
    localTransport: 'Auto-rickshaws and taxis are available for local transportation. The temple is within walking distance from the Srisailam bus stand.',
    accommodation: 'The temple trust operates guest houses for pilgrims. Various hotels ranging from budget to luxury are available in Srisailam. Advance booking is recommended during peak seasons and festivals.',
    foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Andhra cuisine and other Indian dishes.',
    facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
    safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
    emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 8524 286224',
    bestTimeToVisit: 'November to March',
    weatherInfo: 'Mild winters (15-25°C), hot summers (30-40°C), monsoon from June to September. The region experiences a tropical climate with high humidity throughout the year.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/APSS303_Srisailam_town_zoom_view_from_welcome_center2.jpg',
        caption: 'Aerial view of Srisailam town and temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/A_Nataraja_relief_carved_on_Northern_wall_of_Srisailam_Temple.jpg',
        caption: 'Nataraja relief carved on Northern wall of Srisailam Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Historic_heritage_sites_of_Andhra_Pradesh_with_GPS_coordinates.jpg',
        caption: 'Historic heritage site of Andhra Pradesh'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/KASS301_Srisailam_Temple_Pond_3D.jpg',
        caption: 'Srisailam Temple Pond'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Relief_of_a_Leopard_on_North_wall_of_Srisailam_temple.jpg',
        caption: 'Relief of a Leopard on North wall of Srisailam temple'
      }
    ]
  },
  'mahakaleshwar': {
    name: 'Mahakaleshwar',
    location: 'Ujjain, Madhya Pradesh',
    address: 'Jaisinghpura, Ujjain, Madhya Pradesh 456006',
    mapUrl: 'https://maps.google.com/?q=Mahakaleshwar+Temple+Ujjain',
    history: 'Mahakaleshwar Jyotirlinga (IAST: mahākāleśvara) is a Hindu temple dedicated to Shiva and is one of the twelve Jyotirlingas, shrines which are said to be the most sacred abodes of Shiva. It is located in the ancient city of Ujjain in the state of Madhya Pradesh, India. The temple is situated on the side of the holy river Shipra.',
    significance: 'Mahakaleshwar is one of the 12 Jyotirlingas and is considered particularly sacred as the deity here is believed to be Swayambhu (self-manifested) and derives currents of power from within itself. The temple is also significant for its Bhasma Aarti, a unique ritual performed only at this temple.',
    mainDeity: 'Lord Shiva as Mahakaleshwar (Lord of Time)',
    uniqueFeatures: 'The lingam at Mahakaleshwar is believed to be Swayambhu (self-manifested). The temple is known for its unique Bhasma Aarti ritual where the lingam is bathed with ash from cremation grounds. The temple faces south, unlike most Hindu temples which face east.',
    openingTime: '3:00 AM',
    closingTime: '11:00 PM',
    specialDarshan: 'Bhasma Aarti: 4:00 AM to 5:30 AM, Special Puja: 12:00 PM',
    majorFestivals: 'Maha Shivaratri, Nagpanchami, Shravan month celebrations',
    dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
    etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
    contactPhone: '+91 734 2550563',
    contactEmail: 'info@mahakaleshwar.org',
    officialWebsite: 'http://dic.mp.nic.in/ujjain/mahakal/default.aspx',
    nearestAirport: 'Devi Ahilyabai Holkar Airport, Indore',
    airportDistance: 57,
    nearestRailway: 'Ujjain Junction Railway Station',
    railwayDistance: 2,
    busRoutes: 'Regular bus services available from Ujjain bus stand to major cities including Indore, Bhopal, and Ahmedabad.',
    localTransport: 'Auto-rickshaws, taxis, and e-rickshaws are available for local transportation. The temple is within walking distance from the Ujjain bus stand.',
    accommodation: 'The temple trust operates guest houses for pilgrims. Various hotels ranging from budget to luxury are available in Ujjain. Advance booking is recommended during peak seasons and festivals.',
    foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Malwa cuisine and other Indian dishes.',
    facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
    safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
    emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 734 2550563',
    bestTimeToVisit: 'October to March',
    weatherInfo: 'Mild winters (10-25°C), hot summers (30-45°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Mahakaleshwar_Mandir_in_Ujjain.jpg',
        caption: 'Front view of Mahakaleshwar Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mahakaleshwar_ujjain.jpg',
        caption: 'Another view of Mahakaleshwar Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Shri_Mahakaleshwar_Temple_Ujjain_-_panoramio.jpg',
        caption: 'Panoramic view of the temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Shri_Mahakaleshwar_Temple_Ujjain_-_panoramio_%281%29.jpg',
        caption: 'Temple complex view'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Shri_Mahakaleshwar_Temple_Ujjain_-_panoramio_%282%29.jpg',
        caption: 'Side view of the temple'
      }
    ]
  },
  'omkareshwar': {
    name: 'Omkareshwar',
    location: 'Mandhata Island, Khandwa, Madhya Pradesh',
    address: 'Omkareshwar, Khandwa District, Madhya Pradesh 450556',
    mapUrl: 'https://maps.google.com/?q=Omkareshwar+Temple',
    history: 'Omkareshwar Temple (IAST: Ōṃkārēśvar) is a Hindu temple dedicated to Shiva, located in Mandhata, nearby Khandwa city in Khandwa district of the Indian state of Madhya Pradesh. It is one of the 12 revered Jyotirlinga shrines of Shiva. It is on an island called Mandhata, near Khandwa city in the Narmada River at Khandwa district in Madhya Pradesh, India; the shape of the island is said to be like the Devanagari ॐ symbol.',
    significance: 'Omkareshwar is one of the 12 Jyotirlingas and is situated on an island shaped like the sacred symbol "Om" in the Narmada River. The temple houses two Jyotirlingas - Omkareshwar (Lord of Om) and Mamleshwar (Immortal Lord).',
    mainDeity: 'Lord Shiva as Omkareshwar and Mamleshwar',
    uniqueFeatures: 'The temple is situated on an island shaped like the sacred "Om" symbol. It houses two Jyotirlingas - one on the island (Omkareshwar) and one on the mainland (Mamleshwar). The temple architecture showcases both North Indian and South Indian styles.',
    openingTime: '5:00 AM',
    closingTime: '10:00 PM',
    specialDarshan: 'Abhishekam: 6:00 AM to 7:00 AM, Special Puja: 12:00 PM',
    majorFestivals: 'Maha Shivaratri, Narmada Jayanti, Shravan month celebrations',
    dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
    etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
    contactPhone: '+91 7280 271333',
    contactEmail: 'Not available',
    officialWebsite: 'Not available',
    nearestAirport: 'Indore Airport',
    airportDistance: 85,
    nearestRailway: 'Khandwa Railway Station',
    railwayDistance: 70,
    busRoutes: 'Regular bus services available from Omkareshwar bus stand to major cities including Indore, Khandwa, and Ujjain.',
    localTransport: 'Auto-rickshaws and taxis are available for local transportation. Boats are available to cross the Narmada River to reach the temple on the island.',
    accommodation: 'The temple trust operates guest houses for pilgrims. Various hotels ranging from budget to luxury are available in Omkareshwar. Advance booking is recommended during peak seasons and festivals.',
    foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Malwa cuisine and other Indian dishes.',
    facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility (limited on the island), special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
    safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious while crossing the river by boat. Be cautious of touts and unauthorized guides.',
    emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 7280 271333',
    bestTimeToVisit: 'September to March',
    weatherInfo: 'Mild winters (10-25°C), hot summers (30-45°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Le_fleuve_Narmada_%C3%A0_Omkareshwar_temple_Madhya_Pradesh_India.jpg',
        caption: 'Narmada River at Omkareshwar temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Mamleshwar_Temple-Omkareshwar-Madhya_Pradesh-002.jpg',
        caption: 'Mamleshwar Temple at Omkareshwar'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Omkareshwar_Temple_-_Sculpture.jpg',
        caption: 'Sculpture at Omkareshwar Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Omkareshwar_Temple_01.jpg',
        caption: 'View of Omkareshwar Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Omkareshwar_Temple_02.jpg',
        caption: 'Another view of Omkareshwar Temple'
      }
    ]
  },
  'kedarnath': {
    name: 'Kedarnath',
    location: 'Kedarnath, Uttarakhand',
    address: 'Kedarnath, Rudraprayag District, Uttarakhand 246445',
    mapUrl: 'https://maps.google.com/?q=Kedarnath+Temple',
    history: 'Kedarnath Temple (Sanskrit: केदारनाथ मंदिर, IAST: Kēdāranātha Mandira, lit. "temple of the God of the field") is a Hindu temple, one of the twelve jyotirlinga of Shiva. The temple is located on the Garhwal Himalayan range near the Mandakini river, in the state of Uttarakhand, India. Due to extreme weather conditions, the temple is open to the general public only between the months of April (Akshaya Tritiya) and November (Kartik Purnima, the autumn full moon).',
    significance: 'Kedarnath is one of the 12 Jyotirlingas and is considered one of the holiest pilgrimage sites for Hindus. It is part of the Char Dham Yatra and is believed to be the place where Lord Shiva released the holy Ganges from his matted locks.',
    mainDeity: 'Lord Shiva as Kedarnath (Lord of the Field)',
    uniqueFeatures: 'The temple is situated at an altitude of 3,583 meters (11,755 ft) in the Himalayan range. It is one of the highest Jyotirlinga temples. The temple remains closed for six months during winter due to heavy snowfall. The present temple was built by Adi Shankaracharya in the 8th century.',
    openingTime: '4:00 AM (seasonal, open from April to November)',
    closingTime: '9:00 PM (seasonal, open from April to November)',
    specialDarshan: 'Abhishekam: 5:00 AM to 6:00 AM, Special Puja: 12:00 PM',
    majorFestivals: 'Temple opening ceremony (April/May), Maha Shivaratri, Temple closing ceremony (November)',
    dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees. Warm clothing is essential due to the cold climate.',
    etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
    contactPhone: 'Not available',
    contactEmail: 'Not available',
    officialWebsite: 'Not available',
    nearestAirport: 'Jolly Grant Airport, Dehradun',
    airportDistance: 238,
    nearestRailway: 'Rishikesh Railway Station',
    railwayDistance: 216,
    busRoutes: 'Regular bus services available from Gaurikund to major cities including Rishikesh, Haridwar, and Dehradun. From Gaurikund, a 16 km trek or helicopter service is available to reach Kedarnath.',
    localTransport: 'Helicopter services are available from Phata, Guptkashi, and Sirsi to Kedarnath during the pilgrimage season. Ponies and palanquins are available for the trek from Gaurikund to Kedarnath.',
    accommodation: 'The temple trust operates guest houses for pilgrims. Various hotels and dharamshalas are available in Kedarnath. Advance booking is recommended during peak seasons. Accommodation is also available in nearby towns like Gaurikund and Sonprayag.',
    foodAvailability: 'The temple has a langar (community kitchen) serving free meals. Several restaurants and food stalls are available near the temple offering simple vegetarian meals.',
    facilities: 'Limited parking at Gaurikund, shoe stand, drinking water, washrooms, medical assistance, oxygen cylinders for altitude sickness, warm clothing rental, and porter services.',
    safetyTips: 'Acclimatize properly to avoid altitude sickness. Carry necessary medications, especially if you have pre-existing conditions. Wear warm clothing as temperatures can drop significantly. Follow the guidelines provided by the authorities. Be prepared for the trek or arrange alternative transportation.',
    emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Disaster Management: 1070',
    bestTimeToVisit: 'May to June, September to October',
    weatherInfo: 'Cold throughout the year with temperatures ranging from -10°C to 20°C. Heavy snowfall during winter (November to April) when the temple remains closed. Monsoon (July to August) brings heavy rainfall and the risk of landslides.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/A_map_showing_the_Panch_Kedar_Hindu_Tirtha_sites%2C_Uttarakhand_India.jpg',
        caption: 'Map showing the Panch Kedar Hindu Tirtha sites'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kedarnath_Temple.jpg',
        caption: 'Front view of Kedarnath Temple'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Kedarnath_Temple_at_Dawn_-_OCT_2014.jpg',
        caption: 'Kedarnath Temple at Dawn'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Kedarnath_Temple_in_2014.jpg',
        caption: 'Kedarnath Temple in 2014'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Kedarnath_Temple_in_Uttarakhand%2C_India%2C_by_Yogabrata_Chakraborty.jpg',
        caption: 'Kedarnath Temple in Uttarakhand'
      }
    ]
  }
}

const TempleDetail = () => {
  const params = useParams()
  const id = params.id as string
  const temple = templeData[id as keyof typeof templeData]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [pilgrimRef, pilgrimInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  if (!temple) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Temple Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The temple you are looking for does not exist or has been moved.
        </p>
        <Link href="/temples" className="btn-primary">
          View All Temples
        </Link>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === temple.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? temple.images.length - 1 : prev - 1
    )
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <div>
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={temple.images[0].url}
            alt={temple.name}
            fill
            priority
            className="object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <Link 
              href="/temples" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to All Temples
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {temple.name} Jyotirlinga
            </h1>
            <div className="flex items-center gap-2 text-lg mb-6">
              <MapPin size={20} />
              <span>{temple.location}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href={temple.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MapPin size={18} />
                View on Map
              </a>
              <button className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white/20">
                <BookMarked size={18} />
                Save to Bookmarks
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Temple Information Section */}
      <section 
        ref={infoRef}
        className="py-16 bg-white dark:bg-gray-900"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              animate={infoInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="lg:col-span-2"
            >
              <h2 className="heading-3 mb-6">About {temple.name} Jyotirlinga</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>{temple.history}</p>
                <h3 className="text-xl font-semibold mt-8 mb-4">Religious Significance</h3>
                <p>{temple.significance}</p>
                <h3 className="text-xl font-semibold mt-8 mb-4">Unique Features</h3>
                <p>{temple.uniqueFeatures}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={infoInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-6">Temple Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Timings</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {temple.openingTime} - {temple.closingTime}
                    </p>
                    {temple.specialDarshan && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {temple.specialDarshan}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Major Festivals</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {temple.majorFestivals}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Dress Code & Etiquette</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {temple.dressCode}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {temple.etiquette}
                    </p>
                  </div>
                </div>
                
                {temple.contactPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {temple.contactPhone}
                      </p>
                    </div>
                  </div>
                )}
                
                {temple.contactEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {temple.contactEmail}
                      </p>
                    </div>
                  </div>
                )}
                
                {temple.officialWebsite && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Official Website</p>
                      <a 
                        href={temple.officialWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {temple.officialWebsite}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pilgrim Information Section */}
      <section 
        ref={pilgrimRef}
        className="py-16 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={pilgrimInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="heading-3 mb-4">Pilgrim Information</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential information for pilgrims visiting {temple.name} Jyotirlinga Temple
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              animate={pilgrimInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5 text-red-600 dark:text-red-400" />
                How to Reach
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">By Air</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nearest Airport: {temple.nearestAirport} ({temple.airportDistance} km)
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">By Train</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nearest Railway Station: {temple.nearestRailway} ({temple.railwayDistance} km)
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">By Road</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.busRoutes}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Local Transport</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.localTransport}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={pilgrimInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-red-600 dark:text-red-400" />
                Accommodation & Food
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Accommodation Options</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.accommodation}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Food Availability</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.foodAvailability}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={pilgrimInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                Facilities & Safety
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Temple Facilities</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.facilities}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Safety Tips</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.safetyTips}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Emergency Contacts</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.emergencyContacts}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial="hidden"
            animate={pilgrimInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
              Best Time to Visit & Weather Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">Best Time to Visit</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {temple.bestTimeToVisit}
                </p>
              </div>
              
              <div>
                <p className="font-medium">Weather Information</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {temple.weatherInfo}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section 
        ref={galleryRef}
        className="py-16 bg-white dark:bg-gray-900"
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="heading-3 mb-4">Photo Gallery</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore images of {temple.name} Jyotirlinga Temple
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {temple.images.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image 
                  src={image.url} 
                  alt={image.caption || temple.name} 
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p>{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={prevImage}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image 
              src={temple.images[currentImageIndex].url} 
              alt={temple.images[currentImageIndex].caption || temple.name} 
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
              <p>{temple.images[currentImageIndex].caption}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={nextImage}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Related Temples Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="heading-3 text-center mb-12">Other Jyotirlinga Temples</h2>
          
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
            {Object.entries(templeData)
              .filter(([key]) => key !== id)
              .slice(0, 4)
              .map(([key, relatedTemple]) => (
                <div 
                  key={key} 
                  className="min-w-[280px] max-w-[280px] bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image 
                      src={relatedTemple.images[0].url} 
                      alt={relatedTemple.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                      {relatedTemple.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      {relatedTemple.location}
                    </p>
                    <Link 
                      href={`/temples/${key}`}
                      className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      View Details
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/temples" className="btn-outline">
              View All Temples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TempleDetail