import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const heroImage =
  "https://images.unsplash.com/photo-1617597190828-1bf579d485ee?w=1600&h=1000&fit=crop&auto=format";

const curtainStyles = `
.hero-curtains {
  display: none;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-curtains {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
  }

  .hero-curtains::before,
  .hero-curtains::after {
    position: absolute;
    inset-block: 0;
    width: 50%;
    content: "";
    --curtain-closed: polygon(
      var(--outer-edge) 0%, var(--inner-edge) 0%,
      var(--inner-edge) 42%, var(--inner-edge) 62%,
      var(--inner-edge) 100%, var(--outer-edge) 100%
    );
    --curtain-gathered: polygon(
      var(--outer-edge) 0%, var(--inner-edge) 0%,
      var(--curve-shoulder) 42%, var(--gathered-middle) 62%,
      var(--gathered-hem) 100%, var(--outer-edge) 100%
    );
    background:
      linear-gradient(180deg, #786f681f, transparent 45%, #786f6833),
      repeating-linear-gradient(
        var(--fold-direction),
        #c8c2bc 0,
        #eeeae6 12%,
        #ffffff 21%,
        #f3f0ed 32%,
        #d4cec8 47%,
        #c8c2bc 50%
      );
    background-size: 100% 100%, clamp(84px, 18vw, 240px) 100%;
    animation: hero-curtain-open 1.85s cubic-bezier(0.57, 0.03, 0.24, 1) both;
  }

  .hero-curtains::before {
    --fold-direction: 90deg;
    --outer-edge: 0%;
    --inner-edge: 100%;
    --curve-shoulder: 66%;
    --gathered-middle: 22%;
    --gathered-hem: 47%;
    inset-inline-start: 0;
    transform-origin: left center;
  }

  .hero-curtains::after {
    --fold-direction: 270deg;
    --outer-edge: 100%;
    --inner-edge: 0%;
    --curve-shoulder: 34%;
    --gathered-middle: 78%;
    --gathered-hem: 53%;
    inset-inline-end: 0;
    transform-origin: right center;
  }
}

@supports (clip-path: shape(from 0 0, line to 100% 0, close)) {
  .hero-curtains::before,
  .hero-curtains::after {
    --curtain-closed: shape(
      from var(--outer-edge) 0%,
      line to var(--inner-edge) 0%,
      curve to var(--inner-edge) 62% with var(--inner-edge) 26% / var(--inner-edge) 57%,
      curve to var(--inner-edge) 100% with var(--inner-edge) 76% / var(--inner-edge) 91%,
      line to var(--outer-edge) 100%,
      close
    );
    --curtain-gathered: shape(
      from var(--outer-edge) 0%,
      line to var(--inner-edge) 0%,
      curve to var(--gathered-middle) 62% with var(--inner-edge) 26% / var(--curve-shoulder) 61%,
      curve to var(--gathered-hem) 100% with var(--gathered-middle) 70% / var(--gathered-hem) 87%,
      line to var(--outer-edge) 100%,
      close
    );
  }
}

@keyframes hero-curtain-open {
  from {
    transform: scaleX(1);
    opacity: 0.6;
    clip-path: var(--curtain-closed);
  }

  to {
    transform: scaleX(0.4);
    opacity: 0.48;
    clip-path: var(--curtain-gathered);
  }
}
`;

export const Hero = () => {
  const t = useTranslations("Home");
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#0F0F0E]"
    >
      <Image
        src={heroImage}
        alt={t("heroImageAlt")}
        fill
        preload
        unoptimized
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <style>{curtainStyles}</style>
      <div aria-hidden="true" className="hero-curtains" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/90 via-[#0F0F0E]/30 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            {t("heroEyebrow")}
          </p>
          <h1
            id="hero-title"
            className="mb-8 font-serif text-[clamp(3.75rem,13vw,6rem)] font-light leading-[1.1] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl"
          >
            {t("heroTitleFirst")}
            <br />
            <em className="font-light">{t("heroTitleEmphasis")}</em>
            <br />
            {t("heroTitleLast")}
          </h1>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-3 bg-white px-7 py-4 text-sm font-medium tracking-wide text-[#0F0F0E] transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("catalog")}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center border border-white/40 px-7 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:border-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("advice")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
