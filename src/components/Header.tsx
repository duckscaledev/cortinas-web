"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button, Input, Label, TextField } from "react-aria-components";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const iconButtonClassName =
  "flex h-11 w-11 items-center justify-center rounded-sm transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]";

const isLinkActive = (pathname: string, href: string, exact = false) => {
  return exact ? pathname === href : pathname.startsWith(href);
};

export const Header = () => {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigationLinks = [
    { href: "/home", label: t("home"), exact: true },
    { href: "/products", match: "/products", label: t("products") },
    { href: "/partners", label: t("decorators") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#0F0F0E]/[0.12] bg-[#F8F7F4]/95 text-[#0F0F0E] backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between lg:h-[4.5rem]">
          <Link
            href="/home"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18]"
            aria-label={t("brandHome")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-xl tracking-tight lg:text-2xl">
              Cortinas J&D
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label={t("mainNavigation")}
          >
            {navigationLinks.map(({ href, match, label, exact }) => {
              const active = isLinkActive(pathname, match ?? href, exact);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18] ${
                    active
                      ? "text-[#0F0F0E] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#0F0F0E]"
                      : "text-[#6A655E] hover:text-[#0F0F0E]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <LanguageSwitcher />
            <Button
              onPress={() => setIsSearchOpen((open) => !open)}
              className={iconButtonClassName}
              aria-label={isSearchOpen ? t("closeSearch") : t("search")}
              aria-expanded={isSearchOpen}
              aria-controls="site-search"
            >
              {isSearchOpen ? (
                <X aria-hidden="true" size={18} />
              ) : (
                <Search aria-hidden="true" size={18} />
              )}
            </Button>
            <Button
              className={`${iconButtonClassName} hidden lg:flex`}
              aria-label={t("cart")}
            >
              <ShoppingBag aria-hidden="true" size={18} />
            </Button>
            <Button
              onPress={() => setIsMobileMenuOpen((open) => !open)}
              className={`${iconButtonClassName} lg:hidden`}
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" size={20} />
              ) : (
                <Menu aria-hidden="true" size={20} />
              )}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div id="site-search" className="pb-4 pt-1">
            <TextField aria-label={t("search")} className="relative">
              <Label className="sr-only">{t("search")}</Label>
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A655E]"
                size={16}
              />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="w-full border border-[#0F0F0E]/[0.12] bg-[#EEECE7] py-3 pl-11 pr-4 text-sm outline-none placeholder:text-[#6A655E] focus-visible:ring-2 focus-visible:ring-[#1A1A18]"
              />
            </TextField>
          </div>
        )}

        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mt-2 border-t border-[#0F0F0E]/[0.12] pb-4 pt-4 lg:hidden"
            aria-label={t("mobileNavigation")}
          >
            <ul className="flex flex-col">
              {navigationLinks.map(({ href, match, label, exact }) => {
                const active = isLinkActive(pathname, match ?? href, exact);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3.5 text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-[#1A1A18] ${
                        active
                          ? "font-medium text-[#0F0F0E]"
                          : "text-[#6A655E] hover:bg-[#EEECE7] hover:text-[#0F0F0E]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
