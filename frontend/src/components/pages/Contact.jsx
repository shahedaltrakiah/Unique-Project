import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/API";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name': {
        // Make sure there are no numbers in the name
        if (/\d/.test(value)) {
          return 'The name must contain only letters';
        }
        break;
      }
      case 'phone': {
        //Ensure that the phone number contains only numbers and is 10 digits long
        if (!/^\d+$/.test(value)) {
          return 'Phone number must contain numbers only';
        }
        if (value.length !== 10) {
          return 'Phone number must be 10 digits';
        }
        break;
      }
      case 'email': {
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Invalid email';
        }
        break;
      }
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate field as you type
    const fieldError = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));

    setFormData({ ...formData, [name]: value });
  };
  
  const handleContact = async (e) => {
    e.preventDefault();
    
    // Final check before sending
    const newErrors = {};
    
     // Check all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'password') {  
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // If there are errors, stop sending.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.sendMessage(formData);

      localStorage.setItem("token", response.token);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        subject: "",
        message: "",
      });

      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been successfully sent.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); 
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title:"Error!",
        text: "Failed to send your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="bg0 p-t-40 p-b-116">
        <div className="container" 
        style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg- w-full-md"
                      style={{ width: "2350px" }}>
            <form onSubmit={handleContact}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">Send Us A Message</h4>
              
              {/* حقل الاسم مع رسالة الخطأ */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30 ${errors.name ? 'border-red-500' : ''}`}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-user how-pos4"></i>
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}


              {/* حقل البريد الإلكتروني مع رسالة الخطأ */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30 ${errors.email ? 'border-red-500' : ''}`}
                  type="text"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-envelope how-pos4"></i>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}


              {/* حقل رقم الهاتف مع رسالة الخطأ */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30 ${errors.phone ? 'border-red-500' : ''}`}
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-phone how-pos4"></i>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}


              {/* باقي الحقول كما هي */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-book how-pos4"></i>
              </div>
              <div className="bor8 m-b-30">
                <textarea
                  className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                  name="message"
                  placeholder="How Can We Help?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;