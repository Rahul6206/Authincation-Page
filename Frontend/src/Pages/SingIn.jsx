import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const SignIn = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            const URL = "http://localhost:8080/auth/login";
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(form)
            });
            const Data = await response.json();
            const { message, error, success, jwtToken, name } = Data;
            if (success) {
                console.log('Success');
                localStorage.setItem('jwtToken', jwtToken)
                localStorage.setItem('name', name)
                setTimeout(() => {
                    navigate('/home');

                }, 2000);
                setError(message || "Signup failed.");
            } else if (!success) {
                setError(message)
            } else if (error) {
                setError(error)
            }
            console.log(Data);
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.log(error);
        }


    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">Sign In</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {error && (
                        <div className="text-red-600 text-sm mb-2">{error}</div>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="p-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Have you Singup?
                    <Link to="/singup" className="text-blue-600 hover:underline">
                        SingUp
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
