'use client';

import React, { useState } from 'react';
import { CommentItem, SortOrder } from '@/types/blog';
import {
  MessageSquare,
  Heart,
  Reply,
  Trash2,
  Send,
  Bold,
  Italic,
  Quote,
  Code,
  Clock,
} from 'lucide-react';
import {
  getCommentsForArticle,
  addComment,
  toggleCommentLike,
  deleteComment,
  getUserProfile,
  saveUserProfile,
} from '@/lib/storage';

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<CommentItem[]>(() => getCommentsForArticle(articleId));
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  
  // User profile state initialized from localStorage
  const [authorName, setAuthorName] = useState(() => getUserProfile().name || '');
  const [authorHandle, setAuthorHandle] = useState(() => getUserProfile().handle || '');
  
  // Main comment input state
  const [newCommentText, setNewCommentText] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Thread reply state: active parent ID where the user is currently replying
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Total comment count helper (including nested)
  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies ? c.replies.length : 0),
    0
  );

  // Formatting helpers for the textarea
  const insertFormatting = (
    prefix: string,
    suffix: string,
    isReply: boolean = false
  ) => {
    const text = isReply ? replyText : newCommentText;
    const setText = isReply ? setReplyText : setNewCommentText;
    const textareaId = isReply ? `reply-textarea-${activeReplyId}` : 'main-comment-textarea';
    const el = document.getElementById(textareaId) as HTMLTextAreaElement | null;

    if (!el) {
      setText(text + prefix + 'text' + suffix);
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.substring(start, end) || 'text';
    const before = text.substring(0, start);
    const after = text.substring(end);
    const updated = before + prefix + selected + suffix + after;

    setText(updated);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  // Submit top-level comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setErrorMsg('Please write a comment before posting.');
      return;
    }
    const finalName = authorName.trim() || 'Guest Reader';
    const finalHandle = authorHandle.trim() || `@${finalName.toLowerCase().replace(/\s+/g, '')}`;

    saveUserProfile({ name: finalName, handle: finalHandle, email: '' });

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const updated = addComment(articleId, {
        articleId,
        authorName: finalName,
        authorHandle: finalHandle,
        content: newCommentText,
      });

      setComments(updated);
      setNewCommentText('');
      setIsPreview(false);
      setIsSubmitting(false);
    }, 120);
  };

  // Submit inline reply
  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const finalName = authorName.trim() || 'Guest Reader';
    const finalHandle = authorHandle.trim() || `@${finalName.toLowerCase().replace(/\s+/g, '')}`;
    saveUserProfile({ name: finalName, handle: finalHandle, email: '' });

    const updated = addComment(
      articleId,
      {
        articleId,
        authorName: finalName,
        authorHandle: finalHandle,
        content: replyText,
      },
      parentId
    );

    setComments(updated);
    setReplyText('');
    setActiveReplyId(null);
  };

  const handleLike = (commentId: string) => {
    const updated = toggleCommentLike(articleId, commentId);
    setComments(updated);
  };

  const handleDelete = (commentId: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Delete this comment?')) return;
    const updated = deleteComment(articleId, commentId);
    setComments(updated);
  };

  // Sort comments according to selection
  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === 'top') {
      return (b.likes || 0) - (a.likes || 0);
    }
    if (sortOrder === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  // Simple render for markdown-like formatting (bold, italics, code, quote)
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return (
      <div className="space-y-1.5 text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
        {lines.map((line, i) => {
          if (line.startsWith('> ')) {
            return (
              <blockquote
                key={i}
                className="pl-3 py-1 my-1 italic border-l border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-xs"
              >
                {line.replace(/^>\s*/, '')}
              </blockquote>
            );
          }
          if (line.startsWith('```') || line.startsWith('`')) {
            return (
              <code
                key={i}
                className="block p-2 my-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-mono text-xs rounded text-stone-800 dark:text-stone-300 overflow-x-auto"
              >
                {line.replace(/```/g, '')}
              </code>
            );
          }
          return (
            <p key={i} className="whitespace-pre-wrap break-words">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <section id="discussion" className="mt-16 pt-12 border-t border-stone-200/90 dark:border-stone-800">
      {/* Header bar with count and sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            <span>Discussion</span>
            <span className="text-xs font-mono font-normal text-stone-500 dark:text-stone-400 tabular-nums">
              ({totalCount})
            </span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Civil dialogue and thoughtful critiques are welcomed.
          </p>
        </div>

        {/* Sort Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg self-start sm:self-auto border border-stone-200/80 dark:border-stone-800">
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              sortOrder === 'newest'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder('top')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              sortOrder === 'top'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Most Upvoted
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              sortOrder === 'oldest'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Main Comment Composer */}
      <form
        onSubmit={handlePostComment}
        className="mb-12 bg-white dark:bg-stone-900/60 p-5 rounded-xl border border-stone-200/80 dark:border-stone-800 shadow-xs"
      >
        {/* Author metadata inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. S. Miller"
              className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Handle / Affiliation (optional)
            </label>
            <input
              type="text"
              value={authorHandle}
              onChange={(e) => setAuthorHandle(e.target.value)}
              placeholder="e.g. @smiller or Studio Berlin"
              className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
        </div>

        {/* Toolbar & Write/Preview Toggle */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2 mb-2 text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              title="Bold"
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              title="Italic"
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ', '')}
              title="Quote"
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              title="Code"
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className={`px-2 py-0.5 rounded ${
                !isPreview
                  ? 'text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Write
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className={`px-2 py-0.5 rounded ${
                isPreview
                  ? 'text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Text Area or Preview Mode */}
        {!isPreview ? (
          <textarea
            id="main-comment-textarea"
            rows={4}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Share your perspective, question, or counterpoint..."
            className="w-full p-3 text-sm bg-transparent border-0 text-stone-900 dark:text-stone-100 focus:outline-none placeholder:text-stone-400 resize-y"
          />
        ) : (
          <div className="min-h-[96px] p-3 bg-stone-50/50 dark:bg-stone-950/40 rounded-md">
            {newCommentText.trim() ? (
              renderFormattedText(newCommentText)
            ) : (
              <p className="text-xs italic text-stone-400">Nothing to preview yet.</p>
            )}
          </div>
        )}

        {errorMsg && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{errorMsg}</p>}

        <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800 mt-3">
          <span className="text-[11px] text-stone-400 dark:text-stone-500">
            Supports markdown quotes & code
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !newCommentText.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Comment</span>
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {sortedComments.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
            <MessageSquare className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-700 mb-2" />
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              No comments yet
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
              Be the first to share an observation on this essay.
            </p>
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 bg-stone-50/60 dark:bg-stone-900/40 rounded-xl border border-stone-200/70 dark:border-stone-800/80 transition-colors"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-serif font-bold text-stone-700 dark:text-stone-200">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {comment.authorName}
                      </span>
                      {comment.authorHandle && (
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">
                          {comment.authorHandle}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 dark:text-stone-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Delete button (convenient for local moderation) */}
                <button
                  onClick={() => handleDelete(comment.id)}
                  title="Delete comment"
                  className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Comment Body */}
              <div className="pl-9 mb-4">{renderFormattedText(comment.content)}</div>

              {/* Action Buttons: Like, Reply */}
              <div className="pl-9 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    comment.likedByMe
                      ? 'text-rose-600 dark:text-rose-400 font-semibold'
                      : 'hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      comment.likedByMe ? 'fill-current text-rose-600 dark:text-rose-400' : ''
                    }`}
                  />
                  <span className="tabular-nums">{comment.likes || 0}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                    setReplyText('');
                  }}
                  className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              {/* Inline Reply Form */}
              {activeReplyId === comment.id && (
                <div className="mt-4 ml-9 pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      Replying to {comment.authorName}
                    </span>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="text-xs text-stone-400 hover:text-stone-600"
                    >
                      Cancel
                    </button>
                  </div>
                  <textarea
                    id={`reply-textarea-${comment.id}`}
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a thoughtful reply..."
                    className="w-full p-2.5 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-y"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePostReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-1 text-xs font-medium text-white dark:text-stone-900 bg-stone-900 dark:bg-stone-100 rounded-md hover:opacity-90 disabled:opacity-40"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Threaded Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-9 space-y-3 pl-4 border-l-2 border-stone-200 dark:border-stone-800">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="pt-2 text-xs text-stone-700 dark:text-stone-300 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 dark:text-stone-100">
                            {reply.authorName}
                          </span>
                          {reply.authorHandle && (
                            <span className="text-[11px] text-stone-400 dark:text-stone-500">
                              {reply.authorHandle}
                            </span>
                          )}
                          <span className="text-[10px] text-stone-400 dark:text-stone-500">
                            · {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(reply.id)}
                          className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-600 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="mb-2">{renderFormattedText(reply.content)}</div>

                      {/* Reply like */}
                      <button
                        onClick={() => handleLike(reply.id)}
                        className={`inline-flex items-center gap-1 text-[11px] transition-colors ${
                          reply.likedByMe
                            ? 'text-rose-600 dark:text-rose-400 font-semibold'
                            : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                        }`}
                      >
                        <Heart
                          className={`w-3 h-3 ${reply.likedByMe ? 'fill-current' : ''}`}
                        />
                        <span className="tabular-nums">{reply.likes || 0}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
