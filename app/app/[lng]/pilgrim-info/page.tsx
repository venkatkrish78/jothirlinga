import { useTranslation } from '@/app/i18n'
import PilgrimInfoPage from '@/components/pilgrim-info-page'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
  return <PilgrimInfoPage lng={lng} />
}