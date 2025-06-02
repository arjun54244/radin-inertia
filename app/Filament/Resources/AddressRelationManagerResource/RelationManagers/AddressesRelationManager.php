<?php

namespace App\Filament\Resources\AddressRelationManagerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AddressesRelationManager extends RelationManager
{
    protected static string $relationship = 'addresses';

    public function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\TextInput::make('address_line1')
                ->label('Address Line 1')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('address_line2')
                ->label('Address Line 2')
                ->maxLength(255),

            Forms\Components\TextInput::make('city')
                ->required()
                ->maxLength(100),

            Forms\Components\TextInput::make('state')
                ->required()
                ->maxLength(100),

            Forms\Components\TextInput::make('zip_code')
                ->label('ZIP Code')
                ->required()
                ->maxLength(20),

            Forms\Components\TextInput::make('country')
                ->required()
                ->maxLength(100),

            Forms\Components\TextInput::make('phone')
                ->required()
                ->tel()
                ->maxLength(20),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('address_line1')
            ->columns([
                Tables\Columns\TextColumn::make('address_line1'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
