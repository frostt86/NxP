import React from 'react';
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">CinemaX</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Experience cinema like never before. Book your tickets for the latest blockbusters 
              and enjoy premium comfort with state-of-the-art technology.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors duration-200" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors duration-200" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              {['Now Playing', 'Coming Soon', 'Gift Cards', 'Loyalty Program', 'About Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Cinema Street, Movie City</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@cinemaX.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CinemaX. All rights reserved. Designed for the ultimate movie experience.</p>
        </div>
      </div>
    </footer>
  );
}