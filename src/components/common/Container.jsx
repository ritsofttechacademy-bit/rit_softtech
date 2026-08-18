// Container — max-width 1280px, centered, horizontal padding
const Container = ({ children, className = "" }) => (
  <div className={`container-main ${className}`}>{children}</div>
);

export default Container;
