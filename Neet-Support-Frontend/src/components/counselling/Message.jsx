import React, { useEffect, useState } from "react";
import { Steps, Button, TimePicker, Calendar, theme,message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import DocumentUpload from "./DocumentUpload"; // Import DocumentUpload Component
import FillYourDetails from "./FillDetails"; // Import FillYourDetails Component
import SelectColleges from "./SelectColleges";

// Import MUI DatePicker components
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import TrackDetails from "./TrackDetails";

const { Step } = Steps;

// Document upload states

const documentList = [
  'Passport_Photo',
  'Signature',
  'Metric_Marksheet',
  'Intermediate_Marksheet',
  'NEET_Admit_Card',
  'NEET_Score_Card',
  'Caste_Certificate',
  'PwD_Certificate',
  'Domicile_Certificate',
  'Aadhar_Card',
  'Other_Document',
];

// Disable dates that are before today
const disabledDate = (current) => {
  return current && current < dayjs().startOf("day");
};
const Message = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  // State for form data
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    neetRollNumber: "",
    neetApplicationNumber: "",
    dob: "",
    gender: "",
    nationality: "Select an option",
    category: "Select an option",
    pwd: "Select an option",

    // Contact Information
    mobilePrimary: "",
    mobileSecondary: "",
    emailPrimary: "",
    emailSecondary: "",

    // Permanent Address
    permanentAddressStreet: "",
    permanentAddressCity: "",
    permanentAddressState: "",
    permanentAddressCountry: "India", // Set default to "India"
    permanentAddressPostalCode: "",
    // Correspondence Address

    correspondenceAddressStreet: "",
    correspondenceAddressCity: "",
    correspondenceAddressState: "",
    correspondenceAddressCountry: "India", // Set default to "India"
    correspondenceAddressPostalCode: "",

    // NEET Examination Details
    neetRank: "",
    neetScore: "",
    neetPercentile: "",

    // Academic Details
    metricAcademicDetailsBoardName: "",
    metricAcademicDetailsYearOfPassing: "",
    metricAcademicDetailsPercentage: "",
    intermediateAcademicDetailsBoardName: "",
    intermediateAcademicDetailsYearOfPassing: "",
    intermediateAcademicDetailsPercentage: "",

    // Reservation Details

    reservationCategory: "OBC", // Default category
    reservationIsEligible: false, // Default to false

    // Allotted Quota
    allottedQuota: "",
    subCategory: "",
  });

  // State for current step
  const [currentStep, setCurrentStep] = useState(0);

  // State to track if the session is booked
  const [isSessionBooked, setIsSessionBooked] = useState(false);

  // New state to track if Correspondence Address is same as Permanent Address
  const [isSameAddress, setIsSameAddress] = useState(false);

  // State for the calendar value (controlled calendar)
  const [calendarValue, setCalendarValue] = useState(dayjs());

  // State to track if the date is selected
  const [isDateSelected, setIsDateSelected] = useState(false);

  // State to track if the time slot is selected
  const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);

  const [mccColleges, setMccColleges] = useState([]); // Store MCC colleges
  const [stateColleges, setStateColleges] = useState([]); // Store State colleges

  const [bgColor, setBgColor] = useState("white");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const handleFileChange = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [docName]: file,
      }));
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
  }, [authToken]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/getUserDetails`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const user = res.data;
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          location: "online",
          category: "OBC",
        });
      } catch (error) {
        console.log("Error while fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [authToken]);
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`, // Fixed
    borderRadius: token.borderRadiusLG,
  };

  const handleSameAddressChange = (e) => {
    const isChecked = e.target.checked;
    setIsSameAddress(isChecked);

    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        correspondenceAddressStreet: prevState.permanentAddressStreet,
        correspondenceAddressCity: prevState.permanentAddressCity,
        correspondenceAddressState: prevState.permanentAddressState,
        correspondenceAddressPostalCode: prevState.permanentAddressPostalCode,
        correspondenceAddressCountry: prevState.permanentAddressCountry,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        correspondenceAddressStreet: "",
        correspondenceAddressCity: "",
        correspondenceAddressState: "",
        correspondenceAddressPostalCode: "",
        correspondenceAddressCountry: "India", // Set default country back to "India"
      }));
    }
  };

  // New state to track if booking is confirmed
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const {
    firstName,
    lastName,
    email,
    mobile,
    neetScore,
    neetRank,
    location,
    category,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.firstName) errors.firstName = "First Name is required";
      if (!formData.lastName) errors.lastName = "Last Name is required";
      if (!formData.neetRollNumber)
        errors.neetRollNumber = "NEET Roll Number is required";
      if (!formData.neetApplicationNumber)
        errors.neetApplicationNumber = "NEET Application Number is required";
      if (!formData.dob) errors.dob = "Date of Birth is required";
      
      // if (!formData.gender) errors.gender = "Gender is required";
      // if (!formData.nationality) errors.nationality = "Nationality is required";
      // if (!formData.category) errors.category = "Category is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.neetScore > 720) {
      alert("NEET score must be less than or equal to 720.") ;
      return;
    }
    if (formData.mobile.length !== 10) {
      alert("Mobile number should be exactly 10 digits.");
      return;
    }
    if (currentStep === 1) {
      // Only apply this logic to step 1
      const errors = validateForm(); // Validate the form
      setFormErrors(errors); // Set validation errors in the state

      if (Object.keys(errors).length === 0) {
        // If no validation errors exist
        try {
          await fetchCollegeList(); // Wait for the data to be fetched
          setCurrentStep(2); // Move to step 2 only if data fetching and validation succeed
        } catch (error) {
          console.error("Error fetching college data:", error);
        }
      } else {
        console.log("Form validation failed", errors); // Log validation errors
      }
    } else {
      setIsSessionBooked(true); // Leave the original flow for "Book Your Session Now" intact
      console.log("Session is booked", formData);
    }
  };

  // Fetch the college list based on the form data
  const fetchCollegeList = async () => {
    try {
      // Example API call with formData
      const response = await fetch("https://dummyapi.com/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send form data to the server
      });

      const data = await response.json();

      // Update state with fetched colleges
      setMccColleges(data.mcc || []);
      setStateColleges(data.state || []);

      // Move to the next step to show college list
    } catch (error) {
      console.error("Error fetching college data:", error);
    }
  };

  // Render error messages if validation fails
  const renderError = (fieldName) => {
    return formErrors[fieldName] ? (
      <span className="text-red-500 text-xs">{formErrors[fieldName]}</span>
    ) : null;
  };

  // Function to handle confirmation and show success UI, then proceed to the next step
  // Function to handle confirmation and show success UI, then proceed to the next step
  const handleConfirmBooking = () => {
    setIsBookingConfirmed(true); // Set booking confirmation state

    const formatDate = dayjs(calendarValue).format("YYYY-MM-DD");

    // Convert selectedTime to 24-hour format and append ":00" for seconds
    const formatTime = dayjs(
      `2024-01-01 ${selectedTime}`,
      "YYYY-MM-DD h:mm A"
    ).format("HH:mm:ss");

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/book-session`,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            neetScore: formData.neetScore,
            neetRank: formData.neetRank,
            location: formData.location,
            category: formData.category,
            date: formatDate, // Format date to YYYY-MM-DD
            time: formatTime, // Format time to HH:mm:ss (24-hour time format)
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Session created successfully:", res);

        // Automatically move to the next step after 3 seconds
        setTimeout(() => {
          setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
          setIsBookingConfirmed(false); // Reset booking confirmation
        }, 3000); // 3 seconds delay
      } catch (error) {
        console.error("Failed to create session:", error);
      }
    };

    fetchData(); // Call the API after confirmation
  };

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/userDetails`,
        {
          neetRollNumber: formData.neetRollNumber,
          neetApplicationNumber: formData.neetApplicationNumber,
          neetRank: formData.neetRank,
          neetScore: formData.neetScore,
          neetPercentile: formData.neetPercentile,
          fatherName: formData.fatherName, // Ensure correct field name
          motherName: formData.motherName, // Ensure correct field name
          nationality: formData.nationality,
          category: formData.category,
          pwd: formData.pwd,
          contactInformation: {
            mobilePrimary: formData.mobilePrimary,
            mobileSecondary: formData.mobileSecondary,
            emailPrimary: formData.emailPrimary,
            emailSecondary: formData.emailSecondary,
          },
          permanentAddress: {
            street: formData.permanentAddressStreet, // Correct field names
            city: formData.permanentAddressCity,
            state: formData.permanentAddressState,
            country: "India",
            postalCode: formData.permanentAddressPostalCode,
          },
          correspondenceAddress: isSameAddress
            ? {
                street: formData.permanentAddressStreet, // Correct field names
                city: formData.permanentAddressCity,
                state: formData.permanentAddressState,
                country: "India",
                postalCode: formData.permanentAddressPostalCode,
              }
            : {
                street: formData.correspondenceAddressStreet,
                city: formData.correspondenceAddressCity,
                state: formData.correspondenceAddressState,
                country: "India",
                postalCode: formData.correspondenceAddressPostalCode,
              },
          metricAcademicDetails: {
            schoolName: formData.metricAcademicDetailsBoardName,
            boardName: formData.metricAcademicDetailsBoardName,
            yearOfPassing: formData.metricAcademicDetailsYearOfPassing,
            percentage: formData.metricAcademicDetailsPercentage,
          },
          intermediateAcademicDetails: {
            schoolName: formData.intermediateAcademicDetailsBoardName,
            boardName: formData.intermediateAcademicDetailsBoardName,
            yearOfPassing: formData.intermediateAcademicDetailsYearOfPassing,
            percentage: formData.intermediateAcademicDetailsPercentage,
          },
          reservation: {
            category: formData.category,
            isEligible: formData.isEligible,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setTimeout(() => {
        // Proceed to next step after 3 second
        setCurrentStep((prevStep) => prevStep + 1);
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to submit user details:",
        error.response?.data || error.message
      );
      alert("Failed to submit the form. Please check for errors.");
    }
  };

  const handleBack = () => {
    if (isTimeSlotSelected) {
      setIsTimeSlotSelected(false);
    } else if (isDateSelected) {
      setIsDateSelected(false);
    } else {
      setIsSessionBooked(false);
    }
  };

  // Function to handle date selection
  const handleDateSelect = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setIsDateSelected(true);
  };

  const handleTimeSelect = (time, timeString) => {
    setSelectedTime(timeString);
    setIsTimeSlotSelected(true);
    setBgColor(timeString.includes("AM") ? "#f0f8ff" : "#f5deb3");
  };
  // const handleTimeSelect = (newValue) => {
  //   const timeString = newValue.format("h:mm A"); // Format the time string for display
  //   setSelectedTime(timeString); // Update the state with the selected time
  //   setIsTimeSlotSelected(true); // Mark that the time slot is selected
  //   setBgColor(timeString.includes("AM") ? "#f0f8ff" : "#f5deb3"); // Optional: change background color based on AM/PM
  // };

  const isStepValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (isStepValid()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert("Please complete all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prevStep) => prevStep - 1);
  };

  // Function to handle rendering step content
  const renderStepContent = () => {
    // Show success UI if booking is confirmed, but disable Next button until success UI disappears
    if (isBookingConfirmed) {
      return (
        <div className="success-screen">
          <div className="success-container flex justify-center items-center">
            <div className="text-center">
              <div className="checkmark">
                <i
                  className="fas fa-check-circle fa-5x"
                  style={{ color: "#FFFFFF" }}
                ></i>
              </div>
              <h1
                className="success-message text-2xl font-bold"
                style={{ color: "#50C878" }}
              >
                Your Request is Submitted
              </h1>
              <p className="text-md" style={{ color: "#FFFFFF" }}>
                We will send you the session details on your email.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <FillYourDetails
          formData={formData}
          handleChange={handleChange}
          handleUserDetailsSubmit={handleUserDetailsSubmit}
          handleSameAddressChange={handleSameAddressChange}
          isSameAddress={isSameAddress}
          formErrors={formErrors}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <SelectColleges
          mccColleges={mccColleges}
          stateColleges={stateColleges}
        />
      );
    }
    if (currentStep === 4) {
      return (
        <DocumentUpload
          documentList={documentList}
          uploadedFiles={uploadedFiles}
          handleFileChange={handleFileChange}
        />
      );
    }
    if (currentStep === 5) {
        return (
          <TrackDetails
          mccColleges={mccColleges}
          stateColleges={stateColleges}
            documentList={documentList}
            uploadedFiles={uploadedFiles}
            handleFileChange={handleFileChange}
          />
        );
      }
    // This block renders the form for the first step (Booking the session)
    if (currentStep === 0 && isSessionBooked) {
      return (
        <div className="flex flex-col lg:flex-row lg:space-x-8 p-1 bg-[#097F78] rounded-xl">
          {/* Left Column (Form) */}
          <div className="flex-1 flex flex-col justify-between p-4 lg:h-full bg-[#097F78]">
            <div>
              <div className="mb-2">
                <Button
                  type="default"
                  onClick={handleBack}
                  icon={
                    <i
                      className="fas fa-arrow-left"
                      style={{ color: "#FF9245" }}
                    />
                  }
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#FF9245",
                  }}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">
                Book Your Session Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-2">
                <p className="mb-1 text-white text-sm">📝 Fill Your Details</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Email ID"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Mobile No."
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Neet Score"
                    name="neetScore"
                    type="number"
                    value={formData.neetScore}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Neet Rank"
                    name="neetRank"
                    type="number"
                    value={formData.neetRank}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    options={["Noida", "Delhi", "Mumbai"]}
                    isSessionBooked={true}
                    required={true}
                  />
                  <SelectField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={["OBC", "General", "SC/ST"]}
                    isSessionBooked={true}
                    required={true}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Divider */}
          {isSessionBooked && (
            <div className="hidden lg:block lg:w-[2px] lg:bg-[#FF9245] mx-4 mt-4 mb-4"></div>
          )}

          {/* Right Column (Time/Date Selection) */}
          <div className="flex-1 flex flex-col justify-between p-4 lg:h-full bg-[#097F78] mt-11 lg:mt-0">
            <h3 className="text-2xl font-semibold text-center text-white">
              {isDateSelected
                ? isTimeSlotSelected
                  ? "Time Selected"
                  : "Select Time Slot"
                : "Select Date"}
            </h3>
            <div className="rounded-lg">
              <div className="flex justify-center">
                {isTimeSlotSelected ? (
                  <p className="text-lg text-white border border-white px-4 py-2 rounded-md">
                    Time slot selected: {selectedTime}
                  </p>
                ) : isDateSelected ? (
                  <div className="time-picker-container">
                    <TimePicker
                      use12Hours
                      format="h:mm a"
                      onChange={handleTimeSelect}
                      className="w-full"
                      disabledHours={() => {
                        const disabledHours = [];
                        for (let i = 0; i < 24; i++) {
                          if (i < 9 || i > 18) {
                            disabledHours.push(i);
                          }
                        }
                        return disabledHours;
                      }}
                      disabledMinutes={(selectedHour) => {
                        if (selectedHour === 9) {
                          return Array.from({ length: 60 }, (_, i) =>
                            i < 0 ? i : null
                          ).filter(Boolean);
                        }
                        if (selectedHour === 18) {
                          return Array.from({ length: 60 }, (_, i) =>
                            i > 0 ? i : null
                          ).filter(Boolean);
                        }
                        return [];
                      }}
                    />
                    <p className="text-sm text-white mt-2">
                      You can pick time from 9:00 AM to 6:00 PM.
                    </p>
                  </div>
                ) : (
                  <div style={wrapperStyle}>
                    <Calendar
                      fullscreen={false}
                      onSelect={handleDateSelect}
                      disabledDate={disabledDate}
                    />
                  </div>
                )}
              </div>
            </div>

            {isTimeSlotSelected && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleConfirmBooking}
                  className="bg-[#FF9245] px-4 py-2 rounded-3xl text-white font-medium text-sm hover:bg-orange-600 transition flex items-center space-x-2"
                >
                  <i className="fas fa-check-circle"></i>
                  <span>Confirm Booking</span>
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default step content rendering
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col lg:flex-row lg:space-x-8  p-2">
            <div className=" w-full  pt-20 pl-10 ">
              <h3
                className="text-2xl font-semibold mb-6 text-center "
                style={{ color: "#097F78" }}
              >
                Book Your <br /> <span className="text-[#FF9245]">1-on-1</span>
                <br /> Session with Our Mentor
              </h3>
              <div className="border-b-2 border-[#B7804A] mb-3"></div>
              <p className="font-bold" style={{ color: "#097F78" }}>
                What to Expect from Your Session
              </p>
              <ul className="text-gray-700 space-y-1 text-l list-disc pl-5">
                <li className="text-gray-700">
                  <span className="text-orange-500">•</span> Personalized
                  Counseling
                </li>
                <li className="text-gray-700">
                  <span className="text-orange-500">•</span> Document
                  Verification
                </li>
                <li className="text-gray-700">
                  <span className="text-orange-500">•</span> Expert Insights
                </li>
                <li className="text-gray-700">
                  <span className="text-orange-500">•</span> Doubt Clearing
                </li>
                <li className="text-gray-700">
                  <span className="text-orange-500">•</span> Motivation and
                  Support
                </li>
              </ul>
            </div>

            <div className="  w-full  bg-[#097F78] p-6 rounded-xl md:mt-3 ">
              <h3 className="text-2xl md:text-xl font-semibold mb-2 text-center text-white">
                Book your Session Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-2">
                <p className="mb-1 text-white text-sm">📝 Fill Your Details</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Email ID"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Mobile No."
                    name="mobile"
                    type="tel"
                    value={mobile}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Neet Score"
                    name="neetScore"
                    type="number"
                    value={neetScore}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                  <InputField
                    label="Neet Rank"
                    name="neetRank"
                    type="number"
                    value={neetRank}
                    onChange={handleChange}
                    required={true}
                    isSessionBooked={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label=" Location"
                    name="location"
                    value={location}
                    onChange={handleChange}
                    options={["Online"]}
                    isSessionBooked={true}
                    required={true}
                  />
                  <SelectField
                    label="Category"
                    name="category"
                    value={category}
                    onChange={handleChange}
                    options={["OBC", "General", "SC/ST"]}
                    isSessionBooked={true}
                    required={true}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="bg-[#FF9245] px-4 py-2 rounded-3xl text-white font-medium text-sm hover:bg-orange-600 transition flex items-center space-x-2 "
                  >
                    <i className="fas fa-calendar-alt"></i>
                    <span className="Small-screen">Book Your Session Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="min-h-screen py-8 px-4">
            <div className=" mx-auto">
              {isSessionBooked && <div className="mb-4"></div>}
              <div className="container text-center pb-2">
                <h1 className="text-35 font-semibold underline decoration-[#B7804A] underline-offset-[12px] pb-2">
                  Counselling
                </h1>
                <p className="font-semibold text-md text-[#565656]">
                  Welcome User! This is the Single portal for your Dream College
                </p>
              </div>

              <div className="flex justify-center mb-12">
                <Steps
                  current={currentStep}
                  labelPlacement="vertical"
                  className="custom-steps "
                  style={{ "--step-color": "#097F78" }}
                >
                  <Step
                    title="Book Session"
                    description={currentStep === 0 && "Personalized Counseling"}
                  />
                  <Step
                    title="Fill Your Details"
                    description={currentStep === 1 && "Document Verification"}
                  />
                  <Step
                    title="Select Colleges"
                    description={
                      currentStep === 2 &&
                      "Select the best College based on your NEET Rank"
                    }
                  />
                  <Step
                    title="Enroll with Us"
                    description={currentStep === 3 && "Proceed to enrollment"}
                  />
                  <Step
                    title="Upload Your Docs"
                    description={
                      currentStep === 4 &&
                      "Submit your documents for verification"
                    }
                  />
                  <Step title="Track Your Details" 
                  description={
                      currentStep === 5 &&
                      "Track your progress"
                  }
                  />
                </Steps>
              </div>

              <div className="bg-white shadow-lg rounded-xl ">
                {renderStepContent()}
              </div>

              <div className="flex justify-between mt-6">
                {/* Show Previous button only after the first step */}
                {currentStep > 0 && (
                  <Button type="default" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {/* Conditionally render Next button only if currentStep is greater than 0 */}
                {currentStep > 0 && currentStep < 5 && (
                  <Button
                    type="primary"
                    className="bg-[#097F78] hover:bg-[#ff9245]"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                )}

                {/* Render Finish button at the last step */}
                {currentStep === 5 && (
                  <Button
                    type="primary"
                    className="bg-[#097F78] hover:bg-orange-600"
                    onClick={() => alert("Process completed!")}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  disabled,
  isSessionBooked, // New prop to conditionally apply white label color
}) => (
  <div className="flex flex-col">
    {label && (
      <label
        className={`block mb-1 text-sm  ${
          isSessionBooked ? "text-white" : "text-black"
        }`}
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 rounded text-sm  text-gray-900 border border-gray-300"
      required={required}
      disabled={disabled} // Now applies the disabled state when passed
    />
  </div>
);
// SelectField Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  labelClassName = "text-black", // default to "text-black"
  isSessionBooked, // New prop to conditionally apply white label color
}) => (
  <div className="flex flex-col">
    {label && (
      <label
        className={`block mb-1 text-sm ${
          isSessionBooked ? "text-white" : labelClassName
        }`}
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 rounded text-sm text-gray-900 border border-gray-300"
      required={required}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
export default Message;
