import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Clock, Users, Compass, Info, ArrowRight, Search, BookMarked } from 'lucide-react'
import { useTranslation } from '../i18n'
import ClientPage from './client-page'

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
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
      name: t('home.stats.pilgrimage_circuits'),
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
    <>
      <ClientPage lng={lng} />
    </>
  )
}