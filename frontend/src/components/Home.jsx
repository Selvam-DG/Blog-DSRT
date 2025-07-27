import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import BlogList from "./BlogList";
import BlogPreview from "./BlogPreview";

export default function Home() {
    const { user } = useContext(AuthContext);

    if (user) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">All Blog Posts</h1>
                <BlogList />
            </div>
        );
    }

    return (
        <div className="max-w-4xl px-6 py-10 mx-auto space-y-10">
            <section className="text-center">
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">Welcome to <span className="text-gray-900">Blog-DSRT</span></h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A modern blogging platform to share your thoughts, learn from others, and build your digital voice.
                </p>
                <div className="mt-6 space-x-4">
                    <Link to="/login">
                        <button className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow transition">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="px-6 py-2 rounded-xl bg-gray-100 text-blue-700 hover:bg-blue-200 shadow transition">Sign Up</button>
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Blog Previews</h2>
                <BlogPreview />
                <div className="mt-4 text-center text-sm text-gray-500">
                    Login to view full blog posts and engage with the community.
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6 mt-10">
                <InfoCard
                    title="🚀 How to Signup"
                    content="Click on the 'Signup' button in the navbar and fill out your details."
                />
                <InfoCard
                    title="🔐 How to Login"
                    content="Click 'Login', enter your credentials, and you're good to go."
                />
                <InfoCard
                    title="📝 How to Post"
                    content="Once logged in, click 'Create Post' in the navbar to start writing."
                />
            </section>
        </div>
    );
}

function InfoCard({ title, content }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{content}</p>
        </div>
    );
}
