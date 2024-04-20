import React from "react";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 bottom-0 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-white text-lg font-semibold mb-2">
              Contact Us
            </h2>
            <div className="flex items-center text-gray-400 mb-2">
              <AiFillMail className="mr-2" />
              <span>Email: contact@example.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <AiFillPhone className="mr-2" />
              <span>Phone: +1234567890</span>
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
