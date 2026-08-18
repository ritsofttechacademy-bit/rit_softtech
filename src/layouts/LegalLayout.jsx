import { Outlet, Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { ChevronRight } from "lucide-react";

// Assuming PublicLayout already has Header/Footer, we can either nest this 
// inside PublicLayout or duplicate the wrapper. It's better to nest this 
// under PublicLayout in AppRoutes so LegalLayout only handles the sidebar.

const LegalLayout = () => {
  const location = useLocation();
  
  const links = [
    { name: "Privacy Policy", path: ROUTES.PRIVACY_POLICY },
    { name: "Terms of Service", path: ROUTES.TERMS },
    { name: "Refund Policy", path: ROUTES.REFUND_POLICY },
  ];

  return (
    <div className="container-main section-pad">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 p-6 bg-slate-50 rounded-card border border-border">
            <h3 className="font-bold text-navy mb-4">Legal & Policies</h3>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-btn text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-white text-primary-600 shadow-sm border border-border" 
                        : "text-secondary hover:text-navy hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white p-8 lg:p-10 rounded-card border border-border shadow-sm prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-primary-600">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LegalLayout;
