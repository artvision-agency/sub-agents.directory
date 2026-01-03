import { Menu } from "@/components/menu";
import { RuleList } from "@/components/rule-list";
import { getSections } from "@/data/rules";
import { Suspense } from "react";

export default function Page() {
  const sections = getSections();

  return (
    <div className="flex w-full h-full">
      <div className="hidden md:flex mt-12 sticky top-12 h-[calc(100vh-3rem)] z-40">
        <Menu sections={sections} />
      </div>

      <main className="flex-1 p-6 pt-4 md:pt-16 space-y-8">
        <Suspense fallback={null}>
          <RuleList sections={sections} />
        </Suspense>
      </main>
    </div>
  );
}
