"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  Dialog,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ZoomIn,
} from "lucide-react";

const productImages = [
  "https://images.unsplash.com/photo-1780257562925-d78de6cb6612?w=1080&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1573507811472-909cd17e834d?w=1080&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1781433924229-16c42cfbd644?w=1080&h=1080&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=1080&h=1080&fit=crop&auto=format",
];

const colors = [
  { id: "beige", name: "beige", hex: "#F5EDE4" },
  { id: "terracotta", name: "terracotta", hex: "#D4A89A" },
  { id: "gray", name: "gray", hex: "#B5A99C" },
  { id: "olive", name: "olive", hex: "#8A9A7B" },
  { id: "blue", name: "blue", hex: "#9DADB7" },
] as const;

const fabrics = [
  {
    id: "lino",
    name: "linen",
    description: "linenDescription",
  },
  {
    id: "poliester",
    name: "polyester",
    description: "polyesterDescription",
  },
  {
    id: "mezcla",
    name: "blend",
    description: "blendDescription",
  },
] as const;

const features = [
  "qualityFeature",
  "stitchingFeature",
  "pleatsFeature",
  "installationFeature",
  "uvFeature",
  "washingFeature",
] as const;

const specifications = [
  ["material", "materialValue"],
  ["weight", "weightValue"],
  ["opacity", "opacityValue"],
  ["lightControl", "lightControlValue"],
  ["thermalInsulation", "thermalInsulationValue"],
  ["warranty", "warrantyValue"],
] as const;

const reviews = [
  {
    author: "María González",
    rating: 5,
    date: "reviewOneDate",
    comment: "reviewOneComment",
  },
  {
    author: "Carlos Mendoza",
    rating: 5,
    date: "reviewTwoDate",
    comment: "reviewTwoComment",
  },
  {
    author: "Ana Rodríguez",
    rating: 4,
    date: "reviewThreeDate",
    comment: "reviewThreeComment",
  },
] as const;

const relatedProducts = [
  {
    id: "2",
    name: "relatedSheer",
    price: "$2,799",
    image: productImages[1],
  },
  {
    id: "3",
    name: "relatedBlackout",
    price: "$3,999",
    image:
      "https://images.unsplash.com/photo-1552858725-2758b5fb1286?w=800&h=800&fit=crop&auto=format",
  },
  {
    id: "4",
    name: "relatedSmart",
    price: "$5,499",
    image:
      "https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?w=800&h=800&fit=crop&auto=format",
  },
] as const;

const actionButtonClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 border border-[#1A1A18] px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]";

export const ProductDetails = ({ productId }: { productId: string }) => {
  const t = useTranslations("Product");
  const productName = t("name");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("beige");
  const [selectedFabric, setSelectedFabric] = useState("lino");
  const [selectedSize, setSelectedSize] = useState("medida");
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState<"cartNotice" | "sampleNotice" | null>(null);

  const selectedColorName = t(
    colors.find((color) => color.id === selectedColor)?.name ?? colors[0].name,
  );

  const updateQuantity = (value: number) => {
    setQuantity(Math.max(1, Math.floor(value) || 1));
  };

  return (
    <div className="bg-[#F8F7F4] py-8 text-[#0F0F0E] lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm"
          aria-label={t("breadcrumb")}
        >
          <Link
            href="/home"
            className="text-[#6A655E] transition-colors hover:text-[#1A1A18]"
          >
            {t("home")}
          </Link>
          <ChevronRight aria-hidden="true" size={16} className="text-[#6A655E]" />
          <Link
            href="/product/1"
            className="text-[#6A655E] transition-colors hover:text-[#1A1A18]"
          >
            {t("products")}
          </Link>
          <ChevronRight aria-hidden="true" size={16} className="text-[#6A655E]" />
          <span aria-current="page">{productName}</span>
        </nav>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="group relative mb-4 aspect-square overflow-hidden bg-[#EEECE7]">
              <Image
                src={productImages[selectedImage]}
                alt={t("imageAlt", { name: productName, number: selectedImage + 1 })}
                fill
                preload
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <Button
                onPress={() => setIsImageZoomOpen(true)}
                className="absolute right-4 top-4 inline-flex items-center justify-center rounded-sm bg-white/90 p-3 text-[#0F0F0E] opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                aria-label={t("zoomImage")}
              >
                <ZoomIn aria-hidden="true" size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <Button
                  key={image}
                  onPress={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18] ${
                    selectedImage === index
                      ? "border-[#1A1A18]"
                      : "border-transparent"
                  }`}
                  aria-label={t("viewImage", { number: index + 1 })}
                  aria-pressed={selectedImage === index}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 12vw, 25vw"
                    className="object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
              {t("collection")}
            </p>
            <h1 className="mb-4 text-3xl font-light lg:text-4xl">
              {productName}
            </h1>
            <div
              className="mb-6 flex items-center gap-3"
              aria-label={t("ratingSummary")}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    size={20}
                    className="fill-[#C07B56] text-[#C07B56]"
                  />
                ))}
              </div>
              <span className="text-sm text-[#6A655E]">{t("reviewCount")}</span>
            </div>

            <p className="mb-2 text-3xl">$3,499</p>
            <p className="mb-6 text-sm text-[#6A655E]">
              {t("pricePerMeter")}
            </p>
            <p className="mb-8 leading-relaxed text-[#6A655E]">
              {t("description")}
            </p>

            <fieldset className="mb-6">
              <legend className="mb-3 font-medium">{t("color")}</legend>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor === color.id;

                  return (
                    <Button
                      key={color.id}
                      onPress={() => setSelectedColor(color.id)}
                      className={`relative inline-flex h-14 w-14 items-center justify-center border-2 p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18] ${
                        isSelected ? "border-[#1A1A18]" : "border-[#0F0F0E]/15"
                      }`}
                      aria-label={t("selectColor", { color: t(color.name) })}
                      aria-pressed={isSelected}
                    >
                      <span
                        className="h-full w-full"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      {isSelected && (
                        <Check
                          aria-hidden="true"
                          size={20}
                          className="absolute text-[#1A1A18] drop-shadow"
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm text-[#6A655E]">
                {t("selectedColor", { color: selectedColorName })}
              </p>
            </fieldset>

            <fieldset className="mb-6">
              <legend className="mb-3 font-medium">{t("fabricType")}</legend>
              <div className="space-y-2">
                {fabrics.map((fabric) => {
                  const isSelected = selectedFabric === fabric.id;

                  return (
                    <Button
                      key={fabric.id}
                      onPress={() => setSelectedFabric(fabric.id)}
                      className={`flex w-full items-center justify-between border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18] ${
                        isSelected
                          ? "border-[#1A1A18] bg-[#EEECE7]"
                          : "border-[#0F0F0E]/15 hover:border-[#1A1A18]/50"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>
                        <span className="block font-medium">{t(fabric.name)}</span>
                        <span className="block text-sm text-[#6A655E]">
                          {t(fabric.description)}
                        </span>
                      </span>
                      {isSelected && (
                        <Check
                          aria-hidden="true"
                          size={20}
                          className="shrink-0 text-[#1A1A18]"
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mb-6">
              <legend className="mb-3 font-medium">{t("size")}</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: "estandar",
                    title: t("standard"),
                    description: "140 x 220 cm",
                  },
                  {
                    id: "medida",
                    title: t("custom"),
                    description: t("customDescription"),
                  },
                ].map((size) => {
                  const isSelected = selectedSize === size.id;

                  return (
                    <Button
                      key={size.id}
                      onPress={() => setSelectedSize(size.id)}
                      className={`border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18] ${
                        isSelected
                          ? "border-[#1A1A18] bg-[#EEECE7]"
                          : "border-[#0F0F0E]/15 hover:border-[#1A1A18]/50"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="block font-medium">{size.title}</span>
                      <span className="block text-sm text-[#6A655E]">
                        {size.description}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mb-8">
              <label htmlFor={`quantity-${productId}`} className="mb-3 block font-medium">
                {t("quantity")}
              </label>
              <div className="flex items-center gap-3">
                <Button
                  onPress={() => updateQuantity(quantity - 1)}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#0F0F0E]/15 transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                  aria-label={t("decreaseQuantity")}
                >
                  <Minus aria-hidden="true" size={16} />
                </Button>
                <input
                  id={`quantity-${productId}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => updateQuantity(Number(event.target.value))}
                  className="h-11 w-20 border border-[#0F0F0E]/15 bg-white text-center outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A18]"
                />
                <Button
                  onPress={() => updateQuantity(quantity + 1)}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#0F0F0E]/15 transition-colors hover:bg-[#EEECE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                  aria-label={t("increaseQuantity")}
                >
                  <Plus aria-hidden="true" size={16} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onPress={() => setCartMessage("cartNotice")}
                className={`${actionButtonClassName} flex-1 bg-[#1A1A18] text-white hover:bg-[#343430]`}
              >
                <ShoppingBag aria-hidden="true" size={20} />
                {t("addToCart")}
              </Button>
              <Button
                onPress={() =>
                  setCartMessage(
                    "sampleNotice",
                  )
                }
                className={`${actionButtonClassName} flex-1 hover:bg-[#EEECE7]`}
              >
                {t("requestSample")}
              </Button>
            </div>
            <p className="sr-only" aria-live="polite">
              {cartMessage ? t(cartMessage) : ""}
            </p>

            <section className="mt-8 border border-[#0F0F0E]/15 p-6">
              <h2 className="mb-4 text-xl">{t("features")}</h2>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      size={20}
                      className="mt-0.5 shrink-0 text-[#1A1A18]"
                    />
                    <span className="text-[#6A655E]">{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section aria-labelledby="specifications-title" className="mb-16">
          <h2 id="specifications-title" className="mb-6 text-2xl">
            {t("specifications")}
          </h2>
          <dl className="grid grid-cols-1 gap-6 border border-[#0F0F0E]/15 bg-white p-6 md:grid-cols-2">
            {specifications.map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-2 sm:flex-row sm:items-center"
              >
                <dt className="min-w-[140px] font-medium">{t(key)}:</dt>
                <dd className="text-[#6A655E]">{t(value)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="reviews-title" className="mb-16">
          <h2 id="reviews-title" className="mb-6 text-2xl">
            {t("reviews")}
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <article
                key={review.author}
                className="border border-[#0F0F0E]/15 bg-white p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 text-base font-medium">
                      {review.author}
                    </h3>
                    <p className="text-sm text-[#6A655E]">{t(review.date)}</p>
                  </div>
                  <div
                    className="flex shrink-0 items-center gap-1"
                    aria-label={t("rating", { rating: review.rating })}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        aria-hidden="true"
                        size={16}
                        className={
                          index < review.rating
                            ? "fill-[#C07B56] text-[#C07B56]"
                            : "text-[#0F0F0E]/20"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#6A655E]">{t(review.comment)}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-products-title">
          <h2 id="related-products-title" className="mb-6 text-2xl">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="group border border-[#0F0F0E]/15 bg-white transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#EEECE7]">
                  <Image
                    src={relatedProduct.image}
                    alt={t(relatedProduct.name)}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg transition-colors group-hover:text-[#C07B56]">
                    {t(relatedProduct.name)}
                  </h3>
                  <p className="text-xl">{relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <ModalOverlay
        isOpen={isImageZoomOpen}
        onOpenChange={setIsImageZoomOpen}
        isDismissable
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      >
        <Modal className="relative max-h-full w-full max-w-5xl outline-none">
          <Dialog aria-label={t("zoomedImage", { name: productName })}>
            <div className="relative aspect-square max-h-[85vh] w-full">
              <Image
                src={productImages[selectedImage]}
                alt={t("zoomedImageAlt", { name: productName, number: selectedImage + 1 })}
                fill
                unoptimized
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-contain"
              />
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </div>
  );
};
