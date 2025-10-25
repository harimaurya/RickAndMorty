import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CharacterCardSkeleton() {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden pt-0 gap-4">
      <div className="relative h-50 w-auto">
        <Skeleton className="h-50 w-full rounded-none" />
      </div>
      <div className="px-4">
        <Skeleton className="h-5 w-3/4 mb-1 rounded-none" />
        <Skeleton className="h-4 w-1/4 rounded-none" />
      </div>
    </Card>
  );
}
