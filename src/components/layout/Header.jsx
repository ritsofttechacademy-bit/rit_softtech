import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import Container from "../common/Container";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import HeaderActions from "./HeaderActions";
import MobileNavigation from "./MobileNavigation";
import { useSearch } from "../../context/SearchContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openSearch } = useSearch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Threshold 20px
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-header py-0 top-0 border-b border-transparent"
            : "bg-white py-2 lg:py-0 top-0 lg:top-[32px] border-b border-border"
        }`}
        style={{ height: "72px" }}
      >
        <Container className="h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Logo onClick={() => setMobileMenuOpen(false)} />

            {/* Desktop Navigation */}
            <DesktopNavigation />

            {/* Desktop Actions */}
            <HeaderActions />

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 lg:hidden relative z-50">
              <button
                onClick={openSearch}
                className="p-2.5 text-navy hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-[22px] h-[22px]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-navy hover:bg-slate-100 rounded-lg transition-colors ml-1"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-7 h-7" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header;
