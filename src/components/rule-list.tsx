"use client";

import { RuleCard } from "@/components/rule-card";
import { RuleCardSmall } from "@/components/rule-card-small";
import type { Section } from "@/data/rules/types";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export function RuleList({ sections, small }: { sections: Section[]; small?: boolean }) {
  const [search] = useQueryState("q");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [search]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;

      const sectionIndex = sections.findIndex((s) => s.slug === hash);
      if (sectionIndex === -1) return;

      // Make sure enough items are visible
      if (sectionIndex >= visibleItems) {
        setVisibleItems(sectionIndex + 1);
      }

      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 56,
            behavior: "smooth",
          });
        }
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [sections, visibleItems]);

  const filteredSections = sections
    .map((section) => ({
      ...section,
      rules: section.rules.filter(
        (rule) =>
          !search ||
          rule.title.toLowerCase().includes(search.toLowerCase()) ||
          rule.content.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) => section.rules.length > 0);

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom && visibleItems < filteredSections.length) {
      setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredSections.length));
    }
  }, [visibleItems, filteredSections.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {filteredSections.slice(0, visibleItems).map((section) => (
        <section key={section.slug} id={section.slug}>
          <h3 className="text-lg font-regular mb-4">{section.tag}</h3>
          <div
            className={`grid grid-cols-1 gap-6 mb-8 ${
              small ? "lg:grid-cols-4" : "lg:grid-cols-2 xl:grid-cols-3"
            }`}
          >
            {section.rules.map((rule) =>
              small ? (
                <RuleCardSmall key={rule.slug} rule={rule} small />
              ) : (
                <RuleCard key={rule.slug} rule={rule} />
              ),
            )}
          </div>
        </section>
      ))}

      {visibleItems < filteredSections.length && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() =>
              setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredSections.length))
            }
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Load more...
          </button>
        </div>
      )}
    </>
  );
}
