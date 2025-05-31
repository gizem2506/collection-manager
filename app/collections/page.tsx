import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/authOptions"
import { getCollections } from "@/lib/api"
import AppLayout from "@/components/layout/AppLayout"
import CollectionTable from "@/components/collections/CollectionTable"

// Koleksiyon listesi sayfası (Server Component)
export default async function CollectionsPage() {
  // Sunucu tarafında oturumu al
  const session = await getServerSession(authOptions)

  // Oturum yoksa veya erişim token'ı yoksa uyarı göster
  if (!session?.accessToken) {
    return <div className="text-center mt-10 text-red-600">Giriş yapılmamış</div>
  }

  // Koleksiyon verilerini API'den çek
  const response = await getCollections(session.accessToken);
  const collections = response.data

  // Koleksiyon tablosunu render et
  return (
    <AppLayout>
      <CollectionTable collections={collections} />
    </AppLayout>
  )
}
