import DynamicSelect from "@/components/dynamic-select";
import { Label } from "@/components/ui/label";
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
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">
          Marinasi
        </h3>

        <p className="text-xs text-muted-foreground">
          Pilih jenis marinasi untuk setiap item.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border bg-card p-4"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Qty {item.qty}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: Number(item.qty ?? 0) }).map((_, idx) => (
                <div
                  key={idx}
                  className="space-y-2"
                >
                  <Label>
                    Marinasi #{idx + 1}
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
                    placeholder="Pilih Marinasi"
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