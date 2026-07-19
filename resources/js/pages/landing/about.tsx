import { Head, router, usePage } from '@inertiajs/react';

import {
    ArrowRight,
    Flame,
    Instagram,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    Truck,
    UtensilsCrossed,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import AmbientBackground from '@/components/landing/ambient-background';

import Breadcrumb from '@/components/landing/Breadcrumb';
import Footer from '@/components/landing/footer';

import MobileNavbar from '@/components/landing/mobile-navbar';

import Navbar from '@/components/landing/navbar';

import AppProvider from '@/contexts/app-provider';

import { useTheme } from '@/contexts/theme-context';

import { useTranslation } from '@/helpers/global';
import { contact, produk } from '@/routes/landing';

export default function AboutMePage() {
    return (
        <AppProvider>
            <AboutMeContent />
        </AppProvider>
    );
}

function AboutMeContent() {
    const { theme, toggleTheme } = useTheme();

    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '-';
    const viteInstagram = import.meta.env.VITE_INSTAGRAM || '-';

    const locale = usePage<any>().props.params.locale;
    const breadcrumbs = usePage<any>().props.breadcrumbs;

    const { __ } = useTranslation();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: ShieldCheck,
            title: 'Peralatan Bersih',
            desc: 'Semua alat dibersihkan dan dicek sebelum digunakan.',
        },
        {
            icon: Truck,
            title: 'Praktis & Mudah',
            desc: 'Proses rental cepat dan mudah tanpa ribet.',
        },
        {
            icon: UtensilsCrossed,
            title: 'Premium BBQ',
            desc: 'Peralatan modern untuk pengalaman BBQ lebih nyaman.',
        },
        {
            icon: Flame,
            title: 'Private BBQ',
            desc: 'Cocok untuk gathering santai bersama keluarga.',
        },
    ];

    const steps = [
        'Pilih paket grill',
        'Tentukan jadwal',
        'Ambil alat grill',
        'Nikmati BBQ bersama',
    ];

    return (
        <div
            className={`min-h-screen overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'} `}
        >
            <Head title={__('About Us')} />

            <AmbientBackground theme={theme} />

            <Navbar
                theme={theme}
                scrolled={scrolled}
                onToggleTheme={toggleTheme}
            />

            <main className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:px-8 md:pt-28 lg:px-6 lg:pt-32">
                {/* HERO */}
                <section className="relative -mx-5 overflow-hidden rounded-none md:-mx-10 lg:mx-0 lg:rounded-[48px]">
                    <div
                        className={`absolute inset-0 ${theme === 'dark'
                            ? 'theme-card-dark'
                            : 'theme-card-light'
                            }`}
                    />

                    <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="relative grid items-center gap-6 px-4 py-6 sm:px-6 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-10 lg:py-16">
                        {/* LEFT */}

                        <div className="relative z-10">
                            <Breadcrumb items={breadcrumbs} className="mb-6 md:ml-2" />

                            <div
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur-xl md:text-sm ${theme === 'dark'
                                    ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                                    : 'border-orange-200 bg-white/70 text-orange-700'
                                    }`}
                            >
                                <Sparkles size={16} />
                                {__('Premium BBQ Experience')}
                            </div>

                            <h1 className="mt-5 text-[42px] leading-[0.95] font-black tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                                Kelana Grill
                                <span className="mt-2 block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    {__('Bukan Sekadar Sewa Grill')}
                                </span>
                            </h1>

                            {/* MOBILE & TABLET */}
                            <div className="mt-6 block lg:hidden">
                                <HeroImage theme={theme} />
                            </div>

                            <p
                                className={`mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-600'
                                    }`}
                            >
                                {__(
                                    'Kelana Grill hadir untuk menghadirkan pengalaman BBQ yang lebih modern, praktis, dan berkesan untuk gathering santai, camping, private party, hingga acara spesial bersama keluarga dan teman.',
                                )}
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <button
                                    onClick={() =>
                                        router.visit(contact({ locale }).url)
                                    }
                                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 sm:px-6 sm:py-4"
                                >
                                    {' '}
                                    {__('Booking Sekarang')}
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>

                                <button
                                    onClick={() =>
                                        router.visit(produk({ locale }).url)
                                    }
                                    className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 sm:px-6 sm:py-4 ${theme === 'dark'
                                        ? 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.07]'
                                        : 'border border-orange-100 bg-white/80 text-zinc-800 hover:bg-orange-50'
                                        }`}
                                >
                                    {__('Lihat Paket')}
                                </button>
                            </div>

                            {/* STATS */}

                            <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
                                {[
                                    {
                                        value: '50+',
                                        label: 'Unit Grill',
                                    },
                                    {
                                        value: '300+',
                                        label: 'BBQ Moments',
                                    },
                                    {
                                        value: '100%',
                                        label: 'Happy Customer',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className={`rounded-2xl p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-6 ${theme === 'dark'
                                            ? 'bg-white/[0.04] ring-1 ring-white/10'
                                            : 'bg-white/80 ring-1 ring-orange-100'
                                            }`}
                                    >
                                        <h3 className="text-2xl font-bold md:text-4xl">
                                            {item.value}
                                        </h3>

                                        <p
                                            className={`mt-2 text-[11px] sm:text-xs md:text-sm ${theme === 'dark'
                                                ? 'text-zinc-400'
                                                : 'text-zinc-500'
                                                }`}
                                        >
                                            {__(item.label)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT - DESKTOP */}

                        <div className="relative hidden lg:block">
                            <HeroImage theme={theme} />
                        </div>
                    </div>
                </section>

                {/* FEATURES */}

                <section className="mt-24 md:mt-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <div
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${theme === 'dark'
                                ? 'bg-orange-500/10 text-orange-200'
                                : 'bg-orange-100 text-orange-700'
                                }`}
                        >
                            <Sparkles size={14} />
                            {__('Kenapa Kelana Grill?')}
                        </div>

                        <h2 className="mt-5 text-3xl leading-tight font-bold md:text-5xl">
                            {__('Pengalaman BBQ lebih praktis & nyaman')}
                        </h2>

                        <p
                            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${theme === 'dark'
                                ? 'text-zinc-400'
                                : 'text-zinc-600'
                                }`}
                        >
                            {__(
                                'Kami menghadirkan alat grill premium untuk membuat momen BBQ bersama keluarga dan teman jadi lebih seru tanpa repot.',
                            )}
                        </p>
                    </div>

                    <div className="mt-10 mb-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-[28px] p-4 transition-all duration-500 hover:-translate-y-1 md:p-6 ${theme === 'dark'
                                        ? 'bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.06]'
                                        : 'bg-white/90 ring-1 ring-orange-100 hover:bg-white'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />

                                    <div className="relative z-10">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20">
                                            <Icon size={22} />
                                        </div>

                                        <h3 className="mt-5 text-base font-semibold md:text-xl">
                                            {__(item.title)}
                                        </h3>

                                        <p
                                            className={`mt-3 text-xs leading-6 md:text-sm ${theme === 'dark'
                                                ? 'text-zinc-400'
                                                : 'text-zinc-600'
                                                }`}
                                        >
                                            {__(item.desc)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* BBQ EXPERIENCE */}
                <section className="relative -mx-5 overflow-hidden rounded-none md:-mx-10 lg:mx-0 lg:rounded-[48px]">
                    <div
                        className={`mt-8 overflow-hidden rounded-none md:mt-10 lg:rounded-[42px] ${theme === 'dark'
                            ? 'bg-gradient-to-br from-orange-500/10 via-white/[0.03] to-red-500/10 ring-1 ring-white/10'
                            : 'bg-gradient-to-br from-orange-50 via-white to-orange-100 ring-1 ring-orange-100'
                            }`}
                    >
                        <div className="relative">
                            {/* SOFT GLOW */}

                            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

                            {/* TOP CONTENT */}

                            <div className="relative z-10 overflow-hidden rounded-[36px]">
                                <div className="grid min-h-[520px] lg:grid-cols-[1.05fr_1fr]">
                                    {/* LEFT */}

                                    <div className="flex flex-col justify-center p-5 md:p-8 lg:p-14">
                                        <div
                                            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm ${theme === 'dark'
                                                ? 'bg-orange-500/10 text-orange-200'
                                                : 'bg-orange-200/70 text-orange-700'
                                                }`}
                                        >
                                            <Flame size={14} />
                                            {__('BBQ Experience')}
                                        </div>

                                        <h3 className="mt-6 max-w-xl text-3xl leading-[1.05] font-black tracking-[-0.03em] md:text-5xl">
                                            {__('BBQ lebih santai tanpa ribet')}
                                        </h3>

                                        <p
                                            className={`mt-6 max-w-2xl text-sm leading-8 md:text-base ${theme === 'dark'
                                                ? 'text-zinc-400'
                                                : 'text-zinc-600'
                                                }`}
                                        >
                                            {__(
                                                'Kelana Grill fokus menyediakan alat grill premium berkualitas untuk kebutuhan BBQ pribadi, gathering santai, camping, dan acara spesial bersama keluarga maupun teman.',
                                            )}
                                        </p>

                                        {/* TAGS */}

                                        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                                            {[
                                                'Premium Grill',
                                                'Private BBQ',
                                                'Easy Rental',
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className={`rounded-full px-4 py-2 text-xs md:text-sm ${theme === 'dark'
                                                        ? 'bg-white/[0.05] text-zinc-200 ring-1 ring-white/10'
                                                        : 'bg-white/80 text-zinc-700 ring-1 ring-orange-100'
                                                        }`}
                                                >
                                                    {__(item)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* IMAGE */}

                                    <div className="relative h-full min-h-[320px]">
                                        <img
                                            src="https://res.cloudinary.com/dikjbuftt/image/upload/v1779892028/ChatGPT_Image_May_27_2026_10_26_57_PM_emlmki.png"
                                            alt="BBQ"
                                            className="absolute inset-0 h-full w-full scale-100 object-cover object-[50%_28%] transition-transform duration-700 hover:scale-[1.15] sm:scale-105 sm:object-[50%_30%] md:scale-99 md:object-[50%_18%] lg:scale-110 lg:object-[50%_30%]"
                                        />

                                        {/* OVERLAY */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/10 lg:to-black/40" />

                                        {/* FLOATING LABEL */}

                                        <div className="absolute right-5 bottom-5">
                                            <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl">
                                                <p className="text-[10px] tracking-[0.18em] text-orange-200 uppercase">
                                                    {appName}
                                                </p>

                                                <h4 className="mt-1 text-sm font-semibold text-white md:text-base">
                                                    {__('Premium BBQ Setup')}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM INFO */}

                            <div
                                className={`grid grid-cols-2 gap-3 border-t p-5 md:p-8 lg:grid-cols-2 lg:px-10 ${theme === 'dark'
                                    ? 'border-white/10'
                                    : 'border-orange-100'
                                    }`}
                            >
                                {[
                                    {
                                        label: 'Fokus Kami',
                                        value: 'Private BBQ',
                                    },
                                    {
                                        label: 'Sistem Rental',
                                        value: 'Penjemputan Mandiri',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className={`rounded-[24px] p-4 transition-all duration-300 ${theme === 'dark'
                                            ? 'bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.06]'
                                            : 'bg-white/70 ring-1 ring-orange-100 hover:bg-white'
                                            }`}
                                    >
                                        <p
                                            className={`text-[10px] tracking-[0.2em] uppercase ${theme === 'dark'
                                                ? 'text-zinc-500'
                                                : 'text-zinc-400'
                                                }`}
                                        >
                                            {__(item.label)}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between">
                                            <h4 className="text-sm font-semibold md:text-lg">
                                                {__(item.value)}
                                            </h4>

                                            <div
                                                className={`h-2 w-2 rounded-full ${theme === 'dark'
                                                    ? 'bg-orange-400'
                                                    : 'bg-orange-500'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEPS */}

                <section className="mt-24 md:mt-32">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold md:text-5xl">
                            {__('Cara Rental di')} {appName}
                        </h2>

                        <p
                            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${theme === 'dark'
                                ? 'text-zinc-400'
                                : 'text-zinc-600'
                                }`}
                        >
                            {__(
                                'Proses rental dibuat mudah dan cepat agar kamu bisa fokus menikmati acara BBQ.',
                            )}
                        </p>
                    </div>

                    <div className="mt-20">
                        {/* Desktop & Tablet */}
                        <div className="relative hidden md:block">
                            {/* Main Line */}
                            <div className="absolute top-7 left-[10%] h-px w-[80%] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                            <div className="grid grid-cols-4 gap-6 lg:gap-10">
                                {steps.map((step, index) => (
                                    <div
                                        key={step}
                                        className="group relative flex flex-col items-center text-center"
                                    >
                                        {/* Circle */}
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/20 bg-background transition-all duration-500 group-hover:-translate-y-1 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                                            <span className="text-base font-bold text-orange-500 transition-transform duration-300 group-hover:scale-110">
                                                {index + 1}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 max-w-[170px] text-sm leading-relaxed font-medium transition-colors duration-300 group-hover:text-orange-500 lg:text-base">
                                            {__(step)}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className="relative md:hidden">
                            <div className="absolute top-0 left-7 h-full w-px bg-orange-500/20" />

                            <div className="space-y-10">
                                {steps.map((step, index) => (
                                    <div
                                        key={step}
                                        className="group relative flex items-center gap-5"
                                    >
                                        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-orange-500/20 bg-background transition-all duration-300 group-hover:border-orange-500">
                                            <span className="font-bold text-orange-500">
                                                {index + 1}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-medium transition-colors duration-300 group-hover:text-orange-500">
                                            {__(step)}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}

                <section className="relative -mx-5 mt-24 overflow-hidden rounded-none md:-mx-10 md:mt-32 lg:mx-0 lg:rounded-[48px]">
                    <div
                        className={`overflow-hidden rounded-none lg:rounded-[32px] ${theme === 'dark'
                            ? 'bg-white/[0.03] ring-1 ring-white/10'
                            : 'bg-white/80 ring-1 ring-orange-100'
                            }`}
                    >
                        <div className="grid gap-8 p-5 sm:p-7 md:gap-10 md:p-10 lg:grid-cols-[1.05fr_380px]">
                            {/* LEFT */}

                            <div className="flex flex-col justify-center text-center lg:text-left">
                                <div
                                    className={`inline-flex w-fit items-center gap-2 self-center rounded-full px-4 py-2 text-xs md:text-sm lg:self-start ${theme === 'dark'
                                        ? 'bg-orange-500/10 text-orange-200'
                                        : 'bg-orange-100 text-orange-700'
                                        }`}
                                >
                                    <Sparkles size={14} />
                                    {__('Kontak')}
                                </div>

                                <h2 className="mt-5 text-3xl leading-[1.05] font-black tracking-[-0.03em] md:text-5xl">
                                    {__('Siap bikin acara BBQ lebih seru?')}
                                </h2>

                                <p
                                    className={`mx-auto mt-5 max-w-xl text-sm leading-7 md:text-base md:leading-8 lg:mx-0 ${theme === 'dark'
                                        ? 'text-zinc-400'
                                        : 'text-zinc-600'
                                        }`}
                                >
                                    {__(
                                        'Booking sekarang dan nikmati pengalaman grill tanpa ribet bersama',
                                    )}{' '}
                                    {appName}.
                                </p>

                                <button className="mt-8 inline-flex items-center justify-center gap-2 self-center rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 lg:self-start">
                                    {__('Booking Sekarang')}
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* RIGHT */}

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1">
                                {[
                                    {
                                        icon: Phone,
                                        title: 'WhatsApp',
                                        value: whatsappNumber,
                                    },
                                    {
                                        icon: Instagram,
                                        title: 'Instagram',
                                        value: viteInstagram,
                                    },
                                    {
                                        icon: MapPin,
                                        title: 'Location',
                                        value: 'Batubulan, Bali & Denpasar, Bali',
                                    },
                                ].map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className={`group flex items-center gap-4 rounded-[28px] p-4 transition-all duration-500 hover:-translate-y-1 md:p-5 ${theme === 'dark'
                                                ? 'bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.05] hover:ring-orange-500/20'
                                                : 'bg-orange-50/70 ring-1 ring-orange-100 hover:bg-orange-50 hover:ring-orange-200'
                                                }`}
                                        >
                                            {/* Icon */}
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/20 md:h-14 md:w-14">
                                                <Icon size={20} />
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                <p
                                                    className={`text-[11px] tracking-[0.18em] uppercase ${theme === 'dark'
                                                        ? 'text-orange-400'
                                                        : 'text-orange-600'
                                                        } `}
                                                >
                                                    {item.title}
                                                </p>

                                                <h3
                                                    className={`mt-1 leading-snug font-semibold ${item.title ===
                                                        'Location'
                                                        ? 'text-sm md:text-[15px]'
                                                        : 'text-sm md:text-base'
                                                        } `}
                                                >
                                                    {item.value}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <MobileNavbar theme={theme} />

            <div className="h-24 xl:hidden" />

            <Footer theme={theme} />
        </div>
    );
}

function HeroImage({ theme }: { theme: string }) {
    const { __ } = useTranslation();

    return (
        <div className="relative mx-auto w-full max-w-[760px]">
            {/* SOFT GLOW */}

            <div className="absolute top-14 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl md:h-56 md:w-56" />

            {/* CONTAINER */}

            <div
                className={`group relative overflow-hidden rounded-[32px] p-[6px] transition-all duration-500 md:rounded-[40px] ${theme === 'dark'
                    ? 'bg-white/[0.03] ring-1 ring-white/8'
                    : 'bg-gradient-to-br from-white via-orange-50 to-white ring-1 ring-orange-100/80'
                    }`}
            >
                <div className="relative overflow-hidden rounded-[28px] md:rounded-[34px]">
                    {/* IMAGE */}

                    <img
                        src="https://res.cloudinary.com/dikjbuftt/image/upload/v1779890851/ChatGPT_Image_May_27_2026_10_07_12_PM_egnna8.png"
                        alt="Kelana Grill"
                        className="h-[340px] w-full object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-[1.02] sm:h-[460px] sm:object-[50%_15%] md:h-[560px] md:object-[50%_13%] lg:h-[620px] lg:object-top"
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* TOP FADE */}

                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent sm:h-40" />

                    {/* FLOATING CARD */}

                    <div className="absolute inset-x-0 bottom-0">
                        <div className="flex items-center justify-between bg-gradient-to-t from-black/80 to-black/20 px-5 py-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {__('Grill & Gather')}
                                </h3>

                                <p className="text-xs text-zinc-300">
                                    {__('Premium BBQ Experience')}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                <Flame size={18} />
                            </div>
                        </div>
                    </div>

                    {/* SUBTLE BORDER */}

                    <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10 ring-inset" />
                </div>
            </div>
        </div>
    );
}
