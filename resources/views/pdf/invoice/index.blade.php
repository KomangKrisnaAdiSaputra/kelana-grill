@extends('pdf.main')

@section('bookingId', $order['bookingId'])
@section('orderStatus', $order['status'])

@section('content')
    <div>
        <div class="card">
            <div class="section-header">
                {{ translate('Informasi Pelanggan') }}
            </div>
            <table width="100%">
                <tr>
                    <td class="label">{{ translate('Nama Pelanggan') }}</td>
                    <td class="value">
                        : {{ $order['firstName'] }} {{ $order['lastName'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Nomor Telepon') }}</td>
                    <td class="value">
                        : {{ $order['phone'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">Email</td>
                    <td class="value">
                        : {{ $order['email'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Alamat') }}</td>
                    <td class="value">
                        : {{ $order['address'] }}
                    </td>
                </tr>
            </table>

            <div style=" margin:18px 0;border-top:1px solid #E5E7EB;"></div>

            <div class="section-header">
                {{ translate('Informasi Pemesanan') }}
            </div>

            <table width="100%">
                <tr>
                    <td class="label">Booking ID</td>
                    <td class="value">
                        : {{ $order['bookingId'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Tanggal Pengambilan') }}</td>
                    <td class="value">
                        : {{ $order['pickupDate'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Tanggal Pengembalian') }}</td>
                    <td class="value">
                        : {{ $order['returnDate'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Lokasi Pengambilan') }}/td>
                    <td class="value">
                        : {{ $order['pickupLocation'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Jaminan') }}</td>
                    <td class="value">
                        : {{ $order['guarantee'] }}
                    </td>
                </tr>
                <tr>
                    <td class="label">{{ translate('Pembayaran') }}</td>
                    <td class="value">
                        : {{ $order['payment'] }}
                    </td>
                </tr>
            </table>

        </div>

        <div class="divider" />

        {{-- ORDER SUMMARY --}}
        <div style="margin-top:25px;" class="section-header">
            {{ translate('Detail Pesanan') }}
        </div>

        <table class="items">
            <thead>
                <tr>
                    <th>Item</th>
                    <th width="80">Qty</th>
                    <th width="150" class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order['details'] as $item)
                    <tr>
                        <td>
                            <strong>
                                {{ $item['name'] }}
                            </strong>
                            @if (!empty($item['variant']['name']))
                                <div class="variant">
                                    {{ $item['variant']['name'] }}
                                </div>
                            @endif
                        </td>
                        <td class="text-center">
                            {{ $item['qty'] }}
                        </td>
                        <td class="text-right">
                            IDR {{ number_format($item['total'], 0, ',', '.') }}
                        </td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="2">
                        <strong>Total</strong>
                    </td>
                    <td class="text-right">
                        <strong>
                            IDR {{ number_format($order['total'], 0, ',', '.') }}
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>

        {{-- DEPOSIT --}}
        <div
            style="margin-top:25px; border:1px solid #FDBA74; background:#FFF7ED; padding:16px; page-break-inside: avoid; break-inside: avoid;">
            <div
                style=" margin-top:20px; border:1px solid #FDBA74; background:#FFF7ED; padding:18px; page-break-inside: avoid; break-inside: avoid;">
                <div
                    style=" color:#9A3412; font-weight:bold; font-size:14px; page-break-inside: avoid; break-inside: avoid;">
                    {{ translate('Minimal Deposit 50% Diperlukan') }}
                </div>

                <div
                    style="margin-top:6px; font-size:24px; font-weight:bold; color:#EA580C; page-break-inside: avoid; break-inside: avoid;">
                    IDR {{ number_format($order['total'] * 0.5, 0, ',', '.') }}
                </div>

            </div>

            <div style="margin-top:8px; color:#7C2D12; line-height:18px; page-break-inside: avoid; break-inside: avoid;">
                {{ translate('Pesanan yang berisi produk daging atau reservasi yang dilakukan lebih awal memerlukan deposit minimal untuk mengamankan stok dan mengonfirmasi pemesanan.') }}
            </div>
        </div>

        {{-- PAYMENT INFORMATION --}}
        <div style="margin-top:25px; page-break-inside: avoid; break-inside: avoid;">
            <div class="section-header">
                {{ translate('Informasi Pembayaran') }}
            </div>
            <div style="border:1px solid #E5E7EB; padding:16px; page-break-inside: avoid; break-inside: avoid;">
                @if (strtolower($order['payment']) === 'transfer')
                    <!-- LIST VERTICAL -->
                    <div style="display:block;">
                        @foreach (accountBankLists() as $accountBankList)
                            <div style="margin-bottom:16px; page-break-inside: avoid;">
                                <strong>{{ $accountBankList['bank'] }}</strong><br>
                                <em>{{ $accountBankList['no'] }}</em> / a.n
                                <em><strong>{{ $accountBankList['name'] }}</strong></em>
                            </div>
                        @endforeach
                    </div>
                    <div style="margin-top:15px; color:#6B7280; page-break-inside: avoid;">
                        {{ translate('Setelah melakukan pembayaran, harap simpan bukti transfer sebagai bukti pembayaran untuk keperluan verifikasi.') }}
                    </div>
                @else
                    <div style="page-break-inside: avoid;">
                        {{ translate('Pembayaran dapat dilakukan saat pengambilan.') }}
                    </div>
                    <div style="margin-top:10px; page-break-inside: avoid;">
                        {{ translate('Mohon siapkan uang pas sesuai dengan jumlah pada invoice.') }}
                    </div>
                    <div style="margin-top:10px; color:#6B7280; page-break-inside: avoid;">
                        {{ translate('Deposit 50% masih mungkin diperlukan untuk beberapa reservasi tertentu.') }}
                    </div>
                @endif

            </div>
        </div>

        {{-- CUSTOMER NOTE --}}
        @if (!empty($order['note']))
            <div style="margin-top:25px;  page-break-inside: avoid; break-inside: avoid;">

                <div class="section-title page-break-inside: avoid; break-inside: avoid;">
                    {{ translate('Catatan Pelanggan') }}
                </div>

                <div
                    style="border:1px solid #E5E7EB; background:#F9FAFB; padding:16px; page-break-inside: avoid; break-inside: avoid;">
                    {{ $order['note'] }}
                </div>
            </div>
        @endif
    </div>
@endsection
