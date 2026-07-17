"use client";

import { Quote, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

type Review = {
  name: string;
  category: string;
  content: string;
};

const firstReviews: Review[] = [
  {
    name: "김○○ 대표님",
    category: "홈페이지 제작",
    content:
      "제가 생각했던 분위기를 정확히 이해해주시고, 기대했던 것보다 훨씬 깔끔하게 완성해주셨어요.",
  },
  {
    name: "이○○ 대표님",
    category: "브랜딩",
    content:
      "막연했던 브랜드의 방향이 명확해졌어요. 필요한 부분만 꼼꼼하게 제안해주셔서 좋았습니다.",
  },
  {
    name: "박○○ 대표님",
    category: "상세페이지 제작",
    content:
      "제품의 장점이 잘 보이도록 정리해주셔서 고객들에게 설명하기가 훨씬 쉬워졌어요.",
  },
  {
    name: "최○○ 대표님",
    category: "홈페이지 리뉴얼",
    content:
      "오래된 홈페이지가 완전히 새로워졌어요. 디자인뿐 아니라 사용하기도 훨씬 편해졌습니다.",
  },
];

const secondReviews: Review[] = [
  {
    name: "정○○ 대표님",
    category: "로고 디자인",
    content:
      "브랜드에 담고 싶었던 의미를 잘 살려주셨어요. 볼수록 마음에 드는 로고입니다.",
  },
  {
    name: "한○○ 대표님",
    category: "창업 디자인",
    content:
      "처음 시작하는 단계라 막막했는데 하나씩 친절하게 정리해주셔서 큰 도움이 됐어요.",
  },
  {
    name: "윤○○ 대표님",
    category: "쇼핑몰 디자인",
    content:
      "원하는 느낌을 빠르게 파악해주시고 수정 요청도 세심하게 반영해주셨습니다.",
  },
  {
    name: "오○○ 대표님",
    category: "유지보수",
    content:
      "오픈 이후에도 필요한 부분을 빠르게 확인해주셔서 안심하고 운영하고 있어요.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group relative w-[310px] shrink-0 overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.055] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ed1b36]/60 hover:bg-white/[0.09] sm:w-[380px] sm:p-7 lg:w-[430px]">
      {/* 카드 포인트 */}
      <span className="absolute left-0 top-0 h-[5px] w-16 rounded-br-full bg-[#ed1b36] transition-all duration-300 group-hover:w-28" />

      {/* 배경 원 장식 */}
      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/[0.05]" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <Quote
            className="h-8 w-8 text-[#ed1b36]"
            fill="currentColor"
            strokeWidth={1.5}
          />

          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold text-white/50">
            {review.category}
          </span>
        </div>

        <p className="mt-7 min-h-[112px] text-[17px] font-bold leading-8 tracking-[-0.035em] text-white/90 sm:text-[19px]">
          “{review.content}”
        </p>

        <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ed1b36]" />

          <p className="text-sm font-black text-white">{review.name}</p>
        </div>
      </div>
    </article>
  );
}

export default function ReviewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const repeatedFirstReviews = [...firstReviews, ...firstReviews];
  const repeatedSecondReviews = [...secondReviews, ...secondReviews];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealElements =
      section.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.delay ?? 0);

          window.setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
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
      id="reviews"
      className="relative overflow-hidden bg-[#0b0b0b] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* 배경 빛 */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#ed1b36]/[0.055] blur-[130px]" />

      {/* 오른쪽 위 별 궤도 */}
      <div className="pointer-events-none absolute -right-32 -top-36 h-[390px] w-[390px] rounded-full border border-white/[0.05]">
        <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

        <div className="absolute left-1/2 top-1/2 h-[155px] w-[155px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ed1b36]/20" />

        <span className="absolute bottom-[78px] left-[65px] h-3 w-3 rounded-full bg-[#ed1b36]" />

        <Sparkles
          className="absolute bottom-[110px] left-[118px] h-5 w-5 text-white/15"
          strokeWidth={1.5}
        />
      </div>

      {/* 제목 */}
      <div className="relative z-10 mx-auto mb-14 max-w-[1440px] px-5 sm:px-8 lg:mb-16 lg:px-12">
        <div className="flex flex-col justify-between gap-7 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
          <h2
            data-reveal
            data-delay="150"
            className="review-reveal max-w-[800px] text-[40px] font-black leading-[1.04] tracking-[-0.065em] sm:text-[54px] lg:text-[66px]"
          >
            함께한 고객들의
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">진짜 이야기</span>

              <span className="absolute bottom-[3px] left-0 h-[10px] w-full -rotate-1 bg-[#ed1b36]/35 sm:h-[13px]" />
            </span>
          </h2>

          <p
            data-reveal
            data-delay="350"
            className="review-reveal max-w-[390px] text-[15px] font-semibold leading-7 text-white/50 sm:text-[17px]"
          >
            스튜디오 영과 함께한 대표님들이
            <br className="hidden sm:block" />
            직접 전해주신 소중한 후기입니다.
          </p>
        </div>
      </div>

      {/* 후기 슬라이드 */}
      <div
        data-reveal
        data-delay="500"
        className="review-reveal review-slider relative z-10"
      >
        {/* 슬라이드 영역에만 좌우 흐림 */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent sm:w-20 lg:w-32" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent sm:w-20 lg:w-32" />

        <div className="space-y-5">
          {/* 첫 번째 줄 */}
          <div className="overflow-hidden">
            <div className="review-track review-track-left flex w-max gap-5 px-5">
              {repeatedFirstReviews.map((review, index) => (
                <ReviewCard
                  key={`${review.name}-first-${index}`}
                  review={review}
                />
              ))}
            </div>
          </div>

          {/* 두 번째 줄 */}
          <div className="overflow-hidden">
            <div className="review-track review-track-right flex w-max gap-5 px-5">
              {repeatedSecondReviews.map((review, index) => (
                <ReviewCard
                  key={`${review.name}-second-${index}`}
                  review={review}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 문구 */}
      <div
        data-reveal
        data-delay="700"
        className="review-reveal relative z-10 mx-auto mt-14 max-w-[1440px] px-5 sm:px-8 lg:px-12"
      >
        <div className="flex items-center justify-between gap-5 border-t border-white/10 pt-7">
          <p className="text-sm font-semibold text-white/35">
            좋은 결과는 충분한 대화에서 시작됩니다.
          </p>

          <span className="hidden h-2.5 w-2.5 rounded-full bg-[#ed1b36] sm:block" />
        </div>
      </div>

      <style jsx global>{`
        .review-reveal {
          opacity: 0;
          transform: translateY(80px);
          transition:
            opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .review-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes review-marquee-left {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(calc(-50% - 10px), 0, 0);
          }
        }

        @keyframes review-marquee-right {
          from {
            transform: translate3d(calc(-50% - 10px), 0, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .review-track {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }

        .review-track-left {
          animation: review-marquee-left 42s linear infinite;
        }

        .review-track-right {
          animation: review-marquee-right 48s linear infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .review-slider:hover .review-track {
            animation-play-state: paused;
          }
        }

        @media (max-width: 640px) {
          .review-reveal {
            transform: translateY(45px);
            transition-duration: 1s;
          }

          .review-track-left {
            animation-duration: 32s;
          }

          .review-track-right {
            animation-duration: 36s;
          }
        }
      `}</style>
    </section>
  );
}
