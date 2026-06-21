import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Payment = {
  id: string;
  payment_method: string;
  payment_channel: string | null;
  amount: number;
  paid_at: string | null;
  status: string;
  note: string | null;
};

type Order = {
  id: string;
  bookingId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pickupDate: string;
  returnDate: string;
  total: number;
  payments?: Payment[];
};

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;

  selectedOrder: Order | null;

  calculatePaid: (order: Order) => number;
  getRemaining: (order: Order) => number;
  formatCurrency: (val: number) => string;

  setMode: (mode: "create" | "edit") => void;
  setSelectedPayment: (payment: Payment | null) => void;
  setOpenPaymentForm: (val: boolean) => void;
  setData: (data: any) => void;
  data: any;
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
  formatCurrency,
  setMode,
  setSelectedPayment,
  setOpenPaymentForm,
  setData,
  data,
}: Props) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed top-[50%] left-[50%] z-50 flex h-[95vh] w-[98vw] !max-w-[1600px] flex-col overflow-hidden p-0">
        {/* HEADER */}
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle>Manage Payment</DialogTitle>
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

                  <Button
                    onClick={() => {
                      setMode('create');
                      setSelectedPayment(null);
                      setOpenPaymentForm(true);
                    }}
                  >
                    Add Payment
                  </Button>
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
                              payment.payment_method
                            }
                            {payment.payment_channel &&
                              ` - ${payment.payment_channel}`}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {payment.paid_at}
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
                            {formatCurrency(
                              Number(
                                payment.amount,
                              ),
                            )}
                          </div>

                          <Badge className="mt-2">
                            {payment.status}
                          </Badge>

                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setMode(
                                  'edit',
                                );
                                setSelectedPayment(
                                  payment,
                                );

                                // auto fill form
                                setData({
                                  ...data,
                                  paymentMethod:
                                    payment.payment_method,
                                  paymentChannel:
                                    payment.payment_channel ||
                                    '',
                                  amount: String(
                                    payment.amount,
                                  ),
                                  paidAt:
                                    payment.paid_at ||
                                    '',
                                  note:
                                    payment.note ||
                                    '',
                                });

                                setOpenPaymentForm(
                                  true,
                                );
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
                        {formatCurrency(
                          Number(
                            selectedOrder?.total ||
                            0,
                          ),
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Paid</span>
                      <span>
                        {formatCurrency(
                          calculatePaid(
                            selectedOrder!,
                          ),
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold">
                      <span>Remaining</span>
                      <span>
                        {formatCurrency(
                          getRemaining(
                            selectedOrder!,
                          ),
                        )}
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