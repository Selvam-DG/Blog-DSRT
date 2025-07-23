import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL
export default function Signup() {
    const [email, setEmail ] = useState('');
    const [ username, setUsername ] =useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] =  useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e)  => {
        e.preventDefault();
        setError(null);
        try{
            const response = await fetch(`${BaseURL}/auth/registration/`, {
                method : 'POST',
                headers :{ 'Content-Type' : 'application/json '},
                body : JSON.stringify({  username, email, password1, password2 })
            });
            const data =  await response.json();
            if(response.ok) navigate('/login');
            else {
                console.log(data);
                const errorMsg = data.email?.[0] || data.username?.[0] || data.password1?.[0] || data.password2?.[0] || data.non_field_errors?.[0] ||"Signup Failed. Please try again.";
                setError(errorMsg)
            }
        }catch(err){
            setError("something went Wrong. please try agian.")
        }
    };
    
    return ( 
        <div className="min-h-screen flex bg-gray-200 justify-center items-center">
            <form onSubmit={handleSubmit} className=" max-w-md mx-auto space-y-5 bg-white p-4 ">
                <h2 className="text-2xl font-bold">Signup</h2>
                <input type="text" className="w-full border-2  p-2 " value={username}
                onChange={ (e) => setUsername(e.target.value)} placeholder="Username " required />
                <input type="email" className="w-full border-2  p-2 " value={email}
                onChange={ (e) => setEmail(e.target.value)} placeholder="Eamil " required />
                <input type="password" className="w-full border-2 p-2 " value={password1}
                onChange={ (e) => setPassword1(e.target.value)} placeholder="Password"  required/>
                <input type="password" className="w-full border-2 p-2 " value={password2}
                onChange={ (e) => setPassword2(e.target.value)} placeholder="Confirm Password"  required/>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>

                { error &&(
                    <div className="text-red-700  rounded p-2 text-md">
                        {error}
                    </div>
                )}
                 {/* Additional Auth Links */}
                <div className="text-sm text-center space-y-2">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                    
                    
                </div>

                

            </form>
        </div>
    );
};
