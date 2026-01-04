"use client";

import { AdCard } from "@/components/ad-card";
import { AdCardSmall } from "@/components/ad-card-small";
import { RuleCard } from "@/components/rule-card";
import { RuleCardSmall } from "@/components/rule-card-small";
import { Button } from "@/components/ui/button";
import { ads } from "@/data/ads";
import type { Section } from "@/data/rules/types";
import { useQueryState } from "nuqs";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";

const ITEMS_PER_PAGE = 6;
const SCROLL_DEBOUNCE_MS = 150;

export function RuleList({ sections, small }: { sections: Section[]; small?: boolean }) {
  const [search] = useQueryState("q");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isMounted, setIsMounted] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize random ads to prevent re-randomization on every render
  const randomAds = useMemo(() => {
    const adsMap: Record<string, (typeof ads)[0]> = {};
    sections.forEach((section, sectionIndex) => {
      section.rules.forEach((_, ruleIndex) => {
        const position = `${sectionIndex}-${ruleIndex}`;
        const randomIndex = Math.floor(Math.random() * ads.length);
        adsMap[position] = ads[randomIndex];
      });
    });
    return adsMap;
  }, [sections]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Memoize filtered sections to prevent recalculation on every render
  const filteredSections = useMemo(() => {
    const searchLower = search?.toLowerCase() || "";
    return sections
      .map((section) => ({
        ...section,
        rules: section.rules.filter(
          (rule) =>
            !search ||
            rule.title.toLowerCase().includes(searchLower) ||
            rule.content.toLowerCase().includes(searchLower),
        ),
      }))
      .filter((section) => section.rules.length > 0);
  }, [sections, search]);

  const handleScroll = useCallback(() => {
    // Debounce scroll events
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 100;

      if (bottom && visibleItems < filteredSections.length) {
        setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredSections.length));
      }
    }, SCROLL_DEBOUNCE_MS);
  }, [visibleItems, filteredSections.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const getRandomAd = useCallback(
    (sectionIndex: number, ruleIndex: number) => {
      const position = `${sectionIndex}-${ruleIndex}`;
      return randomAds[position] || ads[0];
    },
    [randomAds],
  );

  let totalItemsCount = 0;

  if (!filteredSections.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col gap-4 flex items-center">
          <p className="text-muted-foreground text-sm">No rules found</p>
          <p className="text-muted-foreground/60 text-xs text-center max-w-xs">
            Try a different search term or browse categories from the menu
          </p>
          <Button
            variant="outline"
            className="mt-2 border-border rounded-full"
            onClick={() => window.history.pushState({}, "", window.location.pathname)}
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
            className="px-4 py-2 text-sm text-muted-foreground"
          >
            Loading more...
          </button>
        </div>
      )}
    </>
  );
}
