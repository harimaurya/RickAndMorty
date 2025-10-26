"use client";

import Image from "next/image";
import logo from "../../public/ricky-morty-logo.png";
import Navbar from "./Navbar";
import { useUserContext } from "@/store/UserContext";

const NAV_ITEMS = [
  { href: "/information", label: "Information" },
  { href: "/profile", label: "Profile" },
];

export default function SiteHeader() {
  const user = useUserContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="site-logo">
          <Image
            src={logo}
            alt="Ricky and Morty Explorer"
            width={50}
            height={50}
            className="w-auto h-10"
          />
        </div>
        <div className="flex items-center">
          <Navbar items={NAV_ITEMS} />
          <div className="flex flex-col border-l pl-2 ml-2 sm:pl-4 sm:ml-4">
            <span className="text-xs sm:text-sm">{user?.username}</span>
            <span className="text-xs sm:text-xs">{user?.jobTitle}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
