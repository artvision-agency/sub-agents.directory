export interface Ad {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  link: string;
  imageUrl: string;
}

// Placeholder ads - replace with real sponsors when you have them
export const ads: Ad[] = [
  {
    id: "placeholder-1",
    title: "Your Brand Here",
    description: "Reach developers building with Claude Code. Advertise on sub-agents.directory.",
    logoUrl: "/Claude_AI_symbol.svg",
    imageUrl: "/sub-agents.directory.png",
    link: "/advertise",
  },
  {
    id: "placeholder-2",
    title: "Sponsor This Space",
    description:
      "Get your product in front of 10,000+ developers monthly. Contact us to advertise.",
    logoUrl: "/Claude_AI_symbol.svg",
    imageUrl: "/sub-agents.directory.png",
    link: "/advertise",
  },
];

export const rulePageAds: Ad[] = [
  {
    id: "placeholder-sidebar",
    title: "Advertise Here",
    description: "Reach Claude Code developers. Premium sidebar placement available.",
    logoUrl: "/Claude_AI_symbol.svg",
    link: "/advertise",
    imageUrl: "/sub-agents.directory.png",
  },
];
