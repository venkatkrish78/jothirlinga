"use client"

import { useState, useEffect } from 'react'
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

interface TempleDetailPageProps {
  lng: string
  id: string
}

export default function TempleDetailPage({ lng, id }: TempleDetailPageProps) {
  const { t } = useTranslation(lng)
  
  const templeData = {
    'somnath': {
      name: 'Somnath',
      location: 'Prabhas Patan, Gujarat',
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
      significance: 'Kedarnath is one of the 12 Jyotirlingas and is considered one of the holiest pilgrimage sites for Hindus. It is part of the Char Dham pilgrimage circuit and is believed to be the place where Lord Shiva released the holy Ganges from his matted locks.',
      mainDeity: 'Lord Shiva as Kedarnath (Lord of the Field)',
      uniqueFeatures: 'The temple is situated at an altitude of 3,583 meters (11,755 ft) above sea level. During winter, the temple is closed and the deity is moved to Ukhimath. The temple is one of the highest Jyotirlinga shrines and is surrounded by breathtaking Himalayan peaks.',
      openingTime: '4:00 AM (seasonal)',
      closingTime: '9:00 PM (seasonal)',
      specialDarshan: 'Morning Abhishekam: 4:30 AM to 7:00 AM',
      majorFestivals: 'Temple opening ceremony (April/May), Maha Shivaratri, Badri-Kedar festival',
      dressCode: 'Warm clothing is essential due to the cold climate. Traditional Indian attire or modest western clothing is recommended.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 1364 260 226',
      contactEmail: 'Not available',
      officialWebsite: 'https://badrinath-kedarnath.gov.in/',
      nearestAirport: 'Jolly Grant Airport, Dehradun',
      airportDistance: 238,
      nearestRailway: 'Rishikesh Railway Station',
      railwayDistance: 216,
      busRoutes: 'Buses available from Rishikesh, Haridwar, and Dehradun to Gaurikund. From Gaurikund, a 16 km trek or helicopter service is available to reach Kedarnath.',
      localTransport: 'Helicopter services, ponies, palanquins (palki), and porters are available from Gaurikund to Kedarnath. The temple is accessible only by foot or helicopter.',
      accommodation: 'GMVN (Garhwal Mandal Vikas Nigam) guest houses, private hotels, and dharamshalas are available. Advance booking is essential during peak season. Tented accommodation is also available near the temple.',
      foodAvailability: 'Simple vegetarian meals are available at the temple canteen and nearby eateries. Carrying some packaged food and water is advisable.',
      facilities: 'Basic facilities including toilets, drinking water, and medical aid are available. Oxygen cylinders are available for those facing breathing difficulties at high altitude.',
      safetyTips: 'Acclimatize properly before the trek. Carry necessary medications, especially if you have pre-existing conditions. Be prepared for sudden weather changes. Follow the instructions of local authorities.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Disaster Management: 1070, SDRF Helpline: +91 1364 260 226',
      bestTimeToVisit: 'May to June, September to October',
      weatherInfo: 'The climate is cold throughout the year with temperatures ranging from -10°C to 20°C. Monsoon (July-August) brings heavy rainfall and risk of landslides. Winter (November-April) sees heavy snowfall and the temple remains closed.',
      images: [
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
          caption: 'Panoramic view of Kedarnath Temple'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/A_map_showing_the_Panch_Kedar_Hindu_Tirtha_sites%2C_Uttarakhand_India.jpg',
          caption: 'Map showing Panch Kedar sites including Kedarnath'
        }
      ]
    },
    'bhimashankar': {
      name: 'Bhimashankar',
      location: 'Pune, Maharashtra',
      address: 'Bhimashankar, Pune District, Maharashtra 410509',
      mapUrl: 'https://maps.google.com/?q=Bhimashankar+Temple',
      history: 'Bhimashankar Temple is a Hindu temple dedicated to Shiva situated in its eponymous village, Bhimashankar, in Pune district of Maharashtra. It is a key pilgrimage centre and contains one of the 12 Jyotirlingas. The temple\'s Shiva lingam is one of the five Jyotirlingas of Maharashtra. The mandir is situated on a mountain, 110 kilometers away from Pune. The temple\'s vicinity has rare plant and animal species.',
      significance: 'Bhimashankar is one of the 12 Jyotirlingas and is considered highly sacred. According to legend, it is the place where Lord Shiva defeated the demon Tripurasura. The temple is also significant as the source of the River Bhima.',
      mainDeity: 'Lord Shiva as Bhimashankar',
      uniqueFeatures: 'The temple is situated in the Sahyadri mountain range amidst dense forests. It is surrounded by a wildlife sanctuary that is home to the endangered Shekru (Giant Squirrel). The temple architecture showcases Nagara style with intricate carvings.',
      openingTime: '4:30 AM',
      closingTime: '9:30 PM',
      specialDarshan: 'Morning Abhishekam: 5:00 AM to 7:00 AM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 2135 222 880',
      contactEmail: 'Not available',
      officialWebsite: 'https://bhimashankar.in/',
      nearestAirport: 'Pune International Airport',
      airportDistance: 110,
      nearestRailway: 'Pune Railway Station',
      railwayDistance: 100,
      busRoutes: 'Regular bus services available from Pune to Bhimashankar. Private taxis and shared jeeps are also available from Pune.',
      localTransport: 'Shared jeeps and taxis are available from nearby towns like Khed and Manchar to reach Bhimashankar.',
      accommodation: 'MTDC (Maharashtra Tourism Development Corporation) resort, private hotels, and dharamshalas are available. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a canteen serving vegetarian meals. Several small restaurants and food stalls are available near the temple offering Maharashtrian cuisine.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility (limited due to hilly terrain), luggage storage, and medical assistance.',
      safetyTips: 'Be cautious while trekking in the forest area. Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 2135 222 880',
      bestTimeToVisit: 'October to March',
      weatherInfo: 'Mild winters (10-25°C), moderate summers (25-35°C), heavy rainfall during monsoon (June to September). The region experiences pleasant weather throughout the year, but monsoon brings heavy rainfall making travel difficult.',
      images: [
        {
          url: 'https://i.pinimg.com/originals/3d/4a/01/3d4a01f9a9c5b04849f710b721619c8a.jpg',
          caption: 'Front view of Bhimashankar Temple'
        },
        {
          url: 'https://www.templepurohit.com/wp-content/uploads/2015/02/bhimashankar-temple-maharashtra.jpg',
          caption: 'Bhimashankar Temple complex'
        },
        {
          url: 'https://www.tirthayatra.org/wp-content/uploads/2022/06/bhimashankar-temple.jpg',
          caption: 'Another view of Bhimashankar Temple'
        },
        {
          url: 'https://blog.yatradham.org/wp-content/uploads/2023/10/Bhimashankar-Jyotirlinga-Temple-768x1024.jpg',
          caption: 'Bhimashankar Jyotirlinga Temple'
        },
        {
          url: 'https://1.bp.blogspot.com/-Pz0qctOVPhM/XZ3TnsNBksI/AAAAAAAAAB4/0vsbs_Z9xGUu9IV8ctoQ24WyJUzKE6BeACNcBGAsYHQ/s1600/Bhimashankar_temple%252C_Maharashtra.jpg',
          caption: 'Side view of Bhimashankar Temple'
        }
      ]
    },
    'kashi-vishwanath': {
      name: 'Kashi Vishwanath',
      location: 'Varanasi, Uttar Pradesh',
      address: 'Vishwanath Gali, Varanasi, Uttar Pradesh 221001',
      mapUrl: 'https://maps.google.com/?q=Kashi+Vishwanath+Temple',
      history: 'Kashi Vishwanath Temple is a Hindu temple dedicated to Shiva. It is located in Vishwanath Gali, in Varanasi, Uttar Pradesh, India. The temple is a Hindu pilgrimage site and is one of the twelve Jyotirlinga shrines. The presiding deity is known by the names Vishwanath and Vishweshwara (IAST: Viśvanātha and Viśveśvara), meaning Lord of the Universe. The original temple, called the Adi Vishveshwar Temple, was demolished by Mohammad of Ghor during his invasion of India.',
      significance: 'Kashi Vishwanath is one of the 12 Jyotirlingas and is considered one of the holiest sites in Hinduism. It is believed that a visit to the temple and a dip in the holy Ganges river washes away all sins. The temple is also significant as it is mentioned in ancient Hindu scriptures including the Skanda Purana.',
      mainDeity: 'Lord Shiva as Vishwanath (Lord of the Universe)',
      uniqueFeatures: 'The temple features a gold-plated spire and dome. The main lingam is housed in a silver altar. The temple complex is part of the recently developed Kashi Vishwanath Corridor that connects it directly to the Ganges river.',
      openingTime: '2:30 AM',
      closingTime: '11:00 PM',
      specialDarshan: 'Mangala Aarti: 3:00 AM, Shringar Aarti: 5:00 PM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations, Dev Deepawali',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 542 239 2629',
      contactEmail: 'info@kashivishwanath.org',
      officialWebsite: 'http://www.shrikashivishwanath.org/',
      nearestAirport: 'Lal Bahadur Shastri International Airport, Varanasi',
      airportDistance: 25,
      nearestRailway: 'Varanasi Junction',
      railwayDistance: 3,
      busRoutes: 'Regular bus services available from Varanasi bus stand to major cities. The temple is located in the heart of the city.',
      localTransport: 'Auto-rickshaws, cycle rickshaws, and e-rickshaws are available for local transportation. The narrow lanes leading to the temple are accessible only by foot.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Varanasi. Dharamshalas and guest houses are also available near the temple. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a canteen serving vegetarian meals. Numerous restaurants and food stalls are available near the temple offering Banarasi cuisine and other Indian dishes.',
      facilities: 'Shoe stand, drinking water, washrooms, wheelchair accessibility (limited in narrow lanes), special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
      safetyTips: 'Be cautious in crowded areas. Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be aware of touts and unauthorized guides.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 542 239 2629',
      bestTimeToVisit: 'October to March',
      weatherInfo: 'Mild winters (5-20°C), hot summers (30-45°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
      images: [
        {
          url: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/02/24/551301-kashi-vishwanath-2.jpg',
          caption: 'Front view of Kashi Vishwanath Temple'
        },
        {
          url: 'https://behindeverytemple.org/wp-content/uploads/2020/09/kasi.jpg',
          caption: 'Kashi Vishwanath Temple complex'
        },
        {
          url: 'https://www.gosahin.com/go/p/a/1522480079_Kashi-Vishwanath1.jpg',
          caption: 'Golden spire of Kashi Vishwanath Temple'
        },
        {
          url: 'https://thumbs.dreamstime.com/z/kashi-vishwanath-temple-jyotirlinga-varanasi-kashi-banaras-uttar-pradesh-aug-kashi-vishwanath-temple-jyotirlinga-varanasi-kashi-184699365.jpg',
          caption: 'Entrance of Kashi Vishwanath Temple'
        },
        {
          url: 'https://www.ahospitalityclub.com/wp-content/uploads/2022/07/20220519159L2022071406593520220714082601.jpg',
          caption: 'Kashi Vishwanath Corridor'
        }
      ]
    },
    'trimbakeshwar': {
      name: 'Trimbakeshwar',
      location: 'Nashik, Maharashtra',
      address: 'Trimbak, Nashik District, Maharashtra 422212',
      mapUrl: 'https://maps.google.com/?q=Trimbakeshwar+Temple',
      history: 'Trimbakeshwar Shiva Temple (श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर) is an ancient Hindu temple in the town of Trimbak, in the Trimbakeshwar tehsil in the Nashik District of Maharashtra, India, 28 km from the city of Nashik and 40 km from Nashik road. It is dedicated to the Hindu god Shiva and is one of the twelve jyotirlingas where the Hindu genealogy registers at Trimbakeshwar, Maharashtra are kept. The origin of the sacred Godavari River is near Trimbak.',
      significance: 'Trimbakeshwar is one of the 12 Jyotirlingas and is considered highly sacred. It is unique as the lingam here represents the three aspects of divinity - Brahma, Vishnu, and Shiva. The temple is also significant as the source of the River Godavari, one of the seven sacred rivers in India.',
      mainDeity: 'Lord Shiva as Trimbakeshwar (Three-Eyed Lord)',
      uniqueFeatures: 'The lingam at Trimbakeshwar is unique as it has three faces representing Brahma, Vishnu, and Shiva. The temple is built in the Hemadpanthi style of architecture with black stone. The Kusavarta kunda (sacred pond) in the temple premises is the source of the Godavari River.',
      openingTime: '5:30 AM',
      closingTime: '9:00 PM',
      specialDarshan: 'Morning Abhishekam: 6:00 AM to 7:00 AM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations, Kumbh Mela (every 12 years)',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 2594 233 211',
      contactEmail: 'Not available',
      officialWebsite: 'https://www.trimbakeshwartrust.com/',
      nearestAirport: 'Mumbai Airport',
      airportDistance: 175,
      nearestRailway: 'Nashik Road Railway Station',
      railwayDistance: 30,
      busRoutes: 'Regular bus services available from Nashik to Trimbakeshwar. Private taxis are also available from Nashik.',
      localTransport: 'Auto-rickshaws and taxis are available for local transportation in Trimbakeshwar.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Trimbakeshwar and Nashik. Dharamshalas and guest houses are also available near the temple. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Maharashtrian cuisine and other Indian dishes.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
      safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 2594 233 211',
      bestTimeToVisit: 'October to March',
      weatherInfo: 'Mild winters (10-25°C), hot summers (25-40°C), heavy rainfall during monsoon (June to September). The region experiences pleasant weather during winter, making it the best time to visit.',
      images: [
        {
          url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhb2wOv1FiUhcdpP7_ZtQ3OwRPODQ-At8FPWvHsgb0FtN2NcLzukW8zzf74pYG4wtbGNevjEyR0QDWHGG8hCklDPurgKAU1M5wi__njLtkVVq7dZgFS9aqkyQnT8ECjJMHXTBHihdCE1tR0jfJoAhlgfvm5FuXz9R59m9Goh3GISPjmULZ1hxT0BX6lDg/w1200-h630-p-k-no-nu/k.jpg',
          caption: 'Front view of Trimbakeshwar Temple'
        },
        {
          url: 'https://i.ytimg.com/vi/cTm5oAnRqmo/maxresdefault.jpg',
          caption: 'Trimbakeshwar Temple complex'
        },
        {
          url: 'https://i.pinimg.com/originals/2b/89/3e/2b893e7487e10413948a2d68dab4d493.png',
          caption: 'Aerial view of Trimbakeshwar'
        },
        {
          url: 'https://i.ytimg.com/vi/XjECHlTIsgs/maxresdefault.jpg',
          caption: 'Kusavarta kunda at Trimbakeshwar'
        },
        {
          url: 'https://www.shutterstock.com/shutterstock/photos/2460157907/display_1500/stock-photo-trimbakeshwar-jyotirlinga-temple-nashik-maharashtra-2460157907.jpg',
          caption: 'Side view of Trimbakeshwar Temple'
        }
      ]
    },
    'vaidyanath': {
      name: 'Vaidyanath',
      location: 'Deoghar, Jharkhand',
      address: 'Deoghar, Jharkhand 814112',
      mapUrl: 'https://maps.google.com/?q=Baidyanath+Temple+Deoghar',
      history: 'Baidyanath Temple (IAST: Baidyãnath), also known as Baba Baidyanath Dham, is a Hindu temple dedicated to Shiva. It is located in Deoghar, in the Santhal Parganas division of the Indian state of Jharkhand. The temple complex comprises the central shrine of Baba Baidyanath along with 21 additional temples. It is significant to the Hindu sects of Shaivism as this temple is referred to as one of the twelve Jyotirlingas.',
      significance: 'Vaidyanath is one of the 12 Jyotirlingas and is considered highly sacred. According to legend, it is the place where Ravana worshipped Lord Shiva and offered his ten heads one by one to please him. The temple is also significant during the month of Shravan when millions of devotees carry holy water from the Ganges to offer to the lingam.',
      mainDeity: 'Lord Shiva as Vaidyanath (Lord of Physicians)',
      uniqueFeatures: 'The temple complex comprises 22 temples including the main shrine. The lingam is believed to be self-manifested (Swayambhu). During the month of Shravan, millions of devotees undertake the Kanwar Yatra, carrying holy water from the Ganges to offer to the lingam.',
      openingTime: '4:00 AM',
      closingTime: '9:30 PM',
      specialDarshan: 'Morning Abhishekam: 4:30 AM to 6:00 AM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations, Sawan Mela',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 6432 232 977',
      contactEmail: 'Not available',
      officialWebsite: 'Not available',
      nearestAirport: 'Deoghar Airport',
      airportDistance: 15,
      nearestRailway: 'Deoghar Railway Station',
      railwayDistance: 5,
      busRoutes: 'Regular bus services available from Deoghar bus stand to major cities including Patna, Ranchi, and Kolkata.',
      localTransport: 'Auto-rickshaws, cycle rickshaws, and e-rickshaws are available for local transportation in Deoghar.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Deoghar. Dharamshalas and guest houses are also available near the temple. Advance booking is essential during the Shravan month.',
      foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering local cuisine and other Indian dishes.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
      safetyTips: 'Be cautious in crowded areas, especially during Shravan month. Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 6432 232 977',
      bestTimeToVisit: 'October to March',
      weatherInfo: 'Mild winters (10-25°C), hot summers (30-40°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
      images: [
        {
          url: 'https://i.ytimg.com/vi/uun-iF1R700/maxresdefault.jpg',
          caption: 'Front view of Baidyanath Temple'
        },
        {
          url: 'https://www.templeduniya.com/wp-content/uploads/2022/06/Project-51-8-min.jpg',
          caption: 'Baidyanath Temple complex'
        },
        {
          url: 'https://www.templeduniya.com/wp-content/uploads/2022/06/Project-51-9-min.jpg',
          caption: 'Another view of Baidyanath Temple'
        },
        {
          url: 'https://www.bharattaxi.com/blog/wp-content/uploads/2015/08/Baidyanath-Temple.jpg',
          caption: 'Entrance of Baidyanath Temple'
        },
        {
          url: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/09/7f/87/bol-bam.jpg',
          caption: 'Devotees during Shravan month at Baidyanath Temple'
        }
      ]
    },
    'nageshwar': {
      name: 'Nageshwar',
      location: 'Dwarka, Gujarat',
      address: 'Nageshwar, Dwarka, Gujarat 361335',
      mapUrl: 'https://maps.google.com/?q=Nageshwar+Temple+Dwarka',
      history: 'Nageshwar Jyotirlinga Temple is a Hindu shrine dedicated to Lord Shiva, located near Dwarka in Gujarat, India. It is one of the 12 Jyotirlinga shrines mentioned in the Shiva Purana. According to legend, this is the place where Lord Shiva defeated the demon Daruka who had imprisoned a devotee named Supriya.',
      significance: 'Nageshwar is one of the 12 Jyotirlingas and is considered highly sacred. It is believed to protect devotees from all poisons (Naga means cobra). The temple is also significant as it is mentioned in ancient Hindu scriptures including the Shiva Purana.',
      mainDeity: 'Lord Shiva as Nageshwar (Lord of Serpents)',
      uniqueFeatures: 'The temple features a massive 25-meter tall statue of Lord Shiva in the sitting position. The lingam at Nageshwar is believed to be self-manifested (Swayambhu) and faces south. The temple is located in a serene environment near the Arabian Sea.',
      openingTime: '6:00 AM',
      closingTime: '9:00 PM',
      specialDarshan: 'Morning Abhishekam: 6:30 AM to 7:30 AM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 2892 234 876',
      contactEmail: 'Not available',
      officialWebsite: 'Not available',
      nearestAirport: 'Jamnagar Airport',
      airportDistance: 145,
      nearestRailway: 'Dwarka Railway Station',
      railwayDistance: 15,
      busRoutes: 'Regular bus services available from Dwarka bus stand to Nageshwar. Private taxis are also available from Dwarka.',
      localTransport: 'Auto-rickshaws and taxis are available for local transportation from Dwarka to Nageshwar.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Dwarka. Limited accommodation options are available near the temple. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a small canteen serving vegetarian meals. Several restaurants and food stalls are available in Dwarka offering Gujarati cuisine and other Indian dishes.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, and medical assistance.',
      safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 2892 234 876',
      bestTimeToVisit: 'October to February',
      weatherInfo: 'Mild winters (15-25°C), hot summers (30-40°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
      images: [
        {
          url: 'https://i.pinimg.com/736x/66/d6/23/66d623443bfc18d024d35bb043099c9e.jpg',
          caption: 'Front view of Nageshwar Temple'
        },
        {
          url: 'https://i.pinimg.com/originals/57/e9/a5/57e9a593df7216124066346851c6500e.jpg',
          caption: 'Massive statue of Lord Shiva at Nageshwar'
        },
        {
          url: 'https://thrillingtravel.in/wp-content/uploads/2021/06/Nageshvar-jyotirlinga-temple-gujarat.jpg',
          caption: 'Nageshwar Jyotirlinga Temple'
        },
        {
          url: 'https://thrillingtravel.in/wp-content/uploads/2021/06/Shiva-Nageshwar-Jyotirlinga-Temple-Dwarka.jpg',
          caption: 'Another view of Nageshwar Temple'
        },
        {
          url: 'https://www.trawell.in/admin/images/upload/900551700Dwarka_Nageshwar_Temple_main.jpg',
          caption: 'Entrance of Nageshwar Temple'
        }
      ]
    },
    'rameshwaram': {
      name: 'Rameshwaram',
      location: 'Rameshwaram, Tamil Nadu',
      address: 'Rameshwaram, Tamil Nadu 623526',
      mapUrl: 'https://maps.google.com/?q=Ramanathaswamy+Temple+Rameshwaram',
      history: 'Ramanathaswamy Temple (Rāmanātasvāmi Kōyil) is a Hindu temple dedicated to the Hindu god Shiva located on Rameswaram island in the state of Tamil Nadu, India. It is one of the twelve Jyotirlinga temples. It is one of the 275 Paadal Petra Sthalams, the sacred sites glorified by the Nayanars (Shaivite poet-saints), Appar, Sundarar, and Sambandar, with their songs. According to tradition, the lingam (an aniconic form of Shiva) of the Ramanathaswamy Temple was established and worshipped by Lord Ram before he crossed the bridge called Rama Setu to the island kingdom of Lanka, identified with Sri Lanka. It is one of the Char Dham pilgrimage sites.',
      significance: 'Rameshwaram is one of the 12 Jyotirlingas and is considered highly sacred. According to legend, it is the place where Lord Rama worshipped Lord Shiva to cleanse himself of the sin of killing Ravana. The temple is also significant as it is one of the Char Dham pilgrimage sites.',
      mainDeity: 'Lord Shiva as Ramanathaswamy (Lord of Rama)',
      uniqueFeatures: 'The temple is known for its magnificent corridors, which are the longest in India (1220 meters). It has 22 theerthams (holy water bodies) within the temple complex where pilgrims take ritual baths. The temple architecture showcases the Dravidian style with intricate carvings and sculptures.',
      openingTime: '5:00 AM',
      closingTime: '9:00 PM',
      specialDarshan: 'Morning Abhishekam: 6:00 AM to 7:00 AM',
      majorFestivals: 'Maha Shivaratri, Thai Amavasya, Aadi Amavasya',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 4573 221 223',
      contactEmail: 'Not available',
      officialWebsite: 'https://tnhrce.gov.in/hrcehome/index_temple.php?tid=35671',
      nearestAirport: 'Madurai Airport',
      airportDistance: 174,
      nearestRailway: 'Rameshwaram Railway Station',
      railwayDistance: 2,
      busRoutes: 'Regular bus services available from Rameshwaram bus stand to major cities including Chennai, Madurai, and Trichy.',
      localTransport: 'Auto-rickshaws and taxis are available for local transportation in Rameshwaram.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Rameshwaram. Dharamshalas and guest houses are also available near the temple. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple offering Tamil cuisine and other South Indian dishes.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, luggage storage, and medical assistance.',
      safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 4573 221 223',
      bestTimeToVisit: 'October to April',
      weatherInfo: 'Warm throughout the year (25-35°C), best avoided during monsoon (October to December). The region experiences a tropical climate with high humidity throughout the year.',
      images: [
        {
          url: 'https://apnayatra.com/wp-content/uploads/2023/07/Rameshwaram-Jyotirlinga-Shivam-Temple0.jpg',
          caption: 'Front view of Rameshwaram Temple'
        },
        {
          url: 'https://www.chardham-pilgrimage-tour.com/assets/images/rameshwaram-jyotirlinga-temple-tamilnadu.webp',
          caption: 'Rameshwaram Temple complex'
        },
        {
          url: 'https://www.templedairy.in/wp-content/uploads/2015/11/Rameswaram_temple_11.jpg',
          caption: 'Corridor of Rameshwaram Temple'
        },
        {
          url: 'https://www.ahospitalityclub.com/wp-content/uploads/2022/06/temple-of-india.jpg',
          caption: 'Another view of Rameshwaram Temple'
        },
        {
          url: 'https://thumbs.dreamstime.com/z/shree-rameshwaram-jyotirlinga-shivam-temple-historic-hindu-located-city-tamil-nadu-india-291567746.jpg',
          caption: 'Entrance of Rameshwaram Temple'
        }
      ]
    },
    'grishneshwar': {
      name: 'Grishneshwar',
      location: 'Ellora, Aurangabad, Maharashtra',
      address: 'Verul, Aurangabad District, Maharashtra 431102',
      mapUrl: 'https://maps.google.com/?q=Grishneshwar+Temple+Ellora',
      history: 'Grushneshwar Jyotirlinga is a Hindu temple of Shiva in Verul village of Aurangabad district, Maharashtra, India. It is one of the 12 Jyotirlinga mandirs. The mandir is a national protected site, one and a half kilometers away from the Ellora Caves, 30 kilometres (19 miles) north-west of the city Aurangabad, and 300 kilometres (190 miles) east-northeast far from Mumbai. Grushneshwar is mentioned in the Shiva Purana, the Skanda Purana, the Ramayana and the Mahabharata.',
      significance: 'Grishneshwar is one of the 12 Jyotirlingas and is considered highly sacred. It is the last (12th) Jyotirlinga on earth. The temple is also significant as it is mentioned in ancient Hindu scriptures including the Shiva Purana and the Skanda Purana.',
      mainDeity: 'Lord Shiva as Grishneshwar (Lord of Compassion)',
      uniqueFeatures: 'The temple is built of red rocks and showcases exquisite carvings and sculptures. It is located near the famous Ellora Caves, a UNESCO World Heritage Site. The temple architecture showcases the Hemadpanthi style with intricate carvings.',
      openingTime: '5:00 AM',
      closingTime: '9:00 PM',
      specialDarshan: 'Morning Abhishekam: 6:00 AM to 7:00 AM',
      majorFestivals: 'Maha Shivaratri, Shravan month celebrations',
      dressCode: 'Traditional Indian attire is recommended. Men should wear dhoti, kurta, or pants. Women should wear saree, salwar kameez, or other modest attire covering shoulders and knees.',
      etiquette: 'Remove footwear before entering the temple. Maintain silence in the sanctum sanctorum. Photography is restricted in certain areas. Offerings like flowers, bilva leaves, and sweets are common.',
      contactPhone: '+91 240 232 2454',
      contactEmail: 'Not available',
      officialWebsite: 'Not available',
      nearestAirport: 'Aurangabad Airport',
      airportDistance: 30,
      nearestRailway: 'Aurangabad Railway Station',
      railwayDistance: 25,
      busRoutes: 'Regular bus services available from Aurangabad to Ellora/Verul. Private taxis are also available from Aurangabad.',
      localTransport: 'Auto-rickshaws and taxis are available for local transportation from Aurangabad to Ellora/Verul.',
      accommodation: 'Various hotels ranging from budget to luxury are available in Aurangabad. Limited accommodation options are available near the temple. Advance booking is recommended during peak seasons and festivals.',
      foodAvailability: 'The temple has a small canteen serving vegetarian meals. Several restaurants and food stalls are available near the temple and in Aurangabad offering Maharashtrian cuisine and other Indian dishes.',
      facilities: 'Parking, shoe stand, drinking water, washrooms, wheelchair accessibility, special queues for elderly and differently-abled visitors, and medical assistance.',
      safetyTips: 'Keep your valuables secure. Stay hydrated, especially during summer months. Follow the temple rules and regulations. Be cautious of touts and unauthorized guides.',
      emergencyContacts: 'Police: 100, Ambulance: 108, Fire: 101, Temple Security: +91 240 232 2454',
      bestTimeToVisit: 'October to March',
      weatherInfo: 'Mild winters (10-25°C), hot summers (25-40°C), monsoon from June to September. The region experiences extreme temperatures during summer, so it is advisable to visit during winter months.',
      images: [
        {
          url: 'https://i.pinimg.com/originals/56/56/65/565665a6d2034ab402dddcd3ea3b60ee.jpg',
          caption: 'Front view of Grishneshwar Temple'
        },
        {
          url: 'https://i.pinimg.com/originals/22/d4/df/22d4df8bb1baab28f1e907dc361e0d4a.jpg',
          caption: 'Grishneshwar Temple complex'
        },
        {
          url: 'https://i.ytimg.com/vi/1UGkQj6gr0g/maxresdefault.jpg',
          caption: 'Another view of Grishneshwar Temple'
        },
        {
          url: 'https://i.ytimg.com/vi/65kjs2CBzz4/maxresdefault.jpg',
          caption: 'Entrance of Grishneshwar Temple'
        },
        {
          url: 'https://hblimg.mmtcdn.com/content/hubble/img/aurangabad/mmt/activities/m_Jyotirlinga%20Grishneshwar%20Temple-1_l_420_630.jpg',
          caption: 'Side view of Grishneshwar Temple'
        }
      ]
    }
  }
  
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

  // Check if the temple exists in our data
  const temple = templeData[id as keyof typeof templeData]

  if (!temple) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('temple_detail.temple_not_found')}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t('temple_detail.temple_moved')}
        </p>
        <Link href={`/${lng}/temples`} className="btn-primary">
          {t('temple_detail.back_to_all')}
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

  // Get other temples for the related temples section
  const otherTemples = Object.entries(templeData)
    .filter(([key]) => key !== id)
    .slice(0, 4)
    .map(([key, relatedTemple]) => ({
      id: key,
      name: relatedTemple.name,
      location: relatedTemple.location,
      image: relatedTemple.images[0].url
    }))

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
              href={`/${lng}/temples`} 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft size={16} />
              {t('temple_detail.back_to_all')}
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
                {t('temple_detail.view_on_map')}
              </a>
              <button className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white/20">
                <BookMarked size={18} />
                {t('temple_detail.save_bookmark')}
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
              <h2 className="heading-3 mb-6">{t('temple_detail.about')} {temple.name} Jyotirlinga</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>{temple.history}</p>
                <h3 className="text-xl font-semibold mt-8 mb-4">{t('temple_detail.religious_significance')}</h3>
                <p>{temple.significance}</p>
                <h3 className="text-xl font-semibold mt-8 mb-4">{t('temple_detail.unique_features')}</h3>
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
              <h3 className="text-xl font-semibold mb-6">{t('temple_detail.temple_info')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{t('temple_detail.timings')}</p>
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
                    <p className="font-medium">{t('temple_detail.major_festivals')}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {temple.majorFestivals}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{t('temple_detail.dress_code')}</p>
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
                      <p className="font-medium">{t('temple_detail.contact')}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {temple.contactPhone}
                      </p>
                    </div>
                  </div>
                )}
                
                {temple.contactEmail && temple.contactEmail !== 'Not available' && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('temple_detail.email')}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {temple.contactEmail}
                      </p>
                    </div>
                  </div>
                )}
                
                {temple.officialWebsite && temple.officialWebsite !== 'Not available' && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('temple_detail.official_website')}</p>
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
            <h2 className="heading-3 mb-4">{t('temple_detail.pilgrim_info')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('temple_detail.pilgrim_subtitle')} {temple.name} Jyotirlinga Temple
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
                {t('temple_detail.how_to_reach')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{t('temple_detail.by_air')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.nearestAirport} ({temple.airportDistance} km)
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.by_train')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.nearestRailway} ({temple.railwayDistance} km)
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.by_road')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.busRoutes}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.local_transport')}</p>
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
                {t('temple_detail.accommodation')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{t('temple_detail.accommodation_options')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.accommodation}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.food_availability')}</p>
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
                {t('temple_detail.facilities')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{t('temple_detail.temple_facilities')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.facilities}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.safety_tips')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {temple.safetyTips}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{t('temple_detail.emergency_contacts')}</p>
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
              {t('temple_detail.best_time')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">{t('temple_detail.best_time_visit')}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {temple.bestTimeToVisit}
                </p>
              </div>
              
              <div>
                <p className="font-medium">{t('temple_detail.weather_info')}</p>
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
            <h2 className="heading-3 mb-4">{t('temple_detail.photo_gallery')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('temple_detail.gallery_subtitle')} {temple.name} Jyotirlinga Temple
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
          <h2 className="heading-3 text-center mb-12">{t('temple_detail.other_temples')}</h2>
          
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
            {otherTemples.map((relatedTemple) => (
              <div 
                key={relatedTemple.id} 
                className="min-w-[280px] max-w-[280px] bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-40">
                  <Image 
                    src={relatedTemple.image} 
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
                    href={`/${lng}/temples/${relatedTemple.id}`}
                    className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {t('temple_detail.view_details')}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href={`/${lng}/temples`} className="btn-outline">
              {t('temple_detail.back_to_all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}