import { Character } from "@/types/characters";
import PageTitle from "../shared/PageTitle";
import Image from "next/image";
import CharacterInfo from "./CharacterInfo";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <>
      <PageTitle>{character.name}</PageTitle>
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full justify-center">
          <Image
            src={character.image}
            alt={character.name}
            width={100}
            height={100}
            className="w-full max-w-100 h-auto rounded-full object-cover"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <CharacterInfo label="Species" content={character.species} />
          <CharacterInfo label="Gender" content={character.gender} />
          <CharacterInfo label="Status" content={character.status} />
          <CharacterInfo label="Origin" content={character.origin.name} />
          <CharacterInfo label="Location" content={character.location.name} />
        </div>
      </div>
    </>
  );
}
