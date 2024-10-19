import { axiosInstanceUploadImage } from "./axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    // proses upload ke database (endpoint)
    const response = await axiosInstanceUploadImage.post(
      "/api/v1/upload-image",
      formData
    );
    console.log("Image upload success", response);
    return response.data.url;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};
