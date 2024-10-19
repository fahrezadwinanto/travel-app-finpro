import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

export const getBanner = async() => {
    try {
        const response = await axiosInstance.get("/api/v1/banners");
        return response.data;
    } catch (error) {
        console.error("Get Banner Failed", error);
    }
};

export const updateBannerById = async (updatedBanner, id) => {
    console.log(updatedBanner);
    try {
        const response = await axiosInstance.post(
            `/api/v1/update-banner/${id}`,
            updatedBanner,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createBanner = async (banner) => {
    try {
        const response = await axiosInstance.post("/api/v1/create-banner", banner, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteBannerById = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/delete-banner/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }  
};