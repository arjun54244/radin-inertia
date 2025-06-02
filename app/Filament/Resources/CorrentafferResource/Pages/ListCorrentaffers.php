<?php

namespace App\Filament\Resources\CorrentafferResource\Pages;

use App\Filament\Resources\CorrentafferResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCorrentaffers extends ListRecords
{
    protected static string $resource = CorrentafferResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
