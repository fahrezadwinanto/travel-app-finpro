"use client";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./(welcome)/page";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <WelcomePage />
    </div>
  );
}
