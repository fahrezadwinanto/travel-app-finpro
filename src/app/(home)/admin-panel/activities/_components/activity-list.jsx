import React from "react";
import { Button } from "@/components/ui/button";
import { formatRupiah, trimUsername } from "@/lib/custom-utils";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ActivityList = ({ activity }) => {
  const router = useRouter();

  const handleDetail = (id) => {
    console.log(id);
    router.push(`/admin-panel/activities/${id}`);
  };
  return (
    <div className="flex items-start gap-5 bg-white rounded-lg p-5">
      <img
        src={activity?.imageUrls}
        alt={activity?.title}
        className="w-[25%] rounded-lg"
      />
      <div className="w-[75%]">
        <h1 className="text-base font-semibold mb-2">{activity?.title}</h1>
        <p className="text-sm">{trimUsername(activity?.description, 120)}</p>
        <div className="mt-2 flex justify-between items-end">
          <div className="">
            <div className="flex gap-1">
              {Array.from({ length: activity?.rating ?? 0 }).map((_, index) => (
                <StarIcon key={index} size={14} className="text-yellow-500" />
              ))}
            </div>
            <p
              className={
                activity?.price_discount || activity?.price_discount !== 0
                  ? "text-sm line-through"
                  : "text-sm"
              }
            >
              Price: {formatRupiah(activity?.price)}
            </p>
            <p className="font-bold">
              {formatRupiah(activity?.price_discount)}
            </p>
          </div>
          <div>
            <Button onClick={() => handleDetail(activity.id)}>Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
