"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "../components/welcome-page";

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <WelcomePage />
    </div>
  );
}
