import { Package, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProductStatsProps {
  stats: {
    total: number;
    active: number;
    featured: number;
    newest: number;
  };
}

export default function ProductStats({ stats }: ProductStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Products
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-xl bg-primary/10 p-3">
            <Package className="h-5 w-5 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">
              Active
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              {stats.active}
            </h2>
          </div>

          <div className="rounded-xl bg-emerald-500/10 p-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-bold text-amber-600">
              {stats.featured}
            </h2>
          </div>

          <div className="rounded-xl bg-amber-500/10 p-3">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">
              New Product
            </p>

            <h2 className="mt-2 text-3xl font-bold text-sky-600">
              {stats.newest}
            </h2>
          </div>

          <div className="rounded-xl bg-sky-500/10 p-3">
            <Sparkles className="h-5 w-5 text-sky-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}