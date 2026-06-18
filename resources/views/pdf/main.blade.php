<style>
    * {
        box-sizing: border-box;
    }

    body {
        font-family: DejaVu Sans, sans-serif;
        font-size: 12px;
        color: #374151;
        margin: 0;
        background: #ffffff;
    }

    .wrapper {
        border: 1px solid #E5E7EB;
        min-height: 100%;
        position: relative;
    }

    .content {
        padding: 24px;
        padding-bottom: 140px;
    }

    .footer {
        position: absolute;
        bottom: 30px;
        left: 24px;
        right: 24px;
    }

    .card table tr td {
        padding: 5px 0;
    }

    .label {
        width: 180px;
        color: #6B7280;
        font-weight: bold;
    }

    .value {
        color: #111827;
    }

    .section-header {
        background: #FFF7ED;
        border-left: 4px solid #FB923C;
        padding: 10px 14px;
        font-weight: bold;
        color: #9A3412;
        margin-bottom: 12px;
    }

    .header {
        background: #FFF7ED;
        border-bottom: 4px solid #FB923C;
        padding: 24px;
    }

    .logo {
        height: 70px;
    }

    .company-name {
        font-size: 22px;
        font-weight: bold;
        color: #9A3412;
        margin-top: 8px;
    }

    .company-desc {
        color: #78716C;
        font-size: 12px;
        margin-top: 4px;
    }

    .invoice-title {
        font-size: 34px;
        font-weight: bold;
        color: #EA580C;
        margin: 0;
    }

    .invoice-number {
        color: #6B7280;
        margin-top: 4px;
    }

    .status {
        display: inline-block;
        padding: 6px 14px;
        font-size: 11px;
        font-weight: bold;
        border-radius: 20px;
        margin-top: 10px;
    }

    .status-unpaid {
        background: #FEF3C7;
        color: #92400E;
    }

    .status-paid {
        background: #DCFCE7;
        color: #166534;
    }

    .status-partial {
        background: #DBEAFE;
        color: #1D4ED8;
    }

    .content {
        padding: 24px;
    }

    .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #111827;
        margin-bottom: 10px;
    }

    .card {
        border: 1px solid #E5E7EB;
        padding: 15px;
    }

    .items {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }

    .items thead th {
        background: #F9FAFB;
        border-top: 1px solid #E5E7EB;
        border-bottom: 1px solid #E5E7EB;
        padding: 12px;
        text-align: left;
    }

    .items tbody td {
        padding: 12px;
        border-bottom: 1px solid #F3F4F6;
    }

    .text-right {
        text-align: right;
    }

    .text-center {
        text-align: center;
    }

    .variant {
        color: #6B7280;
        font-size: 10px;
        margin-top: 3px;
    }

    .divider {
        height: 20px;
    }
</style>

<body>

    <div class="wrapper">

        {{-- HEADER --}}
        <div class="header">
            <table width="100%">
                <tr>
                    <td width="60%">
                        <img src="https://res.cloudinary.com/dikjbuftt/image/upload/v1781186432/Logo_te88na.png"
                            loading="lazy" decoding="async" class="logo">
                        <div class="company-name">
                            {{ config('app.name') }}
                        </div>
                        <div class="company-desc">
                            Grill Rental & BBQ Package Bali
                        </div>
                    </td>

                    <td width="40%" align="right">
                        <h1 class="invoice-title">
                            INVOICE
                        </h1>
                        <div class="invoice-number">
                            @yield('bookingId')
                        </div>
                        {{-- <div class="invoice-number">
                            {{ now()->format('d M Y') }}
                        </div> --}}
                        @php
                            $orderStatus = strtoupper(trim($__env->yieldContent('orderStatus')));
                            $statusClass = match ($orderStatus) {
                                'PAID' => 'status-paid',
                                'PARTIAL' => 'status-partial',
                                default => 'status-unpaid',
                            };
                        @endphp
                        <span class="status {{ $statusClass }}">
                            {{ $orderStatus }}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <div class="content">

            @yield('content')

            {{-- SIGNATURE --}}
            {{-- <table width="100%" style="
                margin-top:40px;
            ">
        <tr>

          <td width="50%">
            <strong>
              Customer Signature
            </strong>

            <br><br><br><br><br>

            ______________________
          </td>

          <td width="50%" align="right">
            <strong>
              Premium Rental Grill
            </strong>

            <br><br><br><br><br>

            ______________________
          </td>

        </tr>
      </table> --}}

            {{-- FOOTER --}}
            <div class="footer">

                <hr style="border:none;border-top:1px solid #E5E7EB;">
                <div style=" text-align:center;  margin-top:15px; color:#6B7280; line-height:18px;">

                    <strong style=" color:#111827; ">
                        {{ translate('Terima kasih telah memilih') }} {{ config('app.name') }}
                    </strong>
                    <br><br>
                    {{ translate('Pesanan yang berisi produk daging atau reservasi yang dilakukan jauh sebelum tanggal pengambilan memerlukan deposit minimal 50%.') }}
                    <br><br>
                    {{ config('app.name') }} &copy; {{ date('Y') }}
                </div>
            </div>
        </div>
    </div>
</body>
