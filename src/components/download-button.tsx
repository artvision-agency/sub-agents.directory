"use client";

import { cn } from "@/lib/utils";
import { Check, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DownloadButton({
  content,
  filename,
  small,
}: {
  content: string;
  filename: string;
  small?: boolean;
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.md`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    toast("Rule downloaded. Add to your .claude/ directory or CLAUDE.md file.");

    setTimeout(() => {
      setDownloaded(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        "text-xs bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center",
        small ? "p-1.5 size-7" : "p-2 size-9",
      )}
      type="button"
    >
      {downloaded ? (
        <Check className={small ? "w-3 h-3" : "w-4 h-4"} />
      ) : (
        <Download className={small ? "w-3 h-3" : "w-4 h-4"} />
      )}
    </button>
  );
}
