import { Article, CommentItem } from '@/types/blog';
import { INITIAL_ARTICLES, INITIAL_COMMENTS } from './initial-data';

const ARTICLES_KEY = 'chronicle_articles_v1';
const COMMENTS_KEY = 'chronicle_comments_v1';
const BOOKMARKS_KEY = 'chronicle_bookmarks_v1';
const USER_KEY = 'chronicle_user_profile_v1';

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
}

export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
}

export function saveArticle(article: Article): Article[] {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  const current = getStoredArticles();
  const updated = [article, ...current];
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredComments(): Record<string, CommentItem[]> {
  if (typeof window === 'undefined') return INITIAL_COMMENTS;
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : INITIAL_COMMENTS;
  } catch {
    return INITIAL_COMMENTS;
  }
}

export function getCommentsForArticle(articleId: string): CommentItem[] {
  const all = getStoredComments();
  return all[articleId] || [];
}

export function countTotalComments(articleId: string): number {
  const comments = getCommentsForArticle(articleId);
  let count = 0;
  for (const c of comments) {
    count += 1;
    if (c.replies && c.replies.length > 0) {
      count += c.replies.length;
    }
  }
  return count;
}

export function addComment(
  articleId: string,
  newComment: Omit<CommentItem, 'id' | 'createdAt' | 'likes' | 'replies'>,
  parentId?: string | null
): CommentItem[] {
  const all = getStoredComments();
  const currentList = all[articleId] ? [...all[articleId]] : [];

  const created: CommentItem = {
    id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    articleId,
    parentId: parentId || null,
    authorName: newComment.authorName.trim() || 'Anonymous Reader',
    authorEmail: newComment.authorEmail?.trim(),
    authorHandle: newComment.authorHandle?.trim() || `@${(newComment.authorName.trim() || 'reader').toLowerCase().replace(/\s+/g, '')}`,
    content: newComment.content.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    likedByMe: false,
    replies: [],
  };

  if (!parentId) {
    // Top-level comment
    currentList.unshift(created);
  } else {
    // Threaded reply: find parent and insert into replies
    let inserted = false;
    for (const parent of currentList) {
      if (parent.id === parentId) {
        parent.replies = parent.replies ? [...parent.replies, created] : [created];
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      // Fallback to top level if parent not found
      currentList.unshift(created);
    }
  }

  all[articleId] = currentList;
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
  return currentList;
}

export function toggleCommentLike(articleId: string, commentId: string): CommentItem[] {
  const all = getStoredComments();
  const list = all[articleId] ? [...all[articleId]] : [];

  function updateItem(item: CommentItem): boolean {
    if (item.id === commentId) {
      const isLiked = !item.likedByMe;
      item.likedByMe = isLiked;
      item.likes = isLiked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1);
      return true;
    }
    if (item.replies) {
      for (const reply of item.replies) {
        if (updateItem(reply)) return true;
      }
    }
    return false;
  }

  for (const item of list) {
    if (updateItem(item)) break;
  }

  all[articleId] = list;
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
  return list;
}

export function deleteComment(articleId: string, commentId: string): CommentItem[] {
  const all = getStoredComments();
  let list = all[articleId] ? [...all[articleId]] : [];

  // Filter top level
  list = list.filter((item) => item.id !== commentId);

  // Filter nested replies
  list = list.map((item) => ({
    ...item,
    replies: item.replies ? item.replies.filter((r) => r.id !== commentId) : [],
  }));

  all[articleId] = list;
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
  return list;
}

export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(articleId: string): string[] {
  if (typeof window === 'undefined') return [];
  const current = getBookmarks();
  let updated: string[];
  if (current.includes(articleId)) {
    updated = current.filter((id) => id !== articleId);
  } else {
    updated = [...current, articleId];
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return updated;
}

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return { name: '', handle: '', email: '' };
  }
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : { name: '', handle: '', email: '' };
  } catch {
    return { name: '', handle: '', email: '' };
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}
