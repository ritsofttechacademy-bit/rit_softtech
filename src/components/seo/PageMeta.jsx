import { useEffect } from "react";
import { siteConfig } from "../../data/siteConfig";

/**
 * PageMeta — Updates document title and meta description
 */
const PageMeta = ({ title, description }) => {
  useEffect(() => {
    // Set title
    const fullTitle = title 
      ? siteConfig.seo.titleTemplate.replace("%s", title)
      : siteConfig.seo.defaultTitle;
    
    document.title = fullTitle;

    // Set description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || siteConfig.seo.defaultDescription);
    }
  }, [title, description]);

  return null; // This component doesn't render anything
};

export default PageMeta;
