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
              <img src="/rit-softtech-wordmark.svg" alt={siteConfig.name} className="h-12 w-auto max-w-[220px] object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Empowering the next generation of tech professionals with industry-relevant training, expert mentorship, and placement assistance.
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(social).map(([platform, url]) => (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all capitalize"
                  aria-label={platform}
                >
                  <i className={`fab fa-${platform === 'twitter' ? 'x-twitter' : platform} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.ABOUT} className="text-sm hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to={ROUTES.TRAINERS} className="text-sm hover:text-primary-400 transition-colors">Our Trainers</Link></li>
              <li><Link to={ROUTES.PLACEMENTS} className="text-sm hover:text-primary-400 transition-colors">Placements</Link></li>
              <li><Link to={ROUTES.BLOG} className="text-sm hover:text-primary-400 transition-colors">Tech Blog</Link></li>
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
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
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
