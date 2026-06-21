import DynamicSelect from '@/components/dynamic-select';
import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;

  mode: 'create' | 'edit';

  data: {
    paymentMethod: string;
    paymentChannel: string;
    amount: string;
    paidAt: string;
    note: string;
  };

  processing: boolean;

  setData: (key: string, value: any) => void;

  onSubmit: () => void;
};

export default function ModalSavePayment({
  open,
  setOpen,
  mode,
  data,
  processing,
  setData,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Add Payment'
              : 'Edit Payment'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Method */}
          <div>
            <FileUpload
              value={data?.image ?? null}
              onChange={(files) =>
                setData('images', files)
              }
            />
          </div>
          <div>
            <Label>Payment Method</Label>

            <DynamicSelect
              options={[
                {
                  value: "CASH",
                  label: "Cash"
                },
                {
                  value: "TRANSFER",
                  label: "Transfer"
                },
              ]}
              value={data.paymentMethod ?? ""}
              onChange={(value) => {
                setData('paymentMethod', value)

              }}
              getValue={(item) => item.value}
              getLabel={(item) => item.label}
              placeholder={"Select payment method"}
            />
          </div>

          {/* Payment Channel */}
          {/* <div>
            <Label>Payment Channel</Label>

            <Input
              className="mt-2"
              value={data.paymentChannel}
              onChange={(e) =>
                setData(
                  'paymentChannel',
                  e.target.value,
                )
              }
              placeholder="BCA, BNI, Mandiri, OVO, GoPay..."
            />
          </div> */}

          {/* Amount */}
          {/* <div>
            <Label>Amount</Label>

            <Input
              type="number"
              className="mt-2"
              value={data.amount}
              onChange={(e) =>
                setData(
                  'amount',
                  e.target.value,
                )
              }
            />
          </div> */}

          {/* Paid At */}
          {/* <div>
            <Label>Paid At</Label>

            <Input
              type="datetime-local"
              className="mt-2"
              value={data.paidAt}
              onChange={(e) =>
                setData(
                  'paidAt',
                  e.target.value,
                )
              }
            />
          </div> */}

          {/* Note */}
          {/* <div>
            <Label>Note</Label>

            <Input
              className="mt-2"
              value={data.note}
              onChange={(e) =>
                setData(
                  'note',
                  e.target.value,
                )
              }
            />
          </div> */}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
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