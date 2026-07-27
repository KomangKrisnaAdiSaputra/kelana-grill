import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

  setSelectedMarinades: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;

  setSelectedChoices: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;

  onCancel: () => void;

  onSubmit: (
    items: any[],
    productMarinade: {
      id: string;
      name: string;
    } | null,
  ) => void;

  isEditing?: boolean;

  buttonEl: HTMLButtonElement | null;
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
  buttonEl,
}: Props) {
  const { __ } = useTranslation();

  const modalRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(open);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Defer setVisible to avoid synchronous state update inside effect
    const id = window.setTimeout(() => setVisible(true), 0);

    return () => window.clearTimeout(id);
  }, [open]);


  const getButtonRect = useCallback(() => {
    if (!buttonEl) {
      return {
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
        width: 0,
        height: 0,
      };
    }

    const rect = buttonEl.getBoundingClientRect();

    return rect;
  }, [buttonEl]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const modal = modalRef.current;

    if (!modal) {
      return;
    }

    const rect = getButtonRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    modal.style.transition = "none";

    modal.style.top = `${centerY}px`;
    modal.style.left = `${centerX}px`;

    modal.style.width = `${Math.max(rect.width, 20)}px`;
    modal.style.height = `${Math.max(rect.height, 20)}px`;

    modal.style.transform = "translate(-50%, -50%)";
    modal.style.borderRadius = "18px";

    void modal.offsetHeight;

    modal.style.transition = `
    top .45s cubic-bezier(.2,.8,.2,1),
    left .45s cubic-bezier(.2,.8,.2,1),
    width .45s cubic-bezier(.2,.8,.2,1),
    height .45s cubic-bezier(.2,.8,.2,1),
    border-radius .45s cubic-bezier(.2,.8,.2,1)
  `;

    requestAnimationFrame(() => {
      modal.style.top = "50%";
      modal.style.left = "50%";

      modal.style.width = "700px";
      modal.style.maxWidth = "95vw";
      modal.style.height = "80vh";

      modal.style.borderRadius = "28px";

      setTimeout(() => {
        setShowContent(true);
      }, 180);
    });
  }, [visible, getButtonRect]);

  const handleClose = () => {
    const modal = modalRef.current;

    if (!modal) {
      onOpenChange(false);

      return;
    }

    setShowContent(false);

    const rect = buttonEl?.getBoundingClientRect() ?? {
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
      width: 0,
      height: 0,
    };

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    modal.style.top = `${centerY}px`;
    modal.style.left = `${centerX}px`;

    modal.style.width = `${rect.width}px`;
    modal.style.height = `${rect.height}px`;

    modal.style.borderRadius = "18px";

    modal.style.transform = "translate(-50%, -50%)";

    setTimeout(() => {
      setVisible(false);
      onOpenChange(false);
    }, 450);
  };

  const handleSubmit = () => {
    if (!product) {
      return;
    }

    const productNeedMarinade = variant?.marinade ?? product?.marinade ?? false;
    const productMarinadeSelected = productNeedMarinade && !selectedMarinades["product"]?.[0] && (product?.items ?? []).length <= 0;

    if (productMarinadeSelected) {
      toast.error(__("Marinasi wajib dipilih"), {
        description: __(
          "Silakan pilih marinasi untuk produk terlebih dahulu.",
        ),
      });

      return;
    }

    const allMarinadesSelected = product.items?.filter((item) => item.marinade && item.type === "ALA CARTE").every((item) => {
      const selected = selectedMarinades[item.name] ?? [];

      return (selected.length === item.qtyItem && selected.every(Boolean));
    });

    if (!allMarinadesSelected) {
      toast.error(__("Data belum lengkap"), {
        description: __(
          "Silakan pilih semua marinasi item terlebih dahulu.",
        ),
      });

      return;
    }

    const allChoicesSelected = product.items?.filter((item) => item.type === "CHOICE").every((item) => {
      const selected = selectedChoices[item.name] ?? [];

      return (selected.length === item.qty && selected.every(Boolean));
    });

    if (!allChoicesSelected) {
      toast.error(__("Data belum lengkap"), {
        description: __(
          "Silakan pilih semua pilihan item terlebih dahulu.",
        ),
      });

      return;
    }

    const productMarinadeId = selectedMarinades["product"]?.[0];
    const productMarinade = marinades.find((m) => String(m.id) === String(productMarinadeId)) ?? null;
    const items = product.items?.map((item) => ({
      ...item,
      marinadeItems: item.marinade ? (selectedMarinades[item.name] ?? []).map((id) => marinades.find((m) => String(m.id) === String(id)))
        .filter(Boolean).map((m) => ({
          id: m!.id,
          name: m!.name,
        })) : [],
      choiceItems: item.type === "CHOICE" ? (selectedChoices[item.name] ?? []).map((id) => (item.choices ?? []).find((c) => String(c.id) === String(id)))
        .filter(Boolean).map((c) => ({
          id: c!.id,
          name: c!.name,
        })) : [],
    })) ?? [];

    onSubmit(items, productMarinade ? {
      id: productMarinade.id,
      name: productMarinade.name,
    } : null);

    handleClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed overflow-hidden bg-background shadow-2xl"
      >
        <div
          className={`flex h-full flex-col transition-all duration-300 ${showContent
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
            }`}
        >
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">
              {__("Pertanyaan")}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-8">
              {(product?.items ?? []).length > 0 ? (
                (product?.items ?? []).some(
                  (item) => item.marinade,
                ) && (
                  <MarinadeSection
                    items={(product?.items ?? []).filter(
                      (item) => item.marinade && item.type === "ALA CARTE",
                    )}
                    marinades={marinades}
                    selectedMarinades={
                      selectedMarinades
                    }
                    setSelectedMarinades={
                      setSelectedMarinades
                    }
                  />
                )
              ) : (
                <ProductMarinadeSection
                  product={product!}
                  marinades={marinades}
                  selectedMarinades={
                    selectedMarinades
                  }
                  setSelectedMarinades={
                    setSelectedMarinades
                  }
                />
              )}

              {(product?.items ?? []).some(
                (item) => item.type === "CHOICE",
              ) && (
                  <ChoiceSection
                    items={(product?.items ?? []).filter(
                      (item) =>
                        item.type === "CHOICE",
                    )}
                    selectedChoices={
                      selectedChoices
                    }
                    setSelectedChoices={
                      setSelectedChoices
                    }
                  />
                )}
            </div>
          </div>

          <div className="border-t px-6 py-4">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onCancel();
                  handleClose();
                }}
              >
                {__("Batal")}
              </Button>

              <Button onClick={handleSubmit}>
                {__(
                  isEditing
                    ? "Simpan Perubahan"
                    : "Tambah ke keranjang",
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}