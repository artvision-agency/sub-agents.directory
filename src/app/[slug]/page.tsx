import { BreadcrumbJsonLd, RuleJsonLd } from "@/components/json-ld";
import { Menu } from "@/components/menu";
import { RuleCard } from "@/components/rule-card";
import { getRuleBySlug, getSections, rules } from "@/data/rules";
import type { Metadata } from "next";

const BASE_URL = "https://sub-agents.directory";

type Params = Promise<{ slug: string }>;

function cleanDescription(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_~>-]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);

  const description = rule ? cleanDescription(rule.content) : "";

  return {
    title: `${rule?.title} - Claude Code Rules`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
    openGraph: {
      title: `${rule?.title} - Claude Code Rules`,
      description,
      url: `${BASE_URL}/${slug}`,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/cover-image.png`,
          width: 1200,
          height: 630,
          alt: rule?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${rule?.title} - Claude Code Rules`,
      description,
      images: [`${BASE_URL}/cover-image.png`],
    },
  };
}

export async function generateStaticParams() {
  return rules.map((rule) => ({
    slug: rule.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);
  const sections = getSections();

  if (!rule) {
    return <div>Rule not found</div>;
  }

  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: rule.tags?.[0] || "Rules", url: `${BASE_URL}/agents` },
    { name: rule.title, url: `${BASE_URL}/${rule.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <RuleJsonLd rule={rule} />
      <div className="flex w-full h-full">
        <div className="hidden md:flex mt-12 sticky top-12 h-[calc(100vh-3rem)] z-40">
          <Menu sections={sections} />
        </div>

        <main className="flex-1 p-6 pt-16">
          <RuleCard rule={rule} isPage={true} />
        </main>
      </div>
    </>
  );
}

export const revalidate = 86400;
