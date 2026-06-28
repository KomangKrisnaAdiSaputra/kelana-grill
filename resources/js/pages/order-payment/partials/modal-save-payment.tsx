import { useState } from 'react';
import DateTimePicker from '@/components/datetime-picker';
import DynamicSelect from '@/components/dynamic-select';
import FileUpload from '@/components/file-upload';
import { InputNumber } from '@/components/input-number';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppearance } from '@/hooks/use-appearance';

import payments from '@/src/data/payments';
import type { dataType } from './types';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;

  mode: 'create' | 'edit';

  data: dataType;

  processing: boolean;

  setData: (key: string, value: any) => void;

  onSubmit: () => void;
  errors: Partial<Record<keyof dataType | "message", string>>;
  totalPay: number;
};

export default function ModalSavePayment({
  open,
  setOpen,
  mode,
  data,
  processing,
  setData,
  onSubmit,
  errors = {},
  totalPay = 0
}: Props) {
  const { appearance } = useAppearance();
  const [amountError, setAmountError] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          w-[95vw]
          max-w-3xl
          h-[90vh]
          p-0
          overflow-visible
          flex
          flex-col
        "
      >
        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b bg-background shrink-0">
          <DialogTitle>
            {mode === 'create' ? 'Add Payment' : 'Edit Payment'}
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            {/* Upload */}
            <div>
              <Label className="mb-2 block">
                Bukti Payment
              </Label>

              <FileUpload
                value={data?.image ?? null}
                onChange={(files) =>
                  setData('image', files)
                }
              />
            </div>

            <div className="space-y-4 w-full">
              {/* Baris 1: Status & Payment Method */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Status */}
                <div className="flex flex-col">
                  <Label className="mb-2 block text-sm font-medium">
                    Status
                  </Label>
                  <DynamicSelect
                    options={[
                      { value: 'PAID', label: 'PAID' },
                      { value: 'CANCEL', label: 'CANCEL' },
                    ]}
                    value={data.status ?? ''} // PERBAIKAN: Sebelumnya paymentMethod
                    onChange={(value) => setData('status', value)} // PERBAIKAN: Sebelumnya paymentMethod
                    getValue={(item) => item.value}
                    getLabel={(item) => item.label}
                    placeholder="Select status"
                    error={errors?.status}
                  />
                </div>

                {/* Payment Method */}
                <div className="flex flex-col">
                  <Label className="mb-2 block text-sm font-medium">
                    Payment Method
                  </Label>
                  <DynamicSelect
                    options={[
                      { value: 'CASH', label: 'Cash' },
                      { value: 'TRANSFER', label: 'Transfer' },
                    ]}
                    value={data.paymentMethod ?? ''}
                    onChange={(value) => setData('paymentMethod', value)}
                    getValue={(item) => item.value}
                    getLabel={(item) => item.label}
                    placeholder="Select payment method"
                    error={errors?.paymentMethod}
                  />
                </div>
              </div>

              {/* Baris 2: Payment Channel & Amount */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Payment Channel */}
                <div className="flex flex-col">
                  <Label className="mb-2 block text-sm font-medium">
                    Payment Channel
                  </Label>
                  <DynamicSelect
                    options={payments}
                    value={data.paymentChannel ?? ''}
                    onChange={(value) => setData('paymentChannel', value)}
                    getValue={(item) => item.name}
                    getLabel={(item) => item.name}
                    placeholder="Select payment channel"
                    error={errors?.paymentChannel}
                  />
                </div>

                {/* Amount */}
                <div className="flex flex-col">
                  <Label className="mb-2 block text-sm font-medium">
                    Amount
                  </Label>
                  <InputNumber
                    currency
                    prefix="IDR"
                    value={data?.amount ?? 0}
                    onChange={(value) => {
                      setData("amount", value);

                      if (value > totalPay) {
                        setAmountError(
                          `Payment amount cannot exceed IDR ${totalPay.toLocaleString("id-ID")}.`
                        );
                      } else {
                        setAmountError("");
                      }
                    }}
                    placeholder="50.000"
                    className="w-full" // Memastikan input memenuhi kolom
                    error={amountError || errors.amount}
                    max={totalPay}
                  />
                </div>
              </div>
            </div>

            {/* Paid At */}
            <div>
              <DateTimePicker
                theme={appearance === 'system' ? 'light' : appearance}
                label="Paid At"
                value={data.paidAt}
                onChange={(value) =>
                  setData('paidAt', value)
                }
                error={errors?.paidAt}
              />
            </div>

            {/* Note */}
            <div>
              <Label className="mb-2 block">
                Note
              </Label>

              <Textarea
                rows={5}
                placeholder="Write payment notes..."
                value={data.note}
                onChange={(e) =>
                  setData('note', e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t bg-background px-6 py-4 shrink-0">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setAmountError("");
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={onSubmit}
              disabled={processing}
            >
              {processing
                ? 'Saving...'
                : 'Save Payment'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}