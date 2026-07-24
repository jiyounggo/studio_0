"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

type ShowcaseMedia =
  | {
      id: number;
      type: "image";
      src: string;
      alt: string;
    }
  | {
      id: number;
      type: "video";
      src: string;
      poster?: string;
      alt: string;
    }
  | {
      id: number;
      type: "youtube";
      youtubeId: string;
      alt: string;
    };

type StatItem = {
  value: string;
  label: string;
  sub?: string;
};

/*
 * 이미지 추가 방법
 *
 * {
 *   id: 1,
 *   type: "image",
 *   src: "/images/home/main-visual-01.png",
 *   alt: "작업 이미지",
 * }
 *
 * 직접 업로드한 MP4 영상 추가 방법
 *
 * {
 *   id: 2,
 *   type: "video",
 *   src: "/videos/home/showcase-01.mp4",
 *   poster: "/images/home/video-poster.jpg",
 *   alt: "작업 영상",
 * }
 *
 * 유튜브 영상 추가 방법
 *
 * {
 *   id: 3,
 *   type: "youtube",
 *   youtubeId: "2DX50eCi3F4",
 *   alt: "유튜브 작업 영상",
 * }
 */

const showcaseMedia: ShowcaseMedia[] = [
  {
    id: 1,
    type: "image",
    src: "/images/home/main-visual-01.png",
    alt: "스튜디오 영 작업 이미지 1",
  },
  {
    id: 2,
    type: "youtube",
    youtubeId: "2DX50eCi3F4",
    alt: "스튜디오 영 작업 영상",
  },
  {
    id: 3,
    type: "image",
    src: "/images/home/main-visual-02.png",
    alt: "스튜디오 영 작업 이미지 2",
  },
  {
    id: 4,
    type: "image",
    src: "/images/home/main-visual-03.png",
    alt: "스튜디오 영 작업 이미지 3",
  },
  {
    id: 5,
    type: "image",
    src: "/images/home/main-visual-04.png",
    alt: "스튜디오 영 작업 이미지 4",
  },
  {
    id: 6,
    type: "image",
    src: "/images/home/main-visual-05.png",
    alt: "스튜디오 영 작업 이미지 5",
  },
];

const stats: StatItem[] = [
  {
    value: "100+",
    label: "Projects",
  },
  {
    value: "50+",
    label: "Clients",
  },
  {
    value: "4.9",
    sub: "/ 5",
    label: "Client Review",
  },
  {
    value: "99%",
    label: "Satisfaction",
  },
];

/*
 * 이미지가 표시되는 시간
 * 4500 = 4.5초
 *
 * 영상은 이 시간과 관계없이
 * 영상이 끝난 후 다음으로 넘어감
 */
const IMAGE_SLIDE_DELAY = 4500;

export default function MainVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  const activeMedia = showcaseMedia[activeIndex];

  const moveToSlide = useCallback((index: number) => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    if (showcaseMedia.length > 1) {
      swiper.slideToLoop(index);
      return;
    }

    swiper.slideTo(index);
  }, []);

  const moveToNextSlide = useCallback(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.animating) {
      return;
    }

    swiper.slideNext();
  }, []);

  /*
   * 현재 미디어가 이미지일 때만 타이머 실행
   *
   * MP4와 유튜브 영상일 때는 타이머를 만들지 않고,
   * 영상의 onEnded 이벤트가 발생했을 때 넘어감
   */
  useEffect(() => {
    if (!activeMedia || activeMedia.type !== "image") {
      return;
    }

    const timer = window.setTimeout(() => {
      moveToNextSlide();
    }, IMAGE_SLIDE_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, activeMedia, moveToNextSlide]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#f8f7ff_0%,#efedff_48%,#f5f2ff_100%)] text-[#111111]"
    >
      {/* 배경 장식 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[220px] -top-[260px] h-[680px] w-[680px] rounded-full bg-[#7563ff]/25 blur-[140px]" />

        <div className="absolute left-[20%] top-[25%] h-[500px] w-[650px] rounded-full bg-[#b2a7ff]/20 blur-[150px]" />

        <div className="absolute -bottom-[260px] -left-[180px] h-[600px] w-[600px] rounded-full bg-[#8574ff]/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:min-h-[880px] lg:px-12 lg:pb-20 lg:pt-26 xl:px-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:gap-16">
          {/* 왼쪽 텍스트 영역 */}
          <div className="relative z-20 flex flex-col lg:min-h-[690px]">
            <div className="mb-6 flex items-center justify-between sm:mb-8 lg:mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6857ef] sm:text-xs">
                Creative Digital Studio
              </p>
            </div>

            <div>
              <h1 className="max-w-[650px] text-[50px] font-semibold leading-[0.92] tracking-[-0.055em] min-[390px]:text-[56px] sm:text-[76px] lg:text-[88px] xl:text-[108px]">
                We Build
                <br />
                <span className="relative inline-block text-[#6857ef]">
                  Brands
                  <span className="absolute -right-5 bottom-[0.08em] h-3.5 w-3.5 rounded-full bg-[#ff6b35] sm:-right-7 sm:h-4 sm:w-4 xl:h-5 xl:w-5" />
                </span>
              </h1>

              <p className="mt-6 text-[17px] leading-[1.55] tracking-[-0.035em] min-[390px]:text-[18px] sm:mt-8 sm:text-[23px] lg:text-[25px]">
                우리는 브랜드를 만들고
                <br />
                비즈니스를 성장시킵니다.
              </p>
            </div>

            <a
              href="#about"
              aria-label="소개 영역으로 이동"
              className="mt-64 hidden w-fit flex-col items-center gap-4 text-[#6857ef] transition-transform duration-300 hover:translate-y-1 lg:flex"
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.28em]">
                Scroll
              </span>

              <span className="relative h-14 w-[2px] overflow-hidden bg-[#7c6cff]/20">
                <span className="absolute left-0 top-0 h-5 w-[2px] animate-[scrollLine_1.8s_ease-in-out_infinite] bg-[#7c6cff]" />
              </span>

              <ArrowDown className="h-5 w-5" strokeWidth={1.7} />
            </a>
          </div>

          {/* 오른쪽 프로젝트 영역 */}
          <div className="relative min-w-0">
            <div className="mb-3 flex items-center justify-between sm:mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6857ef]">
                Our Projects
              </p>

              <p className="text-[10px] font-semibold tracking-[0.14em] text-black/30">
                <span className="text-[#6857ef]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span className="mx-2 text-black/15">/</span>

                {String(showcaseMedia.length).padStart(2, "0")}
              </p>
            </div>

            {/*
             * 모바일
             * 큰 이미지 위 + 작은 미리보기 아래
             *
             * PC
             * 큰 이미지 왼쪽 + 작은 미리보기 오른쪽
             */}
            <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:h-[690px] lg:flex-row xl:h-[730px]">
              {/* 큰 메인 이미지 */}
              <div className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-[18px] bg-[#e8e5ff] shadow-[0_18px_48px_rgba(76,60,170,0.14)] sm:aspect-[5/6] sm:rounded-[22px] sm:shadow-[0_24px_70px_rgba(76,60,170,0.16)] lg:h-full lg:aspect-auto">
                <Swiper
                  direction="vertical"
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={showcaseMedia.length > 1}
                  speed={750}
                  grabCursor
                  allowTouchMove
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.realIndex);
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                  }}
                  className="h-full w-full"
                >
                  {showcaseMedia.map((media, index) => (
                    <SwiperSlide key={`${media.id}-${index}`}>
                      {({ isActive }) => (
                        <MainShowcaseMedia
                          media={media}
                          isActive={isActive}
                          priority={index === 0}
                          onEnded={moveToNextSlide}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* 자동 재생 상태 */}
                <div className="pointer-events-none absolute right-3 top-3 z-40 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-2.5 py-1.5 backdrop-blur-md sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />

                  <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/85">
                    {activeMedia?.type === "image" ? "Auto" : "Playing"}
                  </span>
                </div>

                {/* 하단 그라데이션 */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[32%] bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* 프로젝트 번호 */}
                <div className="pointer-events-none absolute bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Featured project
                  </p>

                  <p className="mt-1 text-[17px] font-semibold tracking-[-0.03em] text-white sm:text-[20px]">
                    Project {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-0 z-30 ring-1 ring-inset ring-black/[0.05]" />
              </div>

              {/* 모바일·태블릿: 가로로 넘기는 미리보기 */}
              <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
                <div className="flex w-max gap-2.5 sm:gap-3">
                  {[1, 2, 3, 4].map((offset) => {
                    const previewIndex =
                      (activeIndex + offset) % showcaseMedia.length;

                    const previewMedia = showcaseMedia[previewIndex];

                    return (
                      <button
                        key={`mobile-${previewMedia.id}-${previewIndex}-${offset}`}
                        type="button"
                        aria-label={`${previewIndex + 1}번째 프로젝트 보기`}
                        onClick={() => moveToSlide(previewIndex)}
                        className="group relative h-[82px] w-[116px] shrink-0 overflow-hidden rounded-[12px] bg-[#ded9ff] shadow-[0_8px_22px_rgba(76,60,170,0.10)] sm:h-[105px] sm:w-[150px] sm:rounded-[15px]"
                      >
                        <PreviewMedia media={previewMedia} />

                        <div className="pointer-events-none absolute inset-0 bg-black/30" />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25" />

                        <span className="absolute left-2 top-2 z-20 text-[8px] font-bold tracking-[0.08em] text-white/90 sm:left-3 sm:top-3 sm:text-[9px]">
                          {String(previewIndex + 1).padStart(2, "0")}
                        </span>

                        {previewMedia.type !== "image" && (
                          <span className="absolute left-1/2 top-1/2 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 backdrop-blur-sm sm:h-8 sm:w-8">
                            <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PC: 오른쪽 세로 미리보기 */}
              <div className="hidden min-w-0 lg:block lg:w-[145px] xl:w-[170px] 2xl:w-[190px]">
                <div className="grid h-full grid-rows-4 gap-3">
                  {[1, 2, 3, 4].map((offset) => {
                    const previewIndex =
                      (activeIndex + offset) % showcaseMedia.length;

                    const previewMedia = showcaseMedia[previewIndex];

                    return (
                      <button
                        key={`desktop-${previewMedia.id}-${previewIndex}-${offset}`}
                        type="button"
                        aria-label={`${previewIndex + 1}번째 프로젝트 보기`}
                        onClick={() => moveToSlide(previewIndex)}
                        className="group relative min-h-0 min-w-0 overflow-hidden rounded-[15px] bg-[#ded9ff] shadow-[0_10px_30px_rgba(76,60,170,0.1)] transition-transform duration-300 hover:-translate-y-1"
                      >
                        <PreviewMedia media={previewMedia} />

                        <div className="pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/15" />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />

                        <span className="absolute left-3 top-3 z-20 text-[9px] font-bold tracking-[0.08em] text-white/85">
                          {String(previewIndex + 1).padStart(2, "0")}
                        </span>

                        {previewMedia.type !== "image" && (
                          <span className="absolute left-1/2 top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 backdrop-blur-sm">
                            <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 하단 진행 바 */}
            <div className="mt-4 flex items-center gap-1.5 sm:mt-5 sm:gap-2">
              {showcaseMedia.map((media, index) => (
                <button
                  key={media.id}
                  type="button"
                  aria-label={`${index + 1}번째 미디어 보기`}
                  onClick={() => moveToSlide(index)}
                  className={[
                    "block h-[3px] flex-1 overflow-hidden rounded-full transition-colors duration-300",
                    index === activeIndex
                      ? "bg-[#6857ef]"
                      : "bg-[#d8d4ef] hover:bg-[#aaa2e8]",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 실적 영역 */}
      <div className="relative z-30 overflow-hidden border-t border-white/15 bg-[linear-gradient(110deg,#8b7cff_0%,#6d5df5_50%,#7b6af8_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.22),transparent_48%)]"
        />

        <div className="relative mx-auto grid max-w-[1600px] gap-8 px-5 py-9 sm:gap-10 sm:px-8 sm:py-11 lg:grid-cols-[1.2fr_2.5fr_auto] lg:items-center lg:px-12 xl:px-16">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
              Since 2020
            </p>

            <p className="mt-4 text-[19px] font-semibold leading-[1.5] tracking-[-0.03em] sm:text-[22px]">
              다양한 분야의 브랜드와
              <br />
              함께 성장해왔습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.06] sm:grid-cols-4 sm:rounded-none sm:border-0 sm:bg-transparent">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={[
                  "min-h-[108px] px-4 py-5 sm:min-h-0 sm:px-7 sm:py-0",
                  index === 0 ? "sm:pl-0" : "",
                  index !== stats.length - 1
                    ? "sm:border-r sm:border-white/20"
                    : "",
                  index % 2 === 0 ? "border-r border-white/15 sm:border-r" : "",
                  index < 2 ? "border-b border-white/15 sm:border-b-0" : "",
                ].join(" ")}
              >
                <p className="text-[34px] font-light tracking-[-0.055em] sm:text-[40px]">
                  {item.value}

                  {item.sub && (
                    <span className="ml-1 text-lg text-white/60">
                      {item.sub}
                    </span>
                  )}
                </p>

                <p className="mt-2 text-[9px] font-semibold text-white/55">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex h-12 w-full items-center justify-between rounded-full border border-white/20 bg-white/10 px-5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/85 transition-colors hover:bg-white/15 hover:text-white sm:w-fit sm:gap-7 sm:border-0 sm:bg-transparent sm:px-0"
          >
            View our works
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-120%);
          }

          50% {
            transform: translateY(120%);
          }

          100% {
            transform: translateY(280%);
          }
        }

        #home .swiper {
          width: 100%;
          height: 100%;
        }

        #home .swiper-wrapper {
          transition-timing-function: cubic-bezier(
            0.22,
            0.61,
            0.36,
            1
          ) !important;
        }

        #home .swiper-slide {
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
        }

        #home iframe {
          display: block;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
          }

          #home .swiper-wrapper {
            transition-duration: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 메인 미디어 */
/* -------------------------------------------------------------------------- */

type MainShowcaseMediaProps = {
  media: ShowcaseMedia;
  isActive: boolean;
  priority?: boolean;
  onEnded: () => void;
};

function MainShowcaseMedia({
  media,
  isActive,
  priority = false,
  onEnded,
}: MainShowcaseMediaProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eeecff]">
      {media.type === "image" && (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover"
        />
      )}

      {media.type === "video" && (
        <LocalVideo media={media} isActive={isActive} onEnded={onEnded} />
      )}

      {media.type === "youtube" && (
        <YouTubeVideo media={media} isActive={isActive} onEnded={onEnded} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 작은 미리보기 */
/* -------------------------------------------------------------------------- */

type PreviewMediaProps = {
  media: ShowcaseMedia;
};

function PreviewMedia({ media }: PreviewMediaProps) {
  if (media.type === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="200px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  if (media.type === "video") {
    if (media.poster) {
      return (
        <Image
          src={media.poster}
          alt={media.alt}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      );
    }

    return (
      <video
        src={media.src}
        aria-label={media.alt}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <img
      src={`https://img.youtube.com/vi/${media.youtubeId}/hqdefault.jpg`}
      alt={media.alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* 직접 업로드한 MP4 영상 */
/* -------------------------------------------------------------------------- */

type LocalVideoProps = {
  media: Extract<ShowcaseMedia, { type: "video" }>;
  isActive: boolean;
  onEnded: () => void;
};

function LocalVideo({ media, isActive, onEnded }: LocalVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isActive) {
      video.currentTime = 0;

      const playPromise = video.play();

      playPromise?.catch(() => {
        /*
         * 브라우저에서 자동재생을 막은 경우
         * 오류가 발생하지 않도록 무시
         */
      });

      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      aria-label={media.alt}
      muted
      playsInline
      preload="metadata"
      onEnded={() => {
        if (isActive) {
          onEndedRef.current();
        }
      }}
      className="h-full w-full object-cover"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* YouTube API 타입 */
/* -------------------------------------------------------------------------- */

type YouTubePlayerInstance = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  mute: () => void;
  destroy: () => void;
};

type YouTubePlayerStateEvent = {
  data: number;
  target: YouTubePlayerInstance;
};

type YouTubePlayerReadyEvent = {
  target: YouTubePlayerInstance;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;

          playerVars?: Record<string, number | string>;

          events?: {
            onReady?: (event: YouTubePlayerReadyEvent) => void;

            onStateChange?: (event: YouTubePlayerStateEvent) => void;
          };
        },
      ) => YouTubePlayerInstance;

      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };

    onYouTubeIframeAPIReady?: () => void;
  }
}

/* -------------------------------------------------------------------------- */
/* YouTube API 불러오기 */
/* -------------------------------------------------------------------------- */

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (!existingScript) {
      const script = document.createElement("script");

      script.src = "https://www.youtube.com/iframe_api";

      script.async = true;

      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

/* -------------------------------------------------------------------------- */
/* 유튜브 영상 */
/* -------------------------------------------------------------------------- */

type YouTubeVideoProps = {
  media: Extract<ShowcaseMedia, { type: "youtube" }>;
  isActive: boolean;
  onEnded: () => void;
};

function YouTubeVideo({ media, isActive, onEnded }: YouTubeVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playerRef = useRef<YouTubePlayerInstance | null>(null);

  const isPlayerReadyRef = useRef(false);
  const isActiveRef = useRef(isActive);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = async () => {
      await loadYouTubeApi();

      if (
        cancelled ||
        !containerRef.current ||
        !window.YT?.Player ||
        playerRef.current
      ) {
        return;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: media.youtubeId,

        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
        },

        events: {
          onReady: ({ target }) => {
            isPlayerReadyRef.current = true;

            target.mute();

            if (isActiveRef.current) {
              target.seekTo(0, true);
              target.playVideo();
            }
          },

          onStateChange: ({ data }) => {
            const endedState = window.YT?.PlayerState.ENDED;

            if (data === endedState && isActiveRef.current) {
              onEndedRef.current();
            }
          },
        },
      });
    };

    createPlayer();

    return () => {
      cancelled = true;
      isPlayerReadyRef.current = false;

      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [media.youtubeId]);

  useEffect(() => {
    const player = playerRef.current;

    if (!player || !isPlayerReadyRef.current) {
      return;
    }

    if (isActive) {
      player.seekTo(0, true);
      player.playVideo();
      return;
    }

    player.pauseVideo();
    player.seekTo(0, true);
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={media.alt}
      className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
    />
  );
}
