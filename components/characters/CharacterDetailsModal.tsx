"use client";

import { CharacterDetailInfoFragment } from "@/app/gql/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import CharacterDetails from "./CharacterDetails";
import { useRouter } from "next/navigation";

interface CharacterDetailModalProps {
  character: CharacterDetailInfoFragment;
}

export default function CharacterDetailModal({
  character,
}: CharacterDetailModalProps) {
  const router = useRouter();

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open onOpenChange={handleDialogClose}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Character Details</DialogTitle>
              <DialogDescription className="hidden">
                Information about {character?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-y-auto">
              {character && <CharacterDetails character={character} />}
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
