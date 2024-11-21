const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 text-white py-6 mt-16 shadow-md">
            <div className="container mx-auto text-center">
                
                <p className="text-lg font-medium">
                    &copy; {new Date().getFullYear()} <span className="font-semibold">Blog Site</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
