<?php

namespace App\Filament\Resources\InfoPageResource\Pages;

use App\Filament\Resources\InfoPageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditInfoPage extends EditRecord
{
    protected static string $resource = InfoPageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
} 