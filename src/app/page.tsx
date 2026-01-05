import { GlobalSearch } from "@/components/global-search";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { getSections } from "@/data/rules";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-Agents Directory - Claude Code Sub-Agents & MCP Servers",
  description: "Discover Claude Code sub-agent prompts, find MCP servers, and join the community.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  const sections = getSections();

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <div className="min-h-screen w-full px-4 pt-[10%]">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="sr-only">Sub-Agents Directory - Find Claude Code Sub-Agent Prompts</h1>
          <div className="flex justify-center mb-6">
            <a
              href="https://peerlist.io/shydev69/project/subagentsdirectory"
              target="_blank"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJHOK89D8AEPQBK9IGAPBA8BEMPDO?showUpvote=false&theme=dark"
                alt="sub-agents.directory"
                className="h-[72px] w-auto"
              />
            </a>
          </div>
          <GlobalSearch sections={sections} />
        </div>
      </div>
    </>
  );
}
