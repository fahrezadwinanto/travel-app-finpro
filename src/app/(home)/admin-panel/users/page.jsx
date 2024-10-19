"use client";
import useUserList from "@/app/hooks/useUsersList";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { detail } from "@/store/userDetailSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ListUserPage = () => {
  const userList = useUserList();
  const router = useRouter();
  const dispatch = useDispatch();
  // console.log(userList);

  if (!userList) {
    return <div>Loading User Data...</div>;
  }

  const handleDetails = (user) => {
    dispatch(detail(user));
    router.push(`/admin-panel/users/${user.id}`);
  };

  return (
    <div>
      <ScrollArea className="h-[70vh] w-full rounded-md">
        {userList?.map((user) => (
          <div key={user.id}>
            <div className="flex gap-3 my-2 bg-slate-200 p-3 rounded-lg items-center px-5">
              <img
                src={user.profilePictureUrl}
                style={{ objectFit: "cover" }}
                alt=""
                className="h-8 rounded-full aspect-square"
              />
              <div>
                <div className="font-bold">
                  {user.name}{" "}
                  <span className="font-normal">| {user.phoneNumber}</span>
                </div>
                <div className="text-xs">{user.email}</div>
              </div>
              <Button
                onClick={() => handleDetails(user)}
                className="ml-auto items-end"
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ListUserPage;
