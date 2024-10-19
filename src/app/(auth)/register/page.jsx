"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/upload-image";
import { registerUser } from "@/service/user.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const optionsRole = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const handleRegister = async () => {
    if (password !== passwordRepeat) {
      alert("Password doesn't match");
      return;
    }

    // kalo si user gak ngisi foto, dia akan diisi dengan string kosong
    let uploadedImageUrl = "";

    // kalo user upload foto
    if (profilePictureUrl) {
      uploadedImageUrl = await uploadImage(profilePictureUrl);

      if (!uploadedImageUrl) {
        alert("Image upload failed");
        return;
      }
    }

    const userData = {
      name,
      email,
      password,
      passwordRepeat,
      role,
      profilePictureUrl: uploadedImageUrl,
      phoneNumber,
    };

    try {
      const response = await registerUser(userData);

      if (!response) {
        alert("Register Failed");
        return;
      }

      console.log(response.status);

      if (response?.status === "OK") {
        router.push("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  let bgStyle =
    "hidden lg:flex bg-[url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwYWNlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover h-screen rounded-lg w-full";

  return (
    <div className="grid items-center justify-center min-h-screen gap-3 p-5 lg:flex">
      <div className="w-full">
        <p className="text-xl font-bold text-center">Register Your Account</p>
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-[400px] gap-3 mt-5">
            <Input
              type="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />

            {isClient && (
              <Select
                onChange={(event) => setRole(event.value)}
                options={optionsRole}
              />
            )}

            <Input
              type="file"
              accept="image/*"
              placeholder="Profile Pict URL"
              onChange={(e) => setProfilePictureUrl(e.target.files[0])}
            />
            <Input
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
            <span className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-sm font-bold text-blue-700">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className={bgStyle}></div>
    </div>
  );
};

export default Register;
