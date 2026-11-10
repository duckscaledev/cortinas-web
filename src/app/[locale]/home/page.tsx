import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Hero } from "./components/Hero";
import { HomeSections } from "./components/HomeSections";
import { routing } from "@/i18n/routing";

const Home = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("Home");
  const stats = [
    { number: "12+", label: t("experience") },
    { number: "4.800", label: t("projects") },
    { number: "98%", label: t("satisfiedCustomers") },
    { number: "320+", label: t("availableFabrics") },
  ];

  return (
    <>
      <Hero />
      <section
        aria-label={t("figures")}
        className="border-b border-white/10 bg-[#0F0F0E]"
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <dl className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {stats.map(({ number, label }) => (
              <div key={label} className="px-6 py-8 text-center">
                <dt className="mb-1 text-3xl font-light tracking-tight text-white lg:text-4xl">
                  {number}
                </dt>
                <dd className="text-xs uppercase tracking-widest text-white/50">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <HomeSections />
    </>
  );
};

export default Home;
