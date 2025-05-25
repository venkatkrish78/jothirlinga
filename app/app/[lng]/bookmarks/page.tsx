import { useTranslation } from '@/app/i18n'
import BookmarksPage from '@/components/bookmarks-page'

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  
  return <BookmarksPage lng={lng} />
}