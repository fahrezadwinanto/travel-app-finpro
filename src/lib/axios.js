import axios from "axios";

// Instance dari axios
export const axiosInstance = axios.create({
    baseURL: "https://travel-journal-api-bootcamp.do.dibimbing.id",
    headers: {
        "Content-Type": "application/json",
        "apiKey": process.env.NEXT_PUBLIC_API_KEY
    }
})

export const axiosInstanceUploadImage = axios.create({
    baseURL: "https://travel-journal-api-bootcamp.do.dibimbing.id",
    headers: {
        "Content-Type": "multipart/form-data",
        "apiKey": process.env.NEXT_PUBLIC_API_KEY
    }
})