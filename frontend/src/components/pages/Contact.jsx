// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import apiService from "../services/API";


// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     phone: "",
//     subject: "",
//     message: "",

//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleContact = async (e) => {
//     e.preventDefault();

//     setIsLoading(true);

//     try {
//       const response = await apiService.loginUser(formData);
//       // Save the token in local storage
//       localStorage.setItem("token", response.token);

//       window.location.href = "/";
      
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <div>
//       <section className="bg0 p-t-104 p-b-116">
//         <div className="container" style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//          }}>
//             <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg- w-full-md">
//             <form onSubmit={handleContact}>
//                 <h4 className="mtext-105 cl2 txt-center p-b-30">
//                   Send Us A Message
//                 </h4>
//                 {/* name */}
//                 <div className="bor8 m-b-20 how-pos4-parent">
//                   <input
//                     className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                   <i className="fa fa-user how-pos4"></i>

//                 </div>
//                 {/* email */}
//                 <div className="bor8 m-b-20 how-pos4-parent">
//                   <input
//                     className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
//                     type="text"
//                     name="email"
//                     placeholder="Your Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   <i className="fa fa-envelope how-pos4"></i>
//                 </div>
//                 {/* phone */}
//                 <div className="bor8 m-b-20 how-pos4-parent">
//                   <input
//                     className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
//                     type="text"
//                     name="phone"
//                     placeholder="Your Phone Number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                 <i className="fa fa-phone how-pos4"></i>
//                 </div>
//                 {/* subject */}
//                 <div className="bor8 m-b-20 how-pos4-parent">
//                   <input
//                     className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
//                     type="text"
//                     name="subject"
//                     placeholder="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                   />
//                   <i className="fa fa-book how-pos4"></i>

//                 </div>

//                 <div className="bor8 m-b-30">
//                   <textarea
//                     className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
//                     name="msg"
//                     placeholder="How Can We Help?"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
//                   Submit
//                 </button>
//               </form>
//             </div>
//         </div> 
//       </section>
//     </div>
//   );
//  }
// }
// export default Contact;

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await apiService.sendMessage(formData);
  
      // حفظ التوكين إذا لزم الأمر
      localStorage.setItem("token", response.token);
  
      // إعادة تعيين الحقول إلى القيم الافتراضية
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        subject: "",
        message: "",
      });
  
      // التنقل إلى الصفحة الرئيسية (أو أي صفحة أخرى)
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <section className="bg0 p-t-104 p-b-116">
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg- w-full-md">
            <form onSubmit={handleContact}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">Send Us A Message</h4>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-user how-pos4"></i>
              </div>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-envelope how-pos4"></i>
              </div>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-phone how-pos4"></i>
              </div>
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
              <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
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

