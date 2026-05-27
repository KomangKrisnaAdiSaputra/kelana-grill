import { Head } from '@inertiajs/react';

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

import Footer from '@/components/landing/footer';

import MobileNavbar from '@/components/landing/mobile-navbar';

import Navbar from '@/components/landing/navbar';

import AppProvider from '@/contexts/app-provider';

import { useTheme } from '@/contexts/theme-context';

import { useTranslation } from '@/helpers/global';

export default function AboutMePage() {
    return (
        <AppProvider>
            <AboutMeContent />
        </AppProvider>
    );
}

function AboutMeContent() {
    const { theme, toggleTheme } = useTheme();

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
            className={`min-h-screen overflow-hidden transition-all duration-500 ${
                theme === 'dark'
                    ? 'bg-[#090909] text-white'
                    : 'bg-[#FFF8F1] text-zinc-900'
            }`}
        >
            <Head title={__('About Us')} />

            <AmbientBackground theme={theme} />

            <Navbar
                theme={theme}
                scrolled={scrolled}
                onToggleTheme={toggleTheme}
            />

            <main className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 md:px-8 md:pt-28 lg:px-6 lg:pt-32">
                {/* HERO */}

                <section className="relative overflow-hidden rounded-[32px] md:rounded-[48px]">
                    <div
                        className={`absolute inset-0 ${
                            theme === 'dark'
                                ? 'bg-gradient-to-br from-orange-500/10 via-black to-black'
                                : 'bg-gradient-to-br from-orange-100 via-white to-orange-50'
                        }`}
                    />

                    <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="relative grid items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1fr_420px] md:px-8 md:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-16">
                        {/* LEFT */}

                        <div className="relative z-10">
                            <div
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur-xl md:text-sm ${
                                    theme === 'dark'
                                        ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                                        : 'border-orange-200 bg-white/70 text-orange-700'
                                }`}
                            >
                                <Sparkles size={16} />
                                Premium BBQ Experience
                            </div>

                            <h1 className="mt-5 text-[42px] leading-[0.95] font-black tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                                Kelana Grill
                                <span className="mt-2 block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    Bukan Sekadar Sewa Grill
                                </span>
                            </h1>

                            <p
                                className={`mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${
                                    theme === 'dark'
                                        ? 'text-zinc-400'
                                        : 'text-zinc-600'
                                }`}
                            >
                                Kelana Grill hadir untuk menghadirkan pengalaman
                                BBQ yang lebih modern, praktis, dan berkesan
                                untuk gathering santai, camping, private party,
                                hingga acara spesial bersama keluarga dan teman.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600">
                                    Booking Sekarang
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>

                                <button
                                    className={`inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                                        theme === 'dark'
                                            ? 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.07]'
                                            : 'border border-orange-100 bg-white/80 text-zinc-800 hover:bg-orange-50'
                                    }`}
                                >
                                    Lihat Paket
                                </button>
                            </div>

                            {/* STATS */}

                            <div className="mt-8 grid grid-cols-3 gap-3">
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
                                        className={`rounded-2xl p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
                                            theme === 'dark'
                                                ? 'bg-white/[0.04] ring-1 ring-white/10'
                                                : 'bg-white/80 ring-1 ring-orange-100'
                                        }`}
                                    >
                                        <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
                                            {item.value}
                                        </h3>

                                        <p
                                            className={`mt-2 text-[11px] sm:text-xs md:text-sm ${
                                                theme === 'dark'
                                                    ? 'text-zinc-400'
                                                    : 'text-zinc-500'
                                            }`}
                                        >
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}

                        <div className="relative">
                            <div
                                className={`relative overflow-hidden rounded-[28px] p-3 backdrop-blur-2xl ${
                                    theme === 'dark'
                                        ? 'bg-white/[0.04] ring-1 ring-white/10'
                                        : 'bg-white/80 ring-1 ring-orange-100'
                                }`}
                            >
                                <div className="relative overflow-hidden rounded-[24px]">
                                    <img
                                        src="https://res.cloudinary.com/dikjbuftt/image/upload/v1779890851/ChatGPT_Image_May_27_2026_10_07_12_PM_egnna8.png"
                                        alt="Kelana Grill"
                                        className="h-[260px] w-full object-cover sm:h-[320px] md:h-[520px] lg:h-[620px]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    <div className="absolute right-4 bottom-4 left-4 rounded-[22px] bg-black/40 p-4 ring-1 ring-white/10 backdrop-blur-2xl">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    Grill & Gather
                                                </h3>

                                                <p className="mt-1 text-xs text-zinc-300">
                                                    Experience Premium BBQ
                                                    Moments
                                                </p>
                                            </div>

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                                <Flame size={22} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}

                <section className="mt-24 md:mt-32">
                    <div className="mx-auto max-w-3xl text-center">
                        <div
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                                theme === 'dark'
                                    ? 'bg-orange-500/10 text-orange-200'
                                    : 'bg-orange-100 text-orange-700'
                            }`}
                        >
                            <Sparkles size={14} />
                            Kenapa Kelana Grill?
                        </div>

                        <h2 className="mt-5 text-3xl leading-tight font-bold md:text-5xl">
                            Pengalaman BBQ lebih praktis & nyaman
                        </h2>

                        <p
                            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${
                                theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-600'
                            }`}
                        >
                            Kami menghadirkan alat grill premium untuk membuat
                            momen BBQ bersama keluarga dan teman jadi lebih seru
                            tanpa repot.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden rounded-[28px] p-4 transition-all duration-500 hover:-translate-y-1 md:p-6 ${
                                        theme === 'dark'
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
                                            {item.title}
                                        </h3>

                                        <p
                                            className={`mt-3 text-xs leading-6 md:text-sm ${
                                                theme === 'dark'
                                                    ? 'text-zinc-400'
                                                    : 'text-zinc-600'
                                            }`}
                                        >
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* BBQ EXPERIENCE */}

                    <div
                        className={`mt-8 overflow-hidden rounded-[30px] md:mt-10 md:rounded-[40px] ${
                            theme === 'dark'
                                ? 'bg-gradient-to-br from-orange-500/10 via-white/[0.03] to-red-500/10 ring-1 ring-white/10'
                                : 'bg-gradient-to-br from-orange-50 via-white to-orange-100 ring-1 ring-orange-100'
                        }`}
                    >
                        <div className="grid grid-cols-[1fr_140px] lg:grid-cols-[1fr_420px]">
                            {/* LEFT */}

                            <div className="p-5 md:p-10">
                                <div
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm ${
                                        theme === 'dark'
                                            ? 'bg-orange-500/10 text-orange-200'
                                            : 'bg-orange-200/70 text-orange-700'
                                    }`}
                                >
                                    <Flame size={14} />
                                    BBQ Experience
                                </div>

                                <h3 className="mt-5 text-2xl leading-tight font-bold md:text-4xl">
                                    BBQ lebih santai tanpa ribet
                                </h3>

                                <p
                                    className={`mt-4 text-xs leading-6 md:max-w-2xl md:text-base md:leading-8 ${
                                        theme === 'dark'
                                            ? 'text-zinc-400'
                                            : 'text-zinc-600'
                                    }`}
                                >
                                    Kelana Grill fokus menyediakan alat grill
                                    premium berkualitas untuk kebutuhan BBQ
                                    pribadi dan gathering santai.
                                </p>

                                <div className="mt-6 flex flex-col gap-3 md:flex-row">
                                    <div
                                        className={`rounded-2xl px-4 py-3 backdrop-blur-xl ${
                                            theme === 'dark'
                                                ? 'bg-white/[0.05] ring-1 ring-white/10'
                                                : 'bg-white/80 ring-1 ring-orange-100'
                                        }`}
                                    >
                                        <p
                                            className={`text-[10px] tracking-[0.2em] uppercase ${
                                                theme === 'dark'
                                                    ? 'text-zinc-500'
                                                    : 'text-zinc-400'
                                            }`}
                                        >
                                            Fokus Kami
                                        </p>

                                        <h4 className="mt-2 text-sm font-semibold md:text-lg">
                                            Private BBQ
                                        </h4>
                                    </div>

                                    <div
                                        className={`rounded-2xl px-4 py-3 backdrop-blur-xl ${
                                            theme === 'dark'
                                                ? 'bg-white/[0.05] ring-1 ring-white/10'
                                                : 'bg-white/80 ring-1 ring-orange-100'
                                        }`}
                                    >
                                        <p
                                            className={`text-[10px] tracking-[0.2em] uppercase ${
                                                theme === 'dark'
                                                    ? 'text-zinc-500'
                                                    : 'text-zinc-400'
                                            }`}
                                        >
                                            Sistem Rental
                                        </p>

                                        <h4 className="mt-2 text-sm font-semibold md:text-lg">
                                            Self Pickup
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}

                            <div className="relative overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/dikjbuftt/image/upload/v1779892028/ChatGPT_Image_May_27_2026_10_26_57_PM_emlmki.png"
                                    alt="BBQ"
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEPS */}

                <section className="mt-24 md:mt-32">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold md:text-5xl">
                            Cara Rental di Kelana Grill
                        </h2>

                        <p
                            className={`mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 ${
                                theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-600'
                            }`}
                        >
                            Proses rental dibuat mudah dan cepat agar kamu bisa
                            fokus menikmati acara BBQ.
                        </p>
                    </div>

                    <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className={`min-w-[220px] snap-start rounded-[28px] p-6 text-center transition-all duration-500 hover:-translate-y-1 md:min-w-0 ${
                                    theme === 'dark'
                                        ? 'bg-white/[0.03] ring-1 ring-white/10'
                                        : 'bg-white/80 ring-1 ring-orange-100'
                                }`}
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-xl font-bold text-white">
                                    {index + 1}
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    {step}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONTACT */}

                <section className="mt-24 md:mt-32">
                    <div
                        className={`grid gap-6 overflow-hidden rounded-[32px] p-5 sm:grid-cols-[1fr_320px] md:p-10 ${
                            theme === 'dark'
                                ? 'bg-white/[0.03] ring-1 ring-white/10'
                                : 'bg-white/80 ring-1 ring-orange-100'
                        }`}
                    >
                        <div>
                            <div
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                                    theme === 'dark'
                                        ? 'bg-orange-500/10 text-orange-200'
                                        : 'bg-orange-100 text-orange-700'
                                }`}
                            >
                                <Sparkles size={14} />
                                Contact
                            </div>

                            <h2 className="mt-5 text-3xl leading-tight font-bold md:text-5xl">
                                Siap bikin acara BBQ lebih seru?
                            </h2>

                            <p
                                className={`mt-5 text-sm leading-7 md:text-base md:leading-8 ${
                                    theme === 'dark'
                                        ? 'text-zinc-400'
                                        : 'text-zinc-600'
                                }`}
                            >
                                Booking sekarang dan nikmati pengalaman grill
                                tanpa ribet bersama Kelana Grill.
                            </p>

                            <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600">
                                Booking Sekarang
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    icon: Phone,
                                    title: 'WhatsApp',
                                    value: '+62 812-3456-7890',
                                },
                                {
                                    icon: Instagram,
                                    title: 'Instagram',
                                    value: '@kelanagrill',
                                },
                                {
                                    icon: MapPin,
                                    title: 'Location',
                                    value: 'Denpasar, Bali',
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-4 rounded-[24px] p-5 transition-all duration-500 hover:-translate-y-1 ${
                                            theme === 'dark'
                                                ? 'bg-white/[0.03] ring-1 ring-white/10'
                                                : 'bg-orange-50/70 ring-1 ring-orange-100'
                                        }`}
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                            <Icon size={22} />
                                        </div>

                                        <div>
                                            <p
                                                className={`text-sm ${
                                                    theme === 'dark'
                                                        ? 'text-zinc-400'
                                                        : 'text-zinc-500'
                                                }`}
                                            >
                                                {item.title}
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold">
                                                {item.value}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
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
