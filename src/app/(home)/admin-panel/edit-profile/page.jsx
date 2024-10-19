"use client";
import useUserData from "@/app/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/upload-image";
import { updateUser } from "@/service/user.service";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditUser = () => {
  const router = useRouter();
  const loggedInUser = useUserData();

  console.log(loggedInUser);

  const [user, setUser] = useState({
    name: loggedInUser?.name,
    email: loggedInUser?.email,
    phoneNumber: loggedInUser?.phoneNumber,
    profilePictureUrl: loggedInUser?.profilePictureUrl || null,
  });

  useEffect(() => {
    if (loggedInUser) {
      setUser({
        name: loggedInUser.name || "",
        email: loggedInUser.email || "",
        phoneNumber: loggedInUser.phoneNumber || "",
      });
    }
  }, [loggedInUser]);

  const handleSubmit = async () => {
    let uploadedImageUrl = user.profilePictureUrl;

    // kalo user upload foto
    if (user.profilePictureUrl) {
      uploadedImageUrl = await uploadImage(user.profilePictureUrl);
      console.log("URL: ", uploadedImageUrl);

      if (!uploadedImageUrl) {
        alert("Image upload failed");
        return;
      }
    }

    const userUpdatedData = {
      ...user,
      profilePictureUrl: uploadedImageUrl,
    };

    try {
      const update = await updateUser(userUpdatedData);
      console.log("update: ", update);
      router.back();
    } catch (error) {
      toast.error("Failed update user");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleFileChange = (e) => {
    setUser({ ...user, profilePictureUrl: e.target.files[0] });
  };

  if (!loggedInUser) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="flex flex-col gap-5 justify-center px-5">
      <Link href={`/admin-panel`}>
        <div className="flex gap-2 items-center">
          <ArrowLeftIcon size={18} />
          <span>Back</span>
        </div>
      </Link>
      <div className="flex flex-col gap-5 items-center justify-between h-96">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="w-full">
            <label>Name</label>
            <Input
              value={user.name}
              type="text"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="bg-white"
            />
          </div>
          <div className="w-full">
            <label>Email</label>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="bg-white"
            />
          </div>
          <div className="w-full">
            <label>Phone Number</label>
            <Input
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              className="bg-white"
            />
          </div>
          <div className="w-full">
            <label>Profile Picture</label>
            <Input
              type="file"
              className="bg-white"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Button
            onClick={handleCancel}
            variant="destructive"
            className="w-full"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
