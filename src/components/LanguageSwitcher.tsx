"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "react-aria-components";
import { localeCookie } from "@/i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("Language");
  const router = useRouter();
  const nextLocale = locale === "es" ? "ca" : "es";
  const nextLocaleName = nextLocale === "ca" ? t("catalan") : t("spanish");

  return (
    <Button
      onPress={() => {
        const secure =
          window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${localeCookie.name}=${nextLocale}; Path=/; Max-Age=${localeCookie.maxAge}; SameSite=Lax${secure}`;
        router.refresh();
      }}
      className="inline-flex h-11 min-w-11 items-center justify-center px-2 text-xs font-medium tracking-wide transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
      aria-label={`${t("label")}: ${nextLocaleName}`}
    >
      {locale.toUpperCase()}
    </Button>
  );
};
