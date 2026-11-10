import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactPage } from "./components/ContactPage";
import { routing } from "@/i18n/routing";

type ContactRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: ContactRouteProps): Promise<Metadata> => {
  const { locale } = await params;
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: validLocale,
    namespace: "Metadata",
  });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
};

const Contact = async ({ params }: ContactRouteProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <ContactPage />;
};

export default Contact;
