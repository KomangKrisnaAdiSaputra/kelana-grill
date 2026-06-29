import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/helpers/global";
import type { Order } from "@/types/order";


type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;

  selectedOrder: Order | null;

  calculatePaid: (order: Order) => number;
  getRemaining: (order: Order) => number;

  setMode: (mode: "create" | "edit") => void;
  setOpenPaymentForm: (val: boolean) => void;
  setData: (key: string, value: any) => void;
  reset: () => void
};

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-medium break-words">{value}</div>
    </div>
  );
}

export default function ModalListPayment({
  open,
  setOpen,
  selectedOrder,
  calculatePaid,
  getRemaining,
  setMode,
  setOpenPaymentForm,
  setData,
  reset
}: Props) {

  const totalPay = Number(selectedOrder?.total ?? 0) - calculatePaid(selectedOrder!);

  useEffect(() => {
    if (!open) {
      return;
    }

    setData('orderId', selectedOrder?.id ?? "");

  }, [open, selectedOrder?.id, setData]);

  // console.log(selectedOrder, totalPay);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed top-[50%] left-[50%] z-50 flex h-[95vh] w-[98vw] !max-w-[1600px] flex-col overflow-hidden p-0">
        {/* HEADER */}
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle>Manage Payment</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* BODY GRID */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12">
          {/* ================= LEFT SIDE ================= */}
          <div className="h-full space-y-6 overflow-y-auto p-6 lg:col-span-8">
            {/* BOOKING INFO */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold">
                  Booking Information
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <Info
                    label="Booking ID"
                    value={selectedOrder?.bookingId}
                  />
                  <Info
                    label="Customer"
                    value={`${selectedOrder?.firstName} ${selectedOrder?.lastName}`}
                  />
                  <Info
                    label="Phone"
                    value={selectedOrder?.phone}
                  />
                  <Info
                    label="Email"
                    value={selectedOrder?.email}
                  />
                  <Info
                    label="Pickup Date"
                    value={selectedOrder?.pickupDate}
                  />
                  <Info
                    label="Return Date"
                    value={selectedOrder?.returnDate}
                  />
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT HISTORY */}
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Payment History
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      All payments for this order
                    </p>
                  </div>

                  {totalPay > 0 && (
                    <Button
                      onClick={() => {
                        reset();
                        setMode('create');
                        setData('orderId', selectedOrder?.id ?? "");
                        setData('amount', totalPay);
                        setOpenPaymentForm(true);
                      }}
                    >
                      Add Payment
                    </Button>
                  )}
                </div>

                {/* EMPTY STATE */}
                {!selectedOrder?.payments?.length && (
                  <div className="rounded-xl border p-10 text-center text-muted-foreground">
                    No payment history found
                  </div>
                )}

                {/* LIST */}
                <div className="space-y-3">
                  {selectedOrder?.payments?.map(
                    (payment) => (
                      <div
                        key={payment.id}
                        className="flex items-start justify-between rounded-xl border p-4"
                      >
                        {/* LEFT */}
                        <div>
                          <div className="font-medium">
                            {
                              payment.paymentMethod
                            }
                            {payment.paymentChannel &&
                              ` - ${payment.paymentChannel}`}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {payment.paidAt}
                          </div>

                          {payment.note && (
                            <div className="mt-1 text-sm">
                              {payment.note}
                            </div>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                          <div className="font-bold">
                            {formatPrice(payment.amount)}
                          </div>

                          <Badge className="mt-2">
                            {payment.status}
                          </Badge>

                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setMode('edit');
                                setData("id", payment.id);
                                setData("paymentMethod", payment.paymentMethod);
                                setData("paymentChannel", payment.paymentChannel || "");
                                setData("amount", payment.amount);
                                setData("paidAt", payment.paidAt || "");
                                setData("note", payment.note || "");
                                setData("status", payment.status || "");
                                setOpenPaymentForm(true);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="h-full overflow-y-auto border-l bg-muted/20 p-6 lg:col-span-4">
            <div className="sticky top-0 space-y-4">
              {/* SUMMARY */}
              <Card>
                <CardContent className="space-y-4 p-5">
                  <h3 className="font-semibold">
                    Payment Summary
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>
                        {formatPrice(selectedOrder?.total)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Paid</span>
                      <span>
                        {formatPrice(calculatePaid(selectedOrder!))}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold">
                      <span>Remaining</span>
                      <span>
                        {formatPrice(getRemaining(selectedOrder!))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}