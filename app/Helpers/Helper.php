<?php

use Illuminate\Support\Facades\Lang;

function translations()
{
  return Lang::get("index", [], null, false);
}
