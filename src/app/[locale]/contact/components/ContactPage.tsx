"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "react-aria-components";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const inputClassName =
  "mt-2 h-11 w-full border border-[#0F0F0E]/15 bg-white px-4 text-sm outline-none transition-colors placeholder:text-[#6A655E] focus-visible:border-[#1A1A18] focus-visible:ring-2 focus-visible:ring-[#1A1A18]/20";

export const ContactPage = () => {
  const t = useTranslations("Contact");
  const contactInfo = [
    { icon: MapPin, title: t("address"), content: t("addressValue") },
    { icon: Phone, title: t("phone"), content: "+52 55 1234 5678", href: "tel:+525512345678" },
    { icon: Mail, title: t("email"), content: "contacto@lumiere.com", href: "mailto:contacto@lumiere.com" },
    { icon: Clock3, title: t("hours"), content: t("hoursValue") },
  ];
  const faqs = [
    { question: t("installationQuestion"), answer: t("installationAnswer") },
    { question: t("deliveryQuestion"), answer: t("deliveryAnswer") },
    { question: t("samplesQuestion"), answer: t("samplesAnswer") },
    { question: t("warrantyQuestion"), answer: t("warrantyAnswer") },
  ];
  const contactChannels = [
    { icon: MessageCircle, title: "WhatsApp", detail: t("liveChat"), href: "https://wa.me/525512345678", external: true },
    { icon: Phone, title: t("phoneCall"), detail: "+52 55 1234 5678", href: "tel:+525512345678" },
    { icon: Mail, title: t("email"), detail: "contacto@lumiere.com", href: "mailto:contacto@lumiere.com" },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "nameRequired";
    };
    if (!formData.email.trim()) {
      nextErrors.email = "emailRequired";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "emailInvalid";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "messageRequired";
    }

    setErrors(nextErrors);
    setIsSubmitted(false);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <>
      <section className="bg-[#EEECE7] py-16 text-center text-[#0F0F0E] lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#6A655E]">
            {t("eyebrow")}
          </p>
          <h1 className="mb-6 text-4xl font-light lg:text-6xl">{t("title")}</h1>
          <p className="mx-auto max-w-2xl text-xl text-[#6A655E]">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="bg-[#F8F7F4] py-16 text-[#0F0F0E] lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map(({ icon: Icon, title, content, href }) => (
              <article
                key={title}
                className="border border-[#0F0F0E]/10 bg-white p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A18]/10">
                  <Icon
                    aria-hidden="true"
                    size={28}
                    className="text-[#1A1A18]"
                  />
                </div>
                <h2 className="mb-3 text-xl">{title}</h2>
                {href ? (
                  <a
                    href={href}
                    className="whitespace-pre-line text-[#6A655E] transition-colors hover:text-[#C07B56]"
                  >
                    {content}
                  </a>
                ) : (
                  <p className="whitespace-pre-line text-[#6A655E]">
                    {content}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="mb-6 text-3xl">{t("sendUsMessage")}</h2>
              <div className="border border-[#0F0F0E]/10 bg-white p-6 lg:p-8">
                {isSubmitted && (
                  <div
                    className="mb-6 border border-[#526647]/30 bg-[#526647]/10 p-4 text-[#35452D]"
                    role="status"
                  >
                    {t("submissionNotice")}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <ContactField
                    name="name"
                    label={t("fullName")}
                    type="text"
                    value={formData.name}
                    onChange={(name) =>
                      setFormData((current) => ({ ...current, name }))
                    }
                    error={errors.name ? t(errors.name) : undefined}
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
                    isRequired
                  />
                  <ContactField
                    name="email"
                    label={t("emailLabel")}
                    type="email"
                    value={formData.email}
                    onChange={(email) =>
                      setFormData((current) => ({ ...current, email }))
                    }
                    error={errors.email ? t(errors.email) : undefined}
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    isRequired
                  />
                  <ContactField
                    name="phone"
                    label={t("phone")}
                    type="tel"
                    value={formData.phone}
                    onChange={(phone) =>
                      setFormData((current) => ({ ...current, phone }))
                    }
                    placeholder="+52 55 1234 5678"
                    helperText={t("phoneHelper")}
                    autoComplete="tel"
                  />
                  <ContactField
                    name="subject"
                    label={t("subject")}
                    type="text"
                    value={formData.subject}
                    onChange={(subject) =>
                      setFormData((current) => ({ ...current, subject }))
                    }
                    placeholder={t("subjectPlaceholder")}
                  />

                  <TextField
                    name="message"
                    value={formData.message}
                    onChange={(message) =>
                      setFormData((current) => ({ ...current, message }))
                    }
                    isRequired
                    isInvalid={Boolean(errors.message)}
                    className="block text-sm"
                  >
                    <Label className="font-medium">{t("message")} *</Label>
                    <TextArea
                      rows={5}
                      placeholder={t("messagePlaceholder")}
                      className="mt-2 w-full resize-y border border-[#0F0F0E]/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-[#6A655E] focus-visible:ring-2 focus-visible:ring-[#1A1A18]/20"
                    />
                    {errors.message && (
                      <FieldError className="mt-2 block text-sm text-[#A52A2A]">
                        {t(errors.message)}
                      </FieldError>
                    )}
                  </TextField>

                  <Button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#1A1A18] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#343430] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                  >
                    <Send aria-hidden="true" size={20} />
                    {t("sendMessage")}
                  </Button>

                  <p className="text-sm text-[#6A655E]">
                    {t("requiredNotice")}
                  </p>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-3xl">{t("findUs")}</h2>
                <div className="overflow-hidden border border-[#0F0F0E]/10 bg-white">
                  <div className="relative aspect-video bg-[#EEECE7]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6803823468515!2d-99.16527492503916!3d19.42667818188819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1719849200000!5m2!1ses!2smx"
                      title={t("mapTitle")}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <p className="p-6 text-[#6A655E]">
                    {t("showroomDescription")}
                  </p>
                </div>
              </div>

              <div className="border border-[#0F0F0E]/10 bg-white p-6 lg:p-8">
                <h3 className="mb-4 text-2xl">{t("otherChannel")}</h3>
                <div className="space-y-4">
                  {contactChannels.map(
                    ({ icon: Icon, title, detail, href, external }) => (
                      <a
                        key={title}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 bg-[#EEECE7] p-4 transition-colors hover:bg-[#1A1A18]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A18]"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A18]/10 transition-colors group-hover:bg-[#1A1A18]">
                          <Icon
                            aria-hidden="true"
                            size={24}
                            className="text-[#1A1A18] transition-colors group-hover:text-white"
                          />
                        </span>
                        <span>
                          <span className="block font-medium transition-colors group-hover:text-[#C07B56]">
                            {title}
                          </span>
                          <span className="block text-sm text-[#6A655E]">
                            {detail}
                          </span>
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEECE7] py-16 text-[#0F0F0E] lg:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-6">
          <h2 className="mb-12 text-center text-3xl lg:text-4xl">
            {t("faq")}
          </h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <article
                key={question}
                className="border border-[#0F0F0E]/10 bg-white p-6"
              >
                <h3 className="mb-2 text-xl">{question}</h3>
                <p className="text-[#6A655E]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ContactField = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  helperText,
  error,
  isRequired = false,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
}) => {
  return (
    <TextField
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      isInvalid={Boolean(error)}
      className="block text-sm text-[#0F0F0E]"
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
      {error && (
        <FieldError className="mt-2 block text-sm text-[#A52A2A]">
          {error}
        </FieldError>
      )}
    </TextField>
  );
};
