"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ServiceFilmScene = {
  number: string;
  eyebrow: string;
  prefix: string;
  highlight: string;
  suffix: string;
  description: string;
  image: string;
  imageAlt: string;
};

const scenes: ServiceFilmScene[] = [
  {
    number: "01",
    eyebrow: "BRAND DESIGN",
    prefix: "",
    highlight: "브랜드",
    suffix: "를 만듭니다.",
    description:
      "로고와 컬러, 브랜드의 분위기를 하나의 일관된 이미지로 설계합니다.",
    image: "/images/services/brand.jpg",
    imageAlt: "브랜드 디자인 작업 이미지",
  },
  {
    number: "02",
    eyebrow: "WEB DESIGN",
    prefix: "",
    highlight: "홈페이지",
    suffix: "를 제작합니다.",
    description:
      "브랜드의 가치가 선명하게 전달되는 반응형 웹사이트를 제작합니다.",
    image: "/images/services/website.jpg",
    imageAlt: "홈페이지 제작 작업 이미지",
  },
  {
    number: "03",
    eyebrow: "E-COMMERCE",
    prefix: "",
    highlight: "판매",
    suffix: "로 이어지게 합니다.",
    description:
      "상품의 장점을 효과적으로 보여주고 구매로 이어지는 흐름을 만듭니다.",
    image: "/images/services/commerce.jpg",
    imageAlt: "쇼핑몰 및 상세페이지 디자인 이미지",
  },
  {
    number: "04",
    eyebrow: "CONSULTING",
    prefix: "",
    highlight: "운영",
    suffix: "까지 함께합니다.",
    description: "기획부터 제작, 오픈 이후 관리와 유지보수까지 함께합니다.",
    image: "/images/services/consulting.jpg",
    imageAlt: "브랜드 및 홈페이지 컨설팅 이미지",
  },
];

const SCENE_DURATION = 2300;

export default function ServiceFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previousIndex) =>
        previousIndex === scenes.length - 1 ? 0 : previousIndex + 1,
      );
    }, SCENE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [isVisible, isPaused, prefersReducedMotion]);

  const activeScene = scenes[activeIndex];

  const progressStyle = {
    "--scene-duration": `${SCENE_DURATION}ms`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div
        className="relative mx-auto min-h-[620px] max-w-[1380px] overflow-hidden rounded-[28px] bg-[#080808] shadow-[0_25px_80px_rgba(0,0,0,0.16)] sm:min-h-[680px] sm:rounded-[36px] lg:min-h-[720px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 배경 그라데이션 */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(237,27,54,0.13),transparent_30%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.06),transparent_28%)]" />

          <div className="absolute -left-44 -top-44 h-[500px] w-[500px] rounded-full border border-white/[0.04]" />

          <div className="absolute -right-40 -bottom-52 h-[560px] w-[560px] rounded-full border border-[#ed1b36]/10" />
        </div>

        {/* 배경 대형 글자 */}
        <p
          key={`background-${activeScene.eyebrow}`}
          className="service-film-background pointer-events-none absolute -bottom-8 left-0 whitespace-nowrap text-[25vw] font-black leading-none tracking-[-0.1em] text-white/[0.025] lg:text-[17vw]"
        >
          {activeScene.highlight}
        </p>

        <div className="relative flex min-h-[620px] flex-col p-5 sm:min-h-[680px] sm:p-8 lg:min-h-[720px] lg:p-10">
          {/* 상단 */}
          <header className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ed1b36]" />

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                What We Do
              </p>
            </div>

            <p className="font-mono text-[10px] tracking-[0.15em] text-white/35 sm:text-xs">
              {activeScene.number}
              <span className="mx-2 text-white/15">/</span>
              {String(scenes.length).padStart(2, "0")}
            </p>
          </header>

          {/* 본문 */}
          <div className="grid min-h-0 flex-1 items-center gap-7 py-7 lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:py-10">
            {/* 텍스트 */}
            <div
              key={`text-${activeScene.number}`}
              className="order-2 lg:order-1"
            >
              <p className="service-film-eyebrow text-[10px] font-black tracking-[0.22em] text-[#ed1b36] sm:text-xs">
                {activeScene.eyebrow}
              </p>

              <h2 className="service-film-title mt-4 max-w-[720px] text-[40px] font-black leading-[1.08] tracking-[-0.07em] sm:text-[56px] lg:text-[67px] xl:text-[76px]">
                {activeScene.prefix}

                <span className="relative inline-block">
                  <span className="relative z-10 text-[#ed1b36]">
                    {activeScene.highlight}
                  </span>

                  <span className="absolute bottom-[3px] left-0 h-[8px] w-full -rotate-1 bg-[#ed1b36]/20 sm:h-[11px]" />
                </span>

                {activeScene.suffix}
              </h2>

              <p className="service-film-description mt-6 max-w-[560px] text-[14px] font-medium leading-7 tracking-[-0.02em] text-white/50 sm:text-[16px] sm:leading-8">
                {activeScene.description}
              </p>

              <div className="service-film-signature mt-9 flex items-center gap-4">
                <span className="h-px w-10 bg-[#ed1b36]" />

                <p
                  className="text-[23px] italic text-white/55 sm:text-[28px]"
                  style={{
                    fontFamily:
                      '"Times New Roman", "Bodoni 72", Georgia, serif',
                  }}
                >
                  Studio Young
                </p>
              </div>
            </div>

            {/* 이미지 */}
            <div className="order-1 lg:order-2">
              <div
                key={`image-${activeScene.number}`}
                className="service-film-image-wrap relative h-[270px] overflow-hidden rounded-[22px] bg-white/5 sm:h-[340px] lg:h-[470px] lg:rounded-[28px]"
              >
                {scenes.map((scene, index) => (
                  <Image
                    key={scene.image}
                    src={scene.image}
                    alt={scene.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className={[
                      "absolute inset-0 object-cover transition-opacity duration-700",
                      index === activeIndex ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.18em] text-white/60 sm:right-6 sm:top-6 sm:text-xs">
                  {activeScene.number}
                </span>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/20 pt-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-[9px] font-black tracking-[0.18em] text-white/60 sm:text-[10px]">
                    STUDIO YOUNG
                  </p>

                  <p className="text-[9px] font-semibold tracking-[0.12em] text-white/40 sm:text-[10px]">
                    {activeScene.eyebrow}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 진행 표시 */}
          <footer className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              {scenes.map((scene, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={scene.number}
                    type="button"
                    aria-label={`${index + 1}번째 서비스 보기`}
                    onClick={() => setActiveIndex(index)}
                    className="group relative h-5 flex-1"
                  >
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white/10" />

                    {index < activeIndex && (
                      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#ed1b36]" />
                    )}

                    {isActive && (
                      <span
                        key={`progress-${activeIndex}-${isPaused}`}
                        className={[
                          "service-film-progress absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#ed1b36]",
                          isPaused || !isVisible ? "animation-paused" : "",
                        ].join(" ")}
                        style={progressStyle}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="font-mono text-[8px] tracking-[0.16em] text-white/20 sm:text-[9px]">
                AUTOMATIC FILM
              </p>

              <p className="text-[9px] font-medium text-white/25 sm:text-[10px]">
                {isPaused ? "PAUSED" : "PLAYING"}
              </p>
            </div>
          </footer>
        </div>

        {/* 노이즈 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <style jsx global>{`
        @keyframes serviceFilmReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes serviceFilmImageReveal {
          from {
            opacity: 0;
            transform: scale(1.06);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes serviceFilmBackground {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes serviceFilmProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        .service-film-eyebrow {
          opacity: 0;
          animation: serviceFilmReveal 0.55s ease-out 0.05s forwards;
        }

        .service-film-title {
          opacity: 0;
          animation: serviceFilmReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            0.12s forwards;
        }

        .service-film-description {
          opacity: 0;
          animation: serviceFilmReveal 0.65s ease-out 0.25s forwards;
        }

        .service-film-signature {
          opacity: 0;
          animation: serviceFilmReveal 0.65s ease-out 0.36s forwards;
        }

        .service-film-image-wrap {
          opacity: 0;
          animation: serviceFilmImageReveal 1s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .service-film-background {
          animation: serviceFilmBackground 0.9s ease-out forwards;
        }

        .service-film-progress {
          width: 0%;
          animation: serviceFilmProgress var(--scene-duration) linear forwards;
        }

        .animation-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .service-film-eyebrow,
          .service-film-title,
          .service-film-description,
          .service-film-signature,
          .service-film-image-wrap,
          .service-film-background,
          .service-film-progress {
            opacity: 1;
            animation: none;
            transform: none;
          }

          .service-film-progress {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
