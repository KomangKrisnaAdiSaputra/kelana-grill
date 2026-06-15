import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/helpers/global";
import type { Product, ProductVariant } from "@/types/product";
import ChoiceSection from "./question/choice-section";
import MarinadeSection from "./question/marinade-section";
import ProductMarinadeSection from "./question/product-marinade-section";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  product: Product | null;
  variant: ProductVariant | null;

  marinades: {
    id: string;
    name: string;
  }[];

  selectedMarinades: Record<string, string[]>;
  selectedChoices: Record<string, string[]>;

  setSelectedMarinades: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;

  setSelectedChoices: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;

  onCancel: () => void;

  onSubmit: (
    items: any[],
    productMarinade: {
      id: string;
      name: string;
    } | null,
  ) => void;
  isEditing?: boolean;
};

export default function QuestionDialog({
  open,
  onOpenChange,
  product,
  variant,
  marinades,
  selectedMarinades,
  selectedChoices,
  setSelectedMarinades,
  setSelectedChoices,
  onCancel,
  onSubmit,
  isEditing,
}: Props) {
  const { __ } = useTranslation();
  const handleSubmit = () => {
    if (!product) {
      return;
    }

    const productNeedMarinade = variant?.marinade ?? product?.marinade ?? false;
    const productMarinadeSelected = productNeedMarinade && !selectedMarinades["product"]?.[0] && (product?.items ?? []).length <= 0;

    if (productMarinadeSelected) {
      toast.error(__("Marinasi wajib dipilih"), {
        description:
          __("Silakan pilih marinasi untuk produk terlebih dahulu."),
      });

      return;
    }

    const allMarinadesSelected = product.items?.filter((item) => item.marinade).every((item) => {
      const selected = selectedMarinades[item.name] ?? [];

      return (selected.length === item.qty && selected.every(Boolean));
    });

    if (!allMarinadesSelected) {
      toast.error(__("Data belum lengkap"), {
        description:
          __("Silakan pilih semua marinasi item terlebih dahulu."),
      });

      return;
    }

    const allChoicesSelected = product.items?.filter((item) => item.type === "CHOICE").every((item) => {
      const selected = selectedChoices[item.name] ?? [];

      return (selected.length === item.qty && selected.every(Boolean));
    });

    if (!allChoicesSelected) {
      toast.error(__("Data belum lengkap"), {
        description:
          __("Silakan pilih semua pilihan item terlebih dahulu."),
      });

      return;
    }

    const productMarinadeId = selectedMarinades["product"]?.[0];
    const productMarinade = marinades.find((m) => String(m.id) === String(productMarinadeId)) ?? null;
    const items = product.items?.map((item) => ({
      ...item,
      marinadeItems: item.marinade ? (selectedMarinades[item.name] ?? []).map((id) => marinades.find((m) => String(m.id) === String(id)))
        .filter(Boolean)
        .map((m) => ({
          id: m!.id,
          name: m!.name,
        })) : [],
      choiceItems: item.type === "CHOICE" ? (selectedChoices[item.name] ?? []).map((id) => (item.choices ?? []).find((c) => String(c.id) === String(id)))
        .filter(Boolean)
        .map((c) => ({
          id: c!.id,
          name: c!.name,
        })) : [],
    })) ?? [];

    onSubmit(
      items,
      productMarinade ? { id: productMarinade.id, name: productMarinade.name } : null
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-lg p-0">
        <div className="flex max-h-[80vh] flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>
              {__("Pertanyaan")}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription />

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-8">
              {/* MARINASI */}

              {(product?.items ?? []).length > 0 ? (
                (product?.items ?? []).some((item) => item.marinade) && (
                  <MarinadeSection
                    items={(product!.items ?? []).filter((item) => item.marinade)}
                    marinades={marinades}
                    selectedMarinades={selectedMarinades}
                    setSelectedMarinades={setSelectedMarinades}
                  />
                )
              ) : (
                <ProductMarinadeSection
                  product={product!}
                  marinades={marinades}
                  selectedMarinades={selectedMarinades}
                  setSelectedMarinades={setSelectedMarinades}
                />
              )}

              {/* PILIHAN */}
              {(product?.items ?? []).some((item) => item.type === 'CHOICE') && (
                <ChoiceSection
                  items={(product!.items ?? []).filter((item) => item.type === "CHOICE")}
                  selectedChoices={selectedChoices}
                  setSelectedChoices={setSelectedChoices}
                />
              )}
            </div>
          </div>

          <DialogFooter className="border-t px-6 py-4">
            <Button
              variant="outline"
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
            >
              {__("Batal")}
            </Button>

            <Button onClick={handleSubmit}>
              {__(isEditing ? 'Simpan Perubahan' : 'Tambah ke keranjang')}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}