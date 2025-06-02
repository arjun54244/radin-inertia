export interface BlogCommentUserType {
  id: number;
  name: string;
  email: string;
}

export interface BlogCommentType {
  id: number;
  blog_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  user: BlogCommentUserType;
}

export interface BlogDetailsType {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image: string;
  meta_title: string;
  meta_desc: string;
  canonical_tag: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  comments: BlogCommentType[];
}
export interface BlogType {
    id: number;
    title: string;
    short_description: string;
    image: string;
    description: string;
    slug: string;
    meta_title: string;
    meta_desc: string;
    canonical_tag: string;
    tags: string[];
    created_at: Date;
}
export interface BlogDetailsProps {
  blog: BlogDetailsType;
  blogs: BlogType[];
}