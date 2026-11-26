import { hasLocale } from "next-intl";
import { locale as getRootLocale } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import catalanMessages from "../../messages/ca.json";
import englishMessages from "../../messages/en.json";
import spanishMessages from "../../messages/es.json";

const messages = {
  es: spanishMessages,
  ca: catalanMessages,
  en: englishMessages,
};

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  const requestedLocale = explicitLocale ?? (await getRootLocale());
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale],
  };
});
