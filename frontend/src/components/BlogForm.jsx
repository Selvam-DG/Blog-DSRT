import { useState } from "react";
// import { createPost } from "../api/blogAPI";

export default function BlogForm(onPostCreated) {
    
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [ content, setContent ] = useState('');

    const handleSubmit = async(e) => {

        e.preventDefault();
        const newPost = {title, slug, content};

        try{
            await createPost(newPost);
            setTitle("");
            setSlug('');
            setContent('');
        }catch(error){
            console.error("Error Creating Post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 shadow">
            <h2 className="text-xl font-bold mb-2">Create a new Blog Post</h2>
            <input type="text" placeholder="Title" value={title} onChange={ e => setTitle(e.target.value)} className="w-full p-2 border mb-2 rounded" required/>
            <input type="text" placeholder="Slug (unique)" value={slug} onChange={e=> setSlug(e.target.value)} className="w-full p-2 border mb-2 rounded"  required/>
            <textarea placeholder="Content" value={content} onChange={ e=> setContent(e.target.value)} className="w-full p-2 border mb-2 rounded" required/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Post</button>
        </form>
    );
};
