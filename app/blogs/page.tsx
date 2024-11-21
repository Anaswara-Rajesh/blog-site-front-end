"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { BlogType } from "@/app/types/BlogType";

const BlogList = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setBlogs(res.data);
        };
        fetchBlogs();
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">List of Blogs</h1>

            {blogs?.length === 0 ? (
                <p>No blogs available....</p>
            ) : (
                <>
                   
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl"
                            >
                                <h3 className="font-semibold text-lg">
                                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </h3>
                                <p>{blog.body.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 hidden md:flex justify-center space-x-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogList;
