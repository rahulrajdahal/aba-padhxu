"use client";

import { routes } from "@/utils/routes";
import { HeartB, Mail } from "@meistericons/react";
import Link from "next/link";
import { Button } from "../Buttons";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href={routes.home}>
              <Logo />
            </Link>
            <p className="text-sm mt-2 text-gray-600 font-serif italic">
              "A room without books is like a body without a soul."
            </p>
            <div className="flex space-x-4 pt-2 text-gray-500">
              <a href="#" className="hover:text-blue-700 transition-colors">
                FB
                {/* <Facebook size={20} /> */}
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                Twiiter
                {/* <Twitter size={20} /> */}
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                Instagram
                {/* <Instagram size={20} /> */}
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Fiction & Literature
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Sci-Fi & Fantasy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Biography & History
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Children's Books
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  Book Club Membership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get weekly book recommendations and exclusive literary event
              invites.
            </p>
            <form
              className="flex max-w-md gap-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                required
                placeholder="Enter your email"
                iconLeft={<Mail size={20} />}
              />
              <Button
                type="submit"
                size="sm"
                className="px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} AbaPadhxu Bookstore. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Curated with <HeartB size={20} className="text-red-400" /> for book
            lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
