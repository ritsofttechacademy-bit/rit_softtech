import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "./components/common/Toast";
import { InquiryProvider } from "./context/InquiryContext";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <ToastProvider>
      <InquiryProvider>
        <SearchProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ToastContainer />
        </SearchProvider>
      </InquiryProvider>
    </ToastProvider>
  );
}

export default App;
