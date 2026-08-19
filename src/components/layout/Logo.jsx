import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { siteConfig } from "../../data/siteConfig";

const Logo = ({ onClick }) => {
  return (
    <Link 
      to={ROUTES.HOME} 
      onClick={onClick}
      className="relative z-50 inline-flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
      aria-label={`${siteConfig.name} Home`}
    >
      <img
        src="/logo.png"
        alt={siteConfig.name}
        className="h-20 w-auto max-w-[280px] object-contain lg:h-28 lg:max-w-[340px] py-1"
      />
    </Link>
  );
};

export default Logo;
