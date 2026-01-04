import { GlobalSearch } from "@/components/global-search";
import { WebSiteJsonLd } from "@/components/json-ld";
import { getSections } from "@/data/rules";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sub-Agents Directory - Claude Code Sub-Agents & MCP Servers",
  description: "Discover Claude Code sub-agent prompts, find MCP servers, and join the community.",
};

export default function Page() {
  const sections = getSections();

  return (
    <>
      <WebSiteJsonLd />
      <div className="min-h-screen w-full px-4 pt-[10%]">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/claude-logo.svg" alt="Claude AI" width={64} height={64} />
          </div>
          <GlobalSearch sections={sections} />
        </div>
      </div>
    </>
  );
}
