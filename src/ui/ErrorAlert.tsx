"use client";

import { Button } from "@nextui-org/react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => {
  return (
    <div className="flex items-center gap-3 p-4 mb-4 rounded-lg bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800">
      <FiAlertTriangle className="text-danger shrink-0" size={20} />
      <p className="text-sm text-danger-700 dark:text-danger-300 flex-1">
        {message}
      </p>
      {onRetry && (
        <Button
          size="sm"
          variant="flat"
          color="danger"
          onPress={onRetry}
          startContent={<FiRefreshCw size={14} />}
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorAlert;
