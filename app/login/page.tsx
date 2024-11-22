"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { login } from "@/app/features/userSlice";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";
import { ApiConstants, baseURL } from "../api/apiConstants";

const Login = () => {
    const { singin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            setLoading(true);
            const apiUrl = `${baseURL}/${ApiConstants.AUTH_LOGIN}`;
            const response = await axios.post(apiUrl, {
                email,
                password,
            });

            const { token, username } = response.data;
            singin();

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            dispatch(
                login({
                    email,
                    username,
                    token,
                })
            );

            toast.success("Login successful!");

            router.push("/");

        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center mt-28">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h1>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
