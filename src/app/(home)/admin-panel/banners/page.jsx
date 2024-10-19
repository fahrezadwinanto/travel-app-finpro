"use client";
import React, { useState } from "react";
import useBannersData from "@/app/hooks/useBannersData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/custom-utils";
import { uploadImage } from "@/lib/upload-image";
import { deleteBannerById, updateBannerById } from "@/service/banner.service";
import { Loader, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const BannerPageList = () => {
  const banners = useBannersData();
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(null);
  const [bannerName, setBannerName] = useState("");
  const [ bannerImage, setBannerImage ] = useState(banners.imageUrl);
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteBannerById(id);
      setOnEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    router.push("/admin-panel/banners/new-banners");
  };

  const handleEdit = async (banner) => {
    try {
      setLoading(true);
      setOnEdit(banner.id);
      setBannerName(banner.name);
      setBannerImage(banner.imageUrl);

      // Set default image URL to current one
      let uploadedImageUrl = banner.imageUrl;

      // Only upload image if a new one is selected
      if (bannerImage instanceof File) {
        uploadedImageUrl = await uploadImage(bannerImage);
        if (!uploadedImageUrl) {
          alert(`Image upload failed. File too big or not an image.`);
          setBannerImage(banner.imageUrl); // Reset to original image
          return;
        }
      }

      // Update banner with new data
      await updateBannerById(
        { name: bannerName, imageUrl: uploadedImageUrl },
        banner.id
      );

      // Reload window to refresh banner list
      window.location.reload();

      // Reset state
      setOnEdit(null);
      setBannerName(``);
      setBannerImage(
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!banners) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 mb-5">
  <div className="flex items-center justify-between">
    <h1 className="py-3 mb-2 font-semibold text-center">Banners</h1>
    <Button onClick={handleCreate}>Create Banner</Button> {/* Create button added here */}
  </div>
  <div className="grid gap-5 xl:grid-cols-2">
    {banners.map((banner) => (
      <div key={banner.id} className="flex items-center gap-5">
        <div>
          <img
            src={banner.imageUrl}
            alt={banner.name}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            className="w-48 h-32 rounded-lg xl:60"
          />
          {onEdit === banner.id ? (
            <Input
              className="w-48 mt-3"
              type="file"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          {onEdit === banner.id ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm">Change {banner.name}</label>
              <Input
                className="w-48 mb-3"
                value={bannerName}
                onChange={(e) => setBannerName(e.target.value)}
              />
            </div>
          ) : (
            <p>{banner.name}</p>
          )}
          <p className="text-xs">Uploaded : {formatDate(banner.createdAt)}</p>
          <p className="text-xs">Last Update : {formatDate(banner.updatedAt)}</p>
          <div className="flex items-center gap-1 mt-2">
            <Button
              onClick={
                onEdit === banner.id
                  ? () => handleEdit(banner)
                  : () => {
                      setOnEdit(banner.id);
                      setBannerName(banner.name); // isi default nama kategori yang akan diedit
                      setBannerImage(banner.imageUrl);
                    }
              }
              size="sm"
              className="inline-flex items-center justify-center hover:bg-black/70"
            >
              {onEdit === banner.id ? (
                loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Save"
                )
              ) : (
                "Edit"
              )}
            </Button>
            {onEdit === banner.id && (
              <div className="flex items-center justify-between w-full">
                <Button
                  onClick={() => setOnEdit(null)}
                  className="inline-flex items-center justify-center bg-red-700 hover:bg-red-900"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(banner.id)}
                  size="sm"
                  className="w-10 text-red-700 bg-transparent hover:text-white hover:bg-red-900"
                >
                  <Trash2 size={18} className="" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default BannerPageList;
