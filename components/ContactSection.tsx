"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Loader2,
  Sparkles,
  Star,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

type InquiryForm = {
  name: string;
  phone: string;
  company: string;
  budget: string;
  service: string;
  message: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
};

const services = [
  "홈페이지 제작",
  "홈페이지 리뉴얼",
  "홈페이지 유지보수",
  "브랜딩",
  "로고 디자인",
  "상세페이지",
  "배너·디자인",
  "어떤 서비스가 필요한지 모르겠어요",
];

const budgetOptions = [
  "50만원 이하",
  "50만원 ~ 100만원",
  "100만원 ~ 200만원",
  "200만원 ~ 300만원",
  "300만원 이상",
  "상담 후 결정",
];

const inquiryBenefits = [
  "현재 상황에 맞는 서비스 제안",
  "예산에 맞춘 맞춤 견적",
  "불필요한 서비스는 권하지 않아요",
];

const initialForm: InquiryForm = {
  name: "",
  phone: "",
  company: "",
  budget: "",
  service: "",
  message: "",
};

function formatPhoneNumber(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealElements =
      section.querySelectorAll<HTMLElement>("[data-reveal]");

    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.delay ?? 0);

          const timeoutId = window.setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);

          timeoutIds.push(timeoutId);
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const updateForm = <K extends keyof InquiryForm>(
    key: K,
    value: InquiryForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    const phoneNumbers = form.phone.replace(/\D/g, "");

    if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
      setErrorMessage("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }

    if (!form.service) {
      setErrorMessage("필요한 서비스를 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryType: form.service,
          selectedServices: [form.service],
          name: form.name,
          phone: form.phone,
          company: form.company,
          budget: form.budget,
          message: form.message,
        }),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "문의 접수에 실패했습니다.");
      }

      setIsSuccess(true);
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "문의 접수 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[linear-gradient(180deg,#f8f7ff_0%,#f2efff_100%)] py-20 text-black sm:py-24 lg:py-28"
    >
      {/* 왼쪽 위 궤도 장식 */}
      <div className="pointer-events-none absolute -left-44 -top-40 hidden h-[430px] w-[430px] rounded-full border border-black/[0.04] lg:block">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.04]" />

        <div className="absolute left-1/2 top-1/2 h-[165px] w-[165px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6857ef]/15" />

        <div className="absolute -left-6 top-1/2 h-[72px] w-[450px] -translate-y-1/2 -rotate-[13deg] rounded-[50%] border border-black/[0.05]" />

        <Star
          className="absolute bottom-[75px] right-[80px] h-5 w-5 text-[#6857ef]"
          fill="currentColor"
          strokeWidth={1}
        />
      </div>

      <Sparkles
        className="pointer-events-none absolute right-[7%] top-[7%] hidden h-6 w-6 text-[#6857ef]/40 lg:block"
        strokeWidth={1.4}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* 대제목 */}
        <div className="mb-12 flex flex-col justify-between gap-8 border-b-2 border-[#211b47] pb-10 lg:mb-14 lg:flex-row lg:items-end">
          <h2
            data-reveal
            data-delay="100"
            className="contact-reveal max-w-[780px] text-[40px] font-black leading-[1.04] tracking-[-0.065em] sm:text-[54px] lg:text-[66px]"
          >
            함께 시작해볼까요?
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">상담 문의</span>

              <span className="absolute bottom-[3px] left-0 h-[10px] w-full -rotate-1 bg-[#6857ef]/20 sm:h-[13px]" />
            </span>
          </h2>

          <p
            data-reveal
            data-delay="300"
            className="contact-reveal max-w-[420px] text-[15px] font-semibold leading-7 text-[#211b47]/55 sm:text-[17px]"
          >
            아직 구체적인 계획이 없어도 괜찮아요.
            <br />
            현재 상황에 맞는 방향부터 함께 찾아드릴게요.
          </p>
        </div>

        {/* 메인 문의 영역 */}
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch xl:grid-cols-[0.72fr_1.28fr]">
          {/* 왼쪽 안내 영역 */}
          <div className="h-full">
            <div className="lg:sticky lg:top-60">
              <aside className="relative min-h-[600px] overflow-hidden rounded-[28px] bg-[#19152f] p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-10 lg:p-11">
                {/* 배경 장식 */}
                <div className="pointer-events-none absolute -right-28 -top-28 h-[330px] w-[330px] rounded-full border border-white/[0.07]">
                  <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

                  <div className="absolute left-1/2 top-1/2 h-[115px] w-[115px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6857ef]/30" />

                  <div className="absolute -left-8 top-1/2 h-[60px] w-[355px] -translate-y-1/2 -rotate-[14deg] rounded-[50%] border border-white/[0.08]" />
                </div>

                <Star
                  className="absolute right-9 top-8 h-5 w-5 text-[#6857ef]"
                  fill="currentColor"
                  strokeWidth={1}
                />

                <div className="relative flex h-full flex-col">
                  <div>
                    <h3 className="mt-4 text-[32px] font-black leading-[1.16] tracking-[-0.055em] sm:text-[40px] lg:text-[44px]">
                      좋은 결과는
                      <br />
                      충분한 대화에서
                      <br />
                      시작됩니다.
                    </h3>
                  </div>

                  <div className="mt-10 space-y-3 lg:mt-auto lg:pt-12">
                    {inquiryBenefits.map((benefit, index) => (
                      <div
                        key={benefit}
                        className="flex min-h-[74px] items-center gap-4 rounded-[18px] border border-white/[0.09] bg-white/[0.055] px-4 py-4 backdrop-blur-sm"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6857ef]">
                          <Check
                            className="h-4 w-4 text-white"
                            strokeWidth={3}
                          />
                        </span>

                        <div>
                          <p className="text-[11px] font-black text-white/25">
                            0{index + 1}
                          </p>

                          <p className="mt-1 text-[13px] font-bold leading-5 text-white/75 sm:text-sm">
                            {benefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-xs font-bold text-white/35">
                    <Clock3
                      className="h-4 w-4 shrink-0 text-[#6857ef]"
                      strokeWidth={2.5}
                    />
                    문의 확인 후 순차적으로 연락드려요.
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* 오른쪽 문의 폼 */}
          <div
            data-reveal
            data-delay="650"
            className="contact-reveal relative overflow-hidden rounded-[28px] border border-[#6857ef]/[0.12] bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.07)] sm:p-9 lg:min-h-[600px] lg:p-11 xl:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-28 h-[280px] w-[280px] rounded-full border border-black/[0.035]">
              <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6857ef]/10" />
            </div>

            {isSuccess ? (
              <div className="relative flex min-h-[600px] flex-col items-center justify-center px-4 py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6857ef] text-white shadow-[0_15px_35px_rgba(104,87,239,0.25)]">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <h3 className="mt-8 text-[32px] font-black tracking-[-0.055em] sm:text-[44px]">
                  문의가 접수되었습니다.
                </h3>

                <p className="mt-4 text-[15px] font-semibold leading-7 text-[#211b47]/50">
                  남겨주신 내용을 확인한 후
                  <br />
                  입력해주신 번호로 연락드리겠습니다.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#19152f] px-7 py-4 text-sm font-black text-white transition-all duration-300 hover:bg-[#5b4be0]"
                >
                  새로운 문의 작성하기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* 폼 제목 */}
                <div className="mb-9 border-b border-[#6857ef]/10 pb-8">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6857ef]" />

                    <p className="text-sm font-black text-[#6857ef]">
                      상담 신청
                    </p>
                  </div>

                  <h3 className="mt-4 text-[30px] font-black leading-[1.2] tracking-[-0.05em] sm:text-[38px] lg:text-[42px]">
                    프로젝트 정보를
                    <br className="sm:hidden" /> 남겨주세요.
                  </h3>

                  <p className="mt-4 text-sm font-medium leading-6 text-[#211b47]/40">
                    필수 항목만 간단히 작성해도 상담이 가능합니다.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* 기본 정보 */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                      <span className="mb-2.5 block text-sm font-black">
                        이름
                        <span className="ml-1 text-[#6857ef]">*</span>
                      </span>

                      <input
                        type="text"
                        value={form.name}
                        onChange={(event) =>
                          updateForm("name", event.target.value)
                        }
                        maxLength={50}
                        autoComplete="name"
                        placeholder="이름"
                        className="h-[54px] w-full rounded-[14px] border-2 border-[#6857ef]/[0.12] bg-[#f7f5ff] px-4 text-sm font-medium outline-none transition-all placeholder:text-[#211b47]/25 focus:border-[#6857ef] focus:bg-white"
                      />
                    </label>

                    <label>
                      <span className="mb-2.5 block text-sm font-black">
                        휴대폰 번호
                        <span className="ml-1 text-[#6857ef]">*</span>
                      </span>

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateForm(
                            "phone",
                            formatPhoneNumber(event.target.value),
                          )
                        }
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="010-0000-0000"
                        className="h-[54px] w-full rounded-[14px] border-2 border-[#6857ef]/[0.12] bg-[#f7f5ff] px-4 text-sm font-medium outline-none transition-all placeholder:text-[#211b47]/25 focus:border-[#6857ef] focus:bg-white"
                      />
                    </label>

                    <label>
                      <span className="mb-2.5 block text-sm font-black">
                        상호명
                      </span>

                      <input
                        type="text"
                        value={form.company}
                        onChange={(event) =>
                          updateForm("company", event.target.value)
                        }
                        maxLength={100}
                        placeholder="상호명 또는 브랜드명"
                        className="h-[54px] w-full rounded-[14px] border-2 border-[#6857ef]/[0.12] bg-[#f7f5ff] px-4 text-sm font-medium outline-none transition-all placeholder:text-[#211b47]/25 focus:border-[#6857ef] focus:bg-white"
                      />
                    </label>

                    <label>
                      <span className="mb-2.5 block text-sm font-black">
                        예상 예산
                      </span>

                      <select
                        value={form.budget}
                        onChange={(event) =>
                          updateForm("budget", event.target.value)
                        }
                        className="h-[54px] w-full rounded-[14px] border-2 border-[#6857ef]/[0.12] bg-[#f7f5ff] px-4 text-sm font-medium outline-none transition-all focus:border-[#6857ef] focus:bg-white"
                      >
                        <option value="">예산 선택</option>

                        {budgetOptions.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* 서비스 선택 */}
                  <div className="mt-9">
                    <p className="mb-4 text-sm font-black">
                      어떤 서비스가 필요하신가요?
                      <span className="ml-1 text-[#6857ef]">*</span>
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((service) => {
                        const isSelected = form.service === service;

                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => updateForm("service", service)}
                            className={[
                              "flex min-h-[58px] items-center justify-between rounded-[16px] border-2 px-4 text-left text-[13px] font-bold transition-all duration-200",
                              isSelected
                                ? "border-[#6857ef] bg-[#6857ef] text-white shadow-[0_8px_20px_rgba(104,87,239,0.20)]"
                                : "border-[#6857ef]/[0.10] bg-[#f7f5ff] text-black/65 hover:border-[#6857ef]/35 hover:bg-white",
                            ].join(" ")}
                          >
                            <span className="pr-3">{service}</span>

                            <span
                              className={[
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
                                isSelected
                                  ? "border-white bg-white text-[#6857ef]"
                                  : "border-black/15",
                              ].join(" ")}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3" strokeWidth={3} />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <label className="mt-9 block">
                    <span className="mb-2.5 block text-sm font-black">
                      문의 내용
                    </span>

                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateForm("message", event.target.value)
                      }
                      maxLength={1500}
                      rows={5}
                      placeholder="원하시는 작업이나 궁금한 내용을 자유롭게 남겨주세요."
                      className="w-full resize-none rounded-[16px] border-2 border-[#6857ef]/[0.12] bg-[#f7f5ff] px-4 py-4 text-sm font-medium leading-7 outline-none transition-all placeholder:text-[#211b47]/25 focus:border-[#6857ef] focus:bg-white"
                    />

                    <span className="mt-1.5 block text-right text-[11px] font-medium text-[#211b47]/30">
                      {form.message.length}/1500
                    </span>
                  </label>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="mt-5 rounded-[14px] bg-[#6857ef]/[0.07] px-4 py-3.5 text-sm font-bold text-[#6857ef]"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {/* 제출 영역 */}
                  <div className="mt-7 flex flex-col justify-between gap-5 border-t border-[#6857ef]/10 pt-7 sm:flex-row sm:items-center">
                    <p className="max-w-[360px] text-[12px] font-medium leading-5 text-[#211b47]/35">
                      작성해주신 정보는 상담 및 견적 안내 목적으로만 사용됩니다.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex h-[58px] w-full items-center justify-between rounded-full bg-black px-6 text-sm font-black text-white transition-all duration-300 hover:bg-[#5b4be0] hover:shadow-[0_12px_30px_rgba(104,87,239,0.22)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[260px]"
                    >
                      <span>
                        {isSubmitting ? "문의 접수 중..." : "상담 문의 보내기"}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .contact-reveal {
          opacity: 0;
          transform: translateY(85px);
          transition:
            opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .contact-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
