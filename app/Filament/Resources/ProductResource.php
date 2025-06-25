<?php

namespace App\Filament\Resources;

use App\Enums\ProductEBookEnum;
use App\Enums\ProductTypeEnum;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Tables\Actions\ExportBulkAction;
use App\Filament\Exports\ProductExporter;
use App\Services\CloudinaryService;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Illuminate\Support\Facades\App;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;



class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-bolt';

    protected static ?string $navigationLabel = 'Products';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?int $navigationSort = 0;

    protected static ?string $recordTitleAttribute = 'name';

    protected static int $globalSearchResultsLimit = 20;

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'sku', 'isbn'];
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            'Brand' => $record->brand->name,
        ];
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->with(['brand']);
    }
    public static function mutateRelationshipDataBeforeSave(array $data): array
    {
        if (isset($data['categories'])) {
            $categorySync = collect($data['categories'])->mapWithKeys(function ($item) {
                return [$item['category_id'] => ['sequence' => $item['sequence'] ?? 0]];
            })->toArray();

            request()->merge(['_sync_categories' => $categorySync]);
            unset($data['categories']);
        }

        return $data;
    }


    public static function afterSave(Model $record)
    {
        if (request()->has('_sync_categories')) {
            $record->categories()->sync(request()->get('_sync_categories'));
        }
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make()
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                        if ($operation !== 'create') {
                                            return;
                                        }

                                        $set('slug', Str::slug($state));
                                    }),

                                Forms\Components\TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->unique(Product::class, 'slug', ignoreRecord: true),

                                Forms\Components\Textarea::make('short_description')
                                    ->label('Short Description')
                                    ->columnSpan('full'),

                                Forms\Components\MarkdownEditor::make('description')
                                    ->columnSpan('full')
                            ])->columns(2),

                        Forms\Components\Section::make('Pricing & Inventory')
                            ->schema([
                                Forms\Components\TextInput::make('sku')
                                    ->label("SKU (Stock Keeping Unit)")
                                    ->required(),

                                Forms\Components\TextInput::make('isbn')
                                    ->label("ISBN ")
                                    ->required(),

                                Forms\Components\TextInput::make('price')
                                    ->numeric()
                                    ->rules('regex:/^\d{1,6}(\.\d{0,2})?$/')
                                    ->required(),
                                Forms\Components\TextInput::make('discounted_price')
                                    ->numeric()
                                    ->rules('regex:/^\d{1,6}(\.\d{0,2})?$/')
                                    ->required(),

                                Forms\Components\TextInput::make('quantity')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(100)
                                    ->required(),

                                Forms\Components\Select::make('type')
                                    ->options([
                                        'downloadable' => ProductTypeEnum::DOWNLOADABLE->value,
                                        'deliverable' => ProductTypeEnum::DELIVERABLE->value,
                                    ])->required(),

                                Forms\Components\Select::make('is_ebook')
                                    ->label('eBook Status')
                                    ->options([
                                        'is_not_ebook' => ProductEBookEnum::IS_NOT_EBOOK->value,
                                        'is_ebook' => ProductEBookEnum::IS_EBOOK->value,
                                    ])
                                    ->default('is_not_ebook')
                                    ->required(),

                                Forms\Components\TextInput::make('rating')
                                    ->label('Rating')
                                    ->helperText('Rating between 0 and 5')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(5)
                                    ->step(0.1),
                            ])->columns(2),
                        Forms\Components\Section::make('Additional Details')
                            ->schema([
                                Forms\Components\TextInput::make('pages')
                                    ->label('Number of Pages')
                                    ->numeric(),

                                Forms\Components\TextInput::make('weight')
                                    ->label('Weight (in grams)')
                                    ->numeric()
                                    ->step(0.01),

                                Forms\Components\TextInput::make('dimensions')
                                    ->label('Dimensions (e.g., 8.5 x 11 in)'),

                                Forms\Components\Select::make('binding')
                                    ->options([
                                        'paperback' => 'Paperback',
                                        'softcover' => 'Softcover',
                                        'hardcover' => 'Hardcover',
                                    ])
                                    ->default('paperback')
                                    ->required(),
                            ])->columns(2),

                        Forms\Components\Section::make('SEO & Meta')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title')
                                    ->label('Meta Title')->columnSpanFull(),

                                Forms\Components\Textarea::make('meta_description')
                                    ->label('Meta Description')
                                    ->rows(2),

                                Forms\Components\Textarea::make('canonical_tag')
                                    ->label('Canonical Tag')
                                    ->rows(2),

                                Forms\Components\TagsInput::make('tags')
                                    ->label('Tags')
                                    ->columnSpanFull()
                                    ->helperText('Comma-separated values (e.g., fiction, adventure, classic)'),
                            ])->columns(2),
                    ]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status')
                            ->schema([
                                Forms\Components\Toggle::make('is_visible')
                                    ->label('Visibility')
                                    ->helperText('Enable or disable product visibility')
                                    ->default(true),

                                Forms\Components\Toggle::make('is_featured')
                                    ->label('Featured')
                                    ->helperText('Enable or disable products featured status'),

                                Forms\Components\DatePicker::make('published_at')
                                    ->label('Availability')
                                    ->default(now())
                            ]),

                        Forms\Components\Section::make('Image')
                            ->schema([
                                Forms\Components\FileUpload::make('images')
                                    ->image()
                                    ->multiple()
                                    ->imageEditor()
                                    ->directory('Books')
                                    ->image()
                                    ->storeFileNamesIn('Books')
                                    ->maxFiles(10)
                                    ->visibility('public')
                                    ->preserveFilenames()
                                    ->columnSpanFull(),
                            ])->collapsible(),

                        Forms\Components\Section::make('Associations')
                            ->schema([
                                Forms\Components\Select::make('brand_id')
                                    ->relationship('brand', 'name')
                                    ->required(),
                                Forms\Components\Select::make('author_id')
                                    ->relationship('author', 'name')
                                    ->required(),
                                Repeater::make('categories')
                                    ->label('Product Categories')
                                    ->schema([
                                        Select::make('category_id')
                                            ->label('Category')
                                            ->options(fn() => \App\Models\Category::pluck('name', 'id'))
                                            ->required(),
                                        Forms\Components\TextInput::make('sequence')
                                            ->numeric()
                                            ->default(0)
                                            ->label('Sequence'),
                                    ])
                                    ->columns(2)
                                    ->cloneable()
                                    ->addActionLabel('Add Category')
                                    ->orderable('sequence')
                                    ->itemLabel(fn($state): ?string => \App\Models\Category::find($state['category_id'])?->name),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sku')->searchable(),
                Tables\Columns\ImageColumn::make('images.0')
                    ->label('Image')
                    ->circular(),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->limit(30)
                    ->sortable(),

                // Tables\Columns\TextColumn::make('brand.name')
                //     ->sortable()
                //     ->toggleable(),

                Tables\Columns\IconColumn::make('is_visible')
                    ->sortable()
                    ->toggleable()
                    ->label('Visibility')
                    ->boolean(),

                Tables\Columns\TextColumn::make('price')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('quantity')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_visible')
                    ->label('Visibility')
                    ->boolean()
                    ->trueLabel('Only Visible Products')
                    ->falseLabel('Only Hidden Products')
                    ->native(false),

                Tables\Filters\SelectFilter::make('brand')
                    ->relationship('brand', 'name')
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    ExportBulkAction::make()
                        ->exporter(ProductExporter::class)
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
