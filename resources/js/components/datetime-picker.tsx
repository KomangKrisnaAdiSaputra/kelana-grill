import {
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type DateTimePickerProps = {
  value: string;

  onChange: (
    value: string,
  ) => void;

  blockedDates?: string[];

  theme?: "dark" | "light";

  label?: string;

  minHour?: number;

  maxHour?: number;
};

export default function DateTimePicker({
  value,
  onChange,
  blockedDates = [],
  theme = "light",
  label,
  minHour = 8,
  maxHour = 22,
}: DateTimePickerProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const today = new Date();

  const [open, setOpen] =
    useState(false);

  const [currentMonth, setCurrentMonth] =
    useState(
      today.getMonth(),
    );

  const [currentYear, setCurrentYear] =
    useState(
      today.getFullYear(),
    );

  const [selectedHour, setSelectedHour] =
    useState("10");

  const [
    selectedMinute,
    setSelectedMinute,
  ] = useState("00");

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = [
    "Min",
    "Sen",
    "Sel",
    "Rab",
    "Kam",
    "Jum",
    "Sab",
  ];

  const daysInMonth =
    new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();

  const firstDay =
    new Date(
      currentYear,
      currentMonth,
      1,
    ).getDay();

  const dates = useMemo(() => {
    const arr = [];

    for (
      let i = 0;
      i < firstDay;
      i++
    ) {
      arr.push(null);
    }

    for (
      let i = 1;
      i <= daysInMonth;
      i++
    ) {
      arr.push(i);
    }

    return arr;
  }, [
    firstDay,
    daysInMonth,
  ]);

  const formatDate = (
    day: number,
  ) => {
    const month = String(
      currentMonth + 1,
    ).padStart(2, "0");

    const date = String(
      day,
    ).padStart(2, "0");

    return `${currentYear}-${month}-${date}`;
  };

  const buildDateTime = (
    date: string,
  ) => {
    return `${date} ${selectedHour}:${selectedMinute}`;
  };

  const isBlocked = (
    day: number,
  ) => {
    return blockedDates.includes(
      formatDate(day),
    );
  };

  const isSelected = (
    day: number,
  ) => {
    return value.startsWith(
      formatDate(day),
    );
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);

      setCurrentYear(
        (prev) => prev - 1,
      );
    } else {
      setCurrentMonth(
        (prev) => prev - 1,
      );
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);

      setCurrentYear(
        (prev) => prev + 1,
      );
    } else {
      setCurrentMonth(
        (prev) => prev + 1,
      );
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {label && (
        <label
          className={`
            mb-2 block text-sm font-medium
            ${theme === "dark"
              ? "text-zinc-300"
              : "text-zinc-700"
            }
          `}
        >
          {label}
        </label>
      )}

      {/* INPUT */}

      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className={`
          flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition-all
          ${theme === "dark"
            ? `
              border-white/10
              bg-white/[0.04]
              text-white
            `
            : `
              border-orange-100
              bg-orange-50/50
              text-zinc-800
            `
          }
        `}
      >
        <div>
          <p className="text-sm font-medium">
            {value ||
              "Pilih tanggal & jam"}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
          <Clock3 size={18} />
        </div>
      </button>

      {/* POPUP */}

      {open && (
        <div
          className={`
            absolute z-50 mt-3 w-full overflow-hidden rounded-[32px] border p-5 shadow-2xl backdrop-blur-2xl
            ${theme === "dark"
              ? `
                border-white/10
                bg-[#111112]
              `
              : `
                border-orange-100
                bg-white
              `
            }
          `}
        >
          {/* HEADER */}

          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={
                previousMonth
              }
              className={`
                flex h-11 w-11 items-center justify-center rounded-2xl transition-all
                ${theme === "dark"
                  ? "bg-white/[0.05] hover:bg-white/[0.08]"
                  : "bg-orange-50 hover:bg-orange-100"
                }
              `}
            >
              <ChevronLeft
                size={18}
              />
            </button>

            <h3 className="font-semibold">
              {
                monthNames[
                currentMonth
                ]
              }{" "}
              {currentYear}
            </h3>

            <button
              type="button"
              onClick={
                nextMonth
              }
              className={`
                flex h-11 w-11 items-center justify-center rounded-2xl transition-all
                ${theme === "dark"
                  ? "bg-white/[0.05] hover:bg-white/[0.08]"
                  : "bg-orange-50 hover:bg-orange-100"
                }
              `}
            >
              <ChevronRight
                size={18}
              />
            </button>
          </div>

          {/* DAY LABEL */}

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day}
                className={`
                  py-2 text-center text-xs font-semibold
                  ${theme === "dark"
                    ? "text-zinc-500"
                    : "text-zinc-400"
                  }
                `}
              >
                {day}
              </div>
            ))}

            {/* DATES */}

            {dates.map(
              (day, index) => {
                if (!day) {
                  return (
                    <div
                      key={index}
                    />
                  );
                }

                const blocked =
                  isBlocked(
                    day,
                  );

                const selected =
                  isSelected(
                    day,
                  );

                const currentDate =
                  formatDate(
                    day,
                  );

                const isToday =
                  currentDate ===
                  `${today.getFullYear()}-${String(
                    today.getMonth() +
                    1,
                  ).padStart(
                    2,
                    "0",
                  )}-${String(
                    today.getDate(),
                  ).padStart(
                    2,
                    "0",
                  )}`;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={
                      blocked
                    }
                    onClick={() => {
                      onChange(
                        buildDateTime(
                          currentDate,
                        ),
                      );

                      setOpen(
                        false,
                      );
                    }}
                    className={`
                      relative flex h-12 items-center justify-center rounded-2xl text-sm font-medium transition-all

                      ${blocked
                        ? `
                            cursor-not-allowed
                            bg-red-500/10
                            text-red-400
                            line-through
                          `
                        : selected
                          ? `
                              bg-orange-500
                              text-white
                              shadow-lg
                            `
                          : theme ===
                            "dark"
                            ? `
                                bg-white/[0.04]
                                text-white
                                hover:bg-white/[0.08]
                              `
                            : `
                                bg-orange-50/70
                                text-zinc-700
                                hover:bg-orange-100
                              `
                      }
                    `}
                  >
                    {day}

                    {isToday &&
                      !selected && (
                        <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                      )}
                  </button>
                );
              },
            )}
          </div>

          {/* TIME */}

          <div className="mt-6">
            <h4
              className={`
                mb-3 text-sm font-semibold
                ${theme === "dark"
                  ? "text-zinc-300"
                  : "text-zinc-700"
                }
              `}
            >
              Pilih Jam
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {/* HOUR */}

              <select
                value={
                  selectedHour
                }
                onChange={(e) =>
                  setSelectedHour(
                    e.target
                      .value,
                  )
                }
                className={`
                  rounded-2xl border px-4 py-3 text-sm outline-none
                  ${theme === "dark"
                    ? `
                      border-white/10
                      bg-white/[0.04]
                      text-white
                    `
                    : `
                      border-orange-100
                      bg-orange-50
                      text-zinc-700
                    `
                  }
                `}
              >
                {Array.from(
                  {
                    length:
                      maxHour -
                      minHour +
                      1,
                  },
                  (_, i) =>
                    i + minHour,
                ).map(
                  (hour) => (
                    <option
                      key={hour}
                      value={String(
                        hour,
                      ).padStart(
                        2,
                        "0",
                      )}
                    >
                      {String(
                        hour,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </option>
                  ),
                )}
              </select>

              {/* MINUTE */}

              <select
                value={
                  selectedMinute
                }
                onChange={(e) =>
                  setSelectedMinute(
                    e.target
                      .value,
                  )
                }
                className={`
                  rounded-2xl border px-4 py-3 text-sm outline-none
                  ${theme === "dark"
                    ? `
                      border-white/10
                      bg-white/[0.04]
                      text-white
                    `
                    : `
                      border-orange-100
                      bg-orange-50
                      text-zinc-700
                    `
                  }
                `}
              >
                {[
                  "00",
                  "15",
                  "30",
                  "45",
                ].map(
                  (
                    minute,
                  ) => (
                    <option
                      key={
                        minute
                      }
                      value={
                        minute
                      }
                    >
                      {minute}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className={`
              mt-5 rounded-2xl p-4 text-sm
              ${theme === "dark"
                ? "bg-white/[0.04] text-zinc-400"
                : "bg-orange-50 text-zinc-600"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />

              <p>
                Tanggal yang
                diblok tidak
                tersedia untuk
                booking
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}