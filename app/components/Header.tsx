"use client";
import { useState } from "react";
import NavLinks from "./NavLinks";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 text-white py-6 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">

                <h1 className="text-3xl font-bold tracking-wide hover:text-indigo-200 transition-all duration-300 cursor-pointer">
                    Blog Site
                </h1>


                <div className="flex items-center space-x-6 md:space-x-12">

                    <nav className="hidden md:flex">
                        <NavLinks className="flex space-x-6" />
                    </nav>


                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex items-center justify-center p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>


            {isMenuOpen && (
                <nav className="md:hidden bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 text-white py-4 px-4">
                    <NavLinks className="space-y-4 text-center" />
                </nav>
            )}
        </header>
    );
};

export default Header;
