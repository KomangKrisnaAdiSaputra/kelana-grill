import DynamicSelect from "@/components/dynamic-select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/helpers/global";
import type { ProductItem } from "@/types/product";

type Props = {
  items: ProductItem[];
  marinades: {
    id: string;
    name: string;
  }[];

  selectedMarinades: Record<string, string[]>;

  setSelectedMarinades: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

export default function MarinadeSection({
  items,
  marinades,
  selectedMarinades,
  setSelectedMarinades,
}: Props) {
  const { __ } = useTranslation();
  console.log(items);

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">
          {__("Marinasi")}
        </h3>

        <p className="text-xs text-muted-foreground">
          {__("Pilih jenis marinasi untuk setiap item.")}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border bg-card p-4"
          >
            <div className="mb-5 flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-semibold text-foreground">
                  {item.name}
                </h4>

                {item.description && (
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex min-w-[74px] flex-col items-center rounded-2xl border border-primary/15 bg-primary/5 px-3 py-2">
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Qty
                </span>

                <span className="mt-0.5 text-sm font-bold text-primary">
                  {Number(item?.qty ?? 0) * Number(item?.qtyItem ?? 0)} {item.unit?.code}
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: Number(item.qtyItem ?? 0) }).map((_, idx) => (
                <div
                  key={idx}
                  className="space-y-2"
                >
                  <Label>
                    {__("Marinasi")} #{idx + 1}
                  </Label>

                  <DynamicSelect
                    options={marinades}
                    value={
                      selectedMarinades[item.name]?.[idx] ?? ""
                    }
                    onChange={(value) => {
                      setSelectedMarinades(
                        (prev) => {
                          const values = [
                            ...(prev[item.name] ?? []),
                          ];

                          values[idx] = value as string;

                          return { ...prev, [item.name]: values };
                        },
                      );
                    }}
                    getValue={(item) => item.id}
                    getLabel={(item) => item.name}
                    placeholder={__("Pilih Marinasi")}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}