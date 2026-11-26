 import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const collections = [
  {
    id: 1,
    title: "opaqueCurtains",
    tag: "privacy",
    image: "/images/opaqueCurtains.avif",
  },
  {
    id: 2,
    title: "sheerCurtains",
    tag: "naturalLight",
    image: "/images/opaqueCurtains.avif",
  },
  {
    id: 3,
    title: "blackout",
    tag: "rest",
    image: "/images/opaqueCurtains.avif",
  },
  {
    id: 4,
    title: "automated",
    tag: "smartHome",
    image: "/images/opaqueCurtains.avif",
  },
] as const;

export const CollectionCards = () => {
  const t = useTranslations("Home");

  return (
    <div className="grid grid-cols-1 gap-px bg-[#0F0F0E]/[0.12] sm:grid-cols-2 lg:grid-cols-4">
      {collections.map(({ id, title, tag, image }) => (
        <Link
          key={id}
          href={`/product/${id}`}
          className="group relative overflow-hidden bg-[#F8F7F4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-[#EEECE7]">
            <Image
              src={image}
              alt={t(title)}
              fill
              unoptimized
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#0F0F0E]/0 transition-all duration-500 group-hover:bg-[#0F0F0E]/30"
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-[#0F0F0E] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {t("viewCollection")}
            </span>
          </div>
          <div className="px-1 py-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#C07B56]">
              {t(tag)}
            </p>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base transition-colors group-hover:text-[#C07B56]">
                {t(title)}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="text-[#6A655E] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
