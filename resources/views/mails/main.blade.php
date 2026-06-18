<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f7fb">
        <tr>
            <td align="center" style="padding:30px 15px;">
                <table width="700" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:700px;background:#ffffff;border-radius:16px;overflow:hidden;">

                    {{-- HEADER --}}
                    <tr>
                        <td
                            style=" background:#fff7ed; padding:48px 30px; text-align:center;border-bottom:4px solid #fb923c;">
                            <img src="https://res.cloudinary.com/dikjbuftt/image/upload/v1781186432/Logo_te88na.png"
                                alt="Premium Rental Grill" width="90" style="display:block;margin:0 auto 18px;">

                            <div
                                style="display:inline-block; background:#fed7aa; color:#9a3412; font-size:12px;font-weight:600; padding:6px 12px; border-radius:999px; margin-bottom:16px;">
                                PREMIUM RENTAL GRILL
                            </div>

                            <h1 style="margin:0; font-size:28px;font-weight:700;color:#7c2d12;">

                                {{ translate('Pesanan Berhasil Dibuat') }}
                            </h1>

                            <p style=" margin:12px 0 0; color:#9a3412; font-size:14px; line-height:22px;">
                                {{ translate('Terima kasih telah mempercayakan kebutuhan grill Anda kepada kami.') }}
                            </p>
                        </td>
                    </tr>

                    {{-- BODY --}}
                    <tr>
                        <td style="padding:35px 30px;">
                            @yield('body')
                        </td>
                    </tr>

                    {{-- FOOTER --}}
                    <tr>
                        <td
                            style=" background:#f9fafb; padding:25px; text-align:center; color:#6b7280; font-size:13px;">
                            <strong>Premium Rental Grill</strong>
                            <br><br>
                            {{ translate('Terima kasih telah mempercayakan kebutuhan grill Anda kepada kami.') }}
                            <br><br>
                            © {{ date('Y') }} Premium Rental Grill.
                            All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
