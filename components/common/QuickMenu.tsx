"use client";

import { ArrowUp, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * 실제 정보에 맞게 아래 두 값만 변경해주세요.
 */
const KAKAO_CHAT_URL = "https://pf.kakao.com/_여기에채널ID/chat";
const PHONE_NUMBER = "010-0000-0000";

type QuickMenuItemProps = {
  label: string;
  ariaLabel: string;
  icon: React.ReactNode;
  variant?: "black" | "red" | "yellow" | "white";
  onClick?: () => void;
  href?: string;
};

const variantClasses = {
  black:
    "border-black bg-black text-white hover:bg-[#ed1b36] hover:border-[#ed1b36]",
  red: "border-[#ed1b36] bg-[#ed1b36] text-white hover:bg-[#cf142c] hover:border-[#cf142c]",
  yellow:
    "border-[#fee500] bg-[#fee500] text-[#191919] hover:bg-[#f5dc00] hover:border-[#f5dc00]",
  white:
    "border-black/10 bg-white text-black hover:border-black hover:bg-black hover:text-white",
};

function QuickMenuItem({
  label,
  ariaLabel,
  icon,
  variant = "black",
  onClick,
  href,
}: QuickMenuItemProps) {
  const className = [
    "group flex h-[54px] items-center justify-end overflow-hidden rounded-full border",
    "shadow-[0_10px_30px_rgba(0,0,0,0.14)]",
    "transition-all duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1b36] focus-visible:ring-offset-2",
    "lg:w-[54px] lg:hover:w-[148px]",
    variantClasses[variant],
  ].join(" ");

  const content = (
    <>
      <span className="hidden whitespace-nowrap pl-5 pr-2 text-[13px] font-black tracking-[-0.025em] opacity-0 transition-all duration-200 group-hover:opacity-100 lg:block">
        {label}
      </span>

      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center">
        {icon}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        aria-label={ariaLabel}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {content}
    </button>
  );
}

export default function QuickMenu() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (!contactSection) {
      return;
    }

    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const telephoneLink = `tel:${PHONE_NUMBER.replace(/\D/g, "")}`;

  return (
    <aside
      aria-label="빠른 메뉴"
      className={[
        "fixed bottom-5 right-4 z-[90] flex flex-col items-end gap-2.5",
        "transition-all duration-500 sm:bottom-7 sm:right-6 lg:bottom-9 lg:right-8",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0",
      ].join(" ")}
    >
      {/* 상담 문의 */}
      <QuickMenuItem
        label="상담 문의"
        ariaLabel="상담 문의 섹션으로 이동"
        variant="red"
        onClick={scrollToContact}
        icon={<Send className="h-5 w-5" strokeWidth={2.3} />}
      />

      {/* 카카오톡 */}
      <QuickMenuItem
        label="카카오톡"
        ariaLabel="카카오톡 상담 열기"
        variant="yellow"
        href={KAKAO_CHAT_URL}
        icon={
          <MessageCircle
            className="h-[21px] w-[21px]"
            fill="currentColor"
            strokeWidth={1.8}
          />
        }
      />

      {/* 전화 상담 */}
      <QuickMenuItem
        label="전화 상담"
        ariaLabel={`${PHONE_NUMBER}로 전화하기`}
        variant="black"
        href={telephoneLink}
        icon={<Phone className="h-5 w-5" strokeWidth={2.3} />}
      />

      {/* 위로 이동 */}
      <QuickMenuItem
        label="맨 위로"
        ariaLabel="페이지 맨 위로 이동"
        variant="white"
        onClick={scrollToTop}
        icon={
          <ArrowUp
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={2.4}
          />
        }
      />
    </aside>
  );
}
