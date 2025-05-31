"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Sayfalandırma bileşeni.
 */
interface PaginationProps {
  totalPages: number; 
  currentPage: number; 
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 

  /**
   * Sayfa URL'si oluşturur.
   */
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pagesToShow = []; 
  const maxPages = 9; 

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    // Gelişmiş sayfalandırma mantığı
    pagesToShow.push(1); 
    if (currentPage > 2) {
      pagesToShow.push('...'); 
    }
    if (currentPage > 1 && currentPage < totalPages) {
       if (currentPage > 2) {
         pagesToShow.push(currentPage); 
       }
    }
    if (currentPage < totalPages - 1) {
       if (currentPage < totalPages -1 && currentPage > 2) { 
          pagesToShow.push('...'); 
       } else if (currentPage < totalPages -1 && currentPage <= 2) { 
           if (totalPages > maxPages) {
           }
       }

    }
     if (currentPage !== totalPages && !(currentPage < totalPages -1 && currentPage > 2)) { 
         if (totalPages > maxPages) { 
              if(currentPage < totalPages -1) {
              } else {
                 pagesToShow.push(totalPages); 
              }
         } else { 
         }
     }
      if (!pagesToShow.includes(totalPages)) {
           if (totalPages > maxPages) {
             pagesToShow.push(totalPages); 
           }
      }


    // Sayfa grubu yönetimi
    if (currentPage <= 3) {
        pagesToShow.length = 0; 
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pagesToShow.push(i); 
        }
        if (totalPages > 4) pagesToShow.push('...'); 
        if (totalPages > 3) pagesToShow.push(totalPages); 

    } 
    else if (currentPage >= totalPages - 2) {
        pagesToShow.length = 0; 
        pagesToShow.push(1); 
        if (totalPages > 4) pagesToShow.push('...'); 
        for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
            pagesToShow.push(i); 
        }
    } 
    else {
        pagesToShow.length = 0; 
        pagesToShow.push(1); 
        pagesToShow.push('...'); 
        pagesToShow.push(currentPage); 
        pagesToShow.push('...'); 
        pagesToShow.push(totalPages); 
    }


  }


  return (
    <div className="mt-6 flex justify-center items-center gap-1 text-sm">
      {/* Önceki sayfa düğmesi */}
      <Link
        href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
        className="px-2 py-1 border rounded bg-white text-gray-800"
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        &lt;
      </Link>
      {/* Sayfa numaraları */}
      {pagesToShow.map((page, index) => (
        page === '...' ? (
          <span key={index} className="px-3 py-1">...</span>
        ) : (
          <Link
            key={index}
            href={createPageURL(page)}
            className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
          >
            {page}
          </Link>
        )
      ))}
      {/* Sonraki sayfa düğmesi */}
      <Link
        href={createPageURL(currentPage < totalPages ? currentPage + 1 : totalPages)}
        className="px-2 py-1 border rounded bg-white text-gray-800"
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        &gt;
      </Link>
    </div>
  );
}
  