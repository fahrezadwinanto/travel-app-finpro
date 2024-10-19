"use client";
import useUserData from "@/app/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/service/user.service";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isToken, setIsToken] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const loggedInUser = useUserData();
  // console.log(loggedInUser);

  // ambil cookies
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }

    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    logoutUser();
    router.push("/login");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-between px-10 py-7">
      <h1 className="text-3xl font-extrabold text-center text-slate-900">
        R2SH
      </h1>
      <div className="flex gap-3 items-center justify-center">
        {isToken ? (
          <div className="flex items-center gap-2">
            <p>{loggedInUser?.name}</p>
            <Button
              size="sm"
              onClick={handleLogout}
              className="flex rounded-lg px-5 bg-slate-900"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href={"/login"}>
              <Button size="sm" className="flex rounded-lg px-10 bg-slate-900">
                Login
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button size="sm" className="flex rounded-lg px-10 bg-slate-900">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
