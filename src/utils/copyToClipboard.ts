import { toast } from "react-toastify";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard successfully");
  } catch (err) {
    toast.error(`Failed to copy text: ${err}`);
  }
};
