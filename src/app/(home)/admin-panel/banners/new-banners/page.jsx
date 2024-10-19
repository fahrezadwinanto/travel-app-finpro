"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/upload-image";
import { createBanner } from "@/service/banner.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateBanner = () => {
  const router = useRouter();
  const [banner, setBanner] = useState({
    name: "",
    imageUrl: null,
  });

  const handleSubmit = async () => {
    console.log(banner);
    try {
      if (banner.imageUrl !== null) {
        const uploadedImageUrl = await uploadImage(banner.imageUrl);
        const newBanner = {
          ...banner,
          imageUrl: uploadedImageUrl,
        };
        await createBanner(newBanner);
        router.push("/admin-panel/banners");
      } else {
        const banner2 = {
          ...banner,
          imageUrl:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        };
        await createBanner(banner2);
        router.push("/admin-panel/banners");
      }
    } catch (error) {
        toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="grid">
      <div className="flex items-center justify-center mb-5 font-bold">
        Create New Banner
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid gap-1">
          <label className="pl-1 text-sm">Banner Title</label>
          <Input
            type="text"
            placeholder="Banner Name"
            className="w-full bg-white"
            onChange={(e) => setBanner({ ...banner, name: e.target.value })}
          />
        </div>
        
        <div className="grid gap-1">
          <label className="pl-1 text-sm">Upload Image</label>
          <Input
            type="file"
            className="w-full bg-white"
            onChange={(e) =>
              setBanner({ ...banner, imageUrl: e.target.files[0] })
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-10">
        <Button onClick={handleSubmit} className="w-full">
          Create Banner
        </Button>
        <Button className="w-full" variant="destructive">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateBanner;
