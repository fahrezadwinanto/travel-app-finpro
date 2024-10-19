import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

export const getPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/payment-methods");
    return response.data;
  } catch (error) {
    toast.error("Get Payment Methods Failed", error);
  }
};
