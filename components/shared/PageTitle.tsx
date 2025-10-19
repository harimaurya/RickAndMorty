export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 dark:text-gray-50 mb-8">
      {children}
    </h1>
  );
}
