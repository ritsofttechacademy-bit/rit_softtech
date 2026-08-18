import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import TopContactBar from "../components/layout/TopContactBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/layout/WhatsAppButton";
import MobileStickyCTA from "../components/layout/MobileStickyCTA";
import InquiryModal from "../components/forms/InquiryModal";
import SearchOverlay from "../components/layout/SearchOverlay";

// ScrollToTop on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollToTop />
      
      {/* Top Bars */}
      <div className="relative z-50">
        <AnnouncementBar />
        <TopContactBar />
      </div>

      <Header />
      
      {/* Main content — offset below fixed header stack */}
      {/* Top bars take space in normal flow, so main starts below them. */}
      {/* We only need to pad for the fixed header height (72px). */}
      <main
        className="flex-grow"
        style={{ paddingTop: "72px" }}
      >
        <Outlet />
      </main>

      <Footer />
      
      {/* Globals */}
      <WhatsAppButton />
      <MobileStickyCTA />
      <InquiryModal />
      <SearchOverlay />
    </div>
  );
};

export default PublicLayout;
