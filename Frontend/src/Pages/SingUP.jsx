import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // <-- Add this line
    const navigate = useNavigate(); // <-- Make sure this is called

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            const URL = "http://localhost:8080/auth/singup";
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(form)
            });
            const Data = await response.json();
            const { message, error, success } = Data;
            const Errormessage=error?.details[0].message;
            

            if (success) {
                console.log('Success');
                navigate('/login'); 
            }else if(!success){
                
                setError(message)
            }
             else {
                setError(Errormessage || "Signup failed.");
            }
           
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                {error && (
                    <p className="mt-2 text-center text-red-500">{error}</p>
                )}
                <p className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;