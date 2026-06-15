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
              {product?.name}
            </p>

            {product?.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {product?.description}
              </p>
            )}
          </div>

          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            Qty 1
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