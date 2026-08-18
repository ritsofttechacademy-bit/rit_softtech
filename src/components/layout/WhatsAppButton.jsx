import { MessageCircle } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const WhatsAppButton = () => {
  const { whatsapp, phonePrimary } = siteConfig.contact;
  
  // Format phone number for WhatsApp (remove spaces/special chars, ensure country code)
  const baseNumber = whatsapp || phonePrimary || '';
  const whatsappNumber = baseNumber.replace(/[^0-9+]/g, '');

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hi%20RIT,%20I%20want%20to%20know%20more%20about%20your%20courses.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-40 bg-[#25D366] text-white p-3.5 lg:p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#1EBE5C] transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
        Chat with us
        <span className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-navy"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
