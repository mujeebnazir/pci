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
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {/* Our Policies Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-200">
              Our Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Return & Refund
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-200">Help</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-base block py-1"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Get Connected Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-200">Connect</h3>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full max-w-[240px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-l text-base"
                />
                <button className="px-6 py-2 bg-white text-black text-base font-medium rounded-r hover:bg-gray-100 transition-colors">
                  Join
                </button>
              </div>
              <div className="flex justify-center md:justify-start space-x-6">
                <a
                  href={socialLinks.instagram || "#"}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href={socialLinks.facebook || "#"}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={socialLinks.youtube || "#"}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href={socialLinks.pinterest || "#"}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaPinterest size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          © 2024 Phalgham Cottage Industries. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
