import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CollectionCards } from "@/components/CollectionCards";
import { routing } from "@/i18n/routing";

type ProductsRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: ProductsRouteProps): Promise<Metadata> => {
  const { locale } = await params;
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: validLocale,
    namespace: "Metadata",
  });

  return {
    title: t("productsTitle"),
    description: t("productsDescription"),
  };
};

const Products = async ({ params }: ProductsRouteProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("Home");

  return (
    <section
      aria-labelledby="products-title"
      className="bg-[#F8F7F4] py-20 text-[#0F0F0E] lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-12 lg:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
            {t("collections")}
          </p>
          <h1
            id="products-title"
            className="font-serif text-3xl font-light lg:text-5xl"
          >
            {t("allProducts")}
          </h1>
        </div>

        <CollectionCards />
      </div>
    </section>
  );
};

export default Products;
