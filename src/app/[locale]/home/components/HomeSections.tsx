import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CollectionCards } from "@/components/CollectionCards";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const processSteps = [
  {
    number: "01",
    title: "measurementTitle",
    description: "measurementDescription",
  },
  {
    number: "02",
    title: "fabricTitle",
    description: "fabricDescription",
  },
  {
    number: "03",
    title: "tailoringTitle",
    description: "tailoringDescription",
  },
  {
    number: "04",
    title: "installationTitle",
    description: "installationDescription",
  },
] as const;

const benefits = [
  "premiumQuality",
  "installationIncluded",
  "europeanFabrics",
  "customMeasurements",
  "warranty",
] as const;

export const HomeSections = () => {
  const t = useTranslations("Home");
  const translatedBenefits = benefits.map((benefit) => t(benefit));
  return (
    <>
      <section
        aria-labelledby="collections-title"
        className="bg-[#F8F7F4] py-20 text-[#0F0F0E] lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex items-end justify-between lg:mb-16">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
                {t("collections")}
              </p>
              <h2
                id="collections-title"
                className="font-serif text-3xl font-light lg:text-5xl"
              >
                {t("findStyle")}
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm tracking-wide text-[#6A655E] transition-colors hover:text-[#0F0F0E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18] md:inline-flex"
            >
              {t("seeAll")}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>

          <CollectionCards />

          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-[#6A655E] hover:text-[#0F0F0E]"
            >
              {t("fullCatalog")}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label={t("benefits")}
        className="overflow-hidden border-y border-[#0F0F0E]/[0.12] bg-[#EEECE7] py-5 text-[#6A655E]"
      >
        <p className="sr-only">{translatedBenefits.join(", ")}</p>
        <div aria-hidden="true">
          <div className="benefits-marquee flex w-max gap-12 whitespace-nowrap">
            {Array.from({ length: 3 }, (_, repetition) => (
              <span
                key={repetition}
                className="inline-flex gap-12 text-xs font-medium uppercase tracking-[0.25em]"
              >
                {translatedBenefits.map((benefit) => (
                  <span key={benefit} className="inline-flex gap-12">
                    <span>{benefit}</span>
                    <span>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="process-title"
        className="grid min-h-[600px] bg-[#F8F7F4] text-[#0F0F0E] lg:grid-cols-2"
      >
        <div className="relative min-h-[400px] overflow-hidden bg-[#EEECE7] lg:min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=700&fit=crop&auto=format"
            alt={t("fabricImageAlt")}
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#0F0F0E]/20"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-20">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
            {t("process")}
          </p>
          <h2
            id="process-title"
            className="mb-8 font-serif text-3xl font-light tracking-tight lg:text-5xl"
          >
            {t("processTitleFirst")}
            <br />
            <em>{t("processTitleLast")}</em>
          </h2>
          <ol className="mb-10 space-y-6">
            {processSteps.map(({ number, title, description }) => (
              <li key={number} className="flex items-start gap-6">
                <span className="mt-0.5 shrink-0 text-xl font-light text-[#C07B56]">
                  {number}
                </span>
                <div>
                  <h3 className="mb-0.5 text-sm font-medium">{t(title)}</h3>
                  <p className="text-sm leading-relaxed text-[#6A655E]">
                    {t(description)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/contact"
            className="inline-flex min-h-11 self-start items-center gap-3 border border-[#0F0F0E] px-7 py-4 text-sm font-medium tracking-wide text-[#0F0F0E] transition-colors hover:bg-[#0F0F0E] hover:text-[#F8F7F4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18]"
          >
            {t("startProject")}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="decorators-title"
        className="bg-[#0F0F0E] py-24 text-[#F8F7F4] lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/50">
              {t("professionals")}
            </p>
            <h2
              id="decorators-title"
              className="mb-6 font-serif text-4xl font-light tracking-tight text-white lg:text-6xl"
            >
              {t("program")}
              <br />
              <em>{t("decorators")}</em>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/60">
              {t("programDescription")}
            </p>
            <Link
              href="/decorators"
              className="inline-flex min-h-11 items-center gap-3 border border-white px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-[#0F0F0E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("discoverProgram")}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
