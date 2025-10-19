export default function SiteFooter() {
  const challengeVersion = process.env.CHALLENGE_VERSION || "v1.0.0";

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-4 p-4">
      <div className="container mx-auto">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Challenge version: <strong>{challengeVersion}</strong>
        </p>
      </div>
    </footer>
  );
}
