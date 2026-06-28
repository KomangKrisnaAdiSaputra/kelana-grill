import { useForm } from '@inertiajs/react';
import {
  Search,
  CreditCard,
  Wallet,
  CircleDollarSign,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatPrice } from '@/helpers/global';
import { status } from '@/routes/landing/booking';
import { save } from '@/routes/order-payment';
import type { Order } from '@/types/order';
import ModalListPayment from './partials/modal-list-payment';
import ModalSavePayment from './partials/modal-save-payment';

interface Props {
  orders: {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };

  stats: {
    total: number;
    unpaid: number;
    partial: number;
    paid: number;
  };
}

export default function Index({ orders, stats }: Props) {
  const [search, setSearch] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = useMemo(() => {
    return orders.data.find((item) => item.id === selectedOrderId) ?? null;
  }, [orders.data, selectedOrderId]);

  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const { data, setData, post, errors, processing, reset } = useForm({
    id: null,
    orderId: '',
    paymentMethod: '',
    paymentChannel: '',
    amount: 0,
    paidAt: '',
    note: '',
    image: null,
    status: '',
  });

  const filteredOrders = useMemo(() => {
    if (!search) {
      return orders.data;
    }

    const keyword = search.toLowerCase();

    return orders.data.filter((item) => {
      return (
        item.bookingId?.toLowerCase().includes(keyword) ||
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [orders.data, search]);

  const calculatePaid = (order: Order) => {
    return (order?.payments ?? [])
      .filter((payment) => payment.status === "PAID")
      .reduce((total, payment) => total + Number(payment.amount), 0);
  };

  const getRemaining = (order: Order) => {
    return Number(order?.total ?? 0) - calculatePaid(order);
  };

  const openManagePayment = (order: Order) => {
    reset();
    setSelectedOrderId(order.id);
    setOpenPayment(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order Payments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer payments and payment proofs.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Orders
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {stats.total}
              </h3>
            </div>

            <CreditCard className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Unpaid
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {stats.unpaid}
              </h3>
            </div>

            <Wallet className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Partial
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {stats.partial}
              </h3>
            </div>

            <CircleDollarSign className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Paid
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {stats.paid}
              </h3>
            </div>

            <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search booking, customer, phone..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead> Booking </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const paid = calculatePaid(order);

                    const remaining = getRemaining(order);

                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">
                            {order.bookingId}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.firstName}{' '}
                              {order.lastName}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              {order.phone}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {order.pickupDate}
                        </TableCell>

                        <TableCell>
                          {formatPrice(order.total)}
                        </TableCell>

                        <TableCell>
                          {formatPrice(paid)}
                        </TableCell>

                        <TableCell>
                          {formatPrice(remaining)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'PAID'
                                ? 'default'
                                : order.status ===
                                  'DOWN PAYMENT'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openManagePayment(order)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Manage
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(status({ locale: "id", id: order.id }).url, "_blank")
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Booking Status
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ModalListPayment
        open={openPayment}
        setOpen={setOpenPayment}
        selectedOrder={selectedOrder as any}
        calculatePaid={calculatePaid as any}
        getRemaining={getRemaining as any}
        setMode={setMode}
        setOpenPaymentForm={setOpenPaymentForm}
        setData={setData}
        reset={reset}
      />

      <ModalSavePayment
        open={openPaymentForm}
        setOpen={setOpenPaymentForm}
        mode={mode}
        data={data}
        processing={processing}
        setData={setData}
        errors={errors}
        totalPay={Number(selectedOrder?.total ?? 0) - calculatePaid(selectedOrder!)}
        onSubmit={() => {
          post(save.url(), {
            forceFormData: true,
            only: ['saveData', 'orders', 'stats'],
            onSuccess: (page: any) => {
              const { saveData } = page.props;

              if (saveData?.success) {
                if (selectedOrder) {
                  setSelectedOrderId(selectedOrder.id);
                }

                setOpenPaymentForm(false);

                toast.success('Success', {
                  description: saveData.message,
                });
                reset();
              }
            },
            onError: (errors) => {
              toast.error(
                errors.message ?? 'Internal Server Error',
              );
            },
          });
        }}
      />
    </div>
  );
}
