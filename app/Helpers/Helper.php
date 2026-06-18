<?php

use Illuminate\Support\Facades\Lang;

function translations()
{
  return Lang::get("index", [], null, false);
}

function maskPhone(?string $phone, ?bool $hide = true): ?string
{
  if (!$phone) {
    return null;
  }

  if (!$hide) {
    return $phone;
  }

  return substr($phone, 0, 4) . str_repeat('*', max(strlen($phone) - 7, 0)) . substr($phone, -3);
}

function maskEmail(?string $email, ?bool $hide = true): ?string
{
  if (!$email || !str_contains($email, '@')) {
    return $email;
  }

  if (!$hide) {
    return $email;
  }

  [$name, $domain] = explode('@', $email);

  return substr($name, 0, 2) . str_repeat('*', max(strlen($name) - 2, 0)) . '@' . $domain;
}

function translate(string $text, string $file = 'index'): string
{
  if (app()->getLocale() !== 'id') {
    $translate = __("{$file}.{$text}");
    return str_replace("{$file}.", "", $translate);
  }

  return $text;
}

function accountBankLists(): array
{
  return [
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
}
