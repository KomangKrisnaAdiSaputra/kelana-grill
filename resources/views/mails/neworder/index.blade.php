@extends('mails.main')
@section('body')
    @php
        $cashPayments = [
            'Pembayaran dilakukan saat pengambilan.',
            'Mohon siapkan uang tunai sesuai tagihan.',
            'DP 50% tetap berlaku untuk reservasi tertentu.',
        ];

        $accountBankLists = [
            [
                'bank' => 'BCA',
                'name' => 'I Komang Krisna Adi Saputra',
                'no' => '6955216435',
            ],
            [
                'bank' => 'Mandiri',
                'name' => 'Putu Diah Gayatri Purnama Dewi',
                'no' => '1450015296474',
            ],
            [
                'bank' => 'Seabank',
                'name' => 'I Komang Krisna Adi Saputra',
                'no' => '901414714730',
            ],
        ];
    @endphp

    <div>
        <p style="margin:0 0 10px;font-size:16px;">
            {{ translate('Halo') }} <strong>{{ $order['firstName'] }} {{ $order['lastName'] }}</strong>,
        </p>

        <p style="margin:0 0 25px;color:#4b5563;line-height:24px;">
            {{ translate('Terima kasih atas pesanan Anda.') }}
            {{ translate('Pesanan Anda telah berhasil dibuat dan sedang menunggu pembayaran.') }}
        </p>

        {{-- STATUS --}}
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">

                    <span
                        style="display:inline-block; background:#FEF3C7; color:#92400E; padding:8px 18px; border-radius:999px; font-size:13px; font-weight:600;">
                        {{ translate('Menunggu Pembayaran') }}
                    </span>

                </td>
            </tr>
        </table>

        <div style="height:30px"></div>

        {{-- DETAIL BOOKING --}}
        <h2 style="margin:0 0 15px;font-size:18px;">
            {{ translate('Detail Booking') }}
        </h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;">
            <tr>
                <td style="padding:18px;">

                    <table width="100%">
                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                Booking ID
                            </td>
                            <td align="right">
                                <strong>{{ $order['bookingId'] }}</strong>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                {{ translate('Tanggal Pengambilan') }}
                            </td>
                            <td align="right">
                                {{ $order['pickupDate'] }}
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                {{ translate('Tanggal Pengembalian') }}
                            </td>
                            <td align="right">
                                {{ $order['returnDate'] }}
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                {{ translate('Lokasi Pengambilan') }}
                            </td>
                            <td align="right">
                                {{ $order['pickupLocation'] }}
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                {{ translate('Jaminan') }}
                            </td>
                            <td align="right">
                                {{ $order['guarantee'] }}
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:6px 0;color:#6b7280;">
                                {{ translate('Pembayaran') }}
                            </td>
                            <td align="right">
                                {{ $order['payment'] }}
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

        <div style="height:30px"></div>

        {{-- ITEM --}}
        <h2 style="margin:0 0 15px;font-size:18px;">
            {{ translate('Ringkasan Pesanan') }}
        </h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;">

            @foreach ($order['details'] as $item)
                <tr>
                    <td style="padding:15px 18px; border-bottom:1px solid #f3f4f6;">
                        <table width="100%">
                            <tr>
                                <td>
                                    <strong>{{ $item['name'] }}</strong>
                                    @if (!empty($item['variant']['name']))
                                        <br>
                                        <small style="color:#6b7280;">
                                            {{ $item['variant']['name'] }}
                                        </small>
                                    @endif
                                </td>
                                <td align="right">
                                    x{{ $item['qty'] }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            @endforeach
        </table>
        <div style="height:30px"></div>
        {{-- TOTAL --}}
        <table width="100%" style="background:#f9fafb;border-radius:12px;">
            <tr>
                <td style="padding:20px;">
                    <table width="100%">
                        <tr>
                            <td>{{ translate('Total Pesanan') }}</td>
                            <td align="right">
                                <strong>
                                    IDR {{ number_format($order['total'], 0, ',', '.') }}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top:10px;">
                                {{ translate('DP Minimum') }} (50%)
                            </td>
                            <td align="right" style="padding-top:10px;">
                                <strong style="color:#dc2626;">
                                    IDR {{ number_format($order['total'] * 0.5, 0, ',', '.') }}
                                </strong>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div style="height:30px"></div>
        {{-- PEMBAYARAN --}}
        @if (strtolower($order['payment']) === 'transfer')
            <div style="background:#eff6ff; border:1px solid #bfdbfe;border-radius:12px;padding:20px;">
                <h3 style="margin-top:0;">
                    Transfer Bank
                </h3>
                <p>
                    {{ translate('Silakan transfer ke salah satu rekening berikut:') }}
                </p>
                @foreach ($accountBankLists as $accountBankList)
                    <p style="line-height:28px;">
                        <strong>{{ $accountBankList['bank'] }}</strong><br>
                        <em>{{ $accountBankList['no'] }}</em> / a.n
                        <em><strong>{{ $accountBankList['name'] }}</strong></em>
                    </p>
                @endforeach
                <p style="margin-bottom:0;">
                    {{ translate('Setelah transfer, simpan bukti pembayaran Anda.') }}
                </p>
            </div>
        @else
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px;">
                <h3 style="margin-top:0;">
                    {{ translate('Pembayaran Cash') }}
                </h3>
                <ul style="padding-left:20px;margin-bottom:0;">
                    @foreach ($cashPayments as $cashPayment)
                        <li>{{ translate($cashPayment) }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div style="height:30px"></div>

        {{-- NOTE --}}
        <div style="background:#FEF2F2; border-left:4px solid #EF4444; padding:18px; border-radius:8px;">
            <strong>{{ translate('Informasi Penting') }}</strong>
            <p style="margin-bottom:0;line-height:24px;">
                {{ translate('Pesanan yang mengandung produk daging atau dilakukan jauh hari sebelum tanggal pengambilan diwajibkan melakukan pembayaran DP minimal') }}
                <strong>50%</strong> {{ translate('sebagai tanda jadi dan reservasi stok.') }}
            </p>
        </div>
        <div style="height:35px"></div>

        {{-- BUTTON --}}
        <table width="100%">
            <tr>
                <td align="center">
                    <a href="{{ route('landing.booking.status', ['id' => $order['id'], 'locale' => 'id']) }}"
                        style="background:#111827; color:#ffffff; text-decoration:none; padding:14px 30px; border-radius:10px; display:inline-block; font-weight:600;">
                        {{ translate('Lihat Status Pesanan') }}
                    </a>
                </td>
            </tr>
        </table>
    </div>
@endsection
