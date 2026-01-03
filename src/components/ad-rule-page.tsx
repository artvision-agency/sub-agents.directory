"use client";

import type { Ad } from "@/data/ads";
import Image from "next/image";
import Link from "next/link";

export function AdRulePage({ ad }: { ad: Ad }) {
  return (
    <div className="flex flex-col border border-border p-3 py-2">
      <Link href={ad.link} target="_blank" rel="noopener noreferrer" className="h-full">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full overflow-hidden">
            <Image
              quality={100}
              src={ad.logoUrl}
              alt={`${ad.title} logo`}
              className="object-contain"
              width={32}
              height={32}
            />
          </div>
          <div>
            <span className="truncate text-xs">{ad.title}</span>
            <div className="h-full overflow-y-auto text-xs text-[#878787]">{ad.description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
