"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type VisualSlide = {
  id: number;
  image: string;
  category?: string;
  title?: string;
  description?: string;
};

const visualSlides: VisualSlide[] = [
  {
    id: 1,
    image: "/images/home/main-visual-01.jpg",
    category: "BRANDING / WEBSITE",
    title: "브랜드의 시작을 디자인합니다.",
    description: "브랜드가 가진 이야기를 감각적인 디자인으로 표현합니다.",
  },
  {
    id: 2,
    image: "/images/home/main-visual-02.jpg",
    category: "WEB / DEVELOPMENT",
    title: "디자인과 기술을 연결합니다.",
    description: "보기 좋은 디자인을 실제로 작동하는 웹사이트로 완성합니다.",
  },
  {
    id: 3,
    image: "/images/home/main-visual-03.jpg",
    category: "AI / BUSINESS",
    title: "비즈니스의 성장을 돕습니다.",
    description: "AI와 디지털 기술을 활용해 더 효율적인 경험을 만듭니다.",
  },
];

export default function VerticalImageSlider() {
  return (
    <div className="relative w-full">
      {/* 슬라이드 */}
      <div className="relative h-[520px] overflow-hidden rounded-[4px] bg-[#ece9ff] shadow-[0_28px_80px_rgba(77,61,180,0.14)] sm:h-[620px] lg:h-[690px]">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={0}
          speed={1100}
          loop
          grabCursor
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: ".visual-slide-prev",
            nextEl: ".visual-slide-next",
          }}
          pagination={{
            el: ".visual-slide-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          className="h-full w-full"
        >
          {visualSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <article className="group relative h-full w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title ?? `메인 비주얼 이미지 ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.025]"
                />

                {/* 이미지 위 음영 */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                {/* 텍스트 */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white sm:p-9 lg:p-10">
                  {slide.category && (
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {slide.category}
                    </p>
                  )}

                  {slide.title && (
                    <h2 className="mt-3 max-w-[600px] break-keep text-[26px] font-semibold leading-[1.2] tracking-[-0.045em] sm:text-[36px] lg:text-[42px]">
                      {slide.title}
                    </h2>
                  )}

                  {slide.description && (
                    <p className="mt-4 max-w-[500px] break-keep text-[11px] font-medium leading-[1.7] text-white/65 sm:text-[13px]">
                      {slide.description}
                    </p>
                  )}
                </div>

                {/* 번호 */}
                <div className="absolute right-5 top-5 z-10 flex h-10 min-w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 px-3 text-[10px] font-bold text-white backdrop-blur-md sm:right-7 sm:top-7">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 위·아래 버튼 */}
        <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-7">
          <button
            type="button"
            aria-label="이전 이미지"
            className="visual-slide-prev flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white hover:text-black"
          >
            <ChevronUp className="h-4 w-4" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            aria-label="다음 이미지"
            className="visual-slide-next flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white hover:text-black"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* 아래 페이지 표시 */}
      <div className="mt-5 flex items-center justify-between border-b border-[#dedbea] pb-5">
        <div className="visual-slide-pagination flex items-center gap-2" />

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7c6cff]" />

          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/25">
            Auto Slide
          </p>
        </div>
      </div>

      <style jsx global>{`
        .visual-slide-pagination .swiper-pagination-bullet {
          width: 5px;
          height: 5px;
          margin: 0 !important;
          border-radius: 999px;
          background: #d3cfee;
          opacity: 1;
          transition:
            width 400ms ease,
            background-color 400ms ease;
        }

        .visual-slide-pagination .swiper-pagination-bullet-active {
          width: 30px;
          background: #7c6cff;
        }

        .visual-slide-prev.swiper-button-disabled,
        .visual-slide-next.swiper-button-disabled {
          opacity: 0.35;
        }

        .swiper-slide-active img {
          animation: visualImageScale 5s ease-out forwards;
        }

        @keyframes visualImageScale {
          from {
            transform: scale(1.04);
          }

          to {
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .swiper-slide-active img {
            animation: none;
          }

          .swiper-wrapper {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </div>
  );
}
