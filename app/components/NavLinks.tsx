"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLinksProps {
    className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const links = [
        { href: "/", text: "Home" },
        { href: "/create-blog", text: "Create Blog", showWhenLoggedIn: true },
        { href: "/login", text: "Login", showWhenLoggedIn: false },
        { href: "/sign-out", text: "Sign Out", showWhenLoggedIn: true },
    ];

    return (
        <ul className={`${className} text-lg font-medium`}>
            {links.map(
                (link) =>
                    (link.showWhenLoggedIn === undefined || link.showWhenLoggedIn === isLoggedIn) && (
                        <li key={link.href}>
                            <Link href={link.href} className="hover:text-indigo-300 transition-all duration-200">
                                {link.text}
                            </Link>
                        </li>
                    )
            )}
        </ul>
    );
};

export default NavLinks;
