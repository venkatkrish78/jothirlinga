import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { useTranslation } from '@/app/i18n'

interface FooterProps {
  lng: string
}

const Footer = async ({ lng }: FooterProps) => {
  const { t } = await useTranslation(lng)
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ॐ</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">{t('app_name')}</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lng}`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/temples`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.temples')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/travel-planning`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.travel_planning')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/pilgrim-info`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.pilgrim_info')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/bookmarks`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.bookmarks')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.jyotirlinga_temples')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lng}/temples/somnath`} className="text-gray-400 hover:text-white transition-colors">
                  Somnath, Gujarat
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/temples/mallikarjuna`} className="text-gray-400 hover:text-white transition-colors">
                  Mallikarjuna, Andhra Pradesh
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/temples/mahakaleshwar`} className="text-gray-400 hover:text-white transition-colors">
                  Mahakaleshwar, Madhya Pradesh
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/temples/omkareshwar`} className="text-gray-400 hover:text-white transition-colors">
                  Omkareshwar, Madhya Pradesh
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/temples`} className="text-red-400 hover:text-white transition-colors">
                  {t('footer.view_all_temples')} →
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact_us')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5" />
                <span className="text-gray-400">4114, prestige lakeside habitat, sh-35, bangalore, karnataka, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <a href="mailto:venkat@jyotirlingaguide.com" className="text-gray-400 hover:text-white transition-colors">info@jyotirlingaguide.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400" />
                <a href="tel:+919980902868" className="text-gray-400 hover:text-white transition-colors">+91 99809 02868</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {t('app_name')}. {t('footer.rights_reserved')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
