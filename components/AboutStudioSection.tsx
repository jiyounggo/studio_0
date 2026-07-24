"use client";

import Image from "next/image";
import { Star } from "lucide-react";
// import { Nanum_Pen_Script } from "next/font/google";
import { useEffect, useRef } from "react";

// const handwriting = Nanum_Pen_Script({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });

export default function AboutStudioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const revealElements =
      section.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.delay ?? 0);

          window.setTimeout(() => {
            element.classList.remove(
              "translate-y-[80px]",
              "translate-y-[60px]",
              "translate-y-[40px]",
              "opacity-0",
            );

            element.classList.add("translate-y-0", "opacity-100");
          }, delay);

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -70px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#fbfbfd] py-20 text-[#111111] sm:py-24 lg:py-28"
    >
      {/* 전체 배경 그라데이션 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* 오른쪽 위 연보라 빛 */}
        <div className="absolute -right-[180px] -top-[220px] h-[620px] w-[620px] rounded-full bg-[#7c6cff]/[0.09] blur-[120px]" />

        {/* 왼쪽 아래 푸른 보라 빛 */}
        <div className="absolute -bottom-[260px] -left-[200px] h-[560px] w-[560px] rounded-full bg-[#9c8eff]/[0.07] blur-[130px]" />

        {/* 중앙 은은한 빛 */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[100px]" />
      </div>

      {/* 오른쪽 상단 궤도 장식 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 hidden h-[430px] w-[430px] rounded-full border border-[#7c6cff]/10 lg:block"
      >
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7c6cff]/10" />

        <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7c6cff]/20" />

        <div className="absolute -left-8 top-1/2 h-[76px] w-[470px] -translate-y-1/2 -rotate-[13deg] rounded-[50%] border border-[#7c6cff]/10" />

        <Star
          className="absolute bottom-[92px] left-[75px] h-5 w-5 text-[#7c6cff]"
          fill="currentColor"
          strokeWidth={1}
        />

        {/* 기존 Studio Young 오렌지 포인트 */}
        <span className="absolute bottom-[145px] left-[130px] h-2.5 w-2.5 rounded-full bg-[#ff6b35]" />

        <span className="absolute right-[92px] top-[90px] h-1.5 w-1.5 rounded-full bg-[#7c6cff]/70" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* 섹션 제목 */}
        <div className="mb-12 flex flex-col justify-between gap-7 border-b-2 border-[#111111] pb-10 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <p
              data-reveal
              data-delay="50"
              className={[
                "mb-5 text-[11px] font-bold uppercase tracking-[0.22em]",
                "text-[#7c6cff] sm:text-xs",
                "translate-y-[40px] opacity-0",
                "transition-[transform,opacity] duration-[1000ms]",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              About Studio Young
            </p>

            <h2
              data-reveal
              data-delay="150"
              className={[
                "max-w-[760px] text-[40px] font-black leading-[1.04]",
                "tracking-[-0.065em] sm:text-[54px] lg:text-[66px]",
                "translate-y-[80px] opacity-0",
                "transition-[transform,opacity] duration-[1400ms]",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              이야기를 발견하고,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#6958ef]">브랜드</span>

                <span className="absolute bottom-[3px] left-0 h-[10px] w-full -rotate-1 rounded-full bg-[#7c6cff]/20 sm:h-[13px]" />
              </span>
              로 만듭니다.
            </h2>
          </div>

          {/* 오른쪽 작은 메시지 */}
          <div
            data-reveal
            data-delay="250"
            className={[
              "flex items-center gap-3 self-start lg:self-end",
              "translate-y-[40px] opacity-0",
              "transition-[transform,opacity] duration-[1100ms]",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            <span className="h-2 w-2 rounded-full bg-[#7c6cff]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">
              Brand · Web · Creative
            </p>
          </div>
        </div>

        {/* 소개 콘텐츠 */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* 대표 이미지 */}
          <div
            data-reveal
            data-delay="250"
            className={[
              "group relative min-h-[520px] overflow-hidden rounded-[28px]",
              "bg-[#f1efff]",
              "shadow-[0_24px_70px_rgba(86,70,210,0.13)]",
              "sm:min-h-[650px] lg:min-h-[600px]",
              "translate-y-[80px] opacity-0",
              "transition-[transform,opacity] duration-[1500ms]",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            <Image
              src="/images/profile.png"
              alt="스튜디오 영 대표 이지영"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />

            {/* 이미지 위 은은한 보라 톤 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d2fb8]/10 via-transparent to-white/5" />

            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#7c6cff]/10" />
          </div>

          {/* 오른쪽 소개 영역 */}
          <div
            data-reveal
            data-delay="350"
            className={[
              "relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px]",
              "border border-[#e8e5f4] bg-white/90 p-7",
              "shadow-[0_22px_70px_rgba(86,70,210,0.08)]",
              "backdrop-blur-sm",
              "sm:min-h-[650px] sm:p-10 lg:min-h-[600px] lg:p-14",
              "translate-y-[80px] opacity-0",
              "transition-[transform,opacity] duration-[1500ms]",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            {/* 카드 배경 장식 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-[#7c6cff]/[0.08] blur-[70px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-[260px] w-[260px] rounded-full bg-[#9c8eff]/[0.06] blur-[80px]"
            />

            {/* 상단 라벨 */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#ececf3] pb-6">
              <Star
                className="h-4 w-4 text-[#7c6cff]/65"
                fill="currentColor"
                strokeWidth={1}
              />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c6cff]/65 sm:text-[11px]">
                About Studio Young
              </p>
            </div>

            {/* 메인 소개 */}
            <div className="relative z-10 flex flex-1 flex-col justify-center pt-10 sm:pt-12">
              <h3
                data-reveal
                data-delay="450"
                className={[
                  "max-w-[680px] text-[24px] font-black leading-[1.18]",
                  "tracking-[-0.055em] sm:text-[41px] lg:text-[40px]",
                  "translate-y-[60px] opacity-0",
                  "transition-[transform,opacity] duration-[1300ms]",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                브랜드의 시작을 함께하는
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#6958ef]">
                    스튜디오 영
                  </span>

                  <span className="absolute bottom-[2px] left-0 h-[9px] w-full -rotate-1 rounded-full bg-[#7c6cff]/20 sm:h-[11px]" />
                </span>
                입니다.
              </h3>

              {/* 손글씨 대표 소개 */}
              <div
                data-reveal
                data-delay="550"
                className={[
                  "mt-10 max-w-[650px]",
                  "translate-y-[60px] opacity-0",
                  "transition-[transform,opacity] duration-[1300ms]",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                <div className="relative border-y border-[#ececf3] py-9 sm:py-11">
                  {/* 인사말 */}
                  <p
                    className={[
                      // handwriting.className,
                      "-rotate-[0.2deg]",
                      "text-[18px] leading-[1.5] tracking-[-0.02em]",
                      "text-[#171717] sm:text-[20px]",
                    ].join(" ")}
                  >
                    안녕하세요.
                    <br />
                    스튜디오 영 대표 이지영입니다.
                  </p>

                  {/* 본문 */}
                  <div
                    className={[
                      // handwriting.className,
                      "mt-7 space-y-6",
                      "text-[16px] leading-[1.65] tracking-[-0.015em]",
                      "text-[#50505a] sm:text-[18px] sm:leading-[1.7]",
                    ].join(" ")}
                  >
                    <p className="rotate-[0.1deg]">
                      스튜디오 영은 브랜드가 가진 이야기를 발견하고, 그 이야기가
                      고객에게 더 잘 전달될 수 있도록 함께 고민하고 디자인하는
                      스튜디오입니다.
                    </p>

                    <p className="-rotate-[0.1deg]">
                      홈페이지와 브랜드는 작업이 끝나는 순간 완성되는 것이
                      아니라, 대표님의 사업이 더 크게 성장해 나가는 하나의
                      시작이라고 생각합니다.
                    </p>

                    <p className="rotate-[0.15deg]">
                      그래서 스튜디오 영은 단순히 결과물만 만들어드리는 제작자가
                      아닌, 대표님의 사업을 함께 고민하고 방향을 찾아가는 든든한
                      파트너가 되고 싶습니다.
                    </p>

                    <p className="-rotate-[0.1deg]">
                      작은 요청 하나도 가볍게 넘기지 않고 책임감 있게 살피며,
                      처음 함께했던 신뢰가 오래 이어질 수 있도록 프로젝트가 끝난
                      이후에도 대표님의 사업에 필요한 순간 함께하겠습니다.
                    </p>
                  </div>

                  {/* 서명 */}
                  <div className="mt-8 flex items-center justify-end gap-3">
                    <span className="h-px w-10 bg-[#7c6cff]/65" />

                    <p
                      className={[
                        // handwriting.className,
                        "-rotate-2 text-[16px] leading-none",
                        "text-[#6f62c9] sm:text-[16px]",
                      ].join(" ")}
                    >
                      스튜디오 영, 이지영
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 아래 작은 장식 */}

            {/* 하단 메시지 - 필요할 때 주석 해제 */}
            {/*
            <div
              data-reveal
              data-delay="500"
              className={[
                "relative z-10 border-t border-[#ececf3] pt-8",
                "translate-y-[40px] opacity-0",
                "transition-[transform,opacity] duration-[1100ms]",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              <p
                className="text-[31px] italic leading-none tracking-[-0.035em] text-black sm:text-[39px] lg:text-[44px]"
                style={{
                  fontFamily:
                    '"Times New Roman", "Bodoni 72", Georgia, serif',
                }}
              >
                From story to brand.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#7c6cff]" />

                <p className="text-[13px] font-bold tracking-[-0.02em] text-black/45 sm:text-sm">
                  당신의 이야기가 하나의 브랜드가 되는 순간까지
                </p>
              </div>

              <div className="mt-9 flex items-end justify-between gap-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/25">
                  Creative Studio · Busan
                </p>

                <p
                  className="shrink-0 text-[20px] italic text-[#7c6cff]/60 sm:text-[23px]"
                  style={{
                    fontFamily:
                      '"Times New Roman", "Bodoni 72", Georgia, serif',
                  }}
                >
                  Lee Ji Young
                </p>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
