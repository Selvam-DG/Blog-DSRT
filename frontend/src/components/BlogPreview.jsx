export default function BlogPreview() {
  const samplePosts = [
    {
      id: 1,
      title: "Why React is So Popular in 2025",
      slug: "react-popularity-2025",
      content: "React remains one of the top front-end libraries because of its robust ecosystem and developer experience...",
      user: "demo_user_1",
      created_at: "2025-06-12T14:30:00Z",
    },
    {
      id: 2,
      title: "Getting Started with Django & REST Framework",
      slug: "django-rest-getting-started",
      content: "Building powerful APIs with Django REST Framework is easier than ever. In this post, we walk you through the basics...",
      user: "demo_user_2",
      created_at: "2025-06-18T09:45:00Z",
    },
    {
      id: 3,
      title: "TailwindCSS: The Utility-First Framework That Works",
      slug: "tailwindcss-utility-first",
      content: "Tailwind is changing how developers write CSS. Learn how you can use it to build sleek UI components faster...",
      user: "demo_user_3",
      created_at: "2025-07-01T12:15:00Z",
    },
  ];

  return (
    <div className="space-y-6">
      {samplePosts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow bg-white">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-gray-600 text-sm">by {post.user} on {new Date(post.created_at).toLocaleDateString()}</p>
          <p className="text-gray-800 mt-2">
            {post.content.slice(0, 200)}...
          </p>
          <p className="text-blue-600 text-sm mt-2 italic">
            Login to read more and explore all real-time posts.
          </p>
        </div>
      ))}
    </div>
  );
}
