"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const banners = [
  {
    id: "placeholder-1",
    href: "/advertise",
    logo: (
      <Image
        src="/Claude_AI_symbol.svg"
        alt="Advertise"
        className="absolute left-4 top-5"
        width={32}
        height={32}
      />
    ),
    title: "Your Brand Here",
    description: "Reach Claude Code developers. Advertise with us. ↗",
  },
  {
    id: "placeholder-2",
    href: "/advertise",
    logo: (
      <Image
        src="/Claude_AI_symbol.svg"
        alt="Advertise"
        className="absolute left-4 top-5"
        width={32}
        height={32}
      />
    ),
    title: "Sponsor This Space",
    description: "Premium ad placement available. Contact us. ↗",
  },
];

export function Banner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const pathname = usePathname();

  const [isAnimating, setIsAnimating] = useState(true);
  const [animateDirection, setAnimateDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    setCurrentBannerIndex(Math.floor(Math.random() * banners.length));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isVisible) return;

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    const switchBanner = () => {
      setIsAnimating(true);
      setAnimateDirection("down");
      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        setAnimateDirection("up");
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    };

    const timer = setTimeout(switchBanner, 8000);
    const interval = setInterval(switchBanner, 16000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setAnimateDirection("down");
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  const slideClass = isAnimating
    ? animateDirection === "down"
      ? "animate-out slide-out-to-bottom duration-300"
      : "animate-in slide-in-from-bottom-full duration-300"
    : "";

  const currentBanner = banners[currentBannerIndex];

  if (!isVisible) return null;

  if (
    pathname === "/advertise" ||
    pathname === "/login" ||
    pathname.endsWith("/new") ||
    pathname.endsWith("/edit")
  ) {
    return null;
  }

  return (
    <Link href={currentBanner.href}>
      <div
        className={`fixed overflow-hidden ${slideClass} z-50 bottom-4 md:bottom-4 left-4 md:left-auto right-4 md:right-4 w-[calc(100vw-32px)] md:w-[calc(100vw-16px)] md:max-w-[370px] border border-border p-4 transition-all bg-background h-[95px] group`}
      >
        {currentBanner.logo}

        <div className="flex justify-between">
          <div className="flex flex-col space-y-0.5 pl-[40px]">
            <div className="flex space-x-2 items-center">
              <span className="text-sm font-medium">{currentBanner.title}</span>
            </div>
            <p className="text-xs text-[#878787]">{currentBanner.description}</p>
          </div>

          <button
            type="button"
            className="absolute right-1.5 top-1.5 text-[#878787] hidden group-hover:block"
            onClick={handleClose}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
