import { useTranslation } from '@/app/i18n'
import TempleDetailPage from '@/components/temple-detail-page'

export default async function Page({ params: { lng, id } }: { params: { lng: string, id: string } }) {
  const { t } = await useTranslation(lng)
  
  return <TempleDetailPage lng={lng} id={id} />
}