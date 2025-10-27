import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { CharacterInfoFragment } from "@/app/gql/types";

interface CharacterCardProps {
  character: CharacterInfoFragment;
}
function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/information/${character.id}`} role="link">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden pt-0 gap-4">
        <div className="relative h-50 w-auto">
          {character.image && (
            <Image
              src={character.image}
              alt={character.name || "Character Image"}
              className="w-full h-auto aspect-square object-cover"
              fill
              sizes="90vw (max-width: 768px) 50vw, (max-width: 1200px) 33vw"
            />
          )}
        </div>
        <div className="px-4">
          <h3 className="font-semibold truncate dark:text-white">
            {character.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-100">
            {character.species}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default memo(CharacterCard);
