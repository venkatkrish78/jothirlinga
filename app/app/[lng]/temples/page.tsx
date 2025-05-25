import { useTranslation } from '@/app/i18n'
import TemplatesPage from '@/components/templates-page'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
  return <TemplatesPage lng={lng} />
}