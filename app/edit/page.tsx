import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound } from "next/navigation";
import EditCollectionPage from "@/components/collections/EditCollectionPage";
import AppLayout from "@/components/layout/AppLayout";

// Koleksiyon düzenleme sayfası (Server Component)
export default async function EditPage(props: any) {
  // URL arama parametrelerini al
  const { searchParams } = props as { searchParams: { id?: string } };

  // searchParams'ı asenkron olarak çöz
  const resolvedSearchParams = await Promise.resolve(searchParams);

  // Sunucu tarafında oturumu al
  const session = await getServerSession(authOptions);
  const token = session?.accessToken; // Erişim token'ını al

  // Koleksiyon ID'si veya token yoksa 404 göster
  const collectionId = resolvedSearchParams.id;
  if (!collectionId || !token) return notFound();

  // Koleksiyon düzenleme sayfasını render et
  return (
    <AppLayout>
      <EditCollectionPage token={token} collectionId={collectionId} />
    </AppLayout>
  );
}
