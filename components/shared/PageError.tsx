import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export interface PageErrorProps {
  title?: string;
  description?: React.ReactNode;
}
export default function PageError({ title, description }: PageErrorProps) {
  return (
    <div className="container mx-auto px-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{title || "Unable to process your request."}</AlertTitle>
        <AlertDescription>
          {description || "Please try again later."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
