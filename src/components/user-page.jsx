"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/custom-utils";
import { Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Banner from "@/components/banner";
import useCategoriesData from "@/app/hooks/useCategoriesData";
import useBannersData from "@/app/hooks/useBannersData";
import useActivitiyData from "@/app/hooks/useAcivities";
import usePromoData from "@/app/hooks/usePromoData";

const UserFullPage = () => {
  const router = useRouter();
  const categories = useCategoriesData();
  const banners = useBannersData();
  const activities = useActivitiyData();
  const promos = usePromoData();

  const handleViewDetails = (type, id) => {
    router.push(`/${type}/${id}`);
  };

  // Loading component
  const LoadingState = () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-300/90">
      {/* Hero Banner Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {banners && banners.length > 0 && banners[0].imageUrl ? (
          <Image
            src={banners[0].imageUrl}
            alt={banners[0].name || "Hero Banner"}
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <LoadingState />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="p-6 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Discover Your Next Adventure
            </h1>
            <p className="mb-6 text-xl">
              Explore incredible destinations and activities
            </p>
            <Button
              className="text-white bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("main-content")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div id="main-content" className="container px-4 py-12 mx-auto">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="flex justify-center w-full mb-8">
            <TabsTrigger value="activities" className="px-8">
              Activities
            </TabsTrigger>
            <TabsTrigger value="categories" className="px-8">
              Categories
            </TabsTrigger>
            <TabsTrigger value="promos" className="px-8">
              Promos
            </TabsTrigger>
          </TabsList>

          {/* Activities Tab */}
          <TabsContent value="activities">
            {activities ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="overflow-hidden group hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {activity.imageUrl ? (
                        <Image
                          src={activity.imageUrl}
                          alt={activity.name || "Activity"}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <LoadingState />
                      )}
                    </div>
                    {/* ... */}
                  </Card>
                ))}
              </div>
            ) : (
              <LoadingState />
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            {categories ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className="overflow-hidden group hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-xl font-semibold">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600"></p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        onClick={() =>
                          handleViewDetails("categories", category.id)
                        }
                        className="w-full text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <LoadingState />
            )}
          </TabsContent>

          {/* Promos Tab */}
          <TabsContent value="promos">
            {promos ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {promos.map((promo) => (
                  <Card
                    key={promo.id}
                    className="overflow-hidden group hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={promo.imageUrl}
                        alt={promo.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
                        {promo.discount}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-xl font-semibold">
                        {promo.name}
                      </h3>
                      <p className="mb-2 text-sm text-gray-600">
                        Valid until: {formatDate(promo.validUntil)}
                      </p>
                      <div className="p-2 bg-gray-100 rounded">
                        <p className="font-mono text-sm text-center">
                          Use code:{" "}
                          <span className="font-bold">{promo.code}</span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        onClick={() => handleViewDetails("promos", promo.id)}
                        className="w-full text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <LoadingState />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Banner */}
      <Banner />
    </div>
  );
};

export default UserFullPage;
