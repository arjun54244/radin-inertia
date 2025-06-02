<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')
                ->constrained('brands')
                ->cascadeOnDelete();
            $table->foreignId('author_id')
                ->constrained('authors')
                ->cascadeOnDelete();
            $table->enum('is_ebook', ['is_ebook', 'is_not_ebook'])
                ->default('is_not_ebook');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->string('isbn')->unique();
            $table->string('rating')->nullable();
            $table->json('images')->nullable();
            $table->json('original_file_names')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->integer('pages')->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->string('dimensions')->nullable();
            $table->enum('binding', ['paperback', 'softcover', 'hardcover'])
                ->default('paperback');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('canonical_tag')->nullable();
            $table->text('tags')->nullable();
            $table->unsignedBigInteger('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->boolean('is_visible')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->enum('type', ['deliverable', 'downloadable'])
                ->default('deliverable');
            $table->date('published_at');
            $table->json('categories')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
