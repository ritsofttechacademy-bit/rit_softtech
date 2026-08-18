import { createContext, useContext, useState, useCallback } from "react";

const InquiryContext = createContext(null);

export const InquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({});

  const openInquiry = useCallback((data = {}) => {
    setPrefill(data);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setPrefill({}), 300); // reset after animation
  }, []);

  return (
    <InquiryContext.Provider value={{ isOpen, prefill, openInquiry, closeInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider");
  return ctx;
};
