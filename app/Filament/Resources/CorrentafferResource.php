<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CorrentafferResource\Pages;
use App\Filament\Resources\CorrentafferResource\RelationManagers;
use App\Models\Correntaffer;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CorrentafferResource extends Resource
{
    protected static ?string $model = Correntaffer::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(2) // Create a 2-column grid
                    ->schema([
                        Group::make()
                            ->schema([
                                FileUpload::make('english')
                                    ->label('English PDF')
                                    ->helperText('Upload the PDF in English.')
                                    ->uploadingMessage('Uploading English PDF...')
                                    ->required()
                                    ->visibility('public')
                                    ->directory('CurrentAffairs')
                                    ->acceptedFileTypes(['application/pdf']),
                            ]),

                        Group::make()
                            ->schema([
                                FileUpload::make('hindi')
                                    ->label('Hindi PDF')
                                    ->helperText('Upload the PDF in Hindi.')
                                    ->uploadingMessage('Uploading Hindi PDF...')
                                    ->required()
                                    ->visibility('public')
                                    ->directory('CurrentAffairs')
                                    ->acceptedFileTypes(['application/pdf']),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCorrentaffers::route('/'),
            'create' => Pages\CreateCorrentaffer::route('/create'),
            'edit' => Pages\EditCorrentaffer::route('/{record}/edit'),
        ];
    }
}
