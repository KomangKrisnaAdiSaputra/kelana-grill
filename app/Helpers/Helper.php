<?php

use Illuminate\Support\Facades\Lang;

function translations()
{
  return Lang::get("index", [], null, false);
}

function maskPhone(?string $phone): ?string
{
  if (!$phone) {
    return null;
  }

  return substr($phone, 0, 4) . str_repeat('*', max(strlen($phone) - 7, 0)) . substr($phone, -3);
}

function maskEmail(?string $email): ?string
{
  if (!$email || !str_contains($email, '@')) {
    return $email;
  }

  [$name, $domain] = explode('@', $email);

  return substr($name, 0, 2) . str_repeat('*', max(strlen($name) - 2, 0)) . '@' . $domain;
}
