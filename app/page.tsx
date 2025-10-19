import { redirect } from "next/navigation";

export default function Home() {
  redirect("/information");
  return null;
}
