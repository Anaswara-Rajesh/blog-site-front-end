"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/app/features/blogSlice";
import { RootState } from "@/app/store";
import { ApiConstants, baseURL } from "@/app/api/apiConstants";

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const blog = useSelector((state: RootState) => state.blog.blog);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            if (id && (!blog || blog._id !== id)) {
                try {
                    const res = await axios.get(`${baseURL}/${ApiConstants.BLOGS}/${id}`);
                    dispatch(setBlog(res.data));
                } catch (error) {
                    console.error("Error fetching blog:", error);
                }
            }
        };
        fetchBlogDetail();
    }, [id, blog, dispatch]);

    if (!blog) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{blog.title}</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">{blog.body}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>Created by: {blog?.createdBy}</p>
                <p>Published on: {new Date(blog?.createdAt).toLocaleString()}</p>
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
