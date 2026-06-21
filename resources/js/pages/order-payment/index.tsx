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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { save } from '@/routes/order-payment';
import type { Order } from '@/types/order';
import ModalListPayment from './partials/modal-list-payment';
import ModalSavePayment from './partials/modal-save-payment';
import FileUpload from '@/components/file-upload';

// import { Textarea } from '@/components/ui/textarea';

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
const Info = ({ label, value }: any) => (
  <div>
    <Label>{label}</Label>
    <div className="mt-1 font-medium break-words">{value}</div>
  </div>
);

const SummaryBox = ({ title, value, highlight }: any) => (
  <div
    className={`rounded-xl border p-4 ${highlight ? 'border-orange-300' : ''}`}
  >
    <p className="text-sm text-muted-foreground">{title}</p>
    <h3 className="mt-2 text-xl font-bold">{value}</h3>
  </div>
);

export default function Index({ orders, stats }: Props) {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const { data, setData, post, processing, errors, reset } = useForm({
    orderId: '',
    paymentMethod: '',
    paymentChannel: '',
    amount: '',
    paidAt: '',
    note: '',
    images: [] as File[],
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
    return (
      (order?.payments ?? []).reduce(
        (total, payment) => total + Number(payment.amount),
        0,
      ) ?? 0
    );
  };

  const getRemaining = (order: Order) => {
    return Number(order?.total ?? 0) - calculatePaid(order);
  };

  const getStatus = (order: Order): 'UNPAID' | 'PARTIAL' | 'PAID' => {
    const paid = calculatePaid(order);

    if (paid <= 0) {
      return 'UNPAID';
    }

    if (paid < Number(order.total)) {
      return 'PARTIAL';
    }

    return 'PAID';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const openManagePayment = (order: Order) => {
    setSelectedOrder({
      ...order,
      payments: [
        {
          id: 'pay-001',
          payment_method: 'TRANSFER',
          payment_channel: 'BCA',
          amount: 500000,
          paid_at: '2026-06-19 14:20',
          status: 'SUCCESS',
          note: 'DP pertama',
          images: [
            {
              id: 'img-001',
              url: 'https://picsum.photos/200',
            },
          ],
        },
        {
          id: 'pay-002',
          payment_method: 'QRIS',
          payment_channel: 'OVO',
          amount: 300000,
          paid_at: '2026-06-19 18:10',
          status: 'SUCCESS',
          note: 'Pembayaran tambahan',
          images: [],
        },
      ],
    });

    reset();

    setData({
      orderId: order.id,
      paymentMethod: '',
      paymentChannel: '',
      amount: '',
      paidAt: '',
      note: '',
      images: [],
    });

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

                    const status = getStatus(order);

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
                          {formatCurrency(
                            Number(order.total),
                          )}
                        </TableCell>

                        <TableCell>
                          {formatCurrency(paid)}
                        </TableCell>

                        <TableCell>
                          {formatCurrency(remaining)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              status === 'PAID'
                                ? 'default'
                                : status ===
                                  'PARTIAL'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                          >
                            {status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              openManagePayment(
                                order,
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Manage
                          </Button>
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
        selectedOrder={selectedOrder}
        calculatePaid={calculatePaid}
        getRemaining={getRemaining}
        formatCurrency={formatCurrency}
        setMode={setMode}
        setSelectedPayment={setSelectedPayment}
        setOpenPaymentForm={setOpenPaymentForm}
        setData={setData}
        data={data}
      />

      <ModalSavePayment
        open={openPaymentForm}
        setOpen={setOpenPaymentForm}
        mode={mode}
        data={data}
        processing={processing}
        setData={setData}
        onSubmit={() => {
          console.log('SUBMIT PAYMENT:', data);
          console.log('MODE:', mode);
          console.log('ORDER:', selectedOrder);
          console.log('EDIT:', selectedPayment);
        }}
      />
    </div>
  );
}
