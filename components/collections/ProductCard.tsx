import React, { useState } from "react"
import type { Product } from "@/types/product"

/**
 * Ürün kartı bileşeni.
 */
type ProductCardProps = {
  product: Product 
  index: number
  showAddedOverlay?: boolean 
  showDeleteOverlay?: boolean 
  onDeleteClick?: (productId: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddedOverlay, showDeleteOverlay, onDeleteClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border-2 border-[#000] rounded-xl p-2 bg-white text-center text-base flex flex-col h-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" h-44 w-full flex items-center justify-center overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || ''}
            className={`object-cover h-full w-full text-black ${ (showAddedOverlay || (showDeleteOverlay && isHovered)) ? 'filter blur-sm' : ''}`}
          />
        ) : (
          // Resim yoksa placeholder göster
          <div className={`h-full w-full ${ (showAddedOverlay || (showDeleteOverlay && isHovered)) ? 'filter blur-2xl' : ''} bg-gradient-to-b from-stone-50 via-rose-100 to-stone-300`}></div>
        )}

        {showAddedOverlay && (
          // Eklendi alanı
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-black text-white py-1 text-lg font-semibold flex items-center justify-center z-20">
            Eklendi
          </div>
        )}

        {showDeleteOverlay && isHovered && (
          // Silme alanı
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            onClick={(e) => {
              e.stopPropagation();
              if (onDeleteClick) {
                onDeleteClick(product.id);
              }
            }}
          >
            <div className="bg-white rounded-full p-4 border border-gray-300 shadow-md">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 font-semibold truncate px-2 text-sm text-black">{product.name}</div>
      <div className="text-gray-700 text-xs pb-2 px-2 truncate">{product.id}</div>
    </div>
  )
}

export default ProductCard