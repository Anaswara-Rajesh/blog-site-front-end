import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import toast from "react-hot-toast";
import { FaSignOutAlt } from 'react-icons/fa';

interface NavLinksProps {
    className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = () => {
        logout();
        toast.success("Logout successfully");
        router.push("/login");
    };

    if (!isMounted) return null;

    const links = [
        { href: "/", text: "Home" },
        {
            href: "/create-blog",
            text: "Create Blog",
            showWhenLoggedIn: true,
            isButton: true,
        },
        {
            href: "/login",
            text: "Login",
            showWhenLoggedIn: false,
            isButton: true,
        },
        {
            href: "/sign-out",
            icon: <FaSignOutAlt className="w-5 h-5" />,
            showWhenLoggedIn: true,
            onClick: handleSignOut,
        },
    ];

    return (
        <ul className={`${className} text-lg font-medium`}>
            {links.map(
                (link) =>
                    (link.showWhenLoggedIn === undefined || link.showWhenLoggedIn === isLoggedIn) && (
                        <li key={link.href}>
                            {link.isButton ? (
                                <Link
                                    href={link.href}
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-all duration-200"
                                >
                                    {link.text}
                                </Link>
                            ) : link.icon ? (
                                <button
                                    onClick={link.onClick}
                                    className="flex items-center space-x-2 text-white hover:text-indigo-300 transition-all duration-200"
                                >
                                    {link.icon}
                                    <span>{link.text}</span>
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="hover:text-indigo-300 transition-all duration-200"
                                >
                                    {link.text}
                                </Link>
                            )}
                        </li>
                    )
            )}
        </ul>
    );
};

export default NavLinks;
