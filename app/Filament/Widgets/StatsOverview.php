<?php

namespace App\Filament\Widgets;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 2;
    protected static ?string $pollingInterval = '15s';
    protected static bool $isLazy = true;

    protected function getStats(): array
    {
        // Customers chart data - last 7 days
        $customerStats = User::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as total'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date')
            ->all();

        $customerChart = $this->generateChartData($customerStats);
        $customerCount = User::count();
        $customerColor = $this->getTrendColor($customerChart);

        // Products chart data (dummy static here — can be enhanced with date if needed)
        $productCount = Product::count();

        // Pending orders chart data
        $pendingOrders = Order::where('status', OrderStatusEnum::PENDING->value)->count();
        $orderStats = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as total'))
            ->where('status', OrderStatusEnum::PENDING->value)
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date')
            ->all();

        $orderChart = $this->generateChartData($orderStats);
        $orderColor = $this->getTrendColor($orderChart);

        return [
            Stat::make('Total Customers', $customerCount)
                ->description('Last 7 days growth')
                ->descriptionIcon($customerColor === 'success' ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($customerColor)
                ->chart($customerChart),

            Stat::make('Total Products', $productCount)
                ->description('Current total products')
                ->descriptionIcon('heroicon-m-cube')
                ->color('primary') 
                ->chart(array_fill(0, 8, $productCount)), // placeholder chart

            Stat::make('Pending Orders', $pendingOrders)
                ->description('Pending orders (7 days)')
                ->descriptionIcon($orderColor === 'success' ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($orderColor)
                ->chart($orderChart),
        ];
    }

    private function generateChartData(array $dailyData): array
    {
        $chart = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $chart[] = $dailyData[$date] ?? 0;
        }
        return $chart;
    }

    private function getTrendColor(array $chart): string
    {
        if (count($chart) < 2) return 'gray';

        return end($chart) > reset($chart) ? 'success' : 'danger';
    }
}
