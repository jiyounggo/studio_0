"use client";

import { useEffect, useState } from "react";

const morphTexts = ["Young", "0", "榮"] as const;

const symbolDurations = [
  1800, // Young
  900, // 0
  2200, // 榮
] as const;

export default function MainVisual() {
  const [showStudio, setShowStudio] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showSymbol, setShowSymbol] = useState(false);
  const [symbolIndex, setSymbolIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  /* 첫 등장 순서 */
  useEffect(() => {
    const timers = [
      window.setTimeout(() => {
        setShowStudio(true);
      }, 300),

      window.setTimeout(() => {
        setShowUnderline(true);
      }, 1000),

      window.setTimeout(() => {
        setShowSymbol(true);
      }, 1700),

      // 기존 5000ms → 2800ms
      window.setTimeout(() => {
        setShowContent(true);
      }, 2800),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  /* Young → 0 → 榮 무한 반복 */
  useEffect(() => {
    if (!showSymbol) return;

    const currentDuration = symbolDurations[symbolIndex];

    const timeoutId = window.setTimeout(() => {
      setSymbolIndex((currentIndex) => {
        return (currentIndex + 1) % morphTexts.length;
      });
    }, currentDuration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSymbol, symbolIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white">
      {/* 배경의 은은한 붉은 빛 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[45%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ed1b36]/[0.045] blur-[130px] sm:h-[560px] sm:w-[560px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-center px-5 py-20 lg:px-10">
        <div className="flex w-full flex-col items-center text-center">
          {/* 메인 로고 */}
          <div className="flex min-h-[150px] items-center justify-center sm:min-h-[190px] md:min-h-[230px]">
            <div
              className={[
                "flex items-baseline justify-center whitespace-nowrap",
                "text-[58px] leading-none",
                "sm:text-[84px] md:text-[112px] lg:text-[138px]",
              ].join(" ")}
            >
              {/* studio */}
              <h1
                className={[
                  "studio-logo-font animated-text-fill block",
                  "pr-[0.025em] tracking-[-0.065em]",
                  "transition-all duration-1000",
                  "ease-[cubic-bezier(.16,1,.3,1)]",
                  showStudio
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-5 opacity-0 blur-sm",
                ].join(" ")}
              >
                studio
              </h1>

              {/* 언더바 */}
              <span
                aria-hidden="true"
                className={[
                  "mx-[0.035em] inline-block",
                  "h-[0.035em] w-[0.38em]",
                  "translate-y-[0.04em] rounded-full",
                  "bg-[#ed1b36]",
                  "shadow-[0_0_18px_rgba(237,27,54,0.65)]",
                  "origin-left transition-all duration-700",
                  "ease-[cubic-bezier(.16,1,.3,1)]",
                  showUnderline
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0",
                ].join(" ")}
              />

              {/* Young → 0 → 榮 */}
              <span
                className={[
                  "relative inline-block h-[1em] w-[1.6em]",
                  "translate-y-[0.08em]",
                  "transition-opacity duration-500",
                  showSymbol ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                {showSymbol && (
                  <span
                    key={symbolIndex}
                    className={[
                      "animated-symbol absolute inset-0",
                      "flex h-full w-full items-center",
                      "whitespace-nowrap",

                      symbolIndex === 0
                        ? "young-script-font justify-start pl-[0.08em] text-[0.7em]"
                        : symbolIndex === 1
                          ? "symbol-bold justify-start pl-[0.04em] text-[0.88em]"
                          : "symbol-bold justify-start pl-[0.04em] text-[0.84em]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {morphTexts[symbolIndex]}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* 브랜드 메시지 */}
          <div
            className={[
              "mt-1 transition-all duration-700 md:mt-3",
              "ease-[cubic-bezier(.16,1,.3,1)]",
              showContent
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-4 opacity-0 blur-[2px]",
            ].join(" ")}
          >
            <div className="space-y-1.5">
              <p className="text-[17px] font-medium leading-[1.75] tracking-[-0.035em] text-white/65 sm:text-[20px] md:text-[24px]">
                우리는 <span className="font-semibold text-white">젊음을</span>{" "}
                담고,
              </p>

              <p className="text-[17px] font-medium leading-[1.75] tracking-[-0.035em] text-white/65 sm:text-[20px] md:text-[24px]">
                <span className="font-semibold text-[#ed1b36]">번영을</span>{" "}
                꿈꾸며,
              </p>

              <p className="text-[17px] font-medium leading-[1.75] tracking-[-0.035em] text-white/65 sm:text-[20px] md:text-[24px]">
                새로운 <span className="font-semibold text-white">시작을</span>{" "}
                만듭니다.
              </p>
            </div>

            {/* 슬로건 */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#ed1b36] md:w-14" />

              <p className="text-[15px] font-black tracking-[0.17em] sm:text-[17px] md:text-[20px]">
                MAKE IT <span className="slogan-gradient">Young.</span>
              </p>

              <span className="h-px w-10 bg-[#ed1b36] md:w-14" />
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 표시 */}
      <a
        href="#about"
        aria-label="다음 섹션으로 이동"
        className={[
          "absolute bottom-7 left-1/2",
          "flex -translate-x-1/2 flex-col items-center gap-3",
          "transition-opacity duration-700",
          showContent ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <span className="text-[9px] font-semibold tracking-[0.28em] text-white/35">
          SCROLL
        </span>

        <span className="relative h-11 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollLine_1.8s_ease-in-out_infinite] bg-[#ed1b36]" />
        </span>
      </a>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Italianno&display=swap");

        .studio-logo-font {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 500;
        }

        .young-script-font {
          font-family: "Italianno", cursive;
          font-weight: 400;
          line-height: 1;
        }

        .symbol-bold {
          font-family: Arial, "Noto Sans KR", sans-serif;
          font-weight: 900;
        }

        .animated-text-fill {
          color: transparent;

          background-image: linear-gradient(
            110deg,
            #ffffff 0%,
            #ffffff 22%,
            #d9d9d9 22%,
            #d9d9d9 34%,
            #ed1b36 34%,
            #ed1b36 44%,
            #ffffff 44%,
            #ffffff 66%,
            #8d8d8d 66%,
            #8d8d8d 76%,
            #ffffff 76%,
            #ffffff 100%
          );

          background-size: 240% 100%;
          background-position: 100% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          animation: textColorFlow 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .animated-symbol {
          color: transparent;

          background-image: linear-gradient(
            115deg,
            #ed1b36 0%,
            #ed1b36 43%,
            #ffffff 43%,
            #ffffff 63%,
            #bdbdbd 63%,
            #bdbdbd 72%,
            #ed1b36 72%,
            #ed1b36 100%
          );

          background-size: 180% 100%;
          background-position: 100% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          transform-origin: center;

          animation:
            symbolAppear 0.65s cubic-bezier(0.16, 1, 0.3, 1),
            symbolColorFlow 1.2s ease-in-out;
        }

        .slogan-gradient {
          color: transparent;

          background-image: linear-gradient(
            105deg,
            #ed1b36 0%,
            #ed1b36 45%,
            #ffffff 45%,
            #ffffff 62%,
            #ed1b36 62%,
            #ed1b36 100%
          );

          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          animation: sloganFlow 3s ease-in-out infinite;
        }

        /* 회전 없이 자연스럽게 등장 */
        @keyframes symbolAppear {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
            filter: blur(7px);
          }

          60% {
            opacity: 1;
            transform: translateY(-1px) scale(1.01);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes textColorFlow {
          0% {
            background-position: 100% 50%;
          }

          45% {
            background-position: 0% 50%;
          }

          65% {
            background-position: 0% 50%;
          }

          100% {
            background-position: -100% 50%;
          }
        }

        @keyframes symbolColorFlow {
          0% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes sloganFlow {
          0%,
          100% {
            background-position: 100% 50%;
          }

          50% {
            background-position: 0% 50%;
          }
        }

        @keyframes scrollLine {
          0% {
            transform: translateY(-120%);
          }

          50% {
            transform: translateY(130%);
          }

          100% {
            transform: translateY(260%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-text-fill,
          .animated-symbol,
          .slogan-gradient {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
