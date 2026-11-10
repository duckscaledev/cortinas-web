import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  AtSign,
  Bird,
  Camera,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const categories = [
  { href: "/product/1", label: "opaqueCurtains" },
  { href: "/product/2", label: "sheerCurtains" },
  { href: "/product/3", label: "blackout" },
  { href: "/product/4", label: "automated" },
];

const linkClassName =
  "text-[#6A655E] transition-colors hover:text-[#0F0F0E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]";

export const Footer = async () => {
  const t = await getTranslations("Footer");
  const quickLinks = [
    { href: "/home", label: t("home") },
    { href: "/product/1", label: t("catalog") },
    { href: "/decorators", label: t("decoratorProgram") },
    { href: "/contact", label: t("contact") },
  ];
  const socialLinks = [
    { href: "https://facebook.com", label: t("visitFacebook"), icon: AtSign },
    { href: "https://instagram.com", label: t("visitInstagram"), icon: Camera },
    { href: "https://twitter.com", label: t("visitTwitter"), icon: Bird },
  ];

  return (
    <footer className="mt-auto border-t border-[#0F0F0E]/[0.12] bg-[#EEECE7] text-[#0F0F0E]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/home"
              className="text-xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18]"
              aria-label={t("brandHome")}
            >
               Cortinas J&D
            </Link>
            <p className="leading-relaxed text-[#6A655E]">
              {t("brandDescription")}
            </p>
            <nav
              aria-label={t("socialMedia")}
              className="flex items-center gap-3"
            >
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F8F7F4] transition-colors hover:bg-[#E8E5DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                  aria-label={label}
                >
                  <Icon aria-hidden="true" size={20} />
                </a>
              ))}
            </nav>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className="mb-4 text-lg">
              {t("quickLinks")}
            </h2>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClassName}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-categories">
            <h2 id="footer-categories" className="mb-4 text-lg">
              {t("categories")}
            </h2>
            <ul className="flex flex-col gap-3">
              {categories.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={linkClassName}>
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-lg">{t("contact")}</h2>
            <address className="not-italic">
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    size={20}
                    className="mt-0.5 shrink-0 text-[#6A655E]"
                  />
                  <span className="text-[#6A655E]">{t("address")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    aria-hidden="true"
                    size={20}
                    className="shrink-0 text-[#6A655E]"
                  />
                  <a href="tel:+525512345678" className={linkClassName}>
                    +52 55 1234 5678
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    aria-hidden="true"
                    size={20}
                    className="shrink-0 text-[#6A655E]"
                  />
                  <a
                    href="mailto:contacto@lumiere.com"
                    className={linkClassName}
                  >
                    contacto@lumiere.com
                  </a>
                </li>
              </ul>
            </address>
            <p className="mt-4 text-[#6A655E]">
              {t("weekdays")}
              <br />
              {t("saturday")}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#0F0F0E]/[0.12] pt-8 text-center">
          <p className="text-sm text-[#6A655E]">
            © 2026  Cortinas J&D. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
