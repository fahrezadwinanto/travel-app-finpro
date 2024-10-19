"use client";
import useUserData from "@/app/hooks/useUserData";
import AdminPage from "@/components/admin-page";
import UserPage from "@/components/user-page";
import React from "react";

const HomePage = () => {
  const loggedInUser = useUserData();

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      {loggedInUser?.role === "admin" ? <AdminPage /> : <UserPage />}
    </div>
  );
};

export default HomePage;
