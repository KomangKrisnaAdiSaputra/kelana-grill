import { Plus, Trash2 } from 'lucide-react';
import DynamicSelect from '@/components/dynamic-select';
import { InputNumber } from '@/components/input-number';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type {
  AlaCarteProduct,
  Product,
  ProductBadge,
  ProductCategory,
  ProductType,
  Unit,
} from './types';

interface ProductModalSaveProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;

  isEdit: boolean;

  data: Product;
  setData: any;

  errors: Record<string, string>;

  processing: boolean;

  language: 'id' | 'en';
  setLanguage: (value: 'id' | 'en') => void;

  types: ProductType[];
  categories: ProductCategory[];
  badges: ProductBadge[];
  alaCarteProducts: AlaCarteProduct[];

  countLanguageErrors: (lang: 'id' | 'en') => number;

  handleSubmit: () => void;
  units: Unit[]

}
export default function ProductModalSave({
  open,
  onOpenChange,
  isEdit,
  data,
  setData,
  errors,
  processing,
  language,
  setLanguage,
  types,
  categories,
  badges,
  alaCarteProducts,
  countLanguageErrors,
  handleSubmit,
  units
}: ProductModalSaveProps) {
  const typePackage = Boolean(types.filter((t) => t.id === data.typeId && t.name === 'PACKAGE').length > 0);
  const withVariant = Boolean((data.variants ?? []).length <= 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-h-[90vh] sm:max-w-4xl p-0" onInteractOutside={(e) => e.preventDefault()}>
        <div className="flex h-[90vh] max-h-[90vh] flex-col">

          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>
              {isEdit ? 'Edit Product' : 'Add Product'}
            </DialogTitle>

            <DialogDescription>Form Manage Product</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">

              {/* FLAGS */}
              <div className={`grid gap-3 md:${withVariant ? "grid-cols-4" : "grid-cols-3"}`}>
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="font-medium">Active</p>

                    <p className="text-xs text-muted-foreground">
                      Product visible
                    </p>
                  </div>

                  <Switch
                    checked={data.active}
                    onCheckedChange={(value) =>
                      setData('active', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="font-medium">Featured</p>

                    <p className="text-xs text-muted-foreground">
                      Highlight product
                    </p>
                  </div>

                  <Switch
                    checked={data.featured}
                    onCheckedChange={(value) =>
                      setData('featured', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="font-medium">New Product</p>

                    <p className="text-xs text-muted-foreground">
                      Show new badge
                    </p>
                  </div>

                  <Switch
                    checked={data.new}
                    onCheckedChange={(value) =>
                      setData('new', value)
                    }
                  />
                </div>

                {(withVariant) && (
                  <div className="flex items-center justify-between rounded-xl border p-4">
                    <div>
                      <p className="font-medium">Marinade</p>

                      <p className="text-xs text-muted-foreground">
                        Mark this product as marinated
                      </p>
                    </div>

                    <Switch
                      checked={data.marinade}
                      onCheckedChange={(value) =>
                        setData('marinade', value)
                      }
                    />
                  </div>
                )}
              </div>

              {/* BASIC INFO */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Type</Label>

                  <DynamicSelect
                    options={types}
                    value={data.typeId}
                    onChange={(value) => {
                      setData('variants', []);
                      setData('typeId', value as string);
                    }}
                    getValue={(item) => item.id}
                    getLabel={(item) => item.name}
                    placeholder="Select Type"
                    error={errors.typeId}
                  />
                </div>

                {withVariant && (
                  <div className="space-y-2">
                    <Label>Rate</Label>

                    <InputNumber
                      currency
                      prefix="IDR"
                      value={data.rate}
                      onChange={(value) => setData('rate', value)}
                      error={errors.rate}
                      placeholder="50.000"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Category</Label>

                  <DynamicSelect
                    multiple
                    options={categories}
                    value={data.categories}
                    onChange={(value) =>
                      setData('categories', value as string[])
                    }
                    getValue={(item) => item.value}
                    getLabel={(item) => item.label}
                    placeholder="Select Categories"
                    error={errors.categories}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Badge</Label>

                  <DynamicSelect
                    multiple
                    options={badges}
                    value={data.badges}
                    onChange={(value) =>
                      setData('badges', value as string[])
                    }
                    getValue={(item) => item.value}
                    getLabel={(item) => item.label}
                    placeholder="Select Badges"
                    error={errors.badges}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Qty</Label>

                  <InputNumber
                    suffix={
                      <Select value={data?.unitId ?? ''} onValueChange={(value) => setData('unitId', value)}>
                        <SelectTrigger className="h-8 w-15 border-0 bg-transparent px-2 shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {units.map((item, idx) =>
                            <SelectItem key={idx} value={item.value}>{item.label}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    }
                    value={data.qty}
                    onChange={(value) => setData('qty', value)}
                    error={errors.qty}
                    placeholder="500"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div className="space-y-2">
                <Label>Image</Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    setData('image', file);
                  }}
                />

                {typeof data.image === 'string' && data.image && (
                  <img
                    src={data.image}
                    className="mt-2 h-32 rounded-xl border object-cover"
                  />
                )}
              </div>

              {/* LANGUAGE TAB */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={language === 'id' ? 'default' : 'outline'}
                  onClick={() => setLanguage('id')}
                  className="relative"
                >
                  Indonesia
                  {countLanguageErrors('id') > 0 && (
                    <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground text-white">
                      {countLanguageErrors('id')}
                    </span>
                  )}
                </Button>

                <Button
                  type="button"
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="relative"
                >
                  English
                  {countLanguageErrors('en') > 0 && (
                    <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground text-white">
                      {countLanguageErrors('en')}
                    </span>
                  )}
                </Button>
              </div>

              <div className="space-y-4 rounded-xl border p-4">
                <div className="space-y-2">
                  <Label>Name</Label>

                  <Input
                    value={data.translations[language].name}
                    onChange={(e) =>
                      setData('translations', {
                        ...data.translations,
                        [language]: {
                          ...data.translations[language],
                          name: e.target.value,
                        },
                      })
                    }
                  />

                  {errors[`translations.${language}.name`] && (
                    <p className="text-sm text-destructive">
                      {errors[`translations.${language}.name`]}
                    </p>
                  )}
                </div>

                {data.featured && (
                  <div className="space-y-2">
                    <Label>Featured Label</Label>

                    <Input
                      value={
                        data.translations[language]
                          .featuredLabel
                      }
                      onChange={(e) =>
                        setData('translations', {
                          ...data.translations,
                          [language]: {
                            ...data.translations[language],
                            featuredLabel: e.target.value,
                          },
                        })
                      }
                    />

                    {errors[
                      `translations.${language}.featuredLabel`
                    ] && (
                        <p className="text-sm text-destructive">
                          {
                            errors[
                            `translations.${language}.featuredLabel`
                            ]
                          }
                        </p>
                      )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Description</Label>

                  <textarea
                    rows={5}
                    value={
                      data.translations[language].description ??
                      ''
                    }
                    onChange={(e) =>
                      setData('translations', {
                        ...data.translations,
                        [language]: {
                          ...data.translations[language],
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border px-3 py-2"
                  />
                </div>
              </div>

              {/* PRODUCT VARIANTS */}
              {typePackage && (
                <div className="space-y-4 rounded-xl border p-4">
                  <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b flex items-center justify-between pb-3">

                    <div>
                      <h3 className="font-semibold">
                        Product Variants
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Create pricing variants for this
                        package.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setData('rate', 0);
                        setData('marinade', false);
                        setData('variants', [
                          ...(data.variants ?? []),
                          {
                            id: null,
                            rate: null,
                            minPerson: null,
                            maxPerson: null,
                            active: true,
                            marinade: false,
                            translations: {
                              id: {
                                name: '',
                                description: '',
                              },
                              en: {
                                name: '',
                                description: '',
                              },
                            },
                          },
                        ]);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Variant
                    </Button>
                  </div>

                  {(data.variants ?? []).length === 0 && (
                    <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No variants added yet.
                    </div>
                  )}

                  {(data.variants ?? []).map((variant, index) => (
                    <Card key={index} className='py-1'>
                      <CardContent className="space-y-4 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">
                              Variant #{index + 1}
                            </h4>

                            <p className="text-xs text-muted-foreground">
                              Package pricing option
                            </p>
                          </div>

                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setData(
                                'variants',
                                data.variants.filter(
                                  (_, i) =>
                                    i !== index,
                                ),
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">Active</p>

                              <p className="text-xs text-muted-foreground">
                                Variant available
                              </p>
                            </div>

                            <Switch
                              checked={variant.active}
                              onCheckedChange={(value) => {
                                const variants = [...data.variants];

                                variants[index].active = value;

                                setData('variants', variants);
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">Marinade</p>

                              <p className="text-xs text-muted-foreground">
                                Mark this variant as marinated
                              </p>
                            </div>

                            <Switch
                              checked={variant.marinade}
                              onCheckedChange={(value) => {
                                const variants = [...data.variants];

                                variants[index].marinade = value;

                                setData('variants', variants);
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <Label>Rate</Label>

                            <InputNumber
                              currency
                              prefix="IDR"
                              value={variant.rate}
                              onChange={(value) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[index].rate =
                                  value;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                            />
                          </div>

                          <div>
                            <Label>Min Person</Label>

                            <InputNumber
                              value={variant.minPerson}
                              onChange={(value) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].minPerson =
                                  value as number;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                            />
                          </div>

                          <div>
                            <Label>Max Person</Label>

                            <InputNumber
                              value={variant.maxPerson}
                              onChange={(value) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].maxPerson =
                                  value as number;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Name (Indonesia)</Label>

                            <Input
                              value={
                                variant.translations.id
                                  .name
                              }
                              onChange={(e) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].translations.id.name =
                                  e.target.value;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Name (English)</Label>

                            <Input
                              value={
                                variant.translations.en
                                  .name
                              }
                              onChange={(e) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].translations.en.name =
                                  e.target.value;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label>
                              Description (Indonesia)
                            </Label>

                            <textarea
                              rows={3}
                              value={
                                variant.translations.id
                                  .description
                              }
                              onChange={(e) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].translations.id.description =
                                  e.target.value;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                              className="w-full rounded-xl border px-3 py-2"
                            />
                          </div>

                          <div>
                            <Label>
                              Description (English)
                            </Label>

                            <textarea
                              rows={3}
                              value={
                                variant.translations.en
                                  .description
                              }
                              onChange={(e) => {
                                const variants = [
                                  ...data.variants,
                                ];

                                variants[
                                  index
                                ].translations.en.description =
                                  e.target.value;

                                setData(
                                  'variants',
                                  variants,
                                );
                              }}
                              className="w-full rounded-xl border px-3 py-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* PACKAGE ITEMS */}
              {types.some((t) => t.id === data.typeId && t.name === 'PACKAGE' || types.some((t) => t.id === data.typeId && t.name === 'CHOICE')) && (
                <div className="space-y-4 rounded-xl border p-4">
                  <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b flex items-center justify-between pb-3">
                    <div>
                      <h3 className="font-semibold">
                        Package Items
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Products included in this package.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setData('items', [
                          ...(data.items ?? []),
                          {
                            itemProductId: '',
                            qty: 1,
                            unit: null,
                          },
                        ]);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  {errors.items && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3">
                      <p className="text-sm text-red-600">
                        {errors.items}
                      </p>
                    </div>
                  )}
                  {(data.items ?? []).length === 0 && (
                    <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No items added yet.
                    </div>
                  )}

                  <div className={`grid gap-4 md:${types.some((t) => t.id === data.typeId && t.name !== 'CHOICE') ? 'grid-cols-1' : 'grid-cols-3'} `}>
                    {(data.items ?? []).map((item, index) => (
                      <Card key={index} className="relative overflow-visible">
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-3 right-3 z-10"
                          onClick={() => {
                            setData(
                              'items',
                              data.items.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <CardContent className="p-4">
                          <div className={`grid gap-4 md:${types.some((t) => t.id === data.typeId && t.name !== 'CHOICE') ? 'grid-cols-3' : 'grid-cols-1'}`}>
                            <div>
                              <Label className="flex items-center gap-1 mb-2">
                                Product

                                {data.items[index].description && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span
                                          className="max-w-[180px] truncate text-sm font-normal text-muted-foreground"
                                        >
                                          ({data.items[index].description})
                                        </span>
                                      </TooltipTrigger>

                                      <TooltipContent>
                                        <p>{data.items[index].description}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </Label>

                              <DynamicSelect
                                options={alaCarteProducts}
                                value={item.itemProductId}
                                onChange={(value) => {
                                  const findAlaCarte = alaCarteProducts.find((alaCarteProduct) => alaCarteProduct.id === value);
                                  const items = [
                                    ...data.items,
                                  ];

                                  items[index].itemProductId = value as string;
                                  items[index].description = findAlaCarte?.description as string;

                                  setData('items', items);
                                }}
                                getValue={(item) => item.id}
                                getLabel={(item) =>
                                  item.name
                                }
                                placeholder="Select Product"
                                error={
                                  errors[
                                  `items.${index}.itemProductId`
                                  ]
                                }
                              />
                            </div>

                            {types.some((t) => t.id === data.typeId && t.name !== 'CHOICE') && (
                              <>
                                <div>
                                  <Label>Qty</Label>

                                  <InputNumber
                                    value={item.qty}
                                    onChange={(value) => {
                                      const items = [
                                        ...data.items,
                                      ];

                                      items[index].qty =
                                        Number(value ?? 0);

                                      setData('items', items);
                                    }}
                                    error={
                                      errors[
                                      `items.${index}.qty`
                                      ]
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Unit</Label>

                                  <Input
                                    value={item.unit ?? ''}
                                    onChange={(e) => {
                                      const items = [
                                        ...data.items,
                                      ];

                                      items[index].unit =
                                        e.target.value;

                                      setData('items', items);
                                    }}
                                    placeholder="pcs"
                                  />

                                  {errors[
                                    `items.${index}.unit`
                                  ] && (
                                      <p className="text-sm text-destructive">
                                        {
                                          errors[
                                          `items.${index}.unit`
                                          ]
                                        }
                                      </p>
                                    )}
                                </div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          <DialogFooter className="border-t px-6 py-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={processing}>
              {processing
                ? 'Saving...'
                : isEdit
                  ? 'Update Product'
                  : 'Create Product'}
            </Button>
          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  );
}
