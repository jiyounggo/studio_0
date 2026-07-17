"use client";

import {
  type ElementType,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Handshake,
  Loader2,
  MousePointerClick,
  Rocket,
  ShoppingBag,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type ServiceCard = {
  title: string;
  description: string;
  services: string[];
  icon: ElementType;
};

type SelectedInquiry = {
  title: string;
  services: string[];
};

type InquiryForm = {
  name: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
};

const serviceCards: ServiceCard[] = [
  {
    title: "기업 홈페이지가 필요해요.",
    description: "회사나 사업체를 전문적으로 소개하고 싶은 대표님",
    services: ["회사소개 홈페이지", "서비스·사업 분야 소개", "상담·문의 기능"],
    icon: Building2,
  },
  {
    title: "랜딩페이지가 필요해요.",
    description: "광고나 특정 서비스를 효과적으로 홍보하고 싶은 대표님",
    services: ["광고 랜딩페이지", "이벤트·프로모션 페이지", "상담 전환 페이지"],
    icon: MousePointerClick,
  },
  {
    title: "자사몰을 만들고 싶어요.",
    description: "내 브랜드의 독립적인 쇼핑몰을 운영하고 싶은 대표님",
    services: [
      "자사몰·쇼핑몰 제작",
      "상품·주문·결제 기능",
      "관리자 페이지 연동",
    ],
    icon: ShoppingBag,
  },
  {
    title: "브랜드 홈페이지가 필요해요.",
    description: "브랜드의 이미지와 분위기를 보여주고 싶은 대표님",
    services: ["브랜드 소개", "포트폴리오", "브랜드 스토리"],
    icon: Sparkles,
  },
  {
    title: "기존 홈페이지를 개선원해요.",
    description: "기존 사이트를 새롭게 바꾸거나 관리하고 싶은 대표님",
    services: ["홈페이지 리뉴얼", "유지보수·기능추가", "디자인·기능 개선"],
    icon: Wrench,
  },
  {
    title: "창업을 준비 중이에요.",
    description: "브랜드를 처음 시작해 무엇부터 준비할지 고민 중인 대표님",
    services: [
      "스마트스토어 제작",
      "홈페이지·쇼핑몰 제작",
      "로고·브랜딩·상세페이지",
    ],
    icon: Rocket,
  },
];

const mobileTabLabels = ["기업", "랜딩", "자사몰", "브랜드", "리뉴얼", "창업"];

const consultingServices = [
  "1:1 맞춤 상담",
  "현재 사업 분석",
  "필요한 서비스 추천",
  "예산에 맞는 맞춤 견적",
];

const budgetOptions = [
  "50만원 이하",
  "50만원 ~ 100만원",
  "100만원 ~ 200만원",
  "200만원 ~ 300만원",
  "300만원 이상",
  "상담 후 결정",
];

const initialForm: InquiryForm = {
  name: "",
  phone: "",
  company: "",
  budget: "",
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

export default function NeedsSection() {
  const [selectedInquiry, setSelectedInquiry] =
    useState<SelectedInquiry | null>(null);

  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isModalOpen = selectedInquiry !== null;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openInquiryModal = (title: string, services: string[]) => {
    setSelectedInquiry({
      title,
      services,
    });

    setForm(initialForm);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const closeInquiryModal = () => {
    if (isSubmitting) {
      return;
    }

    setSelectedInquiry(null);
    setForm(initialForm);
    setIsSuccess(false);
    setErrorMessage("");
  };

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

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        setSelectedInquiry(null);
        setForm(initialForm);
        setIsSuccess(false);
        setErrorMessage("");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, isSubmitting]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedInquiry) {
      setErrorMessage("선택한 서비스가 없습니다.");
      return;
    }

    if (!form.name.trim()) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    const phoneNumbers = form.phone.replace(/\D/g, "");

    if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
      setErrorMessage("올바른 휴대폰 번호를 입력해주세요.");
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
          inquiryType: selectedInquiry.title,
          selectedServices: selectedInquiry.services,
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

  const renderServiceCard = (
    card: ServiceCard,
    index: number,
    isMobile = false,
  ) => {
    const Icon = card.icon;

    return (
      <button
        key={card.title}
        type="button"
        onClick={() => openInquiryModal(card.title, card.services)}
        style={{
          transitionDelay: isSectionVisible ? `${180 + index * 110}ms` : "0ms",
        }}
        className={[
          "group relative flex flex-col overflow-hidden rounded-[26px]",
          isMobile ? "min-h-[340px]" : "min-h-[360px]",
          "border-2 border-black/[0.11] bg-white p-6 text-left sm:p-7",
          "shadow-[0_10px_28px_rgba(0,0,0,0.08)]",
          "transition-[opacity,transform,box-shadow,border-color] duration-[800ms] ease-out",
          isSectionVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-14 opacity-0",
          "hover:!translate-y-[-6px] hover:border-black/25",
          "hover:shadow-[0_22px_55px_rgba(0,0,0,0.14)]",
          "focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-[#ed1b36] focus-visible:ring-offset-4",
          "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        ].join(" ")}
      >
        <span className="absolute left-0 top-0 h-[7px] w-[78px] rounded-br-full bg-[#ed1b36] transition-all duration-300 group-hover:w-[145px]" />

        <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-black/[0.04]" />
        <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#ed1b36]/10" />

        <div className="relative flex items-start gap-4 pt-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-black text-white shadow-[0_6px_16px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover:bg-[#ed1b36] group-hover:shadow-[0_8px_22px_rgba(237,27,54,0.28)]">
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </span>

          <div className="min-w-0 pt-0.5">
            <h3 className="text-[21px] font-black leading-[1.3] tracking-[-0.045em] text-black sm:text-[25px]">
              {card.title}
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-black/50">
              {card.description}
            </p>
          </div>
        </div>

        <div className="relative mt-5 rounded-[18px] bg-[#f3f3f3] px-5 py-4 sm:mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[13px] font-black tracking-[-0.025em] text-black/55">
              추천 서비스
            </p>
            <span className="h-2 w-2 rounded-full bg-[#ed1b36]" />
          </div>

          <ul className="space-y-2.5 sm:space-y-3">
            {card.services.map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 text-[15px] font-extrabold tracking-[-0.03em] text-black/80"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                  <Check className="h-3 w-3 text-[#ed1b36]" strokeWidth={3} />
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-auto pt-5 sm:pt-6">
          <div className="flex h-12 w-full items-center justify-between rounded-full bg-black px-5 text-sm font-black text-white transition-all duration-300 group-hover:bg-[#ed1b36] group-hover:shadow-[0_10px_24px_rgba(237,27,54,0.24)]">
            <span>문의하기</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#f6f6f6] py-20 text-black sm:py-24 lg:py-28"
      >
        {/* 오른쪽 위 행성 장식 */}
        <div className="pointer-events-none absolute -right-28 top-8 hidden h-[380px] w-[380px] rounded-full border border-black/[0.05] lg:block">
          <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.06]" />

          <div className="absolute left-1/2 top-1/2 h-[165px] w-[165px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ed1b36]/20" />

          <div className="absolute left-[58px] top-[88px] h-4 w-4 rounded-full bg-[#ed1b36]" />

          <div className="absolute -left-14 top-1/2 h-[96px] w-[480px] -translate-y-1/2 -rotate-[12deg] rounded-[50%] border border-black/[0.07]" />

          <div className="absolute -left-8 top-1/2 h-[62px] w-[430px] -translate-y-1/2 -rotate-[12deg] rounded-[50%] border border-[#ed1b36]/12" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* 대제목 */}
          <div
            className={[
              " flex flex-col justify-between gap-8 border-b-2 border-black pb-10  lg:flex-row lg:items-end",
              "transition-[opacity,transform] duration-[900ms] ease-out",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              isSectionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            ].join(" ")}
          >
            <div>
              <h2 className="text-[40px] font-black leading-[1.05] tracking-[-0.065em] sm:text-[54px] lg:text-[66px]">
                무엇이
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">필요</span>

                  <span className="absolute bottom-[4px] left-0 h-[13px] w-full -rotate-1 bg-[#ed1b36]/22" />
                </span>
                하신가요?
              </h2>
            </div>

            <p className="max-w-[450px] text-[16px] font-semibold leading-7 tracking-[-0.025em] text-black/60 sm:text-[18px]">
              현재 상황에 가까운 항목을 선택해주세요.
              <br />
              필요한 서비스를 바로 안내해드립니다.
            </p>
          </div>

          {/* 모바일: 탭을 누르면 선택한 카드 1개만 표시 */}
          <div className="pt-12 md:hidden">
            <div className="-mx-5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                className="flex min-w-max gap-2"
                role="tablist"
                aria-label="필요한 서비스 선택"
              >
                {serviceCards.map((card, index) => {
                  const Icon = card.icon;
                  const isActive = activeMobileTab === index;

                  return (
                    <button
                      key={card.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`mobile-service-panel-${index}`}
                      onClick={() => setActiveMobileTab(index)}
                      className={[
                        "flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition",
                        isActive
                          ? "border-black bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                          : "border-black/10 bg-white text-black/55",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.3} />
                      {mobileTabLabels[index]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              id={`mobile-service-panel-${activeMobileTab}`}
              role="tabpanel"
              className="mt-5"
            >
              {renderServiceCard(
                serviceCards[activeMobileTab],
                activeMobileTab,
                true,
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {serviceCards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveMobileTab(index)}
                  aria-label={`${index + 1}번째 서비스 보기`}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    activeMobileTab === index
                      ? "w-7 bg-[#ed1b36]"
                      : "w-2 bg-black/15",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* 태블릿·PC: 기존처럼 전체 카드 표시 */}
          <div className="hidden gap-8 pt-20 md:grid md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card, index) => renderServiceCard(card, index))}
          </div>

          {/* 어떤 서비스인지 모르는 경우 */}
          <button
            type="button"
            onClick={() =>
              openInquiryModal(
                "어떤 서비스가 필요한지 잘 모르겠어요.",
                consultingServices,
              )
            }
            style={{
              transitionDelay: isSectionVisible ? "900ms" : "0ms",
            }}
            className={[
              "group relative mt-8 flex w-full flex-col justify-between gap-8 overflow-hidden rounded-[28px]",
              "border-2 border-black bg-black p-7 text-left text-white",
              "shadow-[0_14px_36px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center sm:p-9 lg:p-11",
              "transition-[opacity,transform,background-color,box-shadow] duration-[800ms] ease-out",
              isSectionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-14 opacity-0",
              "hover:!translate-y-[-4px] hover:bg-[#ed1b36]",
              "hover:shadow-[0_20px_48px_rgba(237,27,54,0.24)]",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
            ].join(" ")}
          >
            <span className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full border border-white/10" />

            <span className="pointer-events-none absolute -right-4 -top-10 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative flex items-start gap-5">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[17px] bg-white text-black shadow-[0_6px_18px_rgba(0,0,0,0.15)]">
                <Handshake className="h-5 w-5" strokeWidth={2.2} />
              </span>

              <div>
                <h3 className="text-[25px] font-black tracking-[-0.045em] sm:text-[31px]">
                  어떤 서비스가 필요한지 모르겠어요.
                </h3>

                <p className="mt-3 max-w-[720px] text-sm font-semibold leading-6 text-white/65 sm:text-[16px]">
                  사업 상황과 예산을 확인한 후 꼭 필요한 서비스만 맞춤으로
                  추천해드립니다.
                </p>
              </div>
            </div>

            <div className="relative flex shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-black">
              맞춤 상담하기
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </div>
          </button>
        </div>
      </section>

      {/* 문의 팝업 */}
      {isModalOpen && selectedInquiry && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeInquiryModal();
            }
          }}
        >
          <div className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-y-auto rounded-[24px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.30)]">
            <button
              type="button"
              onClick={closeInquiryModal}
              disabled={isSubmitting}
              aria-label="문의 팝업 닫기"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ed1b36] text-white">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h2 className="mt-7 text-[30px] font-black tracking-[-0.055em] sm:text-[40px]">
                  문의가 접수되었습니다.
                </h2>

                <p className="mt-4 text-sm font-medium leading-7 text-black/55">
                  확인 후 입력해주신 번호로 연락드리겠습니다.
                </p>

                <button
                  type="button"
                  onClick={closeInquiryModal}
                  className="mt-8 rounded-full bg-black px-10 py-4 text-sm font-black text-white"
                >
                  확인
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-black/10 px-6 pb-6 pt-8 sm:px-9">
                  <h2
                    id="inquiry-modal-title"
                    className="pr-12 text-[30px] font-black tracking-[-0.055em] sm:text-[38px]"
                  >
                    상담 문의
                  </h2>

                  <p className="mt-2 text-sm font-medium text-black/50">
                    필요한 정보만 간단히 남겨주세요.
                  </p>
                </div>

                <div className="border-b border-black/10 bg-[#f3f3f3] px-6 py-5 sm:px-9">
                  <p className="text-xs font-black text-[#ed1b36]">
                    선택한 서비스
                  </p>

                  <h3 className="mt-2 text-lg font-black tracking-[-0.035em]">
                    {selectedInquiry.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
                    {selectedInquiry.services.join(" · ")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-7 sm:px-9">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-sm font-bold">
                        이름
                        <span className="ml-1 text-[#ed1b36]">*</span>
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
                        className="h-[50px] w-full rounded-[12px] border border-black/15 px-4 text-sm outline-none transition focus:border-[#ed1b36]"
                      />
                    </label>

                    <label>
                      <span className="mb-2 block text-sm font-bold">
                        휴대폰 번호
                        <span className="ml-1 text-[#ed1b36]">*</span>
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
                        className="h-[50px] w-full rounded-[12px] border border-black/15 px-4 text-sm outline-none transition focus:border-[#ed1b36]"
                      />
                    </label>

                    <label>
                      <span className="mb-2 block text-sm font-bold">
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
                        className="h-[50px] w-full rounded-[12px] border border-black/15 px-4 text-sm outline-none transition focus:border-[#ed1b36]"
                      />
                    </label>

                    <label>
                      <span className="mb-2 block text-sm font-bold">
                        예상 예산
                      </span>

                      <select
                        value={form.budget}
                        onChange={(event) =>
                          updateForm("budget", event.target.value)
                        }
                        className="h-[50px] w-full rounded-[12px] border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-[#ed1b36]"
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

                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-bold">
                      문의 내용
                    </span>

                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateForm("message", event.target.value)
                      }
                      maxLength={1500}
                      rows={3}
                      placeholder="필요한 작업이나 궁금한 내용을 입력해주세요."
                      className="w-full resize-none rounded-[12px] border border-black/15 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#ed1b36]"
                    />
                  </label>

                  {errorMessage && (
                    <p className="mt-4 rounded-[12px] bg-[#ed1b36]/5 px-4 py-3 text-sm font-bold text-[#ed1b36]">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ed1b36] text-sm font-black text-white transition hover:bg-[#cf142c] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        문의 접수 중
                      </>
                    ) : (
                      <>
                        상담 신청하기
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
