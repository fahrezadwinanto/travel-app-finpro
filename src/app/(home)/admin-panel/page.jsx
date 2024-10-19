"use client";
import useUserData from "@/app/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AdminPanel = () => {
  const loggedInUser = useUserData();
  console.log(loggedInUser);
  const router = useRouter();

  if (!loggedInUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  } else {
    if (loggedInUser?.role !== "admin") {
      router.push("/home");
    }
  }

  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto h-[100%]">
        <img
          src={loggedInUser.profilePictureUrl}
          width={200}
          height={200}
          alt="ProfilePicture"
          style={{ objectFit: "cover" }}
          className="rounded-full aspect-square"
        />
        <div className="grid gap-2">
          <div className="font-bold text-xl text-center">
            {loggedInUser?.name} - {loggedInUser?.role}
          </div>
          <div className="font-normal text-xs text-center">
            {loggedInUser?.id}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Phone size={16} />
            <div className="font-normal text-xs text-center">
              {loggedInUser?.phoneNumber}
            </div>
            | <Mail size={16} />
            <div className="font-normal text-xs text-center">
              {loggedInUser?.email}
            </div>
          </div>
          <Button onClick={() => router.push("/admin-panel/edit-profile")}>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
