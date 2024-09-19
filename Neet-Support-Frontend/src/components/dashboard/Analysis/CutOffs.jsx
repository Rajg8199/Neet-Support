import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

// Function to generate random offsets for jitter effect
const getRandomOffset = (maxOffset = 0.3) => (Math.random() - 0.5) * maxOffset;

const MccComponentCutOffs = () => {
  const [selections, setSelections] = useState({
    selectedState: "",
    selectedCourse: "",
    selectedInstituteType: "",
    selectedQuota: "",
    selectedCategory: "",
    selectedInstitute: "",
    selectedYear: "2023",
  });

  const [mccData, setMccData] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiurl}/api/fetchAnalysisCutOffData`)
      .then((response) => {
        const mcc = response.data.data.find((item) => item.type === "MCC");
        setMccData(mcc?.data || []);

        const years = [
          ...new Set(
            mcc?.data.flatMap((stateData) =>
              stateData.institutes.flatMap((institute) =>
                institute.max_rank_by_year.map((yearData) => yearData.year)
              )
            )
          ),
        ];
        setAvailableYears(years);

        if (mcc?.data && mcc.data.length > 0) {
          const firstState = mcc.data[0].state;
          setSelections((prevSelections) => ({
            ...prevSelections,
            selectedState: firstState,
          }));
          setFilteredInstitutes(mcc.data[0].institutes || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleSelectionChange = (e) => {
    const { id, value } = e.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [id]: value,
    }));

    if (id === "selectedState") {
      const selectedStateData = mccData.find(
        (stateData) => stateData.state === value
      );
      setFilteredInstitutes(selectedStateData?.institutes || []);
    }
  };

  const filteredResults = filteredInstitutes.filter((institute) => {
    return (
      (!selections.selectedCourse ||
        institute.course === selections.selectedCourse) &&
      (!selections.selectedInstituteType ||
        institute.institute_type === selections.selectedInstituteType) &&
      (!selections.selectedQuota ||
        institute.quota === selections.selectedQuota) &&
      (!selections.selectedCategory ||
        institute.category === selections.selectedCategory) &&
      (!selections.selectedInstitute ||
        institute.name === selections.selectedInstitute)
    );
  });

  const getUniqueValues = (key) => {
    return [...new Set(filteredInstitutes.map((institute) => institute[key]))];
  };

  const lineData = {
    labels: filteredResults.length
      ? filteredResults[0]?.max_rank_by_year
          .filter(
            (yearData) =>
              !selections.selectedYear ||
              yearData.year === parseInt(selections.selectedYear)
          )
          .map((yearData) => yearData.year)
      : [],
    datasets: filteredResults.map((institute, idx) => ({
      label: institute.name,
      data: institute.max_rank_by_year
        .filter(
          (yearData) =>
            !selections.selectedYear ||
            yearData.year === parseInt(selections.selectedYear)
        )
        .map((yearData) => ({
          x: yearData.year,
          y: yearData.maxRank, // This is where max_rank_by_year data is plotted.
        })),  
      backgroundColor: `rgba(${75 + idx * 20}, 192, 192, 0.2)`,
      borderColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      pointBorderColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      pointRadius: 6,
      pointHoverRadius: 8,
      showLine: false,
    })),
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Faint grid lines on y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Do not display legend
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        mode: "nearest", // Show tooltips for the nearest point
        intersect: true, // Tooltip shows only when hovering directly over the point
      },
      datalabels: {
        display: false, // Ensure that data labels are not shown
      },
    },
    elements: {
      point: {
        radius: 6, // Default size of the points
        hoverRadius: 8, // Point size on hover
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Customize bubble color
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bubbles
        borderWidth: 1, // Border thickness
        pointStyle: "circle", // Style of the point
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md -mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label
            htmlFor="selectedState"
            className="block text-sm font-medium text-gray-700"
          >
            Select State
          </label>
          <select
            id="selectedState"
            value={selections.selectedState}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            {mccData.map((stateData, index) => (
              <option key={index} value={stateData.state}>
                {stateData.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedCourse"
            className="block text-sm font-medium text-gray-700"
          >
            Select Course
          </label>
          <select
            id="selectedCourse"
            value={selections.selectedCourse}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Course</option>
            {getUniqueValues("course").map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedInstituteType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Institute Type
          </label>
          <select
            id="selectedInstituteType"
            value={selections.selectedInstituteType}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Institute Type</option>
            {getUniqueValues("institute_type").map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label
            htmlFor="selectedQuota"
            className="block text-sm font-medium text-gray-700"
          >
            Select Quota
          </label>
          <select
            id="selectedQuota"
            value={selections.selectedQuota}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Quota</option>
            {getUniqueValues("quota").map((quota, index) => (
              <option key={index} value={quota}>
                {quota}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category
          </label>
          <select
            id="selectedCategory"
            value={selections.selectedCategory}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Category</option>
            {getUniqueValues("category").map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedInstitute"
            className="block text-sm font-medium text-gray-700"
          >
            Select Institute
          </label>
          <select
            id="selectedInstitute"
            value={selections.selectedInstitute}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Institute</option>
            {getUniqueValues("name").map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="mt-4 bg-slate-50 p-4 rounded-md"
        style={{ height: "400px" }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-center flex-1">
            Max Rank by Year (Bubble Graph)
          </h3>
          <div className="w-auto">
            <select
              id="selectedYear"
              value={selections.selectedYear}
              onChange={handleSelectionChange}
              className="block w-auto pl-4 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown"
            >
              <option value="">Select Year</option>
              {availableYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Line options={options} data={lineData} />
      </div>
    </div>
  );
};

const StateComponentCutOffs = () => {
  const [selections, setSelections] = useState({
    selectedState: "",
    selectedCourse: "",
    selectedInstituteType: "",
    selectedQuota: "",
    selectedCategory: "",
    selectedInstitute: "",
    selectedYear: "2023",
  });

  const [stateData, setStateData] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiurl}/api/fetchAnalysisCutOffData`)
      .then((response) => {
        const state = response.data.data.find((item) => item.type === "State");
        setStateData(state?.data || []);

        const years = [
          ...new Set(
            state?.data.flatMap((stateData) =>
              stateData.institutes.flatMap((institute) =>
                institute.max_rank_by_year.map((yearData) => yearData.year)
              )
            )
          ),
        ];
        setAvailableYears(years);

        if (state?.data && state.data.length > 0) {
          const firstState = state.data[0].state;
          setSelections((prevSelections) => ({
            ...prevSelections,
            selectedState: firstState,
          }));
          setFilteredInstitutes(state.data[0].institutes || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleSelectionChange = (e) => {
    const { id, value } = e.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [id]: value,
    }));

    if (id === "selectedState") {
      const selectedStateData = stateData.find(
        (stateData) => stateData.state === value
      );
      setFilteredInstitutes(selectedStateData?.institutes || []);
    }
  };

  const filteredResults = filteredInstitutes.filter((institute) => {
    return (
      (!selections.selectedCourse ||
        institute.course === selections.selectedCourse) &&
      (!selections.selectedInstituteType ||
        institute.institute_type === selections.selectedInstituteType) &&
      (!selections.selectedQuota ||
        institute.quota === selections.selectedQuota) &&
      (!selections.selectedCategory ||
        institute.category === selections.selectedCategory) &&
      (!selections.selectedInstitute ||
        institute.name === selections.selectedInstitute)
    );
  });

  const getUniqueValues = (key) => {
    return [...new Set(filteredInstitutes.map((institute) => institute[key]))];
  };

  const lineData = {
    labels: filteredResults.length
      ? filteredResults[0]?.max_rank_by_year
          .filter(
            (yearData) =>
              !selections.selectedYear ||
              yearData.year === parseInt(selections.selectedYear)
          )
          .map((yearData) => yearData.year)
      : [],
    datasets: filteredResults.map((institute, idx) => ({
      label: institute.name,
      data: institute.max_rank_by_year
        .filter(
          (yearData) =>
            !selections.selectedYear ||
            yearData.year === parseInt(selections.selectedYear)
        )
        .map((yearData) => ({
          x: yearData.year,
          y: yearData.maxRank, // This is where max_rank_by_year data is plotted.
        })),
      backgroundColor: `rgba(${75 + idx * 20}, 192, 192, 0.2)`,
      borderColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      borderWidth: 2,
      fill: false,
      pointBackgroundColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      pointBorderColor: `rgba(${75 + idx * 20}, 192, 192, 1)`,
      pointRadius: 6,
      pointHoverRadius: 5,
      showLine: false,
    })),
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Faint grid lines on y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Do not display legend
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        mode: "nearest", // Show tooltips for the nearest point
        intersect: true, // Tooltip shows only when hovering directly over the point
      },
      datalabels: {
        display: false, // Ensure that data labels are not shown
      },
    },
    elements: {
      point: {
        radius: 1, // Default size of the points
        hoverRadius: 2, // Point size on hover
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Customize bubble color
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bubbles
        borderWidth: 0, // Border thickness
        pointStyle: "circle", // Style of the point
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md -mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label
            htmlFor="selectedState"
            className="block text-sm font-medium text-gray-700"
          >
            Select State
          </label>
          <select
            id="selectedState"
            value={selections.selectedState}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            {[...new Set(stateData.map((stateData) => stateData.state))].map(
              (uniqueState, index) => (
                <option key={index} value={uniqueState}>
                  {uniqueState}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedCourse"
            className="block text-sm font-medium text-gray-700"
          >
            Select Course
          </label>
          <select
            id="selectedCourse"
            value={selections.selectedCourse}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Course</option>
            {getUniqueValues("course").map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedInstituteType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Institute Type
          </label>
          <select
            id="selectedInstituteType"
            value={selections.selectedInstituteType}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Institute Type</option>
            {getUniqueValues("institute_type").map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label
            htmlFor="selectedQuota"
            className="block text-sm font-medium text-gray-700"
          >
            Select Quota
          </label>
          <select
            id="selectedQuota"
            value={selections.selectedQuota}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Quota</option>
            {getUniqueValues("quota").map((quota, index) => (
              <option key={index} value={quota}>
                {quota}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category
          </label>
          <select
            id="selectedCategory"
            value={selections.selectedCategory}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Category</option>
            {getUniqueValues("category").map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="selectedInstitute"
            className="block text-sm font-medium text-gray-700"
          >
            Select Institute
          </label>
          <select
            id="selectedInstitute"
            value={selections.selectedInstitute}
            onChange={handleSelectionChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown px-10 pt-8"
          >
            <option value="">Select Institute</option>
            {getUniqueValues("name").map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="mt-4 bg-slate-50 p-4 rounded-md"
        style={{ height: "400px" }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-center flex-1">
            Max Rank by Year (Bubble Graph)
          </h3>
          <div className="w-auto">
            <select
              id="selectedYear"
              value={selections.selectedYear}
              onChange={handleSelectionChange}
              className="block w-auto pl-4 pr-10 py-2 text-white bg-[#097F78] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-3xl appearance-none dropdown"
            >
              <option value="">Select Year</option>
              {availableYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Line options={options} data={lineData} />
      </div>
    </div>
  );
};

const CutOffs = () => {
  const [state, setState] = useState("MCC");

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container">
            <h1 className="text-35 font-semibold">Cutoff Analysis</h1>
            <p>
              Stay ahead of the curve. View the final closing ranks of different
              medical college types in every state over the last three years.
            </p>
          </div>

          <div className="flex gap-1 -ml-4">
            <div
              className="bg-white w-[120px] shadow-md transition-all ease-linear py-2 rounded-t-lg"
              onClick={() => setState("MCC")}
            >
              <h1 className="text-18 p-2 text-center cursor-pointer">MCC</h1>
              <div
                style={{
                  backgroundColor: state === "MCC" ? "#B7804A" : null,
                  padding: 2,
                  width: 50,
                  margin: "auto",
                  borderRadius: 30,
                }}
              ></div>
            </div>

            <div
              className="bg-white w-[120px] shadow-md transition-all ease-linear py-2 rounded-t-lg"
              onClick={() => setState("State")}
            >
              <h1 className="text-18 text-center p-2 cursor-pointer">State</h1>
              <div
                style={{
                  backgroundColor: state === "State" ? "#B7804A" : null,
                  padding: 2,
                  width: 50,
                  margin: "auto",
                  borderRadius: 30,
                }}
              ></div>
            </div>
          </div>

          {state === "MCC" ? (
            <MccComponentCutOffs />
          ) : (
            <StateComponentCutOffs />
          )}
        </div>
      </div>
    </div>
  );
};

export default CutOffs;
