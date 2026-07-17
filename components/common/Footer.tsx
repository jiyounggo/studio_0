"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { SiKakaotalk } from "react-icons/si";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: FaYoutube,
  },
  {
    name: "KakaoTalk",
    href: "https://pf.kakao.com/",
    icon: SiKakaotalk,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0b0b0b] text-white">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute -right-32 -top-36 h-[340px] w-[340px] rounded-full border border-white/[0.05]" />

      <div className="pointer-events-none absolute -right-14 -top-20 h-[220px] w-[220px] rounded-full border border-[#ed1b36]/15" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[260px] w-[600px] -translate-x-1/2 rounded-full bg-[#ed1b36]/[0.035] blur-[110px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* 상단 */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          {/* 로고 및 소개 */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-[28px] font-black tracking-[-0.06em] sm:text-[34px]"
              aria-label="스튜디오 영 홈으로 이동"
            >
              studio
              <span className="text-[#ed1b36]">_</span>영
            </Link>

            <p className="mt-5 max-w-[430px] text-sm font-semibold leading-7 text-white/45 sm:text-[15px]">
              브랜드의 시작부터 성장까지,
              <br />
              필요한 디자인과 웹사이트를 함께 만듭니다.
            </p>
          </div>

          {/* SNS 링크 */}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-white/30">
              Follow us
            </p>

            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} 새 창으로 열기`}
                    className="group flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-black text-white/65 transition-all duration-300 hover:border-[#ed1b36] hover:bg-[#ed1b36] hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />

                    <span>{social.name}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      strokeWidth={2.3}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="flex flex-col gap-5 py-7 text-xs font-semibold text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© {currentYear} Studio Young. All rights reserved.</p>

            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              개인정보처리방침
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex w-fit items-center gap-2 text-white/40 transition-colors hover:text-white"
            aria-label="페이지 맨 위로 이동"
          >
            <span>BACK TO TOP</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#ed1b36] group-hover:bg-[#ed1b36]">
              <ArrowUpRight
                className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={2.3}
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
