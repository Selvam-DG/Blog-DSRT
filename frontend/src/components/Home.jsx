import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import BlogList from "./BlogList";


export default function Home() {
    const {user} = useContext(AuthContext)    ;

    if(user){
        return( 
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
                <BlogList/>
            </div>
        );
    }

    return (
        <div className="max-w-3xl p-6 mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome to Blog-DSRT</h1>
            <p className="text-gray-600 mb-6">
                Blog-DSRT is a simple blogging platform where you can signup, login, and share your thoughts with the world.
            </p>
            <div className="space-y-4">
                <div className="bg-gray-100 p-5 rounded shadow">
                    <h2 className="text-xl font-semibold">How to Signup</h2>
                    <p>Click on the "Signup" button in the navbar and fill out your details.</p>
                </div>

                <div className="bg-gray-100 p-5 rounded shadow">
                    <h2 className="text-xl font-semibold">How to Login</h2>
                    <p>Click "Login", enter your credentials, and you'll be authenticated</p>
                </div>
                <div className="bg-gray-100 p-5 rounded shadow">
                    <h2 className="text-xl font-semibold">How to create a Blog Post</h2>
                    <p>Once you're logged in, you'll see a "Create Post" option in the navigation bar.
                        You can use it to write and submit your own blog post.
                    </p>
                </div>
            </div>
            

        </div>
    )
};
