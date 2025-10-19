import Image from "next/image";
import logo from "../public/ricky-morty-logo.png";

export default function NotFoundPage() {
  return (
    <main className="site-content w-full pt-20 flex-grow">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image src={logo} alt="Rick and Morty" width={100} height={100} />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold text-lime-600 mb-4">
          Wubba Lubba Dub Dub!
        </h1>
        <h3 className="text-3xl font-bold">404 - Page Not Found</h3>
        <p className="mt-2">The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};
