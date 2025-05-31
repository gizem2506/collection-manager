// Bu bileşen, uygulamanın ana navigasyon menüsünü içeren kenar çubuğunu oluşturur.
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r  h-screen flex flex-col  border border-gray-200">
      <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border border-gray-200 text-black">SecilStore</div>
      <nav className="flex-grow px-6 pt-4 overflow-y-auto">
        <p className="text-gray-500 text-sm mb-2 uppercase">MENÜ</p>
        <ul className="space-y-1">
          <li>
            <Link href="/collections" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <svg className="w-4 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center justify-between gap-3 p-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7"></path></svg>
                Ürünler
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <ul className=" mt-1 space-y-1">
              <li>
                <div className="p-2 text-gray-700">Satış</div>
                <ul className="mt-1 space-y-1">
                  <li className="text-black">
                    <Link href="/collections" className="flex items-center gap-3 p-2 text-gray-600 bg-gray-100 rounded-md">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                      Koleksiyon
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
