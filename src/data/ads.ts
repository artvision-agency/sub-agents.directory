export interface Ad {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  link: string;
  imageUrl: string;
}

export const ads: Ad[] = [
  {
    id: "placeholder-1",
    title: "Your Brand Here",
    description: "Reach developers building with Claude Code.",
    logoUrl: "/claude-logo.svg",
    imageUrl: "/sub-agents.directory.png",
    link: "/advertise",
  },
  {
    id: "placeholder-2",
    title: "Sponsor This Space",
    description: "Get your product in front of 100K+ developers monthly.",
    logoUrl: "/claude-logo.svg",
    imageUrl: "/sub-agents.directory.png",
    link: "/advertise",
  },
];

export const rulePageAds: Ad[] = [
  {
    id: "placeholder-sidebar",
    title: "Advertise Here",
    description: "Reach Claude Code developers. Premium sidebar placement available.",
    logoUrl: "/claude-logo.svg",
    link: "/advertise",
    imageUrl: "/sub-agents.directory.png",
  },
];
