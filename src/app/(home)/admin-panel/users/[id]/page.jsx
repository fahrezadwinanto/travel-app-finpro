"use client";
import { ArrowBigLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const EditUser = () => {
  const userDetail = useSelector((state) => state.userDetail.user);
  console.log(userDetail);

  return (
    <div>
      <Link href={"/admin-panel/users"} className="mb-10 flex items-center gap-2 hover:text-black/40 hover:transition-transform ">
        <ArrowBigLeft size={20}/> 
        <span>Back</span>
      </Link>
      <div className="flex flex-col gap-5 items-center justify-center mx-auto h-[100%]">
        <img
          src={userDetail?.profilePictureUrl}
          width={200}
          height={200}
          alt="ProfilePicture"
          className="rounded-full aspect-square"
        />
        <div className="grid gap-2">
          <div className="font-bold text-xl text-center">
            {userDetail?.name} - {userDetail?.role}
          </div>
          <div className="font-normal text-xs text-center">
            {userDetail?.id}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Phone size={16} />
            <div className="font-normal text-xs text-center">
              {userDetail?.phoneNumber}
            </div>
            | <Mail size={16} />
            <div className="font-normal text-xs text-center">
              {userDetail?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
