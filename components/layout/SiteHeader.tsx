import Image from "next/image";
import logo from "../../public/ricky-morty-logo.png";
import Navbar from "./Navbar";

export default function SiteHeader() {
  const navItems = [
    { href: "/information", label: "Information" },
    { href: "/profile", label: "Profile" },
  ];

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
        <Navbar items={navItems} />
      </div>
    </header>
  );
}
