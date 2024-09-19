import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function LearningSelection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000); // Adding delay for animation effect
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.match(/^\d{0,10}$/)) {
      setPhone(value);
    }
  };

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  return (
    <section className="layout-pt-lg layout-pb-lg border-top-light">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">Get your Personalized Counselling</h2>
              <p className="sectionTitle__text">Submit Your Details for Personalized Counselling</p>
            </div>
          </div>
        </div>

        {!submitted ? (
          <div className="row justify-center pt-30">
            <div className="col-auto">
              <form onSubmit={handleSubmit} className="form-container">
                <div className="mb-20 input-container">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-20 input-container">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-20 input-container">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-20 input-container">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="" disabled >Select State</option>
                    {statesOfIndia.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-20 input-container">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="submit-button-container">
                  <button type="submit" className="submit-button">
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="row justify-center pt-30 text-center">
            <div className="col-auto">
              <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#ff9245" className="tick-animation" />
              <p className="mt-20">Thank you for your submission! We will contact you soon.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
