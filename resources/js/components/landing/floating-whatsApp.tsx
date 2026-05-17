import { useMemo, useRef, useState } from "react";

import { useLanguage } from "@/contexts/language-context";

type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
};

type ChatMessage = {
  id: string | null;
  from: "customer" | "admin" | "system";
  message: string;
  created_at?: string;
};

type LanguageKey = "id" | "en";

/**
 * Ubah ke true untuk melihat tampilan jika percakapan sudah ada.
 * Ubah ke false untuk melihat alur customer baru.
 * Nanti saat connect backend, ini diganti dari response API / localStorage session.
 */
const MOCK_HAS_EXISTING_CONVERSATION = false;

const mockExistingCustomer: CustomerInfo = {
  name: "Made",
  phone: "081234567890",
  email: "made@email.com",
};

/**
 * Mock percakapan.
 * Ini tidak ikut translate karena nanti data asli berasal dari customer/admin.
 */
const mockExistingMessages: ChatMessage[] = [
  {
    id: null,
    from: "system",
    message: "Halo 👋 Selamat datang di Kelana Grill.",
    created_at: "09.10",
  },
  {
    id: null,
    from: "admin",
    message: "Halo kak Made, ada yang bisa kami bantu untuk kebutuhan BBQ-nya?",
    created_at: "09.11",
  },
  {
    id: null,
    from: "customer",
    message: "Halo, saya mau tanya paket BBQ untuk 10 orang.",
    created_at: "09.12",
  },
  {
    id: null,
    from: "admin",
    message:
      "Bisa kak. Untuk 10 orang, kami bisa rekomendasikan paket BBQ dengan kompor agar lebih praktis saat acara.",
    created_at: "09.13",
  },
  {
    id: null,
    from: "customer",
    message: "Apakah sudah termasuk gas?",
    created_at: "09.14",
  },
  {
    id: null,
    from: "admin",
    message:
      "Ya kak, untuk paket dengan kompor sudah termasuk gas. Nanti detail isi paket juga bisa kami bantu jelaskan.",
    created_at: "09.15",
  },
];

const chatTranslations = {
  id: {
    floatingSmall: "Butuh bantuan?",
    floatingTitle: "Chat Admin",
    brandName: "Kelana Grill",
    headerStarted: "Chat dengan admin",
    headerNotStarted: "Isi data sebelum mulai chat",

    startTitle: "Mulai Chat",
    startDescription:
      "Isi data kamu terlebih dahulu agar admin bisa membalas dan menghubungi kembali jika diperlukan.",
    nameLabel: "Nama",
    namePlaceholder: "Contoh: Made",
    phoneLabel: "No. Telp / WhatsApp",
    phonePlaceholder: "Contoh: 081234567890",
    emailLabel: "Email",
    emailPlaceholder: "Contoh: nama@email.com",
    startButton: "Mulai Chat",

    nameError: "Nama minimal 2 karakter.",
    phoneError: "Nomor telp minimal 8 digit.",
    emailError: "Format email belum valid.",

    chatStartedAs: "Chat dimulai sebagai",
    adminReplyInfo: "Admin akan membalas melalui dashboard.",
    inputPlaceholder: "Tulis pesan...",
    resetTitle: "Reset chat",
    closeLabel: "Tutup chat",
    sendLabel: "Kirim pesan",

    welcomeMessage: "Halo 👋 Selamat datang di Kelana Grill.",
    adminIntroMessage:
      "Silakan tulis pertanyaan kamu. Admin kami akan membalas melalui chat ini.",
    dataReceived: "data kamu sudah kami terima.",

    quickMessages: [
      "Untuk paket kompor isi apa saja?",
      "Apakah sudah termasuk gas?",
      "Apakah bisa hanya membeli daging saja?",
      "Lokasinya dimana ya?",
      "Apakah harus DP?",
    ],
  },
  en: {
    floatingSmall: "Need help?",
    floatingTitle: "Chat Admin",
    brandName: "Kelana Grill",
    headerStarted: "Chat with admin",
    headerNotStarted: "Fill in your details to start chatting",

    startTitle: "Start Chat",
    startDescription:
      "Please fill in your details first so our admin can reply and contact you back if needed.",
    nameLabel: "Name",
    namePlaceholder: "Example: Made",
    phoneLabel: "Phone / WhatsApp Number",
    phonePlaceholder: "Example: 081234567890",
    emailLabel: "Email",
    emailPlaceholder: "Example: name@email.com",
    startButton: "Start Chat",

    nameError: "Name must be at least 2 characters.",
    phoneError: "Phone number must be at least 8 digits.",
    emailError: "Email format is not valid.",

    chatStartedAs: "Chat started as",
    adminReplyInfo: "Admin will reply through the dashboard.",
    inputPlaceholder: "Type a message...",
    resetTitle: "Reset chat",
    closeLabel: "Close chat",
    sendLabel: "Send message",

    welcomeMessage: "Hello 👋 Welcome to Kelana Grill.",
    adminIntroMessage:
      "Please type your question. Our admin will reply through this chat.",
    dataReceived: "your details have been received.",

    quickMessages: [
      "What is included in the package with a stove?",
      "Is gas included?",
      "Can I buy only the meat?",
      "Where are you located?",
      "Is a down payment required?",
    ],
  },
};

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M16.04 3C9.42 3 4.04 8.38 4.04 15c0 2.12.56 4.18 1.62 6L4 29l8.2-1.6A11.9 11.9 0 0 0 16.04 27c6.62 0 12-5.38 12-12S22.66 3 16.04 3Zm0 21.82c-1.86 0-3.68-.52-5.26-1.5l-.38-.24-4.86.94.98-4.74-.26-.4A9.78 9.78 0 1 1 16.04 24.82Zm5.36-7.34c-.3-.16-1.76-.86-2.04-.96-.28-.1-.48-.16-.68.16-.2.3-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.16-1.28-.46-2.44-1.46-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.14-.62.14-.14.3-.36.46-.54.16-.18.2-.3.3-.5.1-.2.06-.38-.02-.54-.08-.16-.68-1.64-.94-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.52.08-.8.38-.28.3-1.04 1.02-1.04 2.48s1.06 2.88 1.22 3.08c.16.2 2.08 3.18 5.04 4.46.7.3 1.24.48 1.66.62.7.22 1.34.18 1.84.12.56-.08 1.76-.72 2-1.42.24-.7.24-1.3.18-1.42-.08-.12-.28-.2-.58-.36Z"
      />
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M3.4 20.4 21 12 3.4 3.6 3 10l10 2-10 2 .4 6.4Z"
      />
    </svg>
  );
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function FloatingWhatsApp() {
  const { language } = useLanguage();

  const currentLanguage: LanguageKey = language === "en" ? "en" : "id";
  const text = chatTranslations[currentLanguage];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [hasStarted, setHasStarted] = useState(
    MOCK_HAS_EXISTING_CONVERSATION,
  );

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(
    MOCK_HAS_EXISTING_CONVERSATION
      ? mockExistingCustomer
      : {
        name: "",
        phone: "",
        email: "",
      },
  );

  const [formErrors, setFormErrors] = useState<Partial<CustomerInfo>>({});
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>(
    MOCK_HAS_EXISTING_CONVERSATION ? mockExistingMessages : [],
  );

  const isCustomerInfoValid = useMemo(() => {
    return (
      customerInfo.name.trim().length >= 2 &&
      customerInfo.phone.trim().length >= 8 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())
    );
  }, [customerInfo]);

  const scrollToBottom = () => {
    window.requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const createStartMessages = (customerName: string): ChatMessage[] => {
    const now = getCurrentTime();

    return [
      {
        id: null,
        from: "system",
        message: text.welcomeMessage,
        created_at: now,
      },
      {
        id: null,
        from: "admin",
        message: text.adminIntroMessage,
        created_at: now,
      },
      {
        id: null,
        from: "system",
        message: `${customerName}, ${text.dataReceived}`,
        created_at: now,
      },
    ];
  };

  const validateCustomerInfo = () => {
    const errors: Partial<CustomerInfo> = {};

    if (customerInfo.name.trim().length < 2) {
      errors.name = text.nameError;
    }

    if (customerInfo.phone.trim().length < 8) {
      errors.phone = text.phoneError;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())) {
      errors.email = text.emailError;
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const startChat = () => {
    if (!validateCustomerInfo()) {
      return;
    }

    setHasStarted(true);
    setMessages(createStartMessages(customerInfo.name.trim()));
    scrollToBottom();
  };

  const sendMessage = (messageText: string) => {
    const cleanText = messageText.trim();

    if (!cleanText) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: null,
        from: "customer",
        message: cleanText,
        created_at: getCurrentTime(),
      },
    ]);

    setMessage("");
    scrollToBottom();
  };

  const resetChat = () => {
    setHasStarted(false);
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
    });
    setFormErrors({});
    setMessage("");
    setMessages([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]
            sm:bg-transparent sm:backdrop-blur-none
          "
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="
              fixed bottom-0 left-0 right-0 flex max-h-[88dvh] flex-col overflow-hidden
              rounded-t-[30px] bg-white shadow-2xl
              sm:bottom-24 sm:left-auto sm:right-4 sm:h-[600px] sm:w-[390px] sm:rounded-[30px]
              xl:bottom-24 xl:right-6
            "
          >
            <div className="bg-green-500 px-5 py-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <WhatsAppIcon className="h-7 w-7 text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold leading-tight">
                      {text.brandName}
                    </p>
                    <p className="truncate text-xs text-white/80">
                      {hasStarted ? text.headerStarted : text.headerNotStarted}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl transition hover:bg-white/25"
                  aria-label={text.closeLabel}
                >
                  ×
                </button>
              </div>
            </div>

            {!hasStarted ? (
              <div className="min-h-0 flex-1 overflow-y-auto bg-[#efe7dd] p-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="mb-5">
                    <p className="text-lg font-semibold text-zinc-950">
                      {text.startTitle}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                      {text.startDescription}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-700">
                        {text.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(event) =>
                          setCustomerInfo((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        placeholder={text.namePlaceholder}
                        className="
                          w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700
                          outline-none transition placeholder:text-zinc-400
                          focus:border-green-400 focus:ring-4 focus:ring-green-500/10
                        "
                      />
                      {formErrors.name && (
                        <p className="mt-1.5 text-xs text-red-500">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-700">
                        {text.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(event) =>
                          setCustomerInfo((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                        placeholder={text.phonePlaceholder}
                        className="
                          w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700
                          outline-none transition placeholder:text-zinc-400
                          focus:border-green-400 focus:ring-4 focus:ring-green-500/10
                        "
                      />
                      {formErrors.phone && (
                        <p className="mt-1.5 text-xs text-red-500">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-700">
                        {text.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(event) =>
                          setCustomerInfo((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        placeholder={text.emailPlaceholder}
                        className="
                          w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700
                          outline-none transition placeholder:text-zinc-400
                          focus:border-green-400 focus:ring-4 focus:ring-green-500/10
                        "
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-xs text-red-500">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={startChat}
                      disabled={!isCustomerInfoValid}
                      className="
                        mt-2 flex w-full items-center justify-center gap-2 rounded-2xl
                        bg-green-500 px-4 py-3 text-sm font-semibold text-white
                        transition hover:bg-green-600
                        disabled:cursor-not-allowed disabled:opacity-50
                      "
                    >
                      {text.startButton}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto bg-[#efe7dd] p-4">
                  <div className="mb-4 rounded-2xl bg-white/80 px-4 py-3 text-xs leading-5 text-zinc-500 shadow-sm">
                    {text.chatStartedAs}{" "}
                    <span className="font-semibold text-zinc-700">
                      {customerInfo.name || "-"}
                    </span>
                    . {text.adminReplyInfo}
                  </div>

                  <div className="space-y-3">
                    {messages.map((chat) => {
                      const isCustomer = chat.from === "customer";
                      const isSystem = chat.from === "system";

                      return (
                        <div
                          key={chat.id}
                          className={`flex ${isCustomer ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`
                              max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm
                              ${isCustomer
                                ? "rounded-tr-sm bg-[#dcf8c6] text-zinc-800"
                                : isSystem
                                  ? "mx-auto max-w-[90%] bg-white/80 text-center text-zinc-500"
                                  : "rounded-tl-sm bg-white text-zinc-700"
                              }
                            `}
                          >
                            <p>{chat.message}</p>

                            {chat.created_at && (
                              <p
                                className={`mt-1 text-[10px] text-zinc-400 ${isSystem ? "text-center" : "text-right"
                                  }`}
                              >
                                {chat.created_at}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div ref={bottomRef} />
                  </div>

                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {text.quickMessages.map((quickMessage) => (
                      <button
                        key={quickMessage}
                        type="button"
                        onClick={() => sendMessage(quickMessage)}
                        className="
                          shrink-0 rounded-full border border-green-200 bg-white px-4 py-2
                          text-xs font-medium text-zinc-700 shadow-sm transition hover:border-green-400 hover:bg-green-50
                        "
                      >
                        {quickMessage}
                      </button>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage(message);
                  }}
                  className="flex items-end gap-2 border-t border-zinc-100 bg-white p-3"
                >
                  <button
                    type="button"
                    onClick={resetChat}
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                      bg-zinc-100 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-200
                    "
                    aria-label={text.resetTitle}
                    title={text.resetTitle}
                  >
                    ↺
                  </button>

                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={1}
                    placeholder={text.inputPlaceholder}
                    className="
                      max-h-24 min-h-11 flex-1 resize-none rounded-2xl border border-zinc-200
                      px-4 py-3 text-sm text-zinc-700 outline-none transition
                      placeholder:text-zinc-400 focus:border-green-400 focus:ring-4 focus:ring-green-500/10
                    "
                  />

                  <button
                    type="submit"
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                      bg-green-500 text-white transition hover:bg-green-600
                      disabled:cursor-not-allowed disabled:opacity-50
                    "
                    disabled={!message.trim()}
                    aria-label={text.sendLabel}
                  >
                    <SendIcon className="h-5 w-5 text-white" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={text.floatingTitle}
        className="
          fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full
          bg-green-500 text-white shadow-2xl shadow-green-500/30
          transition-all duration-300 hover:scale-105 hover:bg-green-600
          xl:bottom-6 xl:right-6 xl:h-auto xl:w-auto xl:gap-3 xl:px-5 xl:py-4
        "
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0 text-white" />

        <div className="hidden text-left xl:block">
          <p className="text-xs opacity-80">{text.floatingSmall}</p>
          <p className="text-sm font-semibold">{text.floatingTitle}</p>
        </div>
      </button>
    </>
  );
}