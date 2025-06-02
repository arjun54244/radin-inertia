<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InfoPageResource\Pages;
use App\Models\InfoPage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class InfoPageResource extends Resource
{
    protected static ?string $model = InfoPage::class;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';

    protected static ?string $navigationLabel = 'Info Pages';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Info Page')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Basic Information')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                        $set('slug', Str::slug($state));
                                    }),

                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(InfoPage::class, 'slug', ignoreRecord: true),

                                Forms\Components\MarkdownEditor::make('content')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Company Information')
                            ->schema([
                                Forms\Components\TextInput::make('company_name')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->maxLength(255),

                                Forms\Components\Repeater::make('phones')
                                    ->label('Phone Numbers')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->label('Label (e.g., Main, Support, Sales)')
                                            ->required(),
                                        Forms\Components\TextInput::make('number')
                                            ->label('Phone Number')
                                            ->tel()
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->defaultItems(1)
                                    ->addActionLabel('Add Phone Number')
                                    ->reorderable(),

                                Forms\Components\Repeater::make('addresses')
                                    ->label('Addresses')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->label('Label (e.g., Headquarters, Branch Office)')
                                            ->required(),
                                        Forms\Components\TextInput::make('street')
                                            ->label('Street Address')
                                            ->required(),
                                        Forms\Components\TextInput::make('city')
                                            ->required(),
                                        Forms\Components\TextInput::make('state')
                                            ->required(),
                                        Forms\Components\TextInput::make('postal_code')
                                            ->required(),
                                        Forms\Components\TextInput::make('country')
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->defaultItems(1)
                                    ->addActionLabel('Add Address')
                                    ->reorderable(),

                                Forms\Components\TextInput::make('website')
                                    ->url()
                                    ->maxLength(255),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Social Media')
                            ->schema([
                                Forms\Components\TextInput::make('facebook')
                                    ->url()
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('youtube')
                                    ->url()
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('instagram')
                                    ->url()
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('linkedin')
                                    ->url()
                                    ->maxLength(255),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Map')
                            ->schema([
                                Forms\Components\Textarea::make('map_embed_code')
                                    ->label('Google Maps Embed Code')
                                    ->helperText('Paste the iframe code from Google Maps here')
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make('SEO')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title')
                                    ->maxLength(255),

                                Forms\Components\Textarea::make('meta_description')
                                    ->maxLength(255),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Settings')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->required(),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('company_name')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\ToggleColumn::make('is_active')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable()
                    ->toggledHiddenByDefault(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable()
                    ->toggledHiddenByDefault(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->trueLabel('Only Active Pages')
                    ->falseLabel('Only Inactive Pages')
                    ->native(false),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
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
            'index' => Pages\ListInfoPages::route('/'),
            'create' => Pages\CreateInfoPage::route('/create'),
            'edit' => Pages\EditInfoPage::route('/{record}/edit'),
        ];
    }
} 