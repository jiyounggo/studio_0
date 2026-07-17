"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Star } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type PortfolioItem = {
  id: number;
  image: string;
  alt: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: "/images/portfolio/portfolio-01.jpg",
    alt: "스튜디오 영 포트폴리오 첫 번째",
  },
  {
    id: 2,
    image: "/images/portfolio/portfolio-02.jpg",
    alt: "스튜디오 영 포트폴리오 두 번째",
  },
  {
    id: 3,
    image: "/images/portfolio/portfolio-03.jpg",
    alt: "스튜디오 영 포트폴리오 세 번째",
  },
  {
    id: 4,
    image: "/images/portfolio/portfolio-04.jpg",
    alt: "스튜디오 영 포트폴리오 네 번째",
  },
  {
    id: 5,
    image: "/images/portfolio/portfolio-05.jpg",
    alt: "스튜디오 영 포트폴리오 다섯 번째",
  },
  {
    id: 6,
    image: "/images/portfolio/portfolio-06.jpg",
    alt: "스튜디오 영 포트폴리오 여섯 번째",
  },
  {
    id: 7,
    image: "/images/portfolio/portfolio-07.jpg",
    alt: "스튜디오 영 포트폴리오 일곱 번째",
  },
  {
    id: 8,
    image: "/images/portfolio/portfolio-08.jpg",
    alt: "스튜디오 영 포트폴리오 여덟 번째",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealElements =
      section.querySelectorAll<HTMLElement>("[data-reveal]");

    const timeouts: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.delay ?? 0);

          const timeout = window.setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);

          timeouts.push(timeout);

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      timeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-white py-20 text-black sm:py-24 lg:py-28"
    >
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute bottom-[-260px] right-[-200px] h-[520px] w-[520px] rounded-full border border-black/[0.035]" />

      <div className="pointer-events-none absolute bottom-[-180px] right-[-110px] h-[350px] w-[350px] rounded-full border border-[#ed1b36]/10" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* 제목 영역 */}
        <div className="mb-12 flex flex-col justify-between gap-8 border-b-2 border-black pb-10 lg:mb-14 lg:flex-row lg:items-end">
          <div
            data-reveal
            data-delay="150"
            className="portfolio-reveal flex items-start gap-5 sm:gap-8"
          >
            {/* 제목 왼쪽 별·행성 장식 */}
            <div className="relative mt-1 hidden h-[120px] w-[120px] shrink-0 sm:block lg:h-[135px] lg:w-[135px]">
              <div className="absolute inset-0 rounded-full border border-black/[0.10]" />

              <div className="absolute left-1/2 top-1/2 h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ed1b36]/20 lg:h-[92px] lg:w-[92px]" />

              <div className="absolute left-1/2 top-1/2 h-[34px] w-[145px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-black/[0.12] lg:w-[165px]" />

              <span className="absolute bottom-[15px] left-[18px] h-3 w-3 rounded-full bg-[#ed1b36] lg:bottom-[20px] lg:left-[23px]" />

              <Star
                className="absolute right-[14px] top-[24px] h-5 w-5 text-[#ed1b36] lg:right-[18px] lg:top-[28px]"
                fill="currentColor"
                strokeWidth={1}
              />

              <Sparkles
                className="absolute bottom-[24px] right-[13px] h-5 w-5 text-black/20 lg:bottom-[29px] lg:right-[18px]"
                strokeWidth={1.5}
              />
            </div>

            <div>
              {/* 모바일 장식 */}
              <div className="mb-5 flex items-center gap-3 sm:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10">
                  <Star
                    className="h-4 w-4 text-[#ed1b36]"
                    fill="currentColor"
                    strokeWidth={1}
                  />
                </span>

                <span className="h-[2px] w-10 bg-[#ed1b36]" />
              </div>

              {/* 제목 크기 통일 */}
              <h2 className="max-w-[740px] text-[40px] font-black leading-[1.04] tracking-[-0.065em] sm:text-[54px] lg:text-[66px]">
                작업으로 보여드리는
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">포트폴리오</span>

                  <span className="absolute bottom-[3px] left-0 h-[10px] w-full -rotate-1 bg-[#ed1b36]/20 sm:h-[13px]" />
                </span>
              </h2>
            </div>
          </div>

          <div
            data-reveal
            data-delay="350"
            className="portfolio-reveal flex items-end justify-between gap-6 lg:flex-col lg:items-end"
          >
            {/* 이전·다음 버튼 */}
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="이전 포트폴리오"
                className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                <ArrowLeft
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                  strokeWidth={2.3}
                />
              </button>

              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="다음 포트폴리오"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#ed1b36] text-white shadow-[0_8px_22px_rgba(237,27,54,0.22)] transition-all duration-300 hover:bg-[#cf142c]"
              >
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.3}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 포트폴리오 슬라이드 등장 영역 */}
      <div data-reveal data-delay="500" className="portfolio-reveal relative">
        <div className="portfolio-swiper relative">
          {/* 슬라이드 영역에만 좌우 그라데이션 */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-4 bg-gradient-to-r from-white to-transparent sm:w-10 lg:w-16" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-4 bg-gradient-to-l from-white to-transparent sm:w-10 lg:w-16" />

          <Swiper
            modules={[Autoplay, A11y, Keyboard]}
            onSwiper={setSwiper}
            onSlideChange={(currentSwiper) => {
              setActiveIndex(currentSwiper.realIndex);
            }}
            loop
            grabCursor
            keyboard={{
              enabled: true,
            }}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={750}
            spaceBetween={14}
            slidesPerView={1.15}
            breakpoints={{
              480: {
                slidesPerView: 1.4,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.8,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 22,
              },
            }}
            className="!overflow-visible px-5 sm:px-8 lg:px-12"
          >
            {portfolioItems.map((portfolio, index) => (
              <SwiperSlide key={portfolio.id} className="!h-auto">
                {({ isActive }) => (
                  <div
                    className={[
                      "group relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#eeeeee]",
                      "border border-black/[0.07]",
                      "transition-all duration-500 ease-out sm:rounded-[22px]",
                      isActive
                        ? "scale-100 opacity-100 shadow-[0_18px_45px_rgba(0,0,0,0.16)]"
                        : "scale-[0.97] opacity-75 shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
                    ].join(" ")}
                  >
                    <Image
                      src={portfolio.image}
                      alt={portfolio.alt}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* 이미지 위 은은한 어두운 효과 */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                    {/* 이미지 위 테두리 */}
                    <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-white/10 sm:rounded-[22px]" />

                    {/* 왼쪽 위 포인트 */}
                    <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 backdrop-blur-sm">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ed1b36]" />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 슬라이드 진행 상태 */}
      <div
        data-reveal
        data-delay="700"
        className="portfolio-reveal mx-auto mt-9 max-w-[1440px] px-5 sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-5">
          <span className="min-w-[28px] text-sm font-black text-black">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <div className="relative h-[2px] flex-1 overflow-hidden bg-black/10">
            <span
              className="absolute inset-y-0 left-0 bg-[#ed1b36] transition-all duration-500"
              style={{
                width: `${((activeIndex + 1) / portfolioItems.length) * 100}%`,
              }}
            />
          </div>

          <span className="min-w-[28px] text-right text-sm font-bold text-black/35">
            {String(portfolioItems.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <style jsx global>{`
        /*
         * 화면에 나타나기 전에는 아래쪽에 숨겨두고,
         * IntersectionObserver가 감지하면 천천히 위로 올라옵니다.
         */
        .portfolio-reveal {
          opacity: 0;
          transform: translateY(85px);
          transition:
            opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .portfolio-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
