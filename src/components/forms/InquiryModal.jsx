import { useState, useEffect } from "react";
import { Send, FileText } from "lucide-react";
import { useInquiry } from "../../context/InquiryContext";
import { useToast } from "../../context/ToastContext";
import Modal from "../common/Modal";
import Button from "../common/Button";

const InquiryModal = () => {
  const { isOpen, closeInquiry, prefill } = useInquiry();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prefill data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        course: prefill?.course || "",
      }));
    }
  }, [isOpen, prefill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Enquiry submitted successfully! Our team will contact you shortly.");
        closeInquiry();
        setFormData({ name: "", email: "", phone: "", course: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error("Failed to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeInquiry}
      title={prefill?.course ? `Enquire about ${prefill.course}` : "Request a Callback"}
    >
      <div className="p-6 md:p-8">
        <p className="text-secondary mb-6 text-sm">
          Fill out the form below and our career counselor will get in touch with you to discuss your training needs and batch options.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inq-name" className="form-label">Full Name <span className="text-red-500">*</span></label>
              <input
                id="inq-name"
                name="name"
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="inq-phone" className="form-label">Phone Number <span className="text-red-500">*</span></label>
              <input
                id="inq-phone"
                name="phone"
                type="tel"
                required
                className="form-input"
                placeholder="+91 90000 00000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="inq-email" className="form-label">Email Address <span className="text-red-500">*</span></label>
            <input
              id="inq-email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="inq-course" className="form-label">Interested Course</label>
            <input
              id="inq-course"
              name="course"
              type="text"
              className="form-input"
              placeholder="e.g. Python Full Stack"
              value={formData.course}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="inq-message" className="form-label">Additional Message / Questions</label>
            <textarea
              id="inq-message"
              name="message"
              rows={3}
              className="form-input resize-none"
              placeholder="I'm looking for weekend batches..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="pt-4 border-t border-border mt-6">
            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              loading={isSubmitting}
            >
              {!isSubmitting && <Send className="w-5 h-5 mr-2" />}
              Submit Enquiry
            </Button>
            <p className="text-xs text-center text-muted mt-3">
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InquiryModal;
