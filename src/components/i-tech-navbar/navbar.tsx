import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ToggleButton";

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-600 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        <Link
                            href="/products"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/products-rtk"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Products-rtk
                        </Link>
                        <Link
                            href="/users"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Users
                        </Link>
                        <Link
                            href="/product-upload"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Upload Product
                        </Link>
                        <Link
                            href="/product-upload-rtk"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Upload Product RTK
                        </Link>
                        <div className="inline-flex items-center">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
