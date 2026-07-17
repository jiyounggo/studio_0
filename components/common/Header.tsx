"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
const navItems = [
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "SERVICE",
    href: "#service",
  },
  {
    label: "PORTFOLIO",
    href: "#portfolio",
  },
  {
    label: "CONTACT",
    href: "#contact",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-500",
          isScrolled || isMenuOpen
            ? "border-b border-white/10 bg-[#0b0b0b]/95 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto flex max-w-[1500px] items-center justify-between px-5 lg:px-10",
            "transition-[height] duration-500",
            isScrolled ? "h-[70px] md:h-[76px]" : "h-[82px] md:h-[96px]",
          ].join(" ")}
        >
          {/* 로고 */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Studio Young 홈으로 이동"
            className="group relative z-50 flex items-center"
          >
            <Image
              alt="로고"
              src="/images/logo_long_w.png"
              width={200}
              height={200}
            ></Image>
          </Link>

          {/* PC 메뉴 */}
          <nav
            aria-label="주요 메뉴"
            className="hidden items-center gap-8 md:flex lg:gap-11"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[12px] font-bold tracking-[0.14em] text-white/65 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#ed1b36] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            <Link
              href="#contact"
              className="group relative inline-flex h-[42px] items-center justify-center overflow-hidden rounded-full border border-white/25 px-6 text-[12px] font-bold tracking-[0.1em] text-white transition-colors duration-300 hover:border-white"
            >
              <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />

              <span className="relative transition-colors duration-300 group-hover:text-black">
                PROJECT INQUIRY
              </span>
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/50 md:hidden"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      {/* 모바일 전체 메뉴 */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#0b0b0b] md:hidden",
          "transition-all duration-500",
          isMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="모바일 주요 메뉴"
          className="flex min-h-screen flex-col justify-center px-6 pt-[90px]"
        >
          <div className="mx-auto w-full max-w-[520px]">
            <p className="mb-8 text-[10px] font-bold tracking-[0.3em] text-[#ed1b36]">
              STUDIO_Young
            </p>

            <div className="border-t border-white/15">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between border-b border-white/15 py-6"
                >
                  <span className="flex items-center gap-5">
                    <span className="text-[10px] font-semibold text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[30px] font-black tracking-[-0.045em] text-white transition group-hover:text-[#ed1b36]">
                      {item.label}
                    </span>
                  </span>

                  <span className="text-xl text-white/35 transition group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[12px] leading-6 text-white/45">
                젊음을 담고, 번영을 꿈꾸며,
                <br />
                새로운 시작을 만듭니다.
              </p>

              <p className="mt-5 text-[11px] font-bold tracking-[0.17em] text-white">
                MAKE IT <span className="text-[#ed1b36]">Young.</span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
