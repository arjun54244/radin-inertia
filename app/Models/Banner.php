<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'images',
        'link',
        'is_active',
        'position',
    ];

    protected $casts = [
        'images' => 'array',
        'is_active' => 'boolean',
    ];
}



// protected static ?string $model = Banner::class;

//     protected static ?string $navigationIcon = 'heroicon-o-photo';

//     protected static ?string $navigationLabel = 'Banners';

//     protected static ?string $navigationGroup = 'Content Management';

//     protected static ?int $navigationSort = 3;

//     public static function form(Form $form): Form
//     {
//         return $form
//             ->schema([
//                 Forms\Components\Group::make()
//                     ->schema([
//                         Forms\Components\Section::make('Banner Information')
//                             ->schema([
//                                 Forms\Components\TextInput::make('title')
//                                     ->required()
//                                     ->maxLength(255),

//                                 Forms\Components\TextInput::make('link')
//                                     ->url()
//                                     ->maxLength(255),

//                                 Forms\Components\TextInput::make('position')
//                                     ->numeric()
//                                     ->default(0)
//                                     ->required(),

//                                 Forms\Components\Toggle::make('is_active')
//                                     ->label('Active')
//                                     ->default(true)
//                                     ->required(),
//                             ])->columns(2)

//                     ]),
//                 Forms\Components\Group::make()
//                     ->schema([
//                         Forms\Components\Section::make('Banners')
//                             ->schema([
//                                 Forms\Components\FileUpload::make('images')
//                                     ->directory('banners')
//                                     ->preserveFilenames()
//                                     ->multiple()
//                                     ->image()
//                                     ->imageEditor()
//                                     ->columnSpanFull(),
//                             ])->columns(2),
//                     ])
//             ]);
//     }

//     public static function table(Table $table): Table
//     {
//         return $table
//             ->columns([
//                 Tables\Columns\ImageColumn::make('images')
//                     ->circular(),

//                 Tables\Columns\TextColumn::make('title')
//                     ->searchable()
//                     ->sortable(),

//                 Tables\Columns\TextColumn::make('link')
//                     ->searchable()
//                     ->sortable()
//                     ->toggleable(),

//                 Tables\Columns\IconColumn::make('is_active')
//                     ->boolean()
//                     ->sortable()
//                     ->toggleable(),

//                 Tables\Columns\TextColumn::make('position')
//                     ->sortable()
//                     ->toggleable(),

//                 Tables\Columns\TextColumn::make('created_at')
//                     ->dateTime()
//                     ->sortable()
//                     ->toggleable()
//                     ->toggledHiddenByDefault(),
//             ])
//             ->defaultSort('position')
//             ->reorderable('position')
//             ->filters([
//                 Tables\Filters\TernaryFilter::make('is_active')
//                     ->label('Active')
//                     ->boolean()
//                     ->trueLabel('Only Active Banners')
//                     ->falseLabel('Only Inactive Banners')
//                     ->native(false),
//             ])
//             ->actions([
//                 Tables\Actions\ActionGroup::make([
//                     Tables\Actions\EditAction::make(),
//                     Tables\Actions\DeleteAction::make(),
//                 ])
//             ])
//             ->bulkActions([
//                 Tables\Actions\BulkActionGroup::make([
//                     Tables\Actions\DeleteBulkAction::make(),
//                 ]),
//             ]);
//     }

//     public static function getRelations(): array
//     {
//         return [
//             //
//         ];
//     }

//     public static function getPages(): array
//     {
//         return [
//             'index' => Pages\ListBanners::route('/'),
//             'create' => Pages\CreateBanner::route('/create'),
//             'edit' => Pages\EditBanner::route('/{record}/edit'),
//         ];
//     }
// }
