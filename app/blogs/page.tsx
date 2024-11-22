"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../features/blogSlice";
import { RootState } from "../store";
import { Blog } from "../types/BlogType";

const BlogList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);

    const blogs = useSelector((state: RootState) => state.blog.blogs);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const params = {
                    page: currentPage,
                    limit: blogsPerPage,
                };
                const res = await axios.get("http://localhost:5000/api/blogs", {
                    params,
                });
                dispatch(setBlogs(res.data?.blogs));
                setTotalPages(res.data?.totalPages);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [currentPage, dispatch]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">List of Blogs</h1>

            {blogs?.length === 0 ? (
                <p className="text-center pt-10">No blogs available....</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {blogs?.map((blog: Blog) => (
                            <div
                                key={blog._id}
                                className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl"
                            >
                                <h3 className="font-semibold text-lg">
                                    <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
                                </h3>
                                <p>{blog.body.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
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
                    )}
                </>
            )}
        </div>
    );
};

export default BlogList;
