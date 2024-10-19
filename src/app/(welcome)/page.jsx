// "use client";

import Banner from "@/components/banner";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    // Ini akan menjadi welcome page
    <div className="grid bg-gradient-to-b from-white to-blue-300/90">
      <div className="flex items-center justify-between min-w-screen lg:px-12 xl:px-32">
        <div className="absolute px-5 lg:relative md:pl-10">
          <h1 className="text-3xl font-bold text-center md:text-4xl lg:text-5xl lg:text-left">
            Start your journey by one click, explore beautiful things.
          </h1>
          <p className="mt-2 text-center lg:mt-5 lg:text-left">
            Plan and book your perfect trip with expert advice, travel tips,
            destination information and more.
          </p>
          <Link
            href={"/login"}
            className="flex justify-center mt-2 font-semibold text-slate-900 hover:underline hover:text-slate-500 hover:animate-pulse lg:justify-start"
          >
            Explore now!
          </Link>
        </div>
        <Image
          src="/assets/pngegg.png"
          width={600}
          height={600}
          alt="banner"
          className="mx-auto -z-10 lg:-z-0"
          priority
        />
      </div>
      <Banner />
    </div>
  );
}
