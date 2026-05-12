import { cn } from "@/lib/utils";
import { LoadingType } from "@/types/LoadingType";
import { Spinner } from "@nextui-org/react";

interface LoadingProps extends LoadingType {
  /** Full page centred spinner */
  fullPage?: boolean;
  /** Skeleton block instead of spinner */
  skeleton?: boolean;
  /** Width class for skeleton (e.g. "w-48") */
  skeletonWidth?: string;
  /** Height class for skeleton (e.g. "h-6") */
  skeletonHeight?: string;
}

const Loading = ({
  size = "lg",
  color = "primary",
  fullPage = false,
  skeleton = false,
  skeletonWidth = "w-full",
  skeletonHeight = "h-6",
}: LoadingProps) => {
  if (skeleton) {
    return (
      <div
        className={cn("skeleton rounded-md", skeletonWidth, skeletonHeight)}
        aria-hidden="true"
        role="presentation"
      />
    );
  }

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-light/80 dark:bg-dark/80 backdrop-blur-sm"
        role="status"
        aria-label="Loading"
      >
        <Spinner size={size} color={color} />
      </div>
    );
  }

  return <Spinner size={size} color={color} />;
};

export default Loading;
