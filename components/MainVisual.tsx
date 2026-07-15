"use client";

import { useEffect, useState } from "react";
const morphTexts = ["young", "0", "榮"] as const;

const symbolDurations = [
  1800, // 영
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
      }, 1200),

      window.setTimeout(() => {
        setShowSymbol(true);
      }, 2000),

      window.setTimeout(() => {
        setShowContent(true);
      }, 5000),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  /* 영 → 0 → 榮 무한 반복 */
  useEffect(() => {
    if (!showSymbol) return;

    let timeoutId: number;

    const changeSymbol = () => {
      const currentDuration = symbolDurations[symbolIndex];

      timeoutId = window.setTimeout(() => {
        setSymbolIndex((currentIndex) => {
          return (currentIndex + 1) % morphTexts.length;
        });
      }, currentDuration);
    };

    changeSymbol();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSymbol, symbolIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white">
      {/* 배경의 은은한 붉은 빛 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ed1b36]/[0.035] blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-center px-5 py-20 lg:px-10">
        <div className="flex w-full flex-col items-center text-center">
          {/* 메인 로고 */}
          <div className="flex min-h-[150px] items-center justify-center sm:min-h-[190px] md:min-h-[230px]">
            <div
              className={[
                "flex items-baseline justify-center whitespace-nowrap",
                "text-[56px] font-black leading-none",
                "sm:text-[82px] md:text-[110px] lg:text-[136px]",
              ].join(" ")}
            >
              {/* studio */}
              <h1
                className={[
                  "animated-text-fill block pr-[0.04em]",
                  "tracking-[-0.055em]",
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
                  "mx-[0.04em] inline-block",
                  "h-[0.05em] w-[0.4em]",
                  "translate-y-[0.08em] rounded-full",
                  "bg-[#ed1b36]",
                  "shadow-[0_0_18px_rgba(237,27,54,0.65)]",
                  "origin-left transition-all duration-700",
                  "ease-[cubic-bezier(.16,1,.3,1)]",
                  showUnderline
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0",
                ].join(" ")}
              />

              {/* young → 0 → 榮 */}
              <span
                className={[
                  "relative  inline-block",
                  "h-[1em] w-[1.5em]",
                  "transition-opacity duration-500",
                  showSymbol ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                {showSymbol && (
                  <span
                    key={symbolIndex}
                    className={[
                      "animated-symbol absolute inset-0",
                      "flex h-full w-full items-center justify-center",
                      "whitespace-nowrap",

                      // young은 작게, 0과 榮은 크게
                      symbolIndex === 0
                        ? "text-[0.5em] tracking-[-0.055em]"
                        : symbolIndex === 1
                          ? "text-[1em] tracking-[-0.075em] -translate-x-[0.4em]" // 0
                          : "text-[1.02em] tracking-[-0.09em] -translate-x-[0.18em]", // 榮
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
              "mt-2 transition-all duration-1000 md:mt-4",
              "ease-[cubic-bezier(.16,1,.3,1)]",
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
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
                MAKE IT <span className="slogan-gradient">YOUNG.</span>
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
          "transition-opacity duration-1000",
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
            symbolMorph 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            symbolColorFlow 1.2s ease-in-out;
        }

        .symbol-zero {
          animation:
            symbolMorph 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            symbolColorFlow 1.2s ease-in-out,
            zeroRotate 0.85s cubic-bezier(0.65, 0, 0.35, 1);
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

        @keyframes symbolMorph {
          0% {
            opacity: 0;
            transform: translateY(12px) scaleX(0.55) scaleY(0.7);
            filter: blur(10px);
          }

          55% {
            opacity: 1;
            transform: translateY(-2px) scaleX(1.05) scaleY(1.04);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes zeroRotate {
          0% {
            rotate: 0deg;
          }

          100% {
            rotate: 360deg;
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
          .symbol-zero,
          .slogan-gradient {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
