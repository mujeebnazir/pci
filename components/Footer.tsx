import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

type FooterProps = {
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    pinterest?: string;
  };
};

const Footer: React.FC<FooterProps> = ({ socialLinks = {} }) => {
  return (
    <footer className="bg-black text-white py-10 px-10">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Our Policies Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Customer Reviews✨
                </a>
              </li>
            </ul>
          </div>

          {/* Get Connected Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Get Connected</h3>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className=" shadow-sm shadow-gray-300 text-black py-1 px-2 focus:outline-none"
              />
              <button className="bg-white text-black hover:bg-gray-300 transition shadow  px-3 py-1 ">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4">
              <a
                href={socialLinks.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 text-white"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={socialLinks.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 text-white"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={socialLinks.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 text-white"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href={socialLinks.pinterest || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 text-white"
              >
                <FaPinterest size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 text-sm">
          © 2024 Phalgham Cottage Industries All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
