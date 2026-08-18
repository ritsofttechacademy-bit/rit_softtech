import { PhoneCall, FileText } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { useInquiry } from "../../context/InquiryContext";

const MobileStickyCTA = () => {
  const { openInquiry } = useInquiry();
  const { phonePrimary } = siteConfig.contact;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 z-30 lg:hidden shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
      <div className="flex gap-3">
        <a 
          href={`tel:${phonePrimary?.replace(/[^0-9+]/g, '')}`} 
          className="flex-1 flex items-center justify-center gap-2 bg-primary-50 text-primary-700 font-bold py-3 px-4 rounded-xl active:scale-[0.98] transition-transform"
        >
          <PhoneCall className="w-5 h-5" />
          Call
        </a>
        <button 
          onClick={() => openInquiry()}
          className="flex-[2] flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-4 rounded-xl active:scale-[0.98] transition-transform"
        >
          <FileText className="w-5 h-5" />
          Enquire Now
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
