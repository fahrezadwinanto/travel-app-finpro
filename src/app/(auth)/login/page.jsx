"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/service/user.service";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or password are required");
      return;
    }

    // Do something with the email and password
    const loginData = { email, password };

    try {
      const loginUserData = await loginUser(loginData);

      if (!loginUserData) {
        toast.error("Login Failed");
        return;
      } else {
        // Masukin data LoginUserData ke dalam Store (redux)
        // Logic redux
        // npm install @reduxjs/toolkit react-redux
        // npm install js-cookie -> untuk menyimpan token ke dalam cookies web browser

        // menyimpan data dengan menggunakan dispatch
        dispatch(
          login({
            user: loginUserData.data,
            token: loginUserData.token,
          })
        );

        toast.success("Login Success");
        // Redirect to home page
        router.push("/home");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="grid items-center justify-center">
        <div className="mb-5 font-bold text-center">Login</div>
        <div className="grid gap-3">
          <div>
            <label className="text-sm">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button onClick={handleLogin}>Login</Button>
          <p>
            Don&apos;t have an account? Register{" "}
            <Link href="/register" className="font-semibold text-blue-600">
              here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
