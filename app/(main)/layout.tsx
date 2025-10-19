import SiteHeader from "@/components/layout/SiteHeader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="site-content w-full pt-20 flex-grow">{children}</main>
    </>
  );
}
