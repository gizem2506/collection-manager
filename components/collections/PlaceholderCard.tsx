// Bu bileşen, sürükle-bırak arayüzünde ürünlerin yerleştirilebileceği boşlukları görsel olarak temsil eden bir yer tutucu karttır.
import React from "react"

const PlaceholderCard = () => {
  return (
    <div className="border border-[#000] rounded-xl shadow-sm p-2 bg-white h-full w-full flex items-center justify-center">
      <div className="h-20 w-20 flex items-center justify-center rounded-lg">
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="48" height="48" rx="8" fill="white" stroke="black" strokeWidth="3"/>
          <circle cx="20" cy="22" r="5" fill="black"/>
          <path d="M12 44L26 30L38 42L46 34L52 40V52H12V44Z" fill="black"/>
        </svg>
      </div>
    </div>
  )
}

export default PlaceholderCard