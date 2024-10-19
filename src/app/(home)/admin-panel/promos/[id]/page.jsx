"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatRupiah } from "@/lib/custom-utils";
import { uploadImage } from "@/lib/upload-image";
import { deletePromoById, updatePromoById } from "@/service/promo.service";
import { updatePromoDetails } from "@/store/promoSlice";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PromoDetails = () => {
  const [onEdit, setOnEdit] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const promoData = useSelector((state) => state.promoDetail.promo);
  // console.log(promoData);

  const [promo, setPromo] = useState({
    title: promoData?.title || "",
    description: promoData?.description || "",
    imageUrl: promoData?.imageUrl || null,
    minimum_claim_price: promoData?.minimum_claim_price || 0,
    promo_code: promoData?.promo_code || "",
    promo_discount_price: promoData?.promo_discount_price || 0,
    terms_condition: promoData?.terms_condition || "",
  });

  if (!promoData) {
    return (
      <div className="flex items-center justify-center">
        No availble details
      </div>
    );
  }

  const handleUpdate = async (promo, id) => {
    setOnEdit(true);
    let uploadedImageUrl = promo.imageUrl;

    if (promo.imageUrl !== promoData.imageUrl) {
      uploadedImageUrl = await uploadImage(promo.imageUrl);
    }
    const updatedData = {
      ...promo,
      promo_discount_price: parseInt(promo.promo_discount_price),
      minimum_claim_price: parseInt(promo.minimum_claim_price),
      imageUrl: uploadedImageUrl,
    };

    try {
      await updatePromoById(updatedData, id);
      dispatch(updatePromoDetails(updatedData));
    } catch (error) {
      console.error(error);
    } finally {
      setOnEdit(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePromoById(id);
      toast.success("Promo deleted successfully");
      router.push("/admin-panel/promos");
    } catch (error) {
      toast.error("Failed to delete promo");
    }
  };

  return (
    <div className="grid px-2">
      <div className="flex items-center justify-between py-5">
        <Link href={`/admin-panel/promos`}>
          <div className="flex gap-2 items-center mb-4 hover:font-semibold">
            <ArrowLeftIcon size={18} className="hover:scale-110" />
            <span>Back</span>
          </div>
        </Link>
        <div>
          <Button
            size="sm"
            variant="destructive"
            className="text-white font-semibold"
            onClick={() => handleDelete(promoData.id)}
          >
            Delete Promo
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        {!onEdit ? (
          <img
            src={promoData.imageUrl}
            className="w-1/2"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center w-2/3">
            <img
              src={promoData.imageUrl}
              className="w-full h-40"
              style={{ objectFit: "cover" }}
            />
            <label className="text-left text-xs font-semibold">
              Update Image
            </label>
            <Input
              type="file"
              onChange={(e) =>
                setPromo({ ...promo, imageUrl: e.target.files[0] })
              }
            />
          </div>
        )}
        <div className="flex flex-col gap-4 px-6 w-full">
          {!onEdit ? (
            <div className="font-semibold py-2">{promoData.title}</div>
          ) : (
            <div>
              <label className="text-sm pl-1 font-semibold">Title</label>
              <Input
                placeholder="Title"
                value={promo.title}
                onChange={(e) => setPromo({ ...promo, title: e.target.value })}
              />
            </div>
          )}
          {!onEdit ? (
            <div className="text-sm">{promoData.description}</div>
          ) : (
            <div>
              <label className="text-sm pl-1 font-semibold">Description</label>
              <Textarea
                rows={8}
                placeholder="Description"
                className="w-full"
                value={promo.description}
                onChange={(e) =>
                  setPromo({ ...promo, description: e.target.value })
                }
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="py-4 font-semibold">Details Promo</div>
        <div className="flex gap-3">
          <div className="w-1/3 text-sm">
            <div>Minimum Claim</div>
            {!onEdit ? (
              <div className="font-semibold text-lg">
                {formatRupiah(promoData.minimum_claim_price)}
              </div>
            ) : (
              <Input
                type="number"
                value={promo.minimum_claim_price}
                onChange={(e) =>
                  setPromo({ ...promo, minimum_claim_price: e.target.value })
                }
              />
            )}
          </div>
          <div className="w-1/3 text-sm">
            <div>Discount Price</div>
            {!onEdit ? (
              <div className="font-semibold text-lg">
                {formatRupiah(promoData.promo_discount_price)}
              </div>
            ) : (
              <Input
                type="number"
                value={promo.promo_discount_price}
                onChange={(e) =>
                  setPromo({ ...promo, promo_discount_price: e.target.value })
                }
              />
            )}
          </div>
          <div className="w-1/3 text-sm">
            <div>Promo Code</div>
            {!onEdit ? (
              <div className="font-semibold text-lg">
                {promoData.promo_code}
              </div>
            ) : (
              <Input
                type="text"
                value={promo.promo_code}
                onChange={(e) =>
                  setPromo({ ...promo, promo_code: e.target.value })
                }
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="mt-2 font-semibold">Term and Conditions</div>
        {!onEdit ? (
          <div className="text-xs text-gray-500">
            {promoData.terms_condition}
          </div>
        ) : (
          <Input
            type="text"
            value={promo.terms_condition}
            onChange={(e) =>
              setPromo({ ...promo, terms_condition: e.target.value })
            }
          />
        )}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={
            onEdit
              ? () => handleUpdate(promo, promoData.id)
              : () => setOnEdit(true)
          }
          className="w-full mt-4"
        >
          {!onEdit ? "Update" : "Save"}
        </Button>
        {onEdit && (
          <Button
            variant="destructive"
            onClick={() => setOnEdit(false)}
            className="w-full mt-4"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default PromoDetails;
