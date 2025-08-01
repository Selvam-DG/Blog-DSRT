import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";


export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    
    return( 
        <nav className="bg-gray-800 text-white p-4  flex justify-between" >
            <Link to="/" className="ms-4 text-xl font-bold">Blog-DSRT</Link>
            <div className="space-x-4 me-4">
                {!user && <>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/signup" className="hover:underline">Signup</Link>
                </>}
                {user && <>
                <span>{user.email}</span>
                <Link to="/create" className="hover:underline">Create Post</Link>
                <button onClick={logout} className="hover:underline">Logout</button>
                </>}
            </div>
        </nav>
    );
};
