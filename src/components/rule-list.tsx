"use client";

import { AdCard } from "@/components/ad-card";
import { AdCardSmall } from "@/components/ad-card-small";
import { RuleCard } from "@/components/rule-card";
import { RuleCardSmall } from "@/components/rule-card-small";
import { Button } from "@/components/ui/button";
import { ads } from "@/data/ads";
import type { Section } from "@/data/rules/types";
import { useQueryState } from "nuqs";
import { Fragment, useCallback, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export function RuleList({ sections, small }: { sections: Section[]; small?: boolean }) {
  const [search, setSearch] = useQueryState("q");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [randomAds, setRandomAds] = useState<Record<string, (typeof ads)[0]>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setRandomAds((prev) => {
      const newRandomAds: Record<string, (typeof ads)[0]> = {};
      sections.forEach((section, sectionIndex) => {
        section.rules.forEach((_, ruleIndex) => {
          const position = `${sectionIndex}-${ruleIndex}`;
          if (!prev[position]) {
            const randomIndex = Math.floor(Math.random() * ads.length);
            newRandomAds[position] = ads[randomIndex];
          } else {
            newRandomAds[position] = prev[position];
          }
        });
      });
      return newRandomAds;
    });
  }, [sections]);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [search]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;

      const sectionIndex = sections.findIndex((s) => s.slug === hash);
      if (sectionIndex === -1) return;

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

  const getRandomAd = (sectionIndex: number, ruleIndex: number) => {
    const position = `${sectionIndex}-${ruleIndex}`;
    return randomAds[position] || ads[0];
  };

  let totalItemsCount = 0;

  if (!filteredSections.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col gap-4 flex items-center">
          <p className="text-[#878787] text-sm">No rules found</p>
          <Button
            variant="outline"
            className="mt-2 border-border rounded-full"
            onClick={() => setSearch(null)}
          >
            Clear search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {filteredSections.slice(0, visibleItems).map((section, idx) => (
        <section key={section.slug} id={section.slug}>
          <h3 className="text-lg font-regular mb-4">{section.tag}</h3>
          <div
            className={`grid grid-cols-1 gap-6 mb-8 ${
              small ? "lg:grid-cols-4" : "lg:grid-cols-2 xl:grid-cols-3"
            }`}
          >
            {section.rules.map((rule, idx2) => {
              totalItemsCount++;
              const shouldShowAd =
                totalItemsCount % 9 === 2 ||
                (totalItemsCount > 2 && (totalItemsCount - 2) % 9 === 0);

              return (
                <Fragment key={`${idx}-${idx2.toString()}`}>
                  {small ? (
                    <>
                      <RuleCardSmall rule={rule} small />
                      {isMounted && shouldShowAd && (
                        <AdCardSmall ad={getRandomAd(idx, idx2)} small />
                      )}
                    </>
                  ) : (
                    <>
                      <RuleCard rule={rule} />
                      {isMounted && shouldShowAd && <AdCard ad={getRandomAd(idx, idx2)} />}
                    </>
                  )}
                </Fragment>
              );
            })}
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
            className="px-4 py-2 text-sm text-[#878787]"
          >
            Loading more...
          </button>
        </div>
      )}
    </>
  );
}
