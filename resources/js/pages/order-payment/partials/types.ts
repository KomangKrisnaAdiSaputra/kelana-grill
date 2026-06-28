export type dataType = {
    id: string | null;
    orderId: string;
    image: {
        url: string;
        name: string;
    } | null;
    paymentMethod: string;
    paymentChannel: string;
    amount: number;
    paidAt: string;
    status: string;
    note: string;
};
