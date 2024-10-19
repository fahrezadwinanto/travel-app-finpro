"use client";
import useCategoriesData from "@/app/hooks/useCategoriesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/custom-utils";
import { uploadImage } from "@/lib/upload-image";
import {
  deleteCategoryById,
  updateCategoryById,
} from "@/service/category.service";
import { Loader, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CategoryPage = () => {
  const categories = useCategoriesData();
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(null); // menyimpan ID kategori yang sedang diedit
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(categories.imageUrl);
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      await deleteCategoryById(id);
      setOnEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    router.push("/admin-panel/categories/new-categories");
  };

  const handleEdit = async (category) => {
    try {
      setLoading(true);
      setOnEdit(category.id);
      setCategoryName(category.name);
      setCategoryImage(category.imageUrl);

      // Set default image URL to current one
      let uploadedImageUrl = category.imageUrl;

      // Only upload image if a new one is selected
      if (categoryImage instanceof File) {
        uploadedImageUrl = await uploadImage(categoryImage);
        if (!uploadedImageUrl) {
          alert(`Image upload failed. File too big or not an image.`);
          setCategoryImage(category.imageUrl); // Reset to original image
          return;
        }
      }

      // Update category with new data
      await updateCategoryById(
        { name: categoryName, imageUrl: uploadedImageUrl },
        category.id
      );

      // Reload window to refresh category list
      window.location.reload();

      // Reset state
      setOnEdit(null);
      setCategoryName("");
      setCategoryImage(
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 mb-5">
      <div className="flex items-center justify-between">
        <h1 className="py-3 mb-2 font-semibold text-center">Categories</h1>
        <Button onClick={handleCreate}>Create Category</Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-5">
            <div>
              <img
                src={category.imageUrl}
                alt={category.name}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
                className="w-48 h-32 rounded-lg xl:60"
              />
              {onEdit === category.id ? (
                <Input
                  className="w-48 mt-3"
                  type="file"
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                />
              ) : null}
            </div>
            <div className="flex flex-col">
              {onEdit === category.id ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Change "{category.name}"</label>
                  <Input
                    className="w-48 mb-3"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
              ) : (
                <p>{category.name}</p>
              )}
              <p className="text-xs">
                Uploaded : {formatDate(category.createdAt)}
              </p>
              <p className="text-xs">
                Last Update : {formatDate(category.updatedAt)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Button
                  onClick={
                    onEdit === category.id
                      ? () => handleEdit(category)
                      : () => {
                          setOnEdit(category.id);
                          setCategoryName(category.name); // isi default nama kategori yang akan diedit
                          setCategoryImage(category.imageUrl);
                        }
                  }
                  size="sm"
                  className="inline-flex items-center justify-center hover:bg-black/70"
                >
                  {onEdit === category.id ? (
                    loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      "Save"
                    )
                  ) : (
                    "Edit"
                  )}
                </Button>
                {onEdit === category.id && (
                  <div className="flex items-center justify-between w-full">
                    <Button
                      onClick={() => setOnEdit(null)}
                      className="inline-flex items-center justify-center bg-red-700 hover:bg-red-900"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleDelete(category.id)}
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

export default CategoryPage;
