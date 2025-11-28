import { toast as sonnerToast } from "sonner";
import { Verified, TriangleAlert } from "lucide-react";
import { SYSTEM_TITLE } from "@/constants";
import type { ExternalToast } from "sonner";

// Override toast.success to always include icon and title
export const toast = {
  ...sonnerToast,
  success: (message: string, data?: ExternalToast) => {
    return sonnerToast.success(SYSTEM_TITLE, {
      description: message,
      icon: <Verified className="text-green-500" />,
      ...data,
    });
  },
  error: (message: string, data?: ExternalToast) => {
    return sonnerToast.error(SYSTEM_TITLE, {
      description: message,
      icon: <TriangleAlert className="text-red-500" />,
      ...data,
    });
  },
};
