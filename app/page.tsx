import MainVisual from "@/components/MainVisual";

export default function HomePage() {
  return (
    <main>
      <MainVisual />

      <section
        id="about"
        className="scroll-mt-[76px] bg-white px-5 py-28 text-black md:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold tracking-[0.2em] text-[#ed1b36]">
            ABOUT
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            스튜디오영을 소개합니다.
          </h2>
        </div>
      </section>

      <section
        id="service"
        className="scroll-mt-[76px] bg-[#f5f5f5] px-5 py-28 text-black md:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold tracking-[0.2em] text-[#ed1b36]">
            SERVICE
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">제공 서비스</h2>
        </div>
      </section>

      <section
        id="portfolio"
        className="scroll-mt-[76px] bg-white px-5 py-28 text-black md:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold tracking-[0.2em] text-[#ed1b36]">
            PORTFOLIO
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">포트폴리오</h2>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-[76px] bg-[#0b0b0b] px-5 py-28 text-white md:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold tracking-[0.2em] text-[#ed1b36]">
            CONTACT
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            프로젝트 문의
          </h2>
        </div>
      </section>
    </main>
  );
}
