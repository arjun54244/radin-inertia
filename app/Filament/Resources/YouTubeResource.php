<?php

namespace App\Filament\Resources;

use App\Enums\YoutubeEnum;
use App\Filament\Resources\YouTubeResource\Pages;
use App\Filament\Resources\YouTubeResource\RelationManagers;
use App\Models\YouTube;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class YouTubeResource extends Resource
{
    protected static ?string $model = YouTube::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $navigationLabel = 'YouTube Videos';
    protected static ?int $navigationSort = 4;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //type selector
                Forms\Components\Select::make('type')
                    ->label('Type')
                    ->options([
                        'review' => YoutubeEnum::REVIEW->value,
                        'homevideo' => YoutubeEnum::HOME_VIDEO->value,
                        'playlist' => YoutubeEnum::PLAYLIST->value,
                    ])
                    ->default('video')
                    ->required(),
                Forms\Components\TextInput::make('title')->required(),
                Forms\Components\TextInput::make('video_id')->label('YouTube Video ID')->required(),
                Forms\Components\Toggle::make('is_active')->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->limit(50)->searchable(),
                Tables\Columns\TextColumn::make('type'),
                // Tables\Columns\TextColumn::make('video_id'),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->filters([
                //
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
            'index' => Pages\ListYouTubes::route('/'),
            'create' => Pages\CreateYouTube::route('/create'),
            'edit' => Pages\EditYouTube::route('/{record}/edit'),
        ];
    }
}
