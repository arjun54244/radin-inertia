export interface CategoryBooks {
  id: number;
  author_id: number;
  is_ebook: number;
  stock_status: "in_stock" | "out_of_stock";
  category: string;
  bestseller: number;
  latest_release: number;
  most_purchased: number;
  on_sale: number;
  exam_category: string;
  location: string;
  sku_number: string;
  isbn_number: string;
  sequence_number: number;
  book_url: string;
  title: string;
  base_price: string;
  discounted_price: string;
  short_description: string;
  images: string[];
  image_alt_tag: string;
  description: string;
  pages: number;
  weight: string;
  dimensions: string;
  binding: string;
  author: string;
  meta_title: string;
  meta_description: string;
  canonical_tag: string;
  created_at: string;
  rating: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}


export interface Product {
  id: number;
  brand_id: number;
  author_id: number;
  is_ebook: string;
  name: string;
  slug: string;
  sku: string;
  isbn: string;
  rating: number ; // Assuming you want to treat rating as a number
  images: string[]; // Parsed from JSON
  original_file_names: string | null;
  short_description: string;
  description: string;
  pages: number;
  weight: string;
  dimensions: string;
  binding: string;
  meta_title: string;
  meta_description: string;
  canonical_tag: string;
  tags: string[]; // Parsed from JSON
  quantity: number;
  price: string;
  discounted_price: string;
  is_visible: number;
  is_featured: number;
  type: string;
  published_at: string;
  categories: { category_id: string; sequence: string }[]; // Parsed from JSON
  created_at: string;
  updated_at: string;
  is_liked?: string | boolean; // Optional field for liked status
  author?: {
    id: number;
    name: string;
  } | string; // Depends on if author is loaded as relation or not
}