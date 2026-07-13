import Link from "next/link";
import { FaMapPin, FaEnvelope, FaPhone, FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="text-2xl font-heading tracking-tight">
              Dream<span className="text-gold">Nest</span>
            </Link>
            <p className="mt-4 text-sm text-gray/70 leading-relaxed">
              Find your perfect home with DreamNest. Premium properties for sale and rent across prime locations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-sm text-gray/70 hover:text-white transition-colors">Explore Properties</Link></li>
              <li><Link href="/about" className="text-sm text-gray/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray/70 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-gray/70 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">For Owners</h4>
            <ul className="space-y-3">
              <li><Link href="/items/add" className="text-sm text-gray/70 hover:text-white transition-colors">List a Property</Link></li>
              <li><Link href="/items/manage" className="text-sm text-gray/70 hover:text-white transition-colors">Manage Listings</Link></li>
              <li><Link href="/register" className="text-sm text-gray/70 hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray/70">
              <li className="flex items-start gap-2">
                <FaMapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>123 Dream Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4 text-gold shrink-0" />
                <span>hello@dreamnest.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="w-4 h-4 text-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors" aria-label="Facebook">
                <FaFacebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors" aria-label="X (Twitter)">
                <FaXTwitter className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray/60">&copy; {new Date().getFullYear()} DreamNest. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray/60">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
