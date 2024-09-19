import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { dataApi } from "@/store/api/api";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export default function SignUpForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });

  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.mobile) newErrors.mobile = "Mobile Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    if (e.target.nextSibling && e.target.value) {
      e.target.nextSibling.focus();
    }
    if (e.target.previousSibling && e.target.value === "") {
      e.target.previousSibling.focus();
    }
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      dataApi({
        endPoint: `${apiUrl}/auth/register`,
        method: "POST",
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: "+91" + formData.mobile,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
        },
      })
        .then((res) => {
          setLoading(false);
          if (res && res.message === "OTP sent successfully.") {
            setShowOtpField(true);
            toast.success(res.message);
          } else {
            toast.error(res?.message || "Error submitting form");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("User already exists. Please log in.");
        });
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.every((digit) => digit)) {
      OtpVeryfication();
    } else {
      toast.error("Please enter all 6 digits of the OTP.");
    }
  };

  const OtpVeryfication = () => {
    dataApi({
      endPoint: `${apiUrl}/auth/verifyOtpAndCreateUser`,
      method: "POST",
      data: {
        mobile: "+91" + formData.mobile,
        otp: otp.join(""),
      },
    })
      .then((res) => {
        if (res.message === "Registration successful.") {
          sessionStorage.setItem("authToken", res.token);
          const token = sessionStorage.getItem("token");
          toast.success(res.message);
          navigate("/dashboard");
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-1">
                  Log in
                </Link>
              </p>
              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Phone Number *
                  </label>
                  <div className="flex gap-1">
                    <span className="flex items-center px-3 border border-gray-300 rounded-md w-[40px]">
                      +91
                    </span>
                    <input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="border border-gray-300 p-2 rounded-r-md w-full"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Gender *
                  </label>
                  <div className="flex">
                    <label className="mr-4 flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
                {!showOtpField && (
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -sm -orange-1 text-white fw-500 w-full"
                      disabled={loading}
                    >
                      {loading ? <Spin /> : "Register"}
                    </button>
                  </div>
                )}
              </form>
              {showOtpField && (
                <form
                  className="contact-form respondForm__form row y-gap-20 pt-30"
                  onSubmit={handleOtpSubmit}
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Enter OTP *
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="border border-gray-300 p-2 rounded-md w-12 text-center"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -orange-1 text-white fw-500 w-full mt-4"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
