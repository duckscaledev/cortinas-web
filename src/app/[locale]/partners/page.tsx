import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DecoratorsPage } from "./components/DecoratorsPage";
import { routing } from "@/i18n/routing";

type DecoratorsRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: DecoratorsRouteProps): Promise<Metadata> => {
  const { locale } = await params;
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: validLocale,
    namespace: "Metadata",
  });

  return {
    title: t("decoratorsTitle"),
    description: t("decoratorsDescription"),
  };
};

const Decorators = async ({ params }: DecoratorsRouteProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <DecoratorsPage />;
};

export default Decorators;
