"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ProductCard from "./ProductCard";
import PlaceholderCard from "./PlaceholderCard";
import FilterModal from "./FilterModal";
import type { Product } from "@/types/product"
import Button from "@/components/common/Button";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import SuccessModal from "@/components/common/SuccessModal";
import ErrorModal from "@/components/common/ErrorModal";

// Bu sayfa, bir koleksiyonu düzenlemek ve ürünleri sürükleyip bırakarak koleksiyona eklemek veya çıkarmak için kullanılır. Ürünler sabitlenip sıralanabilir ve filtreleme, kaydetme gibi işlemler yapılabilir.

interface EditCollectionPageProps {
  token: string;
  collectionId: string;
}

const EditCollectionPage: React.FC<EditCollectionPageProps> = ({ token, collectionId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [constants, setConstants] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gridType, setGridType] = useState<'one' | 'three' | 'four'>('three');
  const [activePage, setActivePage] = useState(1);
  const totalPages = 4; 
  const placeholdersPerPage = 9;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL}/Collection/${collectionId}/GetProductsForConstants`,
          {
            additionalFilters: [],
            page: 1,
            pageSize: 36,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const productData = res.data?.data?.data || [];
        const formatted: Product[] = productData.map((item: any) => ({
          id: item.productCode || "",
          name: item.name || "İsimsiz Ürün",
          image: item.imageUrl || null,
          category: "Diğer",
        }));

        setProducts(formatted);
        setFiltered(formatted);
        setConstants([]);
      } catch (err) {
        console.error(err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      }
    };

    fetchProducts();
  }, [collectionId, token]);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }


    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'productsDroppable') {
        const items = Array.from(filtered);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setFiltered(items);
      } else if (source.droppableId === 'constantsDroppable') {
        const items = Array.from(constants);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setConstants(items);
      }
    } else { 
      const draggableId = result.draggableId;
      const productId = draggableId.split('-')[0]; 
      const product = products.find(p => p.id === productId);

      if (!product) {
        return;
      }

      if (source.droppableId === 'productsDroppable' && destination.droppableId === 'constantsDroppable') {
        if (!constants.some(p => p.id === product.id)) {
          const newConstants = Array.from(constants);
          newConstants.splice(destination.index, 0, product);
          setConstants(newConstants);
        }
      } else if (source.droppableId === 'constantsDroppable' && destination.droppableId === 'productsDroppable') {
        const newConstants = Array.from(constants);
        newConstants.splice(source.index, 1);
        setConstants(newConstants);
      }
    }
  };

  const handleSave = () => {
    const body = filtered.map((p, index) => ({
      productId: p.id,
      order: index + 1,
    }));
    setShowModal(true);
  };

  const handleDeleteProductFromConstants = (productId: string) => {
    setProductToDeleteId(productId);
    setShowConfirmDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDeleteId) {
      try {
        const simulateError = false; 

        if (simulateError) {
          throw new Error("Simüle Edilmiş Hata");
        }

        const updatedConstants = constants.filter(p => p.id !== productToDeleteId);
        setConstants(updatedConstants);

        const productToAddBack = products.find(p => p.id === productToDeleteId);
        if (productToAddBack && !filtered.some(p => p.id === productToDeleteId)) {
          setFiltered(prevFiltered => [...prevFiltered, productToAddBack]);
        }
        setProductToDeleteId(null);
        setShowConfirmDeleteModal(false); 
        setShowSuccessModal(true);
      } catch (err) {
        console.error("Ürün kaldırılırken hata oluştu:", err);
        setError("Sabitler içerisinden Çıkarılırken Hata Oluştu.");
        setShowConfirmDeleteModal(false); 
        setShowErrorModal(true); 
      }
    }
  };

  const handleCancelDelete = () => {
    setProductToDeleteId(null);
    setShowConfirmDeleteModal(false); 
  };

  return (
    <div className=" pb-0 w-full max-w-full">
      <div className="flex items-center justify-between flex-wrap mb-4">
        <button
          className="flex items-center gap-1 bg-white text-black px-5 py-3 rounded-lg font-semibold border border-2 border-gray-300 min-w-[110px]"
          onClick={() => setShowFilterModal(true)}
        >
          Filtreler
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V18a1 1 0 01-.553.894l-4 2A1 1 0 019 20v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
        <div className="flex flex-row gap-2 ">
          <button
            className={`border rounded-lg p-1  flex items-center justify-center ${gridType === 'one' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'} transition`}
            onClick={() => setGridType('one')}
            title="1'li görünüm"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="14" height="14" rx="3"/></svg>
          </button>
          <button
            className={`border rounded-lg p-1 flex items-center justify-center ${gridType === 'three' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'} transition`}
            onClick={() => setGridType('three')}
            title="3'lü görünüm"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="4" height="16" rx="2"/><rect x="8" y="2" width="4" height="16" rx="2"/><rect x="14" y="2" width="4" height="16" rx="2"/></svg>
          </button>
          <button
            className={`border rounded-lg p-1  flex items-center justify-center ${gridType === 'four' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'} transition`}
            onClick={() => setGridType('four')}
            title="4'lü görünüm"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="7" height="7" rx="2"/><rect x="11" y="2" width="7" height="7" rx="2"/><rect x="2" y="11" width="7" height="7" rx="2"/><rect x="11" y="11" width="7" height="7" rx="2"/></svg>
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          <div className="bg-white rounded-2xl border-2 border-gray-300 flex flex-col p-5 shadow-sm">
            <h4 className="font-bold mb-3 text-md text-black text-left">Koleksiyon Ürünleri</h4>
            <div className="flex-1">
              <Droppable droppableId="productsDroppable">
                {(provided) => (
                  <div
                    className={`grid ${gridType === 'one' ? 'grid-cols-1' : gridType === 'three' ? 'grid-cols-3' : 'grid-cols-4'} gap-5 h-[520px] overflow-y-auto pr-1`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {filtered.map((product, index) => (
                      <Draggable key={product.id + '-' + index} draggableId={product.id + '-' + index} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                              background: snapshot.isDragging ? '#f3f4f6' : '#fff',
                              borderRadius: '18px',
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            <ProductCard
                              product={product}
                              index={index}
                              showAddedOverlay={constants.some(p => p.id === product.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 flex flex-col p-5 shadow-sm">
             <h4 className="font-bold mb-3 text-md text-black text-left">Sabitler</h4>
            <div className="flex-1">
              <Droppable droppableId="constantsDroppable">
                {(provided) => (
                  <div
                    className="grid grid-cols-3 gap-5 h-[520px] overflow-y-auto pr-1"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {constants.map((product, index) => (
                       <Draggable key={product.id + '-constant-' + index} draggableId={product.id + '-constant-' + index} index={index}>
                          {(provided, snapshot) => (
                            <div
                               ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.8 : 1,
                                background: snapshot.isDragging ? '#f3f4f6' : '#fff',
                                borderRadius: '18px',
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <ProductCard
                                product={product}
                                index={index}
                                showDeleteOverlay={true}
                                onDeleteClick={handleDeleteProductFromConstants}
                              />
                            </div>
                          )}
                      </Draggable>
                    ))}
                    {Array.from({ length: Math.max(0, placeholdersPerPage - constants.length) }, (_, i) => (
                      <PlaceholderCard key={'placeholder-' + i + (activePage - 1) * placeholdersPerPage} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="flex justify-center mt-4 gap-2 text-base items-center select-none">
              <button
                onClick={() => activePage > 1 && setActivePage(activePage - 1)}
                disabled={activePage === 1}
                className={`w-8 h-8 text-gray-600 font-bold flex items-center justify-center rounded-md ${activePage === 1 ? 'cursor-not-allowed bg-white' : 'cursor-pointer hover:bg-gray-100'}`}
              >&#60;</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePage(i + 1)}
                  className={`w-6 h-6 rounded-md border font-bold flex items-center justify-center transition ${activePage === i + 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => activePage < totalPages && setActivePage(activePage + 1)}
                disabled={activePage === totalPages}
                className={`w-8 h-8 text-gray-600 font-bold flex items-center justify-center rounded-md ${activePage === totalPages ? 'cursor-not-allowed bg-white' : 'cursor-pointer hover:bg-gray-100'}`}
              >&#62;</button>
            </div>
          </div>
        </div>
      </DragDropContext>

      <div className="flex justify-end mt-4 gap-4 pr-2">
        <Button
          variant="primary"
          onClick={() => router.push("/collections")}
          className="min-w-[120px]"
        >
          Vazgeç
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="min-w-[120px]"
        >
          Kaydet
        </Button>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Kaydetme İsteği</h3>
            <pre className="bg-gray-50 p-4 rounded-md text-sm max-h-[300px] overflow-auto text-gray-800 break-words border border-gray-200" >
              {JSON.stringify(filtered.map((p, i) => ({ productId: p.id, order: i + 1 })), null, 2)}
            </pre>
            <div className="flex justify-end mt-6">
              <Button
                variant="primary"
                onClick={() => setShowModal(false)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        open={showConfirmDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={error || "Bilinmeyen Bir Hata Oluştu."}
      />

      {showFilterModal && <FilterModal onClose={() => setShowFilterModal(false)} collectionId={collectionId} token={token} />}
    </div>
  );
};

export default EditCollectionPage;
