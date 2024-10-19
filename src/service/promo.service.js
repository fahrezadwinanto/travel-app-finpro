import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

export const updatePromoById = async (updatedData, id) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/update-promo/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const createPromo = async (promo) => {
  try {
    const response = await axiosInstance.post("/api/v1/create-promo", promo, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePromoById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/delete-promo/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}