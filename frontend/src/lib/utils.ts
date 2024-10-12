import { toast } from "react-hot-toast";
export const handleCopyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!"); // Show toast on error
  } catch (err) {
    console.error("Failed to copy code: ", err);
  }
};
