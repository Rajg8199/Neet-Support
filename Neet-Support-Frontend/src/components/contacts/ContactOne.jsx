import React from "react";
import Sidebar from "../dashboard/Sidebar";
import FooterNine from "../layout/footers/FooterNine";

export default function ContactOne() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-4">
          <section className="contact-one-section ">
            <div className="contact-one-container">
              <h1 className="contact-one-title">Contact Us</h1>
              <p className="contact-one-subtitle">
                Any question or remarks? Just write us a message!
              </p>
              <div className="row contact-one-content">
                <div className="col-lg-5 contact-one-info">
                  <h2 className="contact-one-info-title">
                    Contact Information
                  </h2>
                  <p className="contact-one-info-subtitle">
                    Say something to start a live chat!
                  </p>
                  <ul className="contact-one-info-list y-gap-20">
                    <li>
                      <i className="icon-megaphone mr-20"></i> +1012 3456 789
                    </li>
                    <li>
                      <i className="icon-email mr-20"></i> demo@gmail.com
                    </li>
                    <li>
                      <i className="icon-location mr-20 "></i> 132 Dartmouth Street
                      Boston, Massachusetts 02156 United States
                    </li>
                  </ul>
                  <div className="contact-one-info-socials ">

                  <a href="#">
                      <i className="icon-linkedin "></i>
                    </a>
                    <a href="#">
                      <i className="icon-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="icon-instagram"></i>
                    </a>
                    
                  </div>
                </div>
                <div className="col-lg-7 contact-one-form-container">
                  <form className="contact-one-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <label>First Name</label>
                        <input type="text" required placeholder="First Name" />
                      </div>
                      <div className="col-md-6">
                        <label>Last Name</label>
                        <input type="text" required placeholder="Last Name" />
                      </div>
                      <div className="col-md-6">
                        <label>Email</label>
                        <input type="email" required placeholder="Email" />
                      </div>
                      <div className="col-md-6">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          required
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-12 ">
                        <label>Select Subject?</label>
                        <div className="contact-one-radio-group">
                          <label>
                            <input
                              type="radio"
                              name="subject"
                              value="billing"
                              required
                            />
                            Billing Inquiry
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="subject"
                              value="general"
                              required
                            />
                            General Inquiry
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="subject"
                              value="grievances"
                              required
                            />
                            Grievances Inquiry
                          </label>
                        </div>
                      </div>
                      <div className="col-8">
                        <label>Message</label>
                        <textarea
                          required
                          placeholder="Write your message..."
                          rows="5"
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="contact-one-send-message-button"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterNine />
      </div>
    </>
  );
}
