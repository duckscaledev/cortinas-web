"use client";

import { useTranslations } from "next-intl";

export const ProductLoading = () => {
  const t = useTranslations("Product");
  return (
    <div
      aria-label={t("loading")}
      className="mx-auto min-h-screen w-full max-w-7xl animate-pulse px-4 py-12"
    />
  );
};
