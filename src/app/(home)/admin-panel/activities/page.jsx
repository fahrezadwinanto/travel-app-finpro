"use client";
import useActivitiyData from "@/app/hooks/useAcivities";
import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRupiah, trimUsername } from "@/lib/custom-utils";
import { Tabs } from "@radix-ui/react-tabs";
import { StarIcon } from "lucide-react";
import React from "react";
import ActivityList from "./_components/activity-list";

const ActivityPage = () => {
  const activities = useActivitiyData();

  return (
    <div className="grid">
      <div className="flex items-center justify-center font-semibold mb-5">
        Activity
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/6" value="all">
            All
          </TabsTrigger>
          {activities?.map((activity) => (
            <TabsTrigger
              className="w-1/6"
              key={activity.id}
              value={activity.id}
            >
              {activity.category?.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          {activities?.map((activity) => (
            <ActivityList key={activity.id} activity={activity} />
          ))}
        </TabsContent>
        {activities?.map((activity) => (
          <TabsContent key={activity.id} value={activity.id}>
            <ActivityList activity={activity} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ActivityPage;
