import { useTranslation } from '@/app/i18n'
import TravelPlanningPage from '@/components/travel-planning-page'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
  return <TravelPlanningPage lng={lng} />
}