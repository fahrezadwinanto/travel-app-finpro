"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, trimUsername } from "@/lib/custom-utils";
import { getActivityById } from "@/service/activity.service";
import { StarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailActivity = () => {
  const [activity, setActivity] = useState({});
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    const getActivity = async () => {
      try {
        const fetchActivity = await getActivityById(id);
        setActivity(fetchActivity.data);
      } catch (error) {
        console.error(error);
      }
    };
    getActivity();
  }, []);

  if (!activity) {
    return <div>Loading...</div>;
  }

  console.log(activity);

  return (
    <div className="grid items-start gap-5 bg-white rounded-lg p-5">
      <div className="flex items-start gap-5">
        <img
          src={activity.imageUrls}
          alt={activity.title}
          className="w-[25%] rounded-lg"
        />
        <div className="w-[75%]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold">{activity?.title}</h1>
            <div className="grid gap-1">
              <p className="text-xs text-right font-bold text-black/40">
                {activity.total_reviews} Reviews
              </p>
              <div className="flex gap-1">
                {Array.from({ length: activity?.rating ?? 0 }).map(
                  (_, index) => (
                    <StarIcon
                      key={index}
                      size={14}
                      className="text-yellow-500"
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="">
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
            <div></div>
          </div>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Description</h2>
          <p className="text-sm">{trimUsername(activity?.description, 300)}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold">Facility</h2>
            <p className="text-sm">{activity?.facilities}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold">Category</h2>
            <p className="text-xs text-right flex items-center gap-2">
              {activity.category?.name}{" "}
              <img
                src={activity.category?.imageUrl}
                alt={activity.category?.name}
                className="w-6 h-6 rounded-full"
              />
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">Location</h2>
          <p className="text-xs">Province: {activity?.province}</p>
          <p className="text-xs">City: {activity?.city}</p>
          <p className="text-xs">Address: {activity?.address}</p>
          {/* <p className="text-xs">Address: {activity?.location_maps}</p> */}
          {/* Input location */}
          <iframe
            src={activity?.location_maps}
            className="w-full h-[200px] rounded-lg mt-4"
          />
        </div>
      </div>
      <Button>Edit</Button>
    </div>
  );
};

export default DetailActivity;
