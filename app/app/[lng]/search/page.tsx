import { useTranslation } from '@/app/i18n'
import SearchPage from '@/components/search-page'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
  return <SearchPage lng={lng} />
}