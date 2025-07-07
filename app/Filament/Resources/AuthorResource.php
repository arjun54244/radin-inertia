<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AuthorResource\Pages;
use App\Filament\Resources\AuthorResource\RelationManagers;
use App\Models\Author;
use Filament\Forms;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;


class AuthorResource extends Resource
{
    protected static ?string $model = Author::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(2)
                    ->schema([
                        // LEFT COLUMN
                        Forms\Components\Group::make()
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

                                TextInput::make('url')
                                    ->url()
                                    ->maxLength(255)
                                    ->nullable(),


                                Forms\Components\MarkdownEditor::make('description')
                                    ->columnSpanFull()
                                    ->nullable(),
                            ]),

                        // RIGHT COLUMN
                        Forms\Components\Group::make()
                            ->schema([
                                Forms\Components\TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->unique(Author::class, 'slug', ignoreRecord: true),

                                TextInput::make('post')
                                    ->label('Post')
                                    ->maxLength(255)
                                    ->nullable(),

                                FileUpload::make('image')
                                    //  ->image()
                                    ->imageEditor()
                                    ->directory('authors')
                                    ->nullable(),

                                Toggle::make('status')
                                    ->label('Active Status')
                                    ->default(true),
                                Checkbox::make('member')->inline()->columns(2)
                                    ->label('Member')
                                    ->helperText('Is this author a member?'),
                                Checkbox::make('author')->inline()->columns(2)
                                    ->label('Author')
                                    ->helperText('Is this author a content author?'),
                            ]),
                    ]),
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('slug')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('url')
                    ->label('Website')
                    ->url(fn($record) => $record->url, true)
                    ->openUrlInNewTab()
                    ->toggleable(),

                ImageColumn::make('image')
                    ->label('Photo')
                    ->circular()
                    ->toggleable(),

                TextColumn::make('description')
                    ->limit(50)
                    ->toggleable(),

                IconColumn::make('status')
                    ->boolean()
                    ->label('Active'),
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
            'index' => Pages\ListAuthors::route('/'),
            'create' => Pages\CreateAuthor::route('/create'),
            'edit' => Pages\EditAuthor::route('/{record}/edit'),
        ];
    }
}
