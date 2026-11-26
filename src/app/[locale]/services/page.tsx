import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

const serviceKeys = [
  ["adviceTitle", "adviceDescription"],
  ["measurementTitle", "measurementDescription"],
  ["tailoringTitle", "tailoringDescription"],
  ["installationTitle", "installationDescription"],
] as const;

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: `${t("title")} | Cortinas J&D`,
    description: t("intro"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <div className="bg-[#F8F7F4] text-[#0F0F0E]">
      <header className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-10 lg:py-20">
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl leading-tight font-light sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#6A655E]">
            {t("intro")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center gap-3 bg-[#1A1A18] px-5 py-3 text-sm text-white transition-colors hover:bg-[#3D3934] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18]"
          >
            {t("contact")}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#EEECE7]">
          <Image
            src="/images/opaqueCurtains.avif"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </header>

      <section
        aria-labelledby="services-process"
        className="border-t border-[#0F0F0E]/[0.12] bg-[#EEECE7]"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-10 lg:py-20">
          <h2 id="services-process" className="font-serif text-3xl font-light sm:text-4xl">
            {t("processTitle")}
          </h2>
          <ol className="divide-y divide-[#0F0F0E]/[0.15] border-y border-[#0F0F0E]/[0.15]">
            {serviceKeys.map(([title, description], index) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:gap-6">
                <span aria-hidden="true" className="pt-1 text-sm text-[#6A655E] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl">{t(title)}</h3>
                  <p className="mt-1 max-w-prose leading-relaxed text-[#6A655E]">
                    {t(description)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
