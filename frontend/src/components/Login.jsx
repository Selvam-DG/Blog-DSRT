import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL;

export default function Login() {
    const [username, setUsername ]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError ] = useState(null);
    const { login }  = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        try {

            const response = await fetch(`${BaseURL}/auth/login/`, {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({ username, password })
            });
            const data =  await response.json();
            if (response.ok &&  data.key){
                login(data.key);
                navigate('/');
            }else{
                const errorMsg = data.non_field_errors?.[0] || data.detail || "Login Failed. Please try again.";
                setError(errorMsg)
            }
        }catch(err){
            setError("something went Wrong. please try agian.")
        }
    };

    return(
        <div className="min-h-screen flex  justify-center items-center p-4  bg-gray-200">
            <form onSubmit={handleSubmit} className=" max-w-md mx-auto space-y-5 bg-white p-4 ">

                <h2 className="text-2xl font-bold">Login</h2>
                
                <input type="text" className="w-full border-2  p-2 " value={username}
                onChange={ (e) => setUsername(e.target.value)} placeholder="Username or email" required />
                <input type="password" className="w-full border-2 p-2 " value={password}
                onChange={ (e) => setPassword(e.target.value)} placeholder="Password"  required/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
                { error &&(
                    <div className="text-red-700  rounded p-2 text-md">
                        {error}
                    </div>
                )}
                 {/* Additional Auth Links */}
                <div className="text-sm text-center space-y-2">
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p>
                        <Link to="" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                    
                </div>

                

            </form>
        </div>
    )
    
};
