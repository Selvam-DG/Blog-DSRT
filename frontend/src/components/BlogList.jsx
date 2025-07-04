// import { useEffect, useState } from "react";
// import { getAllPosts } from "../api/blogAPI";


// export default function BlogList() {
//     const [posts, setPosts] = useState([]);

//     useEffect( () => {
//         const fetchPosts = async () => {
//         try {
//             const res = await getAllPosts();
//             setPosts(res.data);
//             console.log("Fetched posts:", res.data);
//         } catch (err) {
//             console.error("Error fetching posts:", err);
//         }
//         };
//         fetchPosts();
//     }, []);

//     return ( 
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4"> Blog Posts</h2>
//             {posts.length === 0 ?(
//                 <p>No blog Posts available...</p>
//             ): (
//                 posts.map( post =>{
//                     <div key={post.id} className="border p-3 mb-3 rounded shadow">
//                         <h3 className="text-lg font-semibold">{post.title}</h3>
//                         <p className="text-gray-600 text-sm">{post.slug}</p>
//                         <p>{post.content}</p>
//                         <p className="text-gray-500 text-xs mt-2">Posted on {new Date(post.created_at).toLocaleString}</p>
//                     </div>
//                 })
//             )}
//         </div>
//     );
    
// };
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/blogAPI";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then(res => {
        console.log("Posts fetched:", res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
