"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadImage } from '@/lib/upload-image';
import { createCategory } from '@/service/category.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const router = useRouter();
    const [categories, setCategories] = useState({
        name: "",
        imageUrl: null,
    });

    const handleSubmit = async () => {
        console.log(categories);
        try {
            if(categories.imageUrl !== null) {
                const uploadedImageUrl = await uploadImage(categories.imageUrl);
                const newCategory = {
                    ...categories,
                    imageUrl: uploadedImageUrl
                };
                await createCategory(newCategory);
                router.push("/admin-panel/categories");
            } else {
                const category2 = {
                    ...categories,
                    imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                };
                await createCategory(category2);
                router.push("/admin-panel/categories");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

  return (
    <div className="grid">
      <div className="flex items-center justify-center mb-5 font-bold">
        Create New Categories
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid gap-1">
          <label className="pl-1 text-sm">Category Title</label>
          <Input
            type="text"
            placeholder="Banner Name"
            className="w-full bg-white"
            onChange={(e) => setCategories({ ...categories, name: e.target.value })}
          />
        </div>
        
        <div className="grid gap-1">
          <label className="pl-1 text-sm">Upload Image</label>
          <Input
            type="file"
            className="w-full bg-white"
            onChange={(e) =>
              setCategories({ ...categories, imageUrl: e.target.files[0] })
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-10">
        <Button onClick={handleSubmit} className="w-full">
          Create Categories
        </Button>
        <Button className="w-full" variant="destructive">
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CreateCategory;