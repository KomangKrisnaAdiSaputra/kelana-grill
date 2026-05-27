import { router, usePage } from '@inertiajs/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

import { useEffect, useMemo } from 'react';

import { useCart } from '@/contexts/cart-context';

import { useTheme } from '@/contexts/theme-context';
import { formatPrice, useTranslation } from '@/helpers/global';
import { contact } from '@/routes/landing';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
    const { theme } = useTheme();
    const { __ } = useTranslation();
    const locale = usePage<any>().props.params.locale;

    const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } =
        useCart();

    const total = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.qty * (item.variant.rate ?? 0),
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
        <div className="fixed inset-0 z-[999]">
            {/* BACKDROP */}

            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <div className="absolute inset-y-0 right-0 flex w-full justify-end sm:p-4">
                <div
                    className={`relative flex h-full w-full max-w-md flex-col overflow-hidden shadow-2xl transition-all duration-300 sm:rounded-[32px] ${
                        theme === 'dark'
                            ? `border border-white/10 bg-[#111111] text-white`
                            : `border border-orange-100 bg-white text-zinc-900`
                    } `}
                >
                    {/* HEADER */}

                    <div
                        className={`flex items-center justify-between border-b px-5 py-5 ${
                            theme === 'dark'
                                ? 'border-white/10'
                                : 'border-orange-100'
                        } `}
                    >
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight">
                                {__('Keranjang')}
                            </h2>

                            <p
                                className={`mt-1 text-sm ${
                                    theme === 'dark'
                                        ? 'text-zinc-400'
                                        : 'text-zinc-500'
                                } `}
                            >
                                {totalQty} item
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                                theme === 'dark'
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
                                    className={`flex h-20 w-20 items-center justify-center rounded-full ${
                                        theme === 'dark'
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
                                    className={`mt-2 max-w-xs text-sm leading-6 ${
                                        theme === 'dark'
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
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`overflow-hidden rounded-[28px] border p-4 transition-all duration-300 ${
                                            theme === 'dark'
                                                ? `border-white/10 bg-white/[0.03]`
                                                : `border-orange-100 bg-orange-50/40`
                                        } `}
                                    >
                                        <div className="flex gap-4">
                                            {/* IMAGE */}

                                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                                                <img
                                                    src={item.product.image}
                                                    alt={
                                                        item.product.name ??
                                                        'Product Image'
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {/* CONTENT */}

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h3 className="truncate font-semibold">
                                                            {item.product.name}
                                                        </h3>

                                                        <p
                                                            className={`mt-1 text-sm ${
                                                                theme === 'dark'
                                                                    ? 'text-zinc-400'
                                                                    : 'text-zinc-500'
                                                            } `}
                                                        >
                                                            {item.variant.name}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                                                            theme === 'dark'
                                                                ? `bg-white/[0.05] text-zinc-400 hover:bg-red-500/20 hover:text-red-400`
                                                                : `bg-white text-zinc-500 hover:bg-red-50 hover:text-red-500`
                                                        } `}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                {/* PRICE */}

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-lg font-bold text-orange-500">
                                                            {formatPrice(
                                                                item.variant
                                                                    .rate ?? 0,
                                                            )}
                                                        </p>
                                                    </div>

                                                    {/* QTY */}

                                                    <div
                                                        className={`flex items-center gap-2 rounded-full p-1 ${
                                                            theme === 'dark'
                                                                ? 'bg-white/[0.05]'
                                                                : 'bg-white'
                                                        } `}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    item.id,
                                                                )
                                                            }
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                                                                theme === 'dark'
                                                                    ? `bg-white/[0.05] hover:bg-white/[0.1]`
                                                                    : `bg-orange-50 hover:bg-orange-100`
                                                            } `}
                                                        >
                                                            <Minus size={14} />
                                                        </button>

                                                        <span className="min-w-[20px] text-center text-sm font-semibold">
                                                            {item.qty}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                increaseQty(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}

                    {cartItems.length > 0 && (
                        <div
                            className={`border-t p-5 ${
                                theme === 'dark'
                                    ? 'border-white/10'
                                    : 'border-orange-100'
                            } `}
                        >
                            {/* TOTAL */}

                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className={`text-sm ${
                                            theme === 'dark'
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
                                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                        theme === 'dark'
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
