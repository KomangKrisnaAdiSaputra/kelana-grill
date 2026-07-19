<?php

namespace App\Helpers;

class MetaHelper
{
  protected static array $metaProperty = [];
  protected static array $twitterProperty = [];
  protected static array $meta = [];
  protected static string $title = '';
  protected static ?string $canonical = null;
  protected static array $breadcrumbLists = [];
  protected static array $schemas = [];

  /* ==========================
     * SETTERS
     * ========================== */

  public static function setTitle(string $content = ""): void
  {
    static::$title = $content . ' | ' . config('app.name');
  }

  public static function setCanonical(string $content = ""): void
  {
    static::$canonical = $content;
  }

  public static function addMeta(string $name, string $content = ""): void
  {
    static::$meta[$name] = $content;
  }

  public static function addOpenGraph(string $name, string $content = ""): void
  {
    static::$metaProperty['og:' . $name] = $content;
  }

  public static function addTwitter(string $name, string $content = ""): void
  {
    static::$twitterProperty['twitter:' . $name] = $content;
  }

  public static function addBreadcrumbLists(array $datas = []): void
  {
    static::$breadcrumbLists = $datas;
  }

  /* ==========================
     * BREADCRUMB JSON-LD
     * ========================== */

  public static function createBreadcrumbLists(array $breadcrumbs = []): string
  {
    $lists = [];
    $index = 1;

    foreach ($breadcrumbs as $breadcrumb) {
      $lists[] = [
        "@type" => "ListItem",
        "position" => $index,
        "name" => $breadcrumb['label'] ?? '',
        "item" => $breadcrumb['url'] ?? '',
      ];
      $index++;
    }

    $json = json_encode([
      "@context" => "https://schema.org",
      "@type" => "BreadcrumbList",
      "itemListElement" => $lists,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    return <<<HTML
        <script type="application/ld+json">
        {$json}
        </script>
        HTML;
  }

  public static function addSchema(array $schema): void
  {
    static::$schemas[] = $schema;
  }

  /* ==========================
     * RENDER HTML
     * ========================== */

  public static function render(): string
  {
    $html = '';
    // Title (HARUS paling atas)
    if (static::$title) {
      $html = "<title>" . static::$title . "</title>" . PHP_EOL . $html;
    }

    // Standard meta
    foreach (static::$meta as $name => $content) {
      $html .= "<meta name=\"{$name}\" content=\"{$content}\">" . PHP_EOL;
    }

    // OpenGraph
    foreach (static::$metaProperty as $name => $content) {
      $html .= "<meta property=\"{$name}\" content=\"{$content}\">" . PHP_EOL;
    }

    // Twitter Card (HARUS name)
    foreach (static::$twitterProperty as $name => $content) {
      $html .= "<meta name=\"{$name}\" content=\"{$content}\">" . PHP_EOL;
    }

    // Canonical
    if (static::$canonical) {
      $html .= "<link rel=\"canonical\" href=\"" . static::$canonical . "\">" . PHP_EOL;
    }

    // Breadcrumb
    if (!empty(static::$breadcrumbLists)) {
      $html .= static::createBreadcrumbLists(static::$breadcrumbLists);
    }

    // Schema.org JSON-LD
    foreach (static::$schemas as $schema) {
      $json = json_encode(
        $schema,
        JSON_UNESCAPED_SLASHES |
          JSON_UNESCAPED_UNICODE |
          JSON_PRETTY_PRINT
      );

      $html .= <<<HTML
<script type="application/ld+json">
{$json}
</script>

HTML;
    }

    return $html;
  }

  /* ==========================
     * RESET DATA
     * ========================== */

  public static function cleanup(): void
  {
    static::$meta = [];
    static::$metaProperty = [];
    static::$twitterProperty = [];
    static::$breadcrumbLists = [];
    static::$canonical = null;
    static::$title = config('app.name');
    static::$schemas = [];
  }
}
