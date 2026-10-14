export interface CommentItem {
  id: string;
  articleId: string;
  parentId?: string | null; // For threaded replies
  authorName: string;
  authorEmail?: string;
  authorHandle?: string;
  content: string;
  createdAt: string; // ISO string
  likes: number;
  likedByMe?: boolean;
  replies?: CommentItem[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarColor: string;
  };
  publishedAt: string;
  readTime: string;
  views: number;
  featured?: boolean;
  coverPattern?: 'sanctuary' | 'geometry' | 'sound' | 'moss' | 'minimalist';
  tags: string[];
}

export type SortOrder = 'newest' | 'top' | 'oldest';
