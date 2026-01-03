"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Ad } from "@/data/ads";
import Image from "next/image";
import Link from "next/link";

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <Card className="bg-background p-4 max-h-[calc(100vh-8rem)] aspect-square flex flex-col">
      <CardContent className="bg-card h-full mb-2 p-0 font-mono text-sm group relative flex-grow">
        <Link href={ad.link} target="_blank" rel="noopener noreferrer" className="h-full">
          <div className="h-full relative">
            <Image
              src={ad.imageUrl}
              alt={`${ad.title} preview`}
              fill
              className="object-cover"
              quality={100}
            />
          </div>
        </Link>
      </CardContent>

      <CardHeader className="p-0">
        <div className="space-y-1">
          <CardTitle className="text-sm truncate">{ad.title}</CardTitle>
          <p className="text-xs text-[#878787] font-mono">{ad.description}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
