"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BlogType } from "../../types/BlogType";

const BlogDetail = () => {
    const [blog, setBlog] = useState<BlogType | null>(null);
    const { id } = useParams();
    console.log(id, "id");

    useEffect(() => {
        const fetchBlogDetail = async () => {
            if (id) {
                const res = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );
                console.log(res, "res");

                setBlog(res.data);
            }
        };
        fetchBlogDetail();
    }, [id]);

    if (!blog) return <p className="text-center text-lg">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <h1 className="text-4xl font-bold mb-6 text-gray-900">{blog.title}</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">{blog.body}</p>
            </div>


            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>Created by: {blog.author}</p>
                <p>Published on: {new Date().toLocaleString()}</p>
            </div>

            <div className="mt-6">
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    onClick={() => window.history.back()}
                >
                    Back to Blogs
                </button>
            </div>
        </div>
    );
};

export default BlogDetail;
