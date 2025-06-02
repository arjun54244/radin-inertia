<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Filament\Resources\BlogResource\RelationManagers;
use App\Filament\Resources\CommentResource\RelationManagers\BlogResourceRelationManager;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;


class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'slug', 'description'];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->description('Enter the basic details of your blog post')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Enter a descriptive title')
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
                            ->unique(Blog::class, 'slug', ignoreRecord: true)
                            ->helperText('This will be automatically generated from the title'),

                        Forms\Components\Textarea::make('short_description')
                            ->label('Short Description')
                            ->placeholder('A brief summary of your blog post')
                            ->maxLength(255)
                            ->columnSpan('full')
                            ->helperText('This will be displayed in blog listings and previews'),
                    ])->columns(2),

                Forms\Components\Section::make('Content')
                    ->description('Write your blog post content')
                    ->schema([
                        Forms\Components\RichEditor::make('description')
                            ->required()
                            ->columnSpan('full')
                            ->toolbarButtons([
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'underline',
                                'undo',
                            ]),
                    ]),

                Forms\Components\Section::make('Media')
                    ->description('Add images to your blog post')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Additional Images')
                            ->visibility('public')
                            ->directory('blogs')
                            ->columnSpan('full')
                            ->preserveFilenames()
                            ->image()
                            ->imageEditor()
                            ->helperText('Upload a featured image for your blog post')
                    ])->collapsible(),

                Forms\Components\Section::make('SEO Information')
                    ->description('Optimize your blog post for search engines')
                    ->schema([
                        Forms\Components\TextInput::make('meta_title')
                            ->maxLength(60)
                            ->helperText('Recommended length: 50-60 characters')
                            ->placeholder('SEO Title'),

                        Forms\Components\TextInput::make('meta_desc')
                            ->maxLength(160)
                            ->helperText('Recommended length: 150-160 characters')
                            ->placeholder('SEO Description'),

                        Forms\Components\Textarea::make('canonical_tag')
                            ->label('Canonical URL')
                            ->rows(2)
                            ->placeholder('https://yourdomain.com/blog/post-url')
                            ->helperText('Use this if you have duplicate content on multiple URLs'),

                        Forms\Components\TagsInput::make('tags')
                            ->label('Tags')
                            ->columnSpanFull()
                            ->placeholder('Add tags and press enter')
                            ->helperText('Add relevant tags to help readers find your content'),
                    ])->columns(2),

                Forms\Components\Section::make('Status')
                    ->schema([
                        Forms\Components\Toggle::make('status')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Toggle to publish or unpublish this blog post'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('slug')->sortable(),
                Tables\Columns\IconColumn::make('status')->boolean(),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
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
            BlogResourceRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
