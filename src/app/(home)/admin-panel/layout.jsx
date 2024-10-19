"use client";
import useUserData from "@/app/hooks/useUserData";
import NavigationPanel from "@/components/navigationPanel";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminPanelLayout({ children }) {
  const loggedInUser = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (loggedInUser && loggedInUser.role !== "admin") {
      router.push("/home");
    }
  }, [loggedInUser, router]);

  if (!loggedInUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-10">
      <div>
        <div className="flex items-center gap-2">
          <Link href="/home" className="text-slate-900">
            <ArrowLeftCircle size={20} />
          </Link>
          {loggedInUser?.role === "admin" && (
            <div className="font-semibold">
              Welcome Admin, {loggedInUser.name}
            </div>
          )}
        </div>
      </div>
      <div className="flex p-5 mt-5 gap-5">
        <NavigationPanel />
        <div className="w-full bg-slate-100 rounded-lg p-5">{children}</div>
      </div>
    </div>
  );
}
