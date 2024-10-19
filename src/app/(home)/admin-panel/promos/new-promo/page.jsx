"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/lib/upload-image";
import { createPromo } from "@/service/promo.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreatePromo = () => {
  const router = useRouter();
  const [promo, setPromo] = useState({
    title: "",
    description: "",
    imageUrl: null,
    minimum_claim_price: 0,
    promo_code: "",
    promo_discount_price: 0,
    terms_condition: "",
  });

  const handleSubmit = async () => {
    console.log(promo);
    try {
      if (promo.imageUrl !== null) {
        const uploadedImageUrl = await uploadImage(promo.imageUrl);
        const newPromo = {
          ...promo,
          promo_discount_price: parseInt(promo.promo_discount_price),
          minimum_claim_price: parseInt(promo.minimum_claim_price),
          imageUrl: uploadedImageUrl,
        };

        await createPromo(newPromo);
        router.push("/admin-panel/promos");
      } else {
        const promo2 = {
          ...promo,
          promo_discount_price: parseInt(promo.promo_discount_price),
          minimum_claim_price: parseInt(promo.minimum_claim_price),
          imageUrl:
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        };
        await createPromo(promo2);
        router.push("/admin-panel/promos");
      }
    } catch (error) {
      toast.error("Failed to create promo");
      console.error(error);
    }
  };

  return (
    <div className="grid">
      <div className="flex items-center justify-center font-bold mb-5">
        Create New Promo
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid gap-1">
          <label className="text-sm pl-1">Promo Title</label>
          <Input
            type="text"
            placeholder="Promo Name"
            className="w-full bg-white"
            onChange={(e) => setPromo({ ...promo, title: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm pl-1">Promo Code</label>
          <Input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-white"
            onChange={(e) => setPromo({ ...promo, promo_code: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm pl-1">Discount Price</label>
          <Input
            type="number"
            placeholder="Discount price"
            className="w-full bg-white"
            onChange={(e) =>
              setPromo({ ...promo, promo_discount_price: e.target.value })
            }
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm pl-1">Minimimum Claim Price</label>
          <Input
            type="number"
            placeholder="Minimimum claim price"
            className="w-full bg-white"
            onChange={(e) =>
              setPromo({ ...promo, minimum_claim_price: e.target.value })
            }
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm pl-1">Description</label>
          <Textarea
            type="number"
            placeholder="Description"
            className="w-full bg-white"
            onChange={(e) =>
              setPromo({ ...promo, description: e.target.value })
            }
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm pl-1">Upload Image</label>
          <Input
            type="file"
            className="w-full bg-white"
            onChange={(e) =>
              setPromo({ ...promo, imageUrl: e.target.files[0] })
            }
          />
        </div>
      </div>
      <div className="grid gap-1 mt-4">
        <label className="text-sm pl-1">Terms and Conditions</label>
        <Input
          type="text"
          placeholder="Terms and Conditions"
          className="w-full bg-white"
          onChange={(e) =>
            setPromo({ ...promo, terms_condition: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-center mt-10 gap-5">
        <Button onClick={handleSubmit} className="w-full">
          Create Promo
        </Button>
        <Button className="w-full" variant="destructive">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreatePromo;
