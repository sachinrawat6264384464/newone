// components/Layout.tsx
"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 ml-10">
              <Image
                src="/logo1img.png"
                alt="Home Storey Logo"
                width={64}
                height={64}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Free Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
              >
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                  >
                    Free Consultation
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-400 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/logo1img.png"
                  alt="Home Storey Logo"
                  width={68}
                  height={68}
                  className="h-26 w-auto object-contain"
                />
              </div>
              <p className="text-gray-100">
                Transforming spaces into beautiful homes with expert design and
                construction services.
              </p>
              {/* Book Consultation Button */}
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-100">
                <li>Kitchen Design</li>
                <li>Living Areas</li>
                <li>Bedrooms</li>
                <li>Commercial Spaces</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-100">
                <p>📧 https://www.thenidhimittal.com/</p>
                <p>📞 +91 9319866287</p>
                <p>📍 123 Design Street, City</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-100">
            <p>&copy; 2025 Home Storey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
