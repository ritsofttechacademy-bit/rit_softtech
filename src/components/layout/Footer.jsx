import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { siteConfig } from "../../data/siteConfig";
import Container from "../common/Container";

const Footer = () => {
  const { contact, social } = siteConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-[72px] pb-[32px] border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">

          {/* Brand & About (4 cols) */}
          <div className="lg:col-span-4">
            <Link to={ROUTES.HOME} className="inline-flex items-center bg-white rounded-lg px-3 py-2 mb-6">
              <img src="/logo.png" alt={siteConfig.name} className="h-16 w-auto max-w-[240px] object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of tech professionals with industry-relevant training, expert mentorship, and placement assistance.
            </p>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] hover:border-[#e6683c] hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Channel"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.ABOUT} className="text-sm hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to={ROUTES.TRAINERS} className="text-sm hover:text-primary-400 transition-colors">Our Trainers</Link></li>
              <li><Link to={ROUTES.PLACEMENTS} className="text-sm hover:text-primary-400 transition-colors">Placements</Link></li>
              {/* <li><Link to={ROUTES.BLOG} className="text-sm hover:text-primary-400 transition-colors">Tech Blog</Link></li> */}
              <li><Link to={ROUTES.CONTACT} className="text-sm hover:text-primary-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Courses (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Popular Courses</h4>
            <ul className="space-y-3">
              <li><Link to="/courses/python-full-stack-development" className="text-sm hover:text-primary-400 transition-colors">Python Full Stack</Link></li>
              <li><Link to="/courses/java-full-stack-development" className="text-sm hover:text-primary-400 transition-colors">Java Full Stack</Link></li>
              <li><Link to="/courses/data-science" className="text-sm hover:text-primary-400 transition-colors">Data Science & AI</Link></li>
              <li><Link to="/courses/devops-engineering" className="text-sm hover:text-primary-400 transition-colors">DevOps Engineering</Link></li>
              <li><Link to={ROUTES.COURSES} className="text-sm text-primary-400 font-semibold hover:text-primary-300 transition-colors flex items-center gap-1">View All Courses <ArrowRight className="w-3.5 h-3.5" /></Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3 text-sm items-center">
                <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                <a href={`tel:${contact.phonePrimary?.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{contact.phonePrimary}</a>
              </li>
              <li className="flex gap-3 text-sm items-center">
                <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </li>
            </ul>

            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Newsletter</h4>
            <form className="relative" onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.elements[0].value;
              try {
                const res = await fetch('http://localhost:5000/api/subscribers', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });
                const data = await res.json();
                if (data.success) {
                  alert("Subscribed successfully!");
                  e.target.reset();
                } else {
                  alert(data.message || "Failed to subscribe");
                }
              } catch (err) {
                alert("Server error. Please try again later.");
              }
            }}>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-white/5 border border-white/10 rounded-btn py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {currentYear} RIT Softtech Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to={ROUTES.PRIVACY_POLICY} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to={ROUTES.TERMS} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to={ROUTES.REFUND_POLICY} className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
