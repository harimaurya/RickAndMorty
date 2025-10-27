"use client";
import { useUserContext } from "@/store/UserContext";
import { CircleUserRound } from "lucide-react";

export default function SiteUserInfo() {
  const user = useUserContext();
  return (
    <>
      <div className="flex items-center border-l pl-2 ml-2 sm:pl-4 sm:ml-4">
        <CircleUserRound />
        <div className="flex flex-col ml-2">
          <span className="text-xs sm:text-sm" data-testid="username">
            {user?.username}
          </span>
          <span className="text-xs sm:text-xs" data-testid="jobtitle">
            {user?.jobTitle}
          </span>
        </div>
      </div>
    </>
  );
}
