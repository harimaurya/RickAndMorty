"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  items: { href: string; label: string }[];
}
export default function Navbar({ items }: NavbarProps) {
  const path = usePathname();

  const isActive = (linkHref: string) => {
    return path === linkHref;
  };

  const activeClass = "border-lime-500";
  const inactiveClass = "border-transparent hover:border-lime-500";

  return items.length > 0 ? (
    <nav className="site-nav flex items-center space-x-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`font-extrabold text-indigo-900 dark:text-gray-50 text-sm sm:text-xl border-b-2 ${
            isActive(item.href) ? activeClass : inactiveClass
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  ) : null;
}
