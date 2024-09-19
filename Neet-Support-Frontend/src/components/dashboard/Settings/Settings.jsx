import React, { useState } from "react";
import FooterNine from "@/components/layout/footers/FooterNine";

export default function Settings() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
    if (value.length < 4 || value <= 2023) {
      setYearError("Year must be greater than 2023");
    } else {
      setYearError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      return;
    }
    setPhone(value);
    if (value.length < 10) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">My profile</h1>
          </div>
        </div>

        <div className="profile-container">
          <h1 className="profile-name">Kamal Rawat</h1>
          <div className="profile-header">
            <div className="profile-picture">
              <img src="/assets/img/dashboard/edit/1.png" alt="logo-1" />
            </div>
            <div className="profile-details">
              <div className="current-plan">
                <span className="plan-text">Current Plan</span>
                <button className="explore-button">Explore</button>
                <button className="upgrade-button">Upgrade</button>
              </div>
            </div>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
          <div className="user-details-section">
            <div className="combine-1">
              <img src="assets/img/dashboard/icons/icon.svg" alt="icons" />
              <h3 className="user-section-title">Basic Details </h3>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Student Details</h3>
              <div className="user-card-content">
                <div className="user-form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Last name"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>Mobile No.</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your Mobile No."
                    required
                  />
                  {phoneError && (
                    <span className="error-message">{phoneError}</span>
                  )}
                </div>
                <div className="user-form-group">
                  <label>Mail Id</label>
                  <div className="user-email-verification">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      required
                    />
                    <button className="user-verify-button">Verify</button>
                  </div>
                  {emailError && (
                    <span className="error-message">{emailError}</span>
                  )}
                </div>
                <div className="user-form-group">
                  <label>Gender</label>
                  <select value={gender} onChange={handleGenderChange} required>
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="user-form-group">
                  <label>DOB</label>
                  <input type="date" required />
                </div>
              </div>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Parent Details </h3>
              <div className="user-card-content">
                <div className="user-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Parent's Name"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>Contact</label>
                  <input
                    type="text"
                    placeholder="Enter your Parent's Contact"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>Mail ID</label>
                  <input
                    type="email"
                    placeholder="Enter your Parent's Email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Residential Details </h3>
              <div className="user-card-content">
                <div className="user-form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>City</label>
                  <input type="text" placeholder="City Name" required />
                </div>
                <div className="user-form-group">
                  <label>Pin Code</label>
                  <input type="number" placeholder="Pin Code" required />
                </div>
                <div className="user-form-group-1">
                  <label>State</label>
                  <input type="text" placeholder="State" required />
                </div>
                <div className="user-form-group-1">
                  <label>Nationality</label>
                  <input type="text" placeholder="Nationality" required />
                </div>
              </div>
            </div>
          </div>
          <div className="user-details-section">
            <div className="combine-1">
              <img src="assets/img/dashboard/icons/2.svg" alt="logo-2" />
              <h3 className="user-section-title">Academic Details </h3>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Education</h3>
              <div className="user-card-content">
                <div className="user-form-group">
                  <label>Qualification / Class</label>
                  <input
                    type="text"
                    placeholder="Enter your qualification"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>12th Passing Year</label>
                  <input type="text" placeholder="Year" required />
                </div>
                <div className="user-form-group">
                  <label>School / College Name</label>
                  <input type="text" placeholder="School Name" required />
                </div>
                <div className="user-form-group-1">
                  <label>12th Board</label>
                  <input type="text" placeholder="Board" required />
                </div>
              </div>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Neet Exam Details</h3>
              <div className="user-card-content">
                <div className="user-form-group">
                  <label>Appearing for Neet</label>
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={handleYearChange}
                    required
                  />
                  {yearError && (
                    <span className="error-message">{yearError}</span>
                  )}
                </div>
                <div className="user-form-group">
                  <label>Neet Roll No.</label>
                  <input type="text" placeholder="Roll No." required />
                </div>
                <div className="user-form-group">
                  <label>All India Rank (AIR)</label>
                  <input type="text" placeholder="All India Rank" required />
                </div>
                <div className="user-form-group">
                  <label>Neet Score</label>
                  <input type="text" placeholder="Neet Score" required />
                </div>
                <div className="user-form-group">
                  <label>Coaching Institute</label>
                  <input
                    type="text"
                    placeholder="eg: Allens, Physics Wallah"
                    required
                  />
                </div>
                <div className="user-form-group">
                  <label>Coaching Institute Branch</label>
                  <input
                    type="text"
                    placeholder="Location of your Coaching Institute"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="user-details-section">
            <div className="combine-1">
              <img src="assets/img/dashboard/icons/3.svg" alt="logo-3" />
              <h3 className="user-section-title">Counselling Details </h3>
            </div>
            <div className="user-details-card">
              <h3 className="user-card-title">Counselling Details</h3>
              <div className="user-card-content">
                <div className="user-form-group-1">
                  <label>Domicile State</label>
                  <input
                    type="text"
                    placeholder="Domicile State"
                    required
                  />
                </div>
                <div className="user-form-group-1">
                  <label>Course Prefered</label>
                  <input
                    type="text"
                    placeholder="eg: MBBS, BDS"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex  x-gap-30 y-gap-20 flex-wrap items-center pt-20 px-30 border-bottom-light js-tabs-controls">
                  {buttons.map((elm, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i + 1)}
                      className={`tabs__button text-light-1 js-tabs-button ${
                        activeTab == i + 1 ? "is-active" : ""
                      } `}
                      type="button"
                    >
                      {elm}
                    </button>
                  ))}
                </div>

                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <EditProfile activeTab={activeTab} />
                  <Password activeTab={activeTab} />
                  <SocialProfiles activeTab={activeTab} />
                  <Notification activeTab={activeTab} />
                  <CloseAccount activeTab={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <FooterNine />
    </div>
  );
}
