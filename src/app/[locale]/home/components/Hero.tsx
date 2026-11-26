import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const heroImage =
  "https://images.unsplash.com/photo-1617597190828-1bf579d485ee?w=1600&h=1000&fit=crop&auto=format";

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
