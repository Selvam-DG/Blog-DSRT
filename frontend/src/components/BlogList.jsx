import { useEffect, useState } from "react";
import { getAllPosts } from "../api/blogAPI";

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        getAllPosts()
            .then( response => setPosts(response.data))
            .catch(error => console.error("Error fetching Posts: ", error)) ;
    }, []);
    console.log(posts)
    
    return ( 
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4"> Blog Posts</h2>
            {posts.length === 0 ?(
                <p>No blog Posts available...</p>
            ): (
                posts.map( post =>(
                    <div key={post.id} className="border p-3 mb-3 rounded shadow">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{post.slug}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                        <p className="text-gray-500 text-xs mt-2">Posted on {new Date(post.created_at).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
    
};
