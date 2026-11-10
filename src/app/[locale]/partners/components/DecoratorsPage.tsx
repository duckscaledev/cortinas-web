"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  FieldError,
  Input,
  Label,
  Select,
  SelectValue,
  TextArea,
  TextField,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Headphones,
  Percent,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Percent,
    title: "discountTitle",
    description: "discountDescription",
  },
  {
    icon: BookOpen,
    title: "catalogTitle",
    description: "catalogDescription",
  },
  {
    icon: Headphones,
    title: "supportTitle",
    description: "supportDescription",
  },
  {
    icon: Sparkles,
    title: "samplesTitle",
    description: "samplesDescription",
  },
  {
    icon: FileText,
    title: "quotesTitle",
    description: "quotesDescription",
  },
  {
    icon: Award,
    title: "referralsTitle",
    description: "referralsDescription",
  },
] as const;

const successStories = [
  {
    id: 1,
    designer: "Arq. Patricia Romero",
    project: "storyOneProject",
    description: "storyOneDescription",
    image:
      "https://images.unsplash.com/photo-1780257562925-d78de6cb6612?w=900&h=675&fit=crop&auto=format",
  },
  {
    id: 2,
    designer: "DI. Roberto Fernández",
    project: "storyTwoProject",
    description: "storyTwoDescription",
    image:
      "https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?w=900&h=675&fit=crop&auto=format",
  },
  {
    id: 3,
    designer: "Arq. Sofía Martínez",
    project: "storyThreeProject",
    description: "storyThreeDescription",
    image:
      "https://images.unsplash.com/photo-1573507811472-909cd17e834d?w=900&h=675&fit=crop&auto=format",
  },
] as const;

const professionOptions = [
  { id: "arquitecto", label: "architect" },
  { id: "disenador-interior", label: "interiorDesigner" },
  { id: "decorador", label: "decorator" },
  { id: "constructor", label: "builder" },
  { id: "otro", label: "other" },
] as const;

const inputClassName =
  "mt-2 h-11 w-full border border-[#0F0F0E]/15 bg-white px-4 text-sm outline-none transition-colors placeholder:text-[#6A655E] focus-visible:border-[#1A1A18] focus-visible:ring-2 focus-visible:ring-[#1A1A18]/20";

const textFieldClassName =
  "text-sm text-[#0F0F0E] data-[invalid]:text-[#A52A2A]";

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  isRequired = false,
  value,
  onChange,
  error,
  helperText,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
}) => {
  return (
    <TextField
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      isInvalid={Boolean(error)}
      className={textFieldClassName}
    >
      <Label className="font-medium">
        {label}
        {isRequired ? " *" : ""}
      </Label>
      <Input
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClassName}
      />
      {helperText && <p className="mt-2 text-sm text-[#6A655E]">{helperText}</p>}
      {error && <FieldError className="mt-2 block text-sm">{error}</FieldError>}
    </TextField>
  );
};

export const DecoratorsPage = () => {
  const t = useTranslations("Decorators");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    profession: "",
    portfolio: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "nameRequired";
    };
    if (!formData.email.trim()) {
      nextErrors.email = "emailRequired";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "emailInvalid";
    };
    if (!formData.phone.trim()) {
      nextErrors.phone = "phoneRequired";
    }
    if (!formData.profession) {
      nextErrors.profession = "professionRequired";
    }

    setErrors(nextErrors);
    setSubmitted(false);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#EEECE7] py-16 text-[#0F0F0E] lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#C07B56]/10 via-[#C07B56]/5 to-[#F8F7F4]"
        />
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
              {t("eyebrow")}
            </p>
            <h1 className="mb-6 text-4xl font-light lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[#6A655E] lg:text-xl">
              {t("description")}
            </p>
            <a
              href="#registro"
              className="inline-flex min-h-11 items-center justify-center bg-[#1A1A18] px-7 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#343430] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A18]"
            >
              {t("apply")}
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="benefits-title"
        className="bg-[#EEECE7] py-16 text-[#0F0F0E] lg:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mb-12 text-center lg:mb-16">
            <h2 id="benefits-title" className="mb-4 text-3xl lg:text-5xl">
              {t("benefits")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6A655E]">
              {t("benefitsDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="border border-[#0F0F0E]/10 bg-white p-6 transition-shadow hover:shadow-lg lg:p-8"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A18]/10">
                  <Icon
                    aria-hidden="true"
                    className="text-[#1A1A18]"
                    size={28}
                  />
                </div>
                <h3 className="mb-3 text-xl">{t(title)}</h3>
                <p className="leading-relaxed text-[#6A655E]">{t(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="success-stories-title"
        className="bg-[#F8F7F4] py-16 text-[#0F0F0E] lg:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mb-12 text-center lg:mb-16">
            <h2
              id="success-stories-title"
              className="mb-4 text-3xl lg:text-5xl"
            >
              {t("successStories")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6A655E]">
              {t("successStoriesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {successStories.map((story) => (
              <article
                key={story.id}
                className="overflow-hidden border border-[#0F0F0E]/10 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EEECE7]">
                  <Image
                    src={story.image}
                    alt={t(story.project)}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-sm text-[#C07B56]">
                    {story.designer}
                  </p>
                  <h3 className="mb-3 text-xl">{t(story.project)}</h3>
                  <p className="text-[#6A655E]">{t(story.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="registro"
        aria-labelledby="registration-title"
        className="scroll-mt-24 bg-[#EEECE7] py-16 text-[#0F0F0E] lg:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 id="registration-title" className="mb-4 text-3xl lg:text-5xl">
                {t("registration")}
              </h2>
              <p className="text-lg text-[#6A655E]">
                {t("registrationDescription")}
              </p>
            </div>

            <div className="border border-[#0F0F0E]/10 bg-white p-6 lg:p-10">
              {submitted && (
                <div
                  className="mb-6 border border-[#526647]/30 bg-[#526647]/10 p-4 text-[#35452D]"
                  role="status"
                >
                  {t("submissionNotice")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    name="fullName"
                    label={t("fullName")}
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
                    isRequired
                    value={formData.fullName}
                    onChange={(fullName) =>
                      setFormData((current) => ({ ...current, fullName }))
                    }
                    error={errors.fullName ? t(errors.fullName) : undefined}
                  />
                  <FormField
                    name="email"
                    label={t("email")}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    isRequired
                    value={formData.email}
                    onChange={(email) =>
                      setFormData((current) => ({ ...current, email }))
                    }
                    error={errors.email ? t(errors.email) : undefined}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    name="phone"
                    label={t("phone")}
                    type="tel"
                    placeholder="+34 600 000 000"
                    autoComplete="tel"
                    isRequired
                    value={formData.phone}
                    onChange={(phone) =>
                      setFormData((current) => ({ ...current, phone }))
                    }
                    error={errors.phone ? t(errors.phone) : undefined}
                  />
                  <FormField
                    name="company"
                    label={t("company")}
                    placeholder={t("companyPlaceholder")}
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(company) =>
                      setFormData((current) => ({ ...current, company }))
                    }
                  />
                </div>

                <Select
                  name="profession"
                  selectedKey={formData.profession || null}
                  onSelectionChange={(key) =>
                    setFormData((current) => ({
                      ...current,
                      profession: key === null ? "" : String(key),
                    }))
                  }
                  isRequired
                  isInvalid={Boolean(errors.profession)}
                  className="block"
                >
                  <Label className="text-sm font-medium">{t("profession")} *</Label>
                  <Button className={`${inputClassName} flex items-center justify-between text-left`}>
                    <SelectValue>
                      {({ selectedText }) =>
                        selectedText || t("chooseOption")
                      }
                    </SelectValue>
                    <ChevronDown aria-hidden="true" size={16} />
                  </Button>
                  <Popover className="w-[--trigger-width] border border-[#0F0F0E]/15 bg-white shadow-lg">
                    <ListBox
                      aria-label={t("profession")}
                      className="max-h-60 overflow-auto p-1 outline-none"
                    >
                      {professionOptions.map(({ id, label }) => (
                        <ListBoxItem
                          key={id}
                          id={id}
                          textValue={t(label)}
                          className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm outline-none data-[focused]:bg-[#EEECE7] data-[selected]:font-medium"
                        >
                          {({ isSelected }) => (
                            <>
                              {t(label)}
                              {isSelected && (
                                <Check aria-hidden="true" size={16} />
                              )}
                            </>
                          )}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                  {errors.profession && (
                    <FieldError className="mt-2 block text-sm text-[#A52A2A]">
                      {t(errors.profession)}
                    </FieldError>
                  )}
                </Select>

                <FormField
                  name="portfolio"
                  label={t("portfolio")}
                  type="url"
                  placeholder={t("portfolioPlaceholder")}
                  value={formData.portfolio}
                  onChange={(portfolio) =>
                    setFormData((current) => ({ ...current, portfolio }))
                  }
                  helperText={t("portfolioHelper")}
                />

                <div>
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-[#0F0F0E]"
                  >
                    {t("additionalMessage")}
                  </Label>
                  <TextArea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder={t("messagePlaceholder")}
                    aria-describedby="message-helper"
                    className="mt-2 w-full resize-y border border-[#0F0F0E]/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-[#6A655E] focus-visible:ring-2 focus-visible:ring-[#1A1A18]/20"
                  />
                  <p
                    id="message-helper"
                    className="mt-2 text-sm text-[#6A655E]"
                  >
                    {t("messageHelper")}
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#1A1A18] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#343430] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18] md:w-auto"
                  >
                    <CheckCircle2 aria-hidden="true" size={20} />
                    {t("sendApplication")}
                  </Button>
                  <p className="mt-4 text-sm text-[#6A655E]">
                    {t("requiredNotice")}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F4] py-16 text-[#0F0F0E] lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12 lg:px-6">
          <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#EEECE7] lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1664638413509-6aa486866f9a?w=1080&h=810&fit=crop&auto=format"
              alt={t("designerImageAlt")}
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
              {t("collaboration")}
            </p>
            <h2 className="mb-6 text-3xl lg:text-5xl">
              {t("workWithBest")}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[#6A655E]">
              {t("collaborationDescription")}
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[#6A655E]">
              {t("collaborationExperience")}
            </p>
            <ul className="space-y-3">
              {[
                t("personalAttention"),
                t("onlineOrders"),
                t("electronicInvoicing"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    size={20}
                    className="mt-1 shrink-0 text-[#1A1A18]"
                  />
                  <span className="text-[#6A655E]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
