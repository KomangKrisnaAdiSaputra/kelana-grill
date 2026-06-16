import { router, usePage } from '@inertiajs/react';
import { Minus, Package, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

import { useCart } from '@/contexts/cart-context';

import { useTheme } from '@/contexts/theme-context';
import { formatPrice, groupMarinades, useTranslation } from '@/helpers/global';
import { contact } from '@/routes/landing';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
    const { theme } = useTheme();
    const { __ } = useTranslation();
    const locale = usePage<any>().props.params.locale;

    const [imageError, setImageError] = useState(false);

    const { cartItems, increaseQty, decreaseQty, removeItem, clearCart, editPackage } = useCart();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const total = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.qty * (item.rate ?? 0),
            0,
        );
    }, [cartItems]);

    const totalQty = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.qty, 0);
    }, [cartItems]);

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[50]">
            {/* BACKDROP */}

            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <div className="absolute inset-y-0 right-0 flex w-full justify-end sm:p-4">
                <div
                    className={`relative flex h-full w-full max-w-md flex-col overflow-hidden shadow-2xl transition-all duration-300 sm:rounded-[32px] ${theme === 'dark'
                        ? `border border-white/10 bg-[#111111] text-white`
                        : `border border-orange-100 bg-white text-zinc-900`
                        } `}
                >
                    {/* HEADER */}

                    <div
                        className={`flex items-center justify-between border-b px-5 py-5 ${theme === 'dark'
                            ? 'border-white/10'
                            : 'border-orange-100'
                            } `}
                    >
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight">
                                {__('Keranjang')}
                            </h2>

                            <p
                                className={`mt-1 text-sm ${theme === 'dark'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-500'
                                    } `}
                            >
                                {totalQty} item
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${theme === 'dark'
                                ? `bg-white/[0.05] hover:bg-white/[0.08]`
                                : `bg-orange-50 hover:bg-orange-100`
                                } `}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* CONTENT */}

                    <div className="flex-1 overflow-y-auto p-5">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div
                                    className={`flex h-20 w-20 items-center justify-center rounded-full ${theme === 'dark'
                                        ? 'bg-white/[0.05]'
                                        : 'bg-orange-50'
                                        } `}
                                >
                                    <ShoppingBag
                                        size={32}
                                        className="text-orange-500"
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    {__('Keranjang kosong')}
                                </h3>

                                <p
                                    className={`mt-2 max-w-xs text-sm leading-6 ${theme === 'dark'
                                        ? 'text-zinc-400'
                                        : 'text-zinc-500'
                                        } `}
                                >
                                    {__(
                                        'Tambahkan produk favoritmu ke dalam keranjang.',
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => {
                                    const expanded = expandedItems[item.id];

                                    return (
                                        <div
                                            key={item.id}
                                            className={`overflow-hidden rounded-3xl border ${theme === 'dark'
                                                ? 'border-white/10 bg-white/[0.03]'
                                                : 'border-orange-100 bg-white'
                                                }`}
                                        >
                                            <div className="p-4">
                                                <div className="flex gap-3">
                                                    {/* IMAGE */}
                                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                                                        {item.image && !imageError ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover"
                                                                onError={() =>
                                                                    setImageError(true)
                                                                }
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                                <Package className="h-5 w-5 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* CONTENT */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="min-w-0">
                                                                <h3 className="truncate font-semibold">
                                                                    {item.name}
                                                                </h3>

                                                                {item.variant?.name && (
                                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                                        {item.variant.name}
                                                                    </p>
                                                                )}

                                                                {item.packageInstances?.length > 0 && (
                                                                    <div className="mt-2 inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                                                                        {item.packageInstances.length} Paket
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <button
                                                                onClick={() =>
                                                                    removeItem(item.id)
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>

                                                        {/* PACKAGE INFO */}
                                                        {(item.packageInstances ?? []).length > 0 && (
                                                            <div className="mt-3">
                                                                {/* FIXED HEADER */}
                                                                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background pb-2">
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {item.packageInstances.length} {__("konfigurasi paket")}
                                                                    </span>

                                                                    <button
                                                                        type="button"
                                                                        className="text-xs font-medium text-orange-500 hover:underline"
                                                                        onClick={() =>
                                                                            setExpandedItems((prev) => ({
                                                                                ...prev,
                                                                                [item.id]: !prev[item.id],
                                                                            }))
                                                                        }
                                                                    >
                                                                        {__(expanded ? 'Sembunyikan' : 'Lihat Detail')}
                                                                    </button>
                                                                </div>

                                                                {expanded && (
                                                                    <div
                                                                        className=" mt-3 max-h-[250px] overflow-y-auto rounded-xl border p-2 scrollbar-hide">
                                                                        <div className="space-y-3">
                                                                            {item.packageInstances.map(
                                                                                (pkg, pkgIndex) => (
                                                                                    <div
                                                                                        key={pkgIndex}
                                                                                        className={`rounded-xl border p-3 ${theme === 'dark'
                                                                                            ? 'border-white/10 bg-black/20'
                                                                                            : 'border-orange-100 bg-orange-50/50'
                                                                                            }`}
                                                                                    >

                                                                                        <div className="mb-2 flex items-center justify-between">
                                                                                            <div>
                                                                                                <span className="text-xs font-semibold text-orange-500">
                                                                                                    {__("Paket")} #{pkgIndex + 1}
                                                                                                </span>

                                                                                                {pkg.productMarinade && (
                                                                                                    <div className="text-xs text-orange-500">
                                                                                                        {pkg.productMarinade.name}
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>

                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={(e) => {
                                                                                                    editPackage(
                                                                                                        item.id,
                                                                                                        pkgIndex,
                                                                                                        e.currentTarget
                                                                                                    )
                                                                                                }}
                                                                                                className="rounded-md border border-orange-500/20 px-2 py-1 text-xs text-orange-500 hover:bg-orange-500/10"
                                                                                            >
                                                                                                Edit
                                                                                            </button>
                                                                                        </div>

                                                                                        <div className="space-y-2">
                                                                                            {(pkg.items ?? []).map(
                                                                                                (subItem) => (
                                                                                                    <div
                                                                                                        key={subItem.id}
                                                                                                        className="rounded-lg bg-background/50 p-2 text-xs"
                                                                                                    >
                                                                                                        <div className="font-medium">
                                                                                                            {subItem.qty}x{' '}
                                                                                                            {subItem.name}
                                                                                                        </div>

                                                                                                        {subItem.marinadeItems?.length > 0 && (
                                                                                                            <div className="mt-1 text-orange-500 text-xs">
                                                                                                                {Object.entries(
                                                                                                                    groupMarinades(subItem.marinadeItems),
                                                                                                                ).map(([name, qty]) => (
                                                                                                                    <div key={name}>
                                                                                                                        • {name} ({qty})
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        )}

                                                                                                        {subItem.choiceItems?.length > 0 && (
                                                                                                            <div className="mt-1 text-blue-500 text-xs">
                                                                                                                {Object.entries(
                                                                                                                    groupMarinades(subItem.choiceItems),
                                                                                                                ).map(([name, qty]) => (
                                                                                                                    <div key={name}>
                                                                                                                        • {name} ({qty})
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        )}

                                                                                                    </div>
                                                                                                ),
                                                                                            )}
                                                                                        </div>

                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>


                                                        )}
                                                    </div>
                                                </div>

                                                {/* FOOTER */}
                                                <div className="mt-4 flex items-center justify-between border-t pt-4">
                                                    <div>
                                                        <p className="text-lg font-bold text-orange-500">
                                                            {formatPrice(
                                                                item.rate ?? 0,
                                                            )}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            per item
                                                        </p>
                                                    </div>

                                                    <div
                                                        className={`flex items-center gap-2 rounded-full p-1 ${theme === 'dark'
                                                            ? 'bg-white/[0.05]'
                                                            : 'bg-orange-50'
                                                            }`}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                decreaseQty(item.id)
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-background"
                                                        >
                                                            <Minus size={14} />
                                                        </button>

                                                        <span className="min-w-[28px] text-center font-semibold">
                                                            {item.qty}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                increaseQty(item.id)
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}

                    {cartItems.length > 0 && (
                        <div
                            className={`border-t p-5 ${theme === 'dark'
                                ? 'border-white/10'
                                : 'border-orange-100'
                                } `}
                        >
                            {/* TOTAL */}

                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className={`text-sm ${theme === 'dark'
                                            ? 'text-zinc-400'
                                            : 'text-zinc-500'
                                            } `}
                                    >
                                        Total
                                    </p>

                                    <h3 className="mt-1 text-2xl font-bold text-orange-500">
                                        {formatPrice(total)}
                                    </h3>
                                </div>

                                <button
                                    onClick={clearCart}
                                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${theme === 'dark'
                                        ? `bg-red-500/10 text-red-400 hover:bg-red-500/20`
                                        : `bg-red-50 text-red-500 hover:bg-red-100`
                                        } `}
                                >
                                    {__('Kosongkan')}
                                </button>
                            </div>

                            {/* CHECKOUT */}

                            <button
                                onClick={() =>
                                    router.visit(contact({ locale }).url)
                                }
                                className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-orange-500 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.99]"
                            >
                                {__('Pesan')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
