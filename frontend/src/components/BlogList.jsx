import { useEffect, useState } from "react";
import { getAllPosts } from "../api/blogAPI";

const BaseURL = import.meta.env.VITE_API_URL

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        fetch(`${BaseURL}/api/posts/`)
            .then( response =>response.json())
            .then (data => setPosts(data));
            
    }, []);
    if(posts.length === 0 ){
        return ( 
            <p className="text-gray-500 italic">No blog Posts available...</p>
        );
    }
    
    return ( 
        <div className="space-y-4 mt-6">
            { posts.map( post =>(
                <div key={post.id} className="border p-4 mb-3 rounded shadow">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{post.slug}</p>
                    <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                    <p className="text-gray-500 text-xs mt-2">Posted on {new Date(post.created_at).toLocaleString()}</p>
                </div>
                
            ))}
        </div>
    );
    
};
