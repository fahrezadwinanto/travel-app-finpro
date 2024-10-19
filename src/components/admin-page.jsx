import React, { useEffect, useState } from "react";
import CustomCard from "./custom-card";
import { getAllUsers } from "@/service/user.service";
import { toast } from "react-toastify";
import useActivitiyData from "@/app/hooks/useAcivities";
import useCategoriesData from "@/app/hooks/useCategoriesData";
import usePromoData from "@/app/hooks/usePromoData";
import useBannersData from "@/app/hooks/useBannersData";
import usePaymentMethods from "@/app/hooks/usePaymentMethodsData";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const activities = useActivitiyData();
  const categories = useCategoriesData();
  const promos = usePromoData();
  const bannersData = useBannersData();
  const paymentMethods = usePaymentMethods();

  console.log(paymentMethods);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        toast.error("Get All Users Failed", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-bold">Welcome to Admin Dashboard</h1>
      <div className="w-full grid grid-cols-3 gap-4">
        <CustomCard
          title={"Total Accounts"}
          description={"Total Users using the app"}
          data={users?.data.length}
        />
        <CustomCard
          title={"Activities"}
          description={"Total Our Acitivities"}
          data={activities?.length}
        />
        <CustomCard
          title={"Categories"}
          description={"Total Categories"}
          data={categories?.length}
        />
        <CustomCard
          title={"Promotions"}
          description={"Total Promotions"}
          data={promos?.length}
        />
        <CustomCard
          title={"Banners"}
          description={"Total Banners"}
          data={bannersData?.length}
        />
        <CustomCard
          title={"Payment Methods"}
          description={"Total Methods"}
          data={paymentMethods?.length}
        />
      </div>
    </div>
  );
};

export default AdminPage;
