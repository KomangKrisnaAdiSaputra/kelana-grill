import { Head, useForm, usePage } from '@inertiajs/react';

import {
    ChevronDown,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    Shield,
    SlidersHorizontal,
    User,
} from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

import { toast } from 'sonner';
import DateTimePicker from '@/components/datetime-picker';
import AmbientBackground from '@/components/landing/ambient-background';

import Breadcrumb from '@/components/landing/Breadcrumb';
import Footer from '@/components/landing/footer';

import MobileNavbar from '@/components/landing/mobile-navbar';

import Navbar from '@/components/landing/navbar';

import AppProvider from '@/contexts/app-provider';
import type { CartItem } from '@/contexts/cart-context';
import { useCart } from '@/contexts/cart-context';

import { useTheme } from '@/contexts/theme-context';

import { formatPrice, useTranslation } from '@/helpers/global';
import { produk } from '@/routes/landing';
import { booking } from '@/routes/landing/contact';

export default function ContactPage() {
    return (
        <AppProvider>
            <ContactContent />
        </AppProvider>
    );
}

type PageProps = {
    params: any;
};

function ContactContent() {
    const cartName = 'kelana-grill-cart';
    const props = usePage<PageProps>().props;
    const locale = props.params.locale;
    const breadcrumbs = usePage<any>().props.breadcrumbs;

    const { theme, toggleTheme } = useTheme();
    const { cartItems } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const { __ } = useTranslation();

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '-';
    const email = import.meta.env.VITE_EMAIL || '-';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        pickupdate: '',
        returndate: '',
        pickuplocation: '',
        guarantee: '',
        payment: 'Cash',
        note: '',
        carts: [] as CartItem[],
    });

    useEffect(() => {
        setData('carts', cartItems ?? []);
    }, [setData, cartItems]);

    useEffect(() => {
        if (data.pickupdate && data.returndate) {
            const pickup = new Date(data.pickupdate);
            const returnDate = new Date(data.returndate);

            if (returnDate < pickup) {
                setData('returndate', '');
            }

            if (pickup > returnDate) {
                setData('pickupdate', '');
            }
        }
    }, [data.pickupdate, data.returndate, setData]);

    const submit = (e: any) => {
        e.preventDefault();

        post(booking({ locale }).url, {
            preserveScroll: true,

            only: ['booking'],

            onSuccess: (page: any) => {
                const bookingData = page.props.booking;

                if (bookingData?.success) {
                    localStorage.removeItem(cartName);

                    window.location.href = bookingData.data.url;
                }
            },

            onError: () => {
                toast.error('Mohon periksa kembali form booking');
            },
        });
    };

    const minPickupDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);

        return String(date.toISOString().split('T')[0]);
    };

    const totalCart = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.qty * (item.rate ?? 0),
            0,
        );
    }, [cartItems]);

    return (
        <div
            className={`min-h-screen overflow-hidden transition-all duration-500 ${theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'} `}
        >
            <Head title="Kontak" />

            <AmbientBackground theme={theme} />

            <Navbar
                theme={theme}
                scrolled={scrolled}
                onToggleTheme={toggleTheme}
            />

            <main className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 md:px-6 md:pt-36">
                {/* HERO */}

                <section className="max-w-3xl">
                    <Breadcrumb items={breadcrumbs} className="mb-6 md:ml-2" />

                    <div
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl ${theme === 'dark'
                            ? 'border-orange-400/20 bg-orange-500/10 text-orange-200'
                            : 'border-orange-200 bg-white/70 text-orange-700'
                            } `}
                    >
                        <SlidersHorizontal size={16} />
                        {__('Kontak Kami')}
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                        {__('Booking Alat Grill Jadi Lebih Mudah')}
                    </h1>

                    <p
                        className={`mt-5 max-w-2xl leading-7 md:text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                            } `}
                    >
                        {__(
                            'Isi form booking berikut dan tim kami akan langsung menghubungi anda melalui WhatsApp untuk proses konfirmasi pesanan.',
                        )}
                    </p>
                </section>

                {/* CONTENT */}

                <section className="mt-12 grid items-start gap-8 lg:grid-cols-[420px_1fr]">
                    {/* LEFT */}

                    <div className="order-2 space-y-6 lg:order-1">
                        <div
                            className={`overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl ${theme === 'dark'
                                ? 'theme-card-dark'
                                : 'theme-card-light'
                                } `}
                        >
                            <div className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white">
                                {__('Booking Cepat')}
                            </div>

                            <h2 className="mt-5 text-3xl leading-tight font-semibold">
                                {__('Sewa alat grill untuk acara apapun')}
                            </h2>

                            <p
                                className={`mt-4 leading-7 ${theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-600'
                                    } `}
                            >
                                {__(
                                    'Cocok untuk gathering, camping, barbecue, acara keluarga.',
                                )}
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    'Respon Cepat via WhatsApp',
                                    'Alat bersih & siap pakai',
                                    'Booking harian',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />

                                        <p
                                            className={
                                                theme === 'dark'
                                                    ? 'text-zinc-300'
                                                    : 'text-zinc-700'
                                            }
                                        >
                                            {__(item)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CONTACT */}

                        <div
                            className={`overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl ${theme === 'dark'
                                ? 'theme-card-dark'
                                : 'theme-card-light'
                                } `}
                        >
                            <h3 className="text-2xl font-semibold">
                                {__('Informasi Kontak')}
                            </h3>

                            <div className="mt-7 space-y-5">
                                <a
                                    href="tel:+628123456789"
                                    className={`flex items-center gap-4 rounded-3xl p-4 transition-all ${theme === 'dark'
                                        ? 'bg-white/[0.04] hover:bg-white/[0.06]'
                                        : 'bg-orange-50/70 hover:bg-orange-100/70'
                                        } `}
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                        <Phone size={22} />
                                    </div>

                                    <div>
                                        <p
                                            className={
                                                theme === 'dark'
                                                    ? 'text-sm text-zinc-200'
                                                    : 'text-sm text-zinc-500'
                                            }
                                        >
                                            {__('Telepon')}
                                        </p>

                                        <h4 className="font-semibold">
                                            {whatsappNumber}
                                        </h4>
                                    </div>
                                </a>

                                <a
                                    href="mailto:hello@kelanagrill.com"
                                    className={`flex items-center gap-4 rounded-3xl p-4 transition-all ${theme === 'dark'
                                        ? 'bg-white/[0.04] hover:bg-white/[0.06]'
                                        : 'bg-orange-50/70 hover:bg-orange-100/70'
                                        } `}
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                        <Mail size={22} />
                                    </div>

                                    <div>
                                        <p
                                            className={
                                                theme === 'dark'
                                                    ? 'text-sm text-zinc-200'
                                                    : 'text-sm text-zinc-500'
                                            }
                                        >
                                            Email
                                        </p>

                                        <h4 className="font-semibold">
                                            {email}
                                        </h4>
                                    </div>
                                </a>

                                <div
                                    className={`flex items-center gap-4 rounded-3xl p-4 ${theme === 'dark'
                                        ? 'bg-white/[0.04] hover:bg-white/[0.06]'
                                        : 'bg-orange-50/70 hover:bg-orange-100/70'
                                        }`}
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                        <MapPin size={22} />
                                    </div>

                                    <div>
                                        <p
                                            className={
                                                theme === 'dark'
                                                    ? 'text-sm text-zinc-200'
                                                    : 'text-sm text-zinc-500'
                                            }
                                        >
                                            {__('Lokasi')}
                                        </p>

                                        <h4 className="font-semibold">
                                            Denpasar, Bali
                                        </h4>
                                        <h4 className="font-semibold">
                                            Batubulan, Bali
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CART */}

                        <div
                            className={`overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl ${theme === 'dark'
                                ? 'theme-card-dark'
                                : 'theme-card-light'
                                } `}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-semibold">
                                    {__('Keranjang')}
                                </h3>

                                <div className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                                    {data.carts.length} Item
                                </div>
                            </div>

                            <div className="mt-6">
                                {data.carts.length > 0 ? (
                                    <>
                                        <div className="max-h-[500px] space-y-3 overflow-y-auto scrollbar-hide">
                                            {data.carts.map((item: any, index) => {
                                                const packageCount =
                                                    item.packageInstances?.length ?? 0;

                                                const totalMarinades =
                                                    item.packageInstances?.reduce(
                                                        (total: number, pkg: any) =>
                                                            total +
                                                            (pkg.items ?? []).reduce(
                                                                (subTotal: number, subItem: any) =>
                                                                    subTotal +
                                                                    (subItem.marinadeItems?.length ?? 0),
                                                                0,
                                                            ),
                                                        0,
                                                    ) ?? 0;

                                                const totalChoices =
                                                    item.packageInstances?.reduce(
                                                        (total: number, pkg: any) =>
                                                            total +
                                                            (pkg.items ?? []).reduce(
                                                                (subTotal: number, subItem: any) =>
                                                                    subTotal +
                                                                    (subItem.choiceItems?.length ?? 0),
                                                                0,
                                                            ),
                                                        0,
                                                    ) ?? 0;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`rounded-2xl border p-4 ${theme === 'dark'
                                                            ? 'border-white/10 bg-white/[0.04]'
                                                            : 'border-orange-100 bg-orange-50/50'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="min-w-0 flex-1">
                                                                <h4 className="font-semibold">
                                                                    {item.name}
                                                                </h4>

                                                                {item.variant?.name && (
                                                                    <p className="mt-1 text-xs text-orange-500">
                                                                        {item.variant.name}
                                                                    </p>
                                                                )}

                                                                <div
                                                                    className={`mt-2 flex flex-wrap gap-2 text-xs ${theme === 'dark'
                                                                        ? 'text-zinc-400'
                                                                        : 'text-zinc-500'
                                                                        }`}
                                                                >
                                                                    <span className="rounded-full bg-orange-500/10 px-2 py-1">
                                                                        Qty {item.qty}
                                                                    </span>

                                                                    {packageCount > 0 && (
                                                                        <span className="rounded-full bg-blue-500/10 px-2 py-1">
                                                                            {packageCount} Paket
                                                                        </span>
                                                                    )}

                                                                    {totalMarinades > 0 && (
                                                                        <span className="rounded-full bg-green-500/10 px-2 py-1">
                                                                            {totalMarinades} Marinasi
                                                                        </span>
                                                                    )}

                                                                    {totalChoices > 0 && (
                                                                        <span className="rounded-full bg-purple-500/10 px-2 py-1">
                                                                            {totalChoices} Pilihan
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Preview konfigurasi */}
                                                                {packageCount > 0 && (
                                                                    <div className="mt-3 text-xs text-muted-foreground">
                                                                        {item.packageInstances
                                                                            .slice(0, 2)
                                                                            .map(
                                                                                (
                                                                                    pkg: any,
                                                                                    pkgIndex: number,
                                                                                ) => (
                                                                                    <div key={pkgIndex}>
                                                                                        Paket #
                                                                                        {pkgIndex + 1}
                                                                                        {pkg.productMarinade &&
                                                                                            ` • ${pkg.productMarinade.name}`}
                                                                                    </div>
                                                                                ),
                                                                            )}

                                                                        {packageCount > 2 && (
                                                                            <div>
                                                                                +{packageCount - 2}{' '}
                                                                                konfigurasi lainnya
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="text-right">
                                                                <p className="font-semibold text-orange-500">
                                                                    {formatPrice(item.rate)}
                                                                </p>

                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    / item
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div
                                            className={`mt-4 rounded-2xl border p-4 ${theme === 'dark'
                                                ? 'border-white/10 bg-white/[0.04]'
                                                : 'border-orange-100 bg-orange-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    {__('Total Keranjang')}
                                                </span>

                                                <span className="text-xl font-bold text-orange-500">
                                                    {formatPrice(totalCart)}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {data.carts.length} {__("item dalam keranjang")}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className={`rounded-2xl p-4 text-center ${theme === 'dark'
                                            ? 'bg-white/[0.04]'
                                            : 'bg-orange-50'
                                            }`}
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            {__('Keranjang masih kosong')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div
                        className={`order-1 h-fit rounded-[36px] p-6 backdrop-blur-2xl md:p-8 lg:order-2 ${theme === 'dark'
                            ? 'theme-card-dark'
                            : 'theme-card-light'
                            }`}
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-500">
                                    {__('Form Booking')}
                                </p>

                                <h2 className="mt-2 text-3xl font-semibold">
                                    {__('Lengkapi data booking')}
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-7">
                            {/* PERSONAL */}

                            <div>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {__('Informasi Pribadi')}
                                </h3>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <InputField
                                        theme={theme}
                                        icon={<User size={18} />}
                                        label={__('Nama Pertama')}
                                        value={data.firstname}
                                        error={errors.firstname}
                                        onChange={(e) => {
                                            setData(
                                                'firstname',
                                                e.target.value,
                                            );

                                            clearErrors('firstname');
                                        }}
                                    />

                                    <InputField
                                        theme={theme}
                                        icon={<User size={18} />}
                                        label={__('Nama Terakhir')}
                                        value={data.lastname}
                                        error={errors.lastname}
                                        onChange={(e) => {
                                            setData('lastname', e.target.value);

                                            clearErrors('lastname');
                                        }}
                                    />
                                </div>
                            </div>

                            {/* CONTACT */}

                            <div>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {__('Kontak')}
                                </h3>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <InputField
                                        theme={theme}
                                        icon={<Phone size={18} />}
                                        label={__('Telepon')}
                                        type="tel"
                                        value={data.phone}
                                        error={errors.phone}
                                        onChange={(e) => {
                                            const onlyNumber =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    '',
                                                );

                                            setData('phone', onlyNumber);

                                            clearErrors('phone');
                                        }}
                                    />

                                    <InputField
                                        theme={theme}
                                        icon={<Mail size={18} />}
                                        label="Email"
                                        type="email"
                                        value={data.email}
                                        error={errors.email}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\s/g, '')
                                                .toLowerCase();

                                            setData('email', value);

                                            clearErrors('email');
                                        }}
                                    />
                                </div>

                                <div className="mt-5">
                                    <InputField
                                        theme={theme}
                                        icon={<MapPin size={18} />}
                                        label={__('Alamat')}
                                        value={data.address}
                                        error={errors.address}
                                        onChange={(e) => {
                                            setData('address', e.target.value);

                                            clearErrors('address');
                                        }}
                                    />
                                </div>
                            </div>

                            {/* BOOKING */}

                            <div>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {__('Detail Booking')}
                                </h3>

                                <div className="mb-5 grid gap-5 md:grid-cols-2">
                                    <DateTimePicker
                                        theme={theme}
                                        label={__('Tanggal Pengambilan')}
                                        value={data.pickupdate}
                                        onChange={(value) => {
                                            setData('pickupdate', value);

                                            if (data.returndate && data.returndate < value) {
                                                setData('returndate', '');
                                            }

                                            clearErrors('pickupdate');
                                        }}
                                        blockedDates={[
                                            '2026-05-28',
                                            '2026-05-29',
                                            '2026-06-02',
                                        ]}
                                        minDate={minPickupDate()}
                                        maxDate={
                                            data.returndate
                                                ? data.returndate.split(' ')[0]
                                                : undefined
                                        }
                                        minHour={8}
                                        maxHour={22}
                                        error={errors.pickupdate || ''}
                                    />

                                    <DateTimePicker
                                        theme={theme}
                                        label={__('Tanggal Pengembalian')}
                                        value={data.returndate}
                                        onChange={(value) => {
                                            setData('returndate', value);

                                            clearErrors('returndate');
                                        }}
                                        blockedDates={[
                                            '2026-05-28',
                                            '2026-05-29',
                                        ]}
                                        minDate={
                                            data.pickupdate
                                                ? data.pickupdate.split(' ')[0]
                                                : minPickupDate()
                                        }
                                        minHour={8}
                                        maxHour={22}
                                        error={errors.returndate || ''}
                                    />
                                </div>

                                <div>
                                    <h3 className="mb-5 text-lg font-semibold">
                                        {__('Lokasi Pengambilan')}
                                    </h3>

                                    <div className="relative">
                                        <MapPin
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 ${theme === 'dark'
                                                ? 'text-zinc-200'
                                                : 'text-zinc-500'
                                                }`}
                                        />

                                        <select
                                            value={data.pickuplocation}
                                            onChange={(e) => {
                                                setData(
                                                    'pickuplocation',
                                                    e.target.value,
                                                );

                                                clearErrors('pickuplocation');
                                            }}
                                            className={`w-full appearance-none rounded-3xl border py-4 pr-12 pl-14 text-sm transition-all outline-none ${theme === 'dark'
                                                ? 'border-white/10 bg-white/[0.04] text-zinc-200'
                                                : 'border-orange-100 bg-orange-50/50 text-zinc-800'
                                                } ${errors.pickuplocation
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : ''
                                                }`}
                                            style={{
                                                colorScheme:
                                                    theme === 'dark'
                                                        ? 'dark'
                                                        : 'light',
                                            }}
                                        >
                                            <option
                                                value=""
                                                className={
                                                    theme === 'dark'
                                                        ? 'bg-[#1a1a1a] text-white'
                                                        : 'bg-white text-zinc-800'
                                                }
                                            >
                                                {__('Pilih Lokasi Pengambilan')}
                                            </option>

                                            {[
                                                'Jl. Siulan, Batubulan, Bali',
                                                'Jl. Antasura, Denpasar, Bali',
                                            ].map((location) => (
                                                <option
                                                    key={location}
                                                    value={location}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'bg-[#1a1a1a] text-white'
                                                            : 'bg-white text-zinc-800'
                                                    }
                                                >
                                                    {location}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 ${theme === 'dark'
                                                ? 'text-zinc-400'
                                                : 'text-zinc-500'
                                                }`}
                                        />
                                    </div>

                                    {errors.pickuplocation && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {__(errors.pickuplocation)}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5">
                                    <InputField
                                        theme={theme}
                                        icon={<Shield size={18} />}
                                        label={__('Jaminan')}
                                        placeholder="KTP / SIM / Paspor / Other ID"
                                        value={data.guarantee}
                                        error={errors.guarantee}
                                        onChange={(e) => {
                                            setData(
                                                'guarantee',
                                                e.target.value,
                                            );

                                            clearErrors('guarantee');
                                        }}
                                    />
                                </div>
                            </div>

                            {/* PAYMENT */}

                            <div>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {__('Pembayaran')}
                                </h3>

                                <div className="relative">
                                    <CreditCard
                                        size={18}
                                        className={`pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 ${theme === 'dark'
                                            ? 'text-zinc-200'
                                            : 'text-zinc-500'
                                            }`}
                                    />

                                    <select
                                        value={data.payment}
                                        onChange={(e) => {
                                            setData('payment', e.target.value);

                                            clearErrors('payment');
                                        }}
                                        className={`w-full appearance-none rounded-3xl border py-4 pr-12 pl-14 text-sm transition-all outline-none ${theme === 'dark'
                                            ? 'border-white/10 bg-white/[0.04] text-zinc-200'
                                            : 'border-orange-100 bg-orange-50/50 text-zinc-800'
                                            } ${errors.payment
                                                ? 'border-red-500 focus:border-red-500'
                                                : ''
                                            }`}
                                        style={{
                                            colorScheme:
                                                theme === 'dark'
                                                    ? 'dark'
                                                    : 'light',
                                        }}
                                    >
                                        {['Cash', 'Transfer'].map((method) => (
                                            <option
                                                key={method}
                                                value={method}
                                                className={
                                                    theme === 'dark'
                                                        ? 'bg-[#1a1a1a] text-white'
                                                        : 'bg-white text-zinc-800'
                                                }
                                            >
                                                {__(method)}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className={`pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 ${theme === 'dark'
                                            ? 'text-zinc-400'
                                            : 'text-zinc-500'
                                            }`}
                                    />
                                </div>

                                {errors.payment && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {__(errors.payment)}
                                    </p>
                                )}
                            </div>

                            {/* NOTE */}

                            <div>
                                <h3 className="mb-5 text-lg font-semibold">
                                    {__('Catatan')}
                                </h3>

                                <textarea
                                    rows={6}
                                    value={data.note}
                                    onChange={(e) => {
                                        setData('note', e.target.value);

                                        clearErrors('note');
                                    }}
                                    placeholder={__(
                                        'Tulis kebutuhan tambahan anda...',
                                    )}
                                    className={`w-full resize-none rounded-3xl border px-5 py-4 text-sm transition-all outline-none ${theme === 'dark'
                                        ? `border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-200`
                                        : `border-orange-100 bg-orange-50/50 text-zinc-800 placeholder:text-zinc-400`
                                        } `}
                                />

                                {errors.note && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {__(errors.note)}
                                    </p>
                                )}
                            </div>

                            {errors.carts && (
                                <div className="flex flex-col gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500 sm:flex-row sm:items-center sm:justify-between">
                                    <div>{__(errors.carts)}</div>

                                    <a
                                        href={produk({ locale }).url}
                                        className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
                                    >
                                        {__('Pilih Produk')}
                                    </a>
                                </div>
                            )}

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[24px] bg-orange-500 px-7 py-5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-orange-600 disabled:opacity-50"
                            >
                                <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-1000 group-hover:translate-x-[120%]" />

                                <span className="relative z-10">
                                    {processing
                                        ? __('Mengirim...')
                                        : __('Kirim Booking Sekarang')}
                                </span>
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <MobileNavbar theme={theme} />

            <div className="h-24 xl:hidden" />

            <Footer theme={theme} />
        </div>
    );
}

type InputFieldProps = {
    label: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    theme: 'dark' | 'light';
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
    label,
    placeholder,
    type = 'text',
    icon,
    theme,
    value,
    error,
    onChange,
}: InputFieldProps) {
    const { __ } = useTranslation();

    return (
        <div>
            <label
                className={`mb-2 block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                    } `}
            >
                {label}
            </label>

            <div
                className={`flex items-center gap-3 rounded-3xl border px-4 py-4 transition-all ${theme === 'dark'
                    ? `border-white/10 bg-white/[0.04] text-white focus-within:border-orange-500`
                    : `border-orange-100 bg-orange-50/50 text-zinc-800 focus-within:border-orange-400`
                    } `}
            >
                <div
                    className={
                        theme === 'dark' ? 'text-zinc-200' : 'text-zinc-500'
                    }
                >
                    {icon}
                </div>

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-transparent text-sm outline-none ${theme === 'dark'
                        ? 'placeholder:text-zinc-200'
                        : 'placeholder:text-zinc-400'
                        } `}
                />
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{__(error)}</p>}
        </div>
    );
}
