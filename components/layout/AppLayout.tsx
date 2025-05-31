// Bu bileşen, uygulamanın genel düzenini (sidebar, başlık ve içerik alanı dahil) tanımlar.
"use client"
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex">
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white z-30 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen flex flex-col md:ml-64">
        <div className="sticky top-0 z-20 bg-gray-100">
          <Header toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AppLayout; 