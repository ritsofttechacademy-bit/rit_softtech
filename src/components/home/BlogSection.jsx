import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { blogs } from "../../data/blogs";

const BlogSection = () => {
  const featuredArticle = blogs.find((blog) => blog.featured) ?? blogs[0];
  const recentArticles = blogs
    .filter((blog) => blog.id !== featuredArticle?.id)
    .slice(0, 3);

  return (
    <section className="bg-white editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>
        <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "36px" }}>
          Latest Resources
        </span>

        <div className="grid-12">
          {/* Featured Article - 7 cols */}
          <motion.div 
            className="col-span-12 lg:col-span-7 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <Link to={`/blog/${featuredArticle.slug}`} className="group block">
              <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", height: "300px", backgroundColor: "var(--surface)", marginBottom: "20px" }}>
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="group-hover:scale-105"
                />
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "13px", fontWeight: 600, color: "var(--muted)", marginBottom: "12px" }}>
                <span style={{ color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{featuredArticle.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {featuredArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredArticle.readTime}</span>
              </div>
              <h3 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.3, marginBottom: "12px" }} className="group-hover:text-blue-600 transition-colors">
                {featuredArticle.title}
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.6 }}>
                {featuredArticle.excerpt}
              </p>
            </Link>
          </motion.div>

          {/* Recent Articles - 5 cols */}
          <div className="col-span-12 lg:col-span-5 lg:pl-[8%] flex flex-col justify-center">
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              More Articles
            </div>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}
                >
                  <Link to={`/blog/${article.slug}`} className="group block">
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                      {article.category}
                    </div>
                    <h4 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.4, marginBottom: "8px" }} className="group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <div style={{ fontSize: "12px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "12px" }}>
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <Link 
              to={ROUTES.BLOG} 
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)", marginTop: "24px" }}
            >
              View all resources <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
