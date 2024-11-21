"use client";
import { useState } from "react";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title.length < 5 || body.length < 10) {
            setError(
                "Title must be at least 5 characters and body at least 10 characters."
            );
            return;
        }

        try {

        } catch (err) {
            setError("Failed to create blog. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center mt-28">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                    Create New Blog
                </h1>
                {error && (
                    <p className="text-red-500 text-center mb-4 font-medium">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            minLength={5}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="body"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Body
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            minLength={10}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
