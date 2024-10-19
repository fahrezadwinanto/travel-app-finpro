"use client";
import usePromoData from "@/app/hooks/usePromoData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah, trimUsername } from "@/lib/custom-utils";
import { setPromoDetails } from "@/store/promoSlice";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const PromoPage = () => {
  const promos = usePromoData();
  const dispatch = useDispatch();
  const router = useRouter();

  if (!promos) {
    return <div>Loading...</div>;
  }

  const handleDetails = (promo) => {
    dispatch(setPromoDetails(promo));
    router.push(`/admin-panel/promos/${promo.id}`);
  };

  const handleCreate = () => {
    router.push("/admin-panel/promos/new-promo");
  };

  return (
    <div>
      <div className="grid">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-center py-4 mb-2">
            Active Promo
          </h1>
          <Button onClick={handleCreate}>Create Promo</Button>
        </div>
        <ScrollArea className="h-[70vh] w-full rounded-md overflow-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <Card key={promo.id} className="grid">
                <img
                  src={promo.imageUrl}
                  className="aspect-square h-40 w-full"
                  style={{ objectFit: "cover" }}
                />
                <CardHeader>
                  <CardTitle>{promo.title}</CardTitle>
                  <CardDescription className="text-xl font-semibold">
                    {formatRupiah(promo.promo_discount_price)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs">
                  {trimUsername(promo.description, 120)}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleDetails(promo)}
                    className="w-full"
                  >
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PromoPage;
