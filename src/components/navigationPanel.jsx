import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationPanel = () => {
  const path = usePathname(); // Mendapatkan path saat ini

  const isActive = (href) => path === href; // Fungsi untuk memeriksa apakah path aktif

  return (
    <div className="w-1/3 bg-slate-900 rounded-lg p-5 h-auto py-10">
      <Link href={"/admin-panel"} className="text-white font-semibold text-lg px-5">Services List</Link>
      <div className="border-b opacity-30 my-5"></div>
      <div className="grid mt-5 gap-5">
        <Link
          href="/admin-panel/users"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/users") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Users List
        </Link>
        <Link
          href="/admin-panel/promos"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/promos") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Promotions
        </Link>
        <Link
          href="/admin-panel/activities"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/activities") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Activites
        </Link>
        <Link
          href="/admin-panel/categories"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/categories") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Categories
        </Link>
        <Link
          href="/admin-panel/banners"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/banners") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Banners
        </Link>
        <Link
          href="/admin-panel/payments"
          className={`p-2 px-5 rounded-md text-white hover:text-white/50 text-sm ${
            isActive("/admin-panel/payments") ? "bg-white/20" : "bg-transparent"
          }`}
        >
          Payment Service
        </Link>
      </div>
    </div>
  );
};

export default NavigationPanel;
