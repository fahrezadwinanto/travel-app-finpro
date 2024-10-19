import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CustomCard = ({ title, description, data }) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push("/admin-panel");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold">{data}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDetails} className="w-full">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
