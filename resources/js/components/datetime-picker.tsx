import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Timer,
} from 'lucide-react';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/helpers/global';

type DateTimePickerProps = {
    value: string;

    onChange: (value: string) => void;

    blockedDates?: string[];

    theme?: 'dark' | 'light';

    label?: string;

    minHour?: number;

    maxHour?: number;

    minuteStep?: number;

    minDate?: string;

    maxDate?: string;

    error?: string;
};

export default function DateTimePicker({
    value,
    onChange,
    blockedDates = [],
    theme = 'light',
    label,
    minHour = 8,
    maxHour = 22,
    minuteStep = 1,
    minDate,
    maxDate,
    error,
}: DateTimePickerProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const today = new Date();

    const [open, setOpen] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedHour, setSelectedHour] = useState('10');

    const [selectedMinute, setSelectedMinute] = useState('00');

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const { __ } = useTranslation();

    const dates = useMemo(() => {
        const arr = [];

        for (let i = 0; i < firstDay; i++) {
            arr.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            arr.push(i);
        }

        return arr;
    }, [firstDay, daysInMonth]);

    const formatDate = (day: number) => {
        const month = String(currentMonth + 1).padStart(2, '0');

        const date = String(day).padStart(2, '0');

        return `${currentYear}-${month}-${date}`;
    };

    const isDateDisabled = (date: string) => {
        if (minDate && date < minDate) {
            return true;
        }

        if (maxDate && date > maxDate) {
            return true;
        }

        return false;
    };

    const buildDateTime = (
        date: string,
        hour = selectedHour,
        minute = selectedMinute,
    ) => {
        return `${date} ${hour}:${minute}`;
    };

    const isBlocked = (day: number) => {
        return blockedDates.includes(formatDate(day));
    };

    const isSelected = (day: number) => {
        return value.startsWith(formatDate(day));
    };

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);

            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);

            setCurrentYear((prev) => prev + 1);
        } else {
            setCurrentMonth((prev) => prev + 1);
        }
    };

    const selectedDate = value.split(' ')[0];

    const minuteOptions = Array.from(
        {
            length: Math.ceil(60 / minuteStep),
        },
        (_, i) => String(i * minuteStep).padStart(2, '0'),
    );

    return (
        <div ref={wrapperRef} className="relative">
            {label && (
                <label
                    className={`mb-2 block text-sm font-medium ${
                        theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                    } `}
                >
                    {label}
                </label>
            )}

            {/* INPUT */}

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition-all duration-300 ${
                    error
                        ? 'border-red-400 ring-2 ring-red-400/20'
                        : theme === 'dark'
                          ? 'border-white/10 bg-[#151515] text-white hover:bg-[#1b1b1b]'
                          : 'border-orange-100 bg-orange-50/60 text-zinc-800 hover:bg-orange-100/60'
                }`}
            >
                <div>
                    <p
                        className={`text-xs ${
                            theme === 'dark' ? 'text-zinc-200' : 'text-zinc-500'
                        }`}
                    >
                        {__('Jadwal Booking')}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {value || __('Pilih tanggal & jam')}
                    </p>

                    {error && (
                        <p className="mt-2 text-sm text-red-500">{__(error)}</p>
                    )}
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ${
                        error
                            ? 'bg-red-500 shadow-red-500/30'
                            : 'bg-orange-500 shadow-orange-500/30'
                    }`}
                >
                    <Clock3 size={20} />
                </div>
            </button>

            {/* POPUP */}

            {open && (
                <div
                    className={`absolute top-full left-0 z-[99999] mt-3 w-full rounded-[28px] border p-3 shadow-2xl backdrop-blur-2xl max-lg:max-h-[70dvh] max-lg:touch-pan-y max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:[-webkit-overflow-scrolling:touch] max-md:max-h-[75dvh] sm:p-4 lg:max-h-none lg:min-w-[min(720px,calc(100vw-48px))] lg:overflow-visible lg:p-5 ${
                        theme === 'dark'
                            ? `border-white/10 bg-[#111112]`
                            : `border-orange-100 bg-white`
                    } `}
                >
                    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_240px]">
                        {/* CALENDAR */}

                        <div>
                            {/* HEADER */}

                            <div className="mb-4 flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={previousMonth}
                                    className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all sm:h-10 sm:w-10 lg:h-11 lg:w-11 ${
                                        theme === 'dark'
                                            ? `bg-white/[0.05] hover:bg-white/[0.08]`
                                            : `bg-orange-50 hover:bg-orange-100`
                                    } `}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <h3 className="text-lg font-bold">
                                    {__(monthNames[currentMonth])} {currentYear}
                                </h3>

                                <button
                                    type="button"
                                    onClick={nextMonth}
                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
                                        theme === 'dark'
                                            ? `bg-white/[0.05] hover:bg-white/[0.08]`
                                            : `bg-orange-50 hover:bg-orange-100`
                                    } `}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            {/* DAYS */}

                            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                                {days.map((day) => (
                                    <div
                                        key={day}
                                        className={`py-2 text-center text-xs font-semibold ${
                                            theme === 'dark'
                                                ? 'text-zinc-200'
                                                : 'text-zinc-400'
                                        } `}
                                    >
                                        {__(day)}
                                    </div>
                                ))}

                                {/* DATES */}

                                {dates.map((day, index) => {
                                    if (!day) {
                                        return <div key={index} />;
                                    }

                                    const currentDate = formatDate(day);

                                    const blocked =
                                        isBlocked(day) ||
                                        isDateDisabled(currentDate);

                                    const selected = isSelected(day);

                                    const isToday =
                                        currentDate ===
                                        `${today.getFullYear()}-${String(
                                            today.getMonth() + 1,
                                        ).padStart(2, '0')}-${String(
                                            today.getDate(),
                                        ).padStart(2, '0')}`;

                                    return (
                                        <button
                                            key={
                                                monthNames[currentMonth] +
                                                day +
                                                currentYear
                                            }
                                            type="button"
                                            disabled={blocked}
                                            onClick={() => {
                                                onChange(
                                                    buildDateTime(currentDate),
                                                );
                                            }}
                                            className={`relative flex h-9 items-center justify-center rounded-xl text-xs font-semibold transition-all duration-200 sm:h-10 sm:rounded-2xl sm:text-sm lg:h-12 ${
                                                blocked
                                                    ? `cursor-not-allowed bg-zinc-500/10 text-zinc-400 line-through opacity-50`
                                                    : selected
                                                      ? `bg-orange-500 text-white shadow-lg shadow-orange-500/30`
                                                      : theme === 'dark'
                                                        ? `bg-white/[0.04] text-white hover:bg-white/[0.08]`
                                                        : `bg-orange-50/70 text-zinc-700 hover:bg-orange-100`
                                            } `}
                                        >
                                            {day}

                                            {isToday && !selected && (
                                                <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* TIME PANEL */}

                        <div
                            className={`rounded-[24px] border p-3 sm:p-4 ${
                                theme === 'dark'
                                    ? `border-white/10 bg-white/[0.03]`
                                    : `border-orange-100 bg-orange-50/40`
                            } `}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                    <Clock3 size={18} />
                                </div>

                                <div>
                                    <h4
                                        className={`text-sm font-semibold ${
                                            theme === 'dark'
                                                ? 'text-white'
                                                : 'text-zinc-800'
                                        } `}
                                    >
                                        {__('Pilih Jam')}
                                    </h4>

                                    <p
                                        className={`text-xs ${
                                            theme === 'dark'
                                                ? 'text-zinc-200'
                                                : 'text-zinc-500'
                                        } `}
                                    >
                                        {__('Atur waktu booking')}
                                    </p>
                                </div>
                            </div>

                            {/* HOUR */}

                            <div className="space-y-4">
                                <div>
                                    <p
                                        className={`mb-2 text-xs font-medium ${
                                            theme === 'dark'
                                                ? 'text-zinc-200'
                                                : 'text-zinc-500'
                                        } `}
                                    >
                                        {__('Jam')}
                                    </p>

                                    <div className="relative">
                                        <Clock3
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 ${
                                                theme === 'dark'
                                                    ? 'text-zinc-300'
                                                    : 'text-zinc-500'
                                            }`}
                                        />

                                        <select
                                            value={selectedHour}
                                            onChange={(e) => {
                                                const hour = e.target.value;

                                                setSelectedHour(hour);

                                                if (selectedDate) {
                                                    onChange(
                                                        buildDateTime(
                                                            selectedDate,
                                                            hour,
                                                            selectedMinute,
                                                        ),
                                                    );
                                                }
                                            }}
                                            className={`h-12 w-full appearance-none rounded-2xl border pr-12 pl-12 text-sm font-medium transition-all outline-none sm:h-13 lg:h-14 ${
                                                theme === 'dark'
                                                    ? 'border-white/10 bg-[#1a1a1b] text-white focus:border-orange-500'
                                                    : 'border-orange-100 bg-white text-zinc-700 focus:border-orange-400'
                                            }`}
                                            style={{
                                                colorScheme:
                                                    theme === 'dark'
                                                        ? 'dark'
                                                        : 'light',
                                            }}
                                        >
                                            {Array.from(
                                                {
                                                    length:
                                                        maxHour - minHour + 1,
                                                },
                                                (_, i) => i + minHour,
                                            ).map((hour) => (
                                                <option
                                                    key={hour}
                                                    value={String(
                                                        hour,
                                                    ).padStart(2, '0')}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'bg-[#1a1a1a] text-white'
                                                            : 'bg-white text-zinc-800'
                                                    }
                                                >
                                                    {String(hour).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                                                theme === 'dark'
                                                    ? 'text-zinc-400'
                                                    : 'text-zinc-500'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* MINUTE */}

                                <div>
                                    <p
                                        className={`mb-2 text-xs font-medium ${
                                            theme === 'dark'
                                                ? 'text-zinc-200'
                                                : 'text-zinc-500'
                                        } `}
                                    >
                                        {__('Menit')}
                                    </p>

                                    <div className="relative">
                                        <Timer
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 ${
                                                theme === 'dark'
                                                    ? 'text-zinc-300'
                                                    : 'text-zinc-500'
                                            }`}
                                        />

                                        <select
                                            value={selectedMinute}
                                            onChange={(e) => {
                                                const minute = e.target.value;

                                                setSelectedMinute(minute);

                                                if (selectedDate) {
                                                    onChange(
                                                        buildDateTime(
                                                            selectedDate,
                                                            selectedHour,
                                                            minute,
                                                        ),
                                                    );
                                                }
                                            }}
                                            className={`h-14 w-full appearance-none rounded-2xl border pr-12 pl-12 text-sm font-medium transition-all outline-none ${
                                                theme === 'dark'
                                                    ? 'border-white/10 bg-[#1a1a1b] text-white focus:border-orange-500'
                                                    : 'border-orange-100 bg-white text-zinc-700 focus:border-orange-400'
                                            }`}
                                            style={{
                                                colorScheme:
                                                    theme === 'dark'
                                                        ? 'dark'
                                                        : 'light',
                                            }}
                                        >
                                            {minuteOptions.map((minute) => (
                                                <option
                                                    key={minute}
                                                    value={minute}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'bg-[#1a1a1a] text-white'
                                                            : 'bg-white text-zinc-800'
                                                    }
                                                >
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown
                                            size={18}
                                            className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                                                theme === 'dark'
                                                    ? 'text-zinc-400'
                                                    : 'text-zinc-500'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PREVIEW */}

                            <div
                                className={`mt-5 rounded-2xl p-4 ${
                                    theme === 'dark'
                                        ? 'bg-black/30'
                                        : 'bg-white'
                                } `}
                            >
                                <p
                                    className={`text-xs ${
                                        theme === 'dark'
                                            ? 'text-zinc-200'
                                            : 'text-zinc-500'
                                    } `}
                                >
                                    {__('Waktu Dipilih')}
                                </p>

                                <h3
                                    className={`mt-1 text-xl font-bold tracking-wide sm:text-2xl ${
                                        theme === 'dark'
                                            ? 'text-white'
                                            : 'text-zinc-800'
                                    } `}
                                >
                                    {selectedHour}:{selectedMinute}
                                </h3>
                            </div>

                            {/* INFO */}

                            <div
                                className={`mt-4 rounded-2xl p-4 text-sm ${
                                    theme === 'dark'
                                        ? `bg-white/[0.04] text-zinc-200`
                                        : `bg-orange-100/50 text-zinc-600`
                                } `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-3 w-3 rounded-full bg-red-400" />

                                    <p className="leading-relaxed">
                                        {__(
                                            'Tanggal yang diblok tidak tersedia.',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
