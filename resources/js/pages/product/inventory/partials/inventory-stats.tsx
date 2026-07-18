import {
  Archive,
  AlertTriangle,
  PackageX,
  Boxes,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  stats: {
    total: number;
    lowStock: number;
    outOfStock: number;
    totalStock: number;
  };
}

export default function InventoryStats({ stats }: Props) {
  const items = [
    {
      title: 'Total Inventory',
      value: stats.total,
      icon: Archive,
    },
    {
      title: 'Low Stock',
      value: stats.lowStock,
      icon: AlertTriangle,
    },
    {
      title: 'Out Of Stock',
      value: stats.outOfStock,
      icon: PackageX,
    },
    {
      title: 'Total Stock',
      value: stats.totalStock,
      icon: Boxes,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>

            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}