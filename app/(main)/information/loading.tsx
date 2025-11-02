import CharacterCardSkeleton from "@/components/characters/CharacterCardSkeleton";
import PageTitle from "@/components/shared/PageTitle";

export default function InformationLoadingPage() {
  return (
    <div className="container mx-auto px-4">
      <PageTitle>Information</PageTitle>
      <p className="text-lg text-gray-800 dark:text-gray-50 mb-4">
        Explore characters from the Rick and Morty universe. Select any
        character to see additional information.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(16)].map((_, index) => (
          <CharacterCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
