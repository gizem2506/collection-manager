// Bu bileşen, uygulamanın üst kısmında bulunan başlık çubuğunu ve navigasyon işlevlerini yönetir.
"use client"

import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();

  const subheaderText = () => {
    if (pathname === "/collections") {
      return "Koleksiyon Listesi";
    } else if (pathname === "/edit") {
      return "Koleksiyonu Düzenle";
    }
    return "Koleksiyon Detayı";
  };

  return (
    <header className="h-20 bg-white border-b border border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none md:hidden mr-4"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-semibold text-black">Koleksiyon</h1>
          <p className="text-sm text-gray-500 text-black">{subheaderText()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 border border-gray-400" />
      </div>
    </header>
  )
}
