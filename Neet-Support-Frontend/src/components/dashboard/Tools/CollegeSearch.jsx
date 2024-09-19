import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import imageLogo from "./image29.png";
import { dataApi } from "@/store/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const apiUrl = import.meta.env.VITE_API_URL;

const CollegeCard = ({ college, onUniversityClick }) => {
  return (
    <div className="flex flex-col m-auto px-6 justify-evenly items-center p-2 w-full max-w-xs md:h-[300px] sm:h-[400px] rounded-3xl bg-[#005F59] border">
      <div>
        <img src={imageLogo} className="m-auto" alt="" />
        <h3 className="text-lg text-center text-white font-medium">
          {college.Institute}
        </h3>
        <p className="text-[#CECECE] text-center py-2 font-medium">
          {college["Institute Type"]}
        </p>
        <p className="text-white text-center mb-5">{college.University}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly text-center mt-auto gap-2 sm:gap-1">
        <a
          href={`${college["Official Website"]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
        >
          Official Website
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2"
            style={{ fontSize: "12px" }}
          />
        </a>
        <a
          href={`${college.Registration}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
        >
          Registration
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2"
            style={{ fontSize: "12px" }}
          />
        </a>
        <div
          className="border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
          onClick={() => onUniversityClick(college.University)}
        >
          More Details
        </div>
      </div>
    </div>
  );
};

const CollegeSearch = () => {
  const StateName = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [state, setState] = useState({
    city: "Uttar Pradesh",
    instituteType: "",
    university: "",
  });

  const [loading, setLoading] = useState(true);

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setState((prevState) => ({ ...prevState, city: newCity }));
  };

  const handleInstituteTypeChange = (event) => {
    const newInstituteType = event.target.value;
    setState((prevState) => ({
      ...prevState,
      instituteType: newInstituteType,
    }));
  };

  const handleUniversityChange = (event) => {
    const newUniversity = event.target.value;
    setSelectedUniversity(newUniversity);
    setState((prevState) => ({ ...prevState, university: newUniversity }));

    fetchDataForUniversity(newUniversity);
  };

  const handleInstituteChange = (event) => {
    setSelectedInstitute(event.target.value);
  };

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
    fetchDataForUniversity(university);
  };

  const fetchDataForUniversity = (university) => {
    setLoading(true);
    dataApi({
      endPoint: `${apiUrl}/api/getInstituteDetails`,
      method: "GET",
      params: {
        state: state.city,
        university: university,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/getInstituteDetails?state=${state.city}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res.data);
        const types = [
          ...new Set(res.data.map((college) => college["Institute Type"])),
        ];
        setInstituteTypes(types);
        const unis = [
          ...new Set(res.data.map((college) => college.University)),
        ];
        setUniversities(unis);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [state.city]);

  useEffect(() => {
    let filtered = data;

    if (state.instituteType) {
      filtered = filtered.filter(
        (college) => college["Institute Type"] === state.instituteType
      );
    }

    if (state.university) {
      filtered = filtered.filter(
        (college) => college.University === state.university
      );
    }

    if (selectedInstitute) {
      filtered = filtered.filter(
        (college) => college.Institute === selectedInstitute
      );
    }

    setFilteredData(filtered);
  }, [state.instituteType, state.university, selectedInstitute, data]);

  // Clear the state values when the city changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      instituteType: "",
      university: "",
    }));
    setSelectedUniversity(null);
    setSelectedInstitute("");
  }, [state.city]);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-10 -mb-6">
          <div className="container text-center">
            <h1 className="text-35 font-semibold underline decoration-[#B7804A] underline-offset-[12px] pb-2">
              Universities and Institutes
            </h1>
            <p className="text-[#565656] font-bold">
              Learn about all the colleges under different institute types.
              Access college-specific <br /> important counselling links &
              resources
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="bg-white rounded-xl   m-2 relative w-full p-4 flex flex-col sm:flex-row gap-4">
              <h1 className="text-24">{state.city}</h1>
              
              <div className="  "></div>
              <p>
                Important particulars of medical institutes falling under
                desired universities
              </p>
              <div className="w-[150px] h-[30px] absolute right-1 top-5 sm:relative sm:top-0 sm:right-0 md:w-[250px] lg:w-[150px] lg:absolute lg:top-5 lg:right-1">
 


                <select
                  id="city-select"
                  className="w-full bg-[#005F59] text-white rounded-3xl px-4 py-1  appearance-none  arrow-icon"
                  value={state.city}
                  onChange={handleCityChange}
                >
                  {StateName.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col sm:flex-row gap-8 border-[#B7804A] border-b-2 p-4 m-2 ">
          <select
            className="bg-[#005F59] text-white rounded-2xl border-none w-full sm:w-[200px] outline-none appearance-none dropdown"
            value={state.instituteType}
            onChange={handleInstituteTypeChange}
          >
            <option value="">Select Institute Type</option>
            {instituteTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="bg-[#005F59] text-white rounded-2xl border-none w-full sm:w-[200px] outline-none appearance-none dropdown "
            value={state.university}
            onChange={handleUniversityChange}
          >
            <option value="">Select University</option>
            {universities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white p-2 m-2">
          <div className="w-[100%] flex justify-end ">
            <select
              className="w-full sm:w-[200px] outline-none border-none bg-[#005F59] rounded-[100px] text-white px-4 py-1 m-4 appearance-none arrow-icon"
              value={selectedInstitute}
              onChange={handleInstituteChange}
            >
              <option value="">Select Institute</option>
              {data.map((college) => (
                <option key={college.id} value={college.Institute}>
                  {college.Institute}
                </option>
              ))}
            </select>
          </div>
          <Skeleton loading={loading} active>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 h-auto ">
              {filteredData.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onUniversityClick={handleUniversityClick}
                />
              ))}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default CollegeSearch;
