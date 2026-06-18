export type Order = {
    id: string;
    bookingId: string;

    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;

    pickupDate: string;
    returnDate: string;
    pickupLocation: string;

    guarantee: string;
    payment: string;
    note: string | null;

    status: OrderStatus;

    subTotal: number;
    total: number;

    details: OrderDetail[];

    payments: Payment[];
};

export type OrderDetail = {
    id: string;
    name: string;
    description: string | null;

    variant: {
        name: string | null;
        description: string | null;
    };

    marinade: boolean;
    qty: number;

    subTotal: number;
    total: number;

    packages: Package[];
};

export type Package = {
    id: string;
    nameMarinade: string | null;
    packageNumber: number;

    items: PackageItem[];
};

export type PackageItem = {
    id: string;
    name: string;
    description: string | null;

    qty: number;
    unit: string | null;

    marinade: boolean;

    options: PackageItemOption[];
};

export type PackageItemOption = {
    id: string;
    name: string;
    type: string; // MARINADE | CHOICE | dll
};

export type Payment =
    | {
          id?: string;
          method?: string;
          amount?: number;
          status?: string;
      }
    | Record<string, any>;

export type OrderStatus =
    | 'UNPAID'
    | 'PAID'
    | 'PROCESS'
    | 'READY'
    | 'COMPLETED'
    | 'CANCELLED';
