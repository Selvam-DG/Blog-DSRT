import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/blogAPI";

const BaseURL = import.meta.env.VITE_API_URL
export default function BlogForm(onPostCreated) {
    const {token, user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [ content, setContent ] = useState('');
    const navigate  = useNavigate();
    const handleSubmit = async(e) => {

        e.preventDefault();
        const res = await fetch(`${BaseURL}/api/blogPosts/`,{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`  
            },
            body : JSON.stringify({ title, slug, content})
        });
        if (res.ok){
            navigate('/');
        }else{
            alert("Failed to create Post");
        }
        
    };
    if (!user){
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl text-red-600">You must be logged in to create a post.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Create a new Blog Post</h2>      
            <form onSubmit={handleSubmit} className="space-y-5 ">
                
                <input type="text" placeholder="Title" value={title} onChange={ e => setTitle(e.target.value)} className="w-full p-2 border  rounded" required/>
                <input type="text" placeholder="Slug (unique)" value={slug} onChange={e=> setSlug(e.target.value)} className="w-full p-2 border rounded"  required/>
                <textarea placeholder="Content" value={content} onChange={ e=> setContent(e.target.value)} className="w-full p-2 border  h-40 rounded" required/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Publish</button>
            </form>
        </div>
    );
};
