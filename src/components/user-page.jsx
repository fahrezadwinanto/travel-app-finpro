import useBannersData from "@/app/hooks/useBannersData";
import useCategoriesData from "@/app/hooks/useCategoriesData";
import usePromoData from "@/app/hooks/usePromoData";
import { Button } from "@/components/ui/button";
import { formatRupiah, trimUsername } from "@/lib/custom-utils";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Banner from "@/components/banner"

const UserPage = () => {
  const router = useRouter();
  const promos = usePromoData();
  const categories = useCategoriesData();
  const banners = useBannersData();
  
  
  const handleDetail = (id) => {
    console.log(id);
    router.push(`/activities/${id}`);
  }

  return (  
  <div className="flex items-center justify-center">User Page
   <div className="grid items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Travel Locations</h1>
      <div className="grid gap-5 p-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Banner />
      </div>
    </div>
  </div>
  );
};

export default UserPage;
