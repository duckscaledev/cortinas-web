import { Suspense } from "react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductDetails } from "./components/ProductDetails";
import { ProductLoading } from "./components/ProductLoading";
import { routing } from "@/i18n/routing";

type ProductRouteProps = {
  params: Promise<{ id: string; locale: string }>;
};

export const generateMetadata = async ({
  params,
}: ProductRouteProps): Promise<Metadata> => {
  const { locale } = await params;
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: validLocale,
    namespace: "Metadata",
  });

  return {
    title: t("productTitle"),
    description: t("productDescription"),
  };
};

const ProductPage = ({ params }: ProductRouteProps) => {
  return (
    <Suspense
      fallback={
        <ProductLoading />
      }
    >
      <ProductDetailsWithParams params={params} />
    </Suspense>
  );
};

const ProductDetailsWithParams = async ({
  params,
}: {
  params: ProductRouteProps["params"];
}) => {
  const { id, locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <ProductDetails productId={id} />;
};

export default ProductPage;
