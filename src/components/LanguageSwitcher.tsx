"use client";

import { hasLocale, useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { localeCookie, routing } from "@/i18n/routing";

const languageNames = {
  es: "Español",
  ca: "Català",
  en: "English",
} satisfies Record<(typeof routing.locales)[number], string>;

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("Language");
  const router = useRouter();
  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label={t("label")}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.currentTarget.value;
          if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale) return;

          const secure = window.location.protocol === "https:" ? "; Secure" : "";
          document.cookie = `${localeCookie.name}=${nextLocale}; Path=/; Max-Age=${localeCookie.maxAge}; SameSite=Lax${secure}`;
          router.refresh();
        }}
        className="h-11 w-full cursor-pointer appearance-none bg-transparent pr-9 pl-3 text-sm text-[#0F0F0E] transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
      >
        {routing.locales.map((language) => (
          <option key={language} value={language} lang={language}>
            {languageNames[language]}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute right-3" />
    </div>
  );
};
