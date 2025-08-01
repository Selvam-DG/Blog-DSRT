import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../auth/AuthContext";
import { likePost, unlikePost, getLikesForPost, getCommentsForPost } from "../api/blogAPI";

const BaseURL = import.meta.env.VITE_API_URL;

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useContext(AuthContext);
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
      fetch(`${BaseURL}/api/blogPosts/`)
        .then((res) => res.json())
        .then(async (data) => {
          const enriched = await Promise.all(
            data.map(async (post) => {
              const [likesRes, commentsRes] = await Promise.all([
                getLikesForPost(post.id),
                getCommentsForPost(post.id),
              ]);

              const userLike = likesRes.data.find((like) => like.user === user?.username);

              return {
                ...post,
                likes: likesRes.data,
                likedByUser: !!userLike,
                likeId: userLike?.id,
                comments: commentsRes.data,
              };
            })
          );
          setPosts(enriched);
          setLoading(false);
        })
        .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    }, [user, token]);

  const handleLike = async(post) => {
    if (!token) return;

    if (post.likedByUser) {
      await unlikePost(post.likeId, token);
      updatePost(post.id, {
        likedByUser: false,
        likes: post.likes.filter((l) => l.id !== post.likeId),
        likeId: null,
      });
    } else {
      const res = await likePost(post.id, token);
      updatePost(post.id, {
        likedByUser: true,
        likes: [...post.likes, res.data],
        likeId: res.data.id,
      });
    }
  };
  const updatePost = (postId, changes) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...changes } : p))
    );
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const comment = newComments[postId];
    if (!comment || !token) return;

    try {
      const res = await axios.post(
        `${BaseURL}/api/comments/`,
        { post: postId, content: comment },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      // Add new comment to post
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, res.data] }
            : p
        )
      );

      setNewComments({ ...newComments, [postId]: "" });
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  
  if (loading) return <p className="text-center text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (posts.length === 0)
    return <p className="text-center text-gray-500 italic">No blog posts available...</p>;

  return (
    <div className="space-y-6 mt-6 max-w-2xl mx-auto">
      {posts.map((post) => (
        <article
          key={post.id}
          className="border p-6 rounded-2xl shadow hover:shadow-lg transition-shadow bg-white"
          aria-label={`Blog post titled ${post.title}`}
        >
          {/* Author & Date */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <span>
              
              <strong className="text-gray-700" aria-label={`Author: ${post.user}`}>
                {post.user}
              </strong>
            </span>
            <time dateTime={post.created_at} title={new Date(post.created_at).toLocaleString()}>
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>

          {/* Content */}
          <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

          {/* Actions */}
          <div className="flex gap-6 mt-4 text-sm">
            <button    onClick={() => handleLike(post)} className="text-blue-600 flex items-center gap-1"    >
              <FaThumbsUp />
              {post.likedByUser ? "Liked" : "Like"} ({post.likes.length})
            </button>

            <div className="text-green-600 flex items-center gap-1">
              <FaComment />
              {post.comments.length} Comment{post.comments.length !== 1 ? "s" : ""}
            </div>

            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({ title: post.title, url: window.location.href })
                  : navigator.clipboard.writeText(window.location.href)
              }
              className="text-purple-600 flex items-center gap-1"
            >
              <FaShare /> Share
            </button>
          </div>
          {/* Likes list */}
          <div className="text-xs text-gray-600 mt-3 italic">
            {post.likes.length > 0 ? (
              <span>
                Liked by {post.likes.map((l) => l.user).join(", ")}
              </span>
            ) : (
              <span>No likes yet</span>
            )}
          </div>

          {/* Comments */}
          <div className="mt-4 border-t pt-3">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="text-sm text-gray-800 mb-2">
                  <strong className="text-gray-700">{comment.user}</strong>: {comment.content}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No comments yet.</p>
            )}
            {user && (
              <form
                onSubmit={(e) => handleCommentSubmit(e, post.id)}
                className="mt-2 flex gap-2 items-start"
              >
                <textarea
                  value={newComments[post.id] || ""}
                  onChange={(e) =>
                    setNewComments({ ...newComments, [post.id]: e.target.value })
                  }
                  placeholder="Write a comment..."
                  className="flex-1 p-2 text-sm border rounded"
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function ActionButton({ icon, label, color }) {
  return (
    <button
      type="button"
      className={`${color} flex items-center gap-1 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${color.replace(
        "text-",
        ""
      )} transition`}
      aria-label={label}
    >
      {icon}
      {label}
    </button>
  );
}
