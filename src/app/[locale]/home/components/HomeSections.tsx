import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const collections = [
  {
    id: 1,
    title: "opaqueCurtains",
    tag: "privacy",
    image:
      "https://images.unsplash.com/photo-1780257562925-d78de6cb6612?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "sheerCurtains",
    tag: "naturalLight",
    image:
      "https://images.unsplash.com/photo-1573507811472-909cd17e834d?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "blackout",
    tag: "rest",
    image:
      "https://images.unsplash.com/photo-1552858725-2758b5fb1286?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "automated",
    tag: "smartHome",
    image:
      "https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?w=600&h=800&fit=crop&auto=format",
  },
] as const;

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
              href="/product/1"
              className="hidden items-center gap-2 text-sm tracking-wide text-[#6A655E] transition-colors hover:text-[#0F0F0E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18] md:inline-flex"
            >
              {t("seeAll")}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#0F0F0E]/[0.12] sm:grid-cols-2 lg:grid-cols-4">
            {collections.map(({ id, title, tag, image }) => (
              <Link
                key={id}
                href={`/product/${id}`}
                className="group relative overflow-hidden bg-[#F8F7F4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EEECE7]">
                  <Image
                    src={image}
                    alt={t(title)}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#0F0F0E]/0 transition-all duration-500 group-hover:bg-[#0F0F0E]/30"
                  />
                  <span className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-[#0F0F0E] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {t("viewCollection")}
                  </span>
                </div>
                <div className="px-1 py-5">
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#C07B56]">
                    {t(tag)}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base transition-colors group-hover:text-[#C07B56]">
                      {t(title)}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="text-[#6A655E] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/product/1"
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
