// components/Layout.js
import React from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './Header';
import { useAuth } from "@/contexts/AuthContext";

export default function Layout({ children }) {
  const { authToken } = useAuth()

  if (!authToken) {
    return <></>
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
