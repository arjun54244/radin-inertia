<?php

namespace App\Filament\Exports;

use App\Models\Product;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class ProductExporter extends Exporter
{
    protected static ?string $model = Product::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('name')
                ->label('Product Name'),
            ExportColumn::make('slug'),
            ExportColumn::make('sku')
                ->label('SKU'),
            ExportColumn::make('price')
                ->label('Price'),
            ExportColumn::make('quantity')
                ->label('Stock'),
            ExportColumn::make('brand.name')
                ->label('Brand'),
            ExportColumn::make('type')
                ->label('Product Type'),
            ExportColumn::make('is_visible')
                ->label('Visibility')
                ->state(fn (Product $record): string => $record->is_visible ? 'Visible' : 'Hidden'),
            ExportColumn::make('published_at')
                ->label('Publication Date'),
            ExportColumn::make('created_at')
                ->label('Created Date'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your product export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }

    public function getFileName(Export $export): string
    {
        return 'products-export-' . date('Y-m-d-His');
    }

    public static function getMaxRowsPerChunk(): int
    {
        return 100;
    }
}
