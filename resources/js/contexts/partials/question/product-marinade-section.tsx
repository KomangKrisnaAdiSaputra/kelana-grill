import DynamicSelect from "@/components/dynamic-select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/helpers/global";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  marinades: {
    id: string;
    name: string;
  }[];
  selectedMarinades: Record<string, string[]>;
  setSelectedMarinades: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

export default function ProductMarinadeSection({
  product,
  marinades,
  selectedMarinades,
  setSelectedMarinades,
}: Props) {
  const { __ } = useTranslation();

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">
          {__("Marinasi")}
        </h3>

        <p className="text-xs text-muted-foreground">
          {__("Pilih jenis marinasi untuk produk.")}
        </p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="font-medium">
              {product?.name ?? ""}
            </p>

            {product?.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {product?.description}
              </p>
            )}
          </div>

          <div className="relative flex min-w-[88px] flex-col items-center rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5 px-3 py-3 shadow-sm">
            {/* Badge */}
            <span className="absolute right-2 top-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground">
              ×1
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Qty
            </span>

            <span className="mt-1 text-lg font-bold leading-none text-primary">
              {Number(product?.qty ?? 0)}
              {product?.unit?.code}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{__("Marinasi")}</Label>

          <DynamicSelect
            options={marinades}
            value={
              selectedMarinades["product"]?.[0] ?? ""
            }
            onChange={(value) => {
              setSelectedMarinades((prev) => ({
                ...prev,
                product: [value as string],
              }));
            }}
            getValue={(item) => item.id}
            getLabel={(item) => item.name}
            placeholder={__("Pilih Marinasi")}
          />
        </div>
      </div>
    </section>
  );
}