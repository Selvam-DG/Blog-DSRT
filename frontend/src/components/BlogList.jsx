import { useEffect, useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const BaseURL = import.meta.env.VITE_API_URL;

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BaseURL}/api/blogPosts/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch posts");
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
          <div className="flex gap-6 mt-6">
            <ActionButton icon={<FaThumbsUp />} label="Like" color="text-blue-600" />
            <ActionButton icon={<FaComment />} label="Comment" color="text-green-600" />
            <ActionButton icon={<FaShare />} label="Share" color="text-purple-600" />
          </div>

          {/* Comments Preview */}
          <div className="mt-6 border-t pt-3 text-sm text-gray-600 italic">
            {/* Placeholder for comments */}
            No comments yet. Be the first to comment.
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
