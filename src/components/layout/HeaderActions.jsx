import { Search } from "lucide-react";
import { useSearch } from "../../context/SearchContext";
import { useInquiry } from "../../context/InquiryContext";
import Button from "../common/Button";

const HeaderActions = () => {
  const { openSearch } = useSearch();
  const { openInquiry } = useInquiry();

  return (
    <div className="hidden lg:flex items-center gap-4">
      {/* Search Button — 40px square as requested */}
      <button
        onClick={openSearch}
        className="flex items-center justify-center bg-transparent border-none text-navy hover:bg-[#F7F8FA] transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
        style={{ width: "40px", height: "40px", borderRadius: "8px" }}
        aria-label="Search courses"
      >
        <Search style={{ width: "20px", height: "20px" }} />
      </button>

      {/* Inquiry CTA — 42px height as requested */}
      <Button 
        onClick={() => openInquiry()}
        className="btn-primary"
        style={{ height: "42px", padding: "0 20px" }}
      >
        Enquire Now
      </Button>
    </div>
  );
};

export default HeaderActions;
