import { dataApi } from "@/store/api/api";
import { CollegeSeat } from "@/store/FeatureSlice/CollegeSeats";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const apiUrl = import.meta.env.VITE_API_URL;

const CollegeSeats = () => {
  const dataCollegeSeats = useSelector((state) => state.CollegeSea.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dataApi({
          endPoint: `${apiUrl}/api/getCandidateData`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(CollegeSeat(res));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const [state, setState] = useState({
    selectedCategory: "overall",
    selectedData: {},
    data: {},
  });

  const [hoveredCategory, setHoveredCategory] = useState(null); // State to track hovered category

  useEffect(() => {
    if (dataCollegeSeats && dataCollegeSeats.length > 0) {
      const firstElement = dataCollegeSeats[0];
      const newState = Object.keys(firstElement).reduce((acc, key) => {
        acc[key] = firstElement[key];
        return acc;
      }, {});
      setState((prevState) => ({
        ...prevState,
        data: newState,
        selectedData: newState["overall"] || {},
      }));
    }
  }, [dataCollegeSeats]);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedCategory: selected,
      selectedData: prevState.data[selected] || {},
    }));
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const colorScheme = {
    government: "rgba(54, 162, 235, 0.8)", // Light Blue
    overall: "rgba(75, 192, 192, 0.8)", // Light Teal
    private: "rgba(255, 159, 64, 0.8)", // Light Orange
  };

  const borderColorScheme = {
    government: "rgba(54, 162, 235, 1)", // Blue
    overall: "rgba(75, 192, 192, 1)", // Teal
    private: "rgba(255, 159, 64, 1)", // Orange
  };

  // Prepare data for Pie chart
  const pieChartData = {
    labels: Object.keys(state.selectedData).filter(
      (key) => key !== "_id" && key !== "colleges" && key !== "seats"
    ),
    datasets: [
      {
        data: Object.keys(state.selectedData)
          .filter(
            (key) => key !== "_id" && key !== "colleges" && key !== "seats"
          )
          .map((key) => state.selectedData[key].seats),
        backgroundColor: Object.keys(state.selectedData)
          .filter(
            (key) => key !== "_id" && key !== "colleges" && key !== "seats"
          )
          .map((key) => {
            // Highlight the hovered segment
            if (hoveredCategory === key) {
              return "#f2f2f2"; // Light Gray for hover
            }
            return colorScheme[key] || "rgba(0,0,0,0.2)";
          }),
        borderColor: Object.keys(state.selectedData)
          .filter(
            (key) => key !== "_id" && key !== "colleges" && key !== "seats"
          )
          .map((key) => {
            // Highlight border color
            if (hoveredCategory === key) {
              return "rgba(0,0,0,0.8)"; // Darker border color for hover
            }
            return borderColorScheme[key] || "rgba(0,0,0,1)";
          }),
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value} seats`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  const InfoBox = ({ label, colleges, seats, color }) => (
    <div
      className={`info-box p-6 w-[278px] md:w-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 ${color} w-[200px] `}
      onMouseEnter={() => handleMouseEnter(label.toLowerCase())}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-xl font-semibold text-gray-900">{label}</h3>
      <p className="text-gray-700">Colleges: {colleges}</p>
      <p className="text-gray-700">Seats: {seats}</p>
    </div>
  );

  // Generate options for the select input, excluding '_id'
  const options = Object.keys(state.data)
    .filter((key) => key !== "_id")
    .map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ));

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex px-1 md:px-7 justify-between items-center mb-4">
        <h1 className=" text-xl lg:text-3xl font-semibold text-gray-900">
          College & Seats
        </h1>
        <select
          onChange={handleCategoryChange}
          className="bg-white  border border-gray-300 w-[150px] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          value={state.selectedCategory}
        >
          {options}
        </select>
      </div>
      <p className="text-gray-500 text-base mb-4 px-4 md:px-12">
        Navigate across different medical college seat distributions
      </p>

      <div className="flex flex-col justify-center items-center  py-5 md:flex-row gap-6">
        <div className="flex-1">
          <div style={ { position: 'relative', height: '300px' } }>
          <Pie data={pieChartData} options={pieChartOptions} 
          />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <InfoBox
              label="Government"
              colleges={state.selectedData.government?.colleges || 0}
              seats={state.selectedData.government?.seats || 0}
              color="bg-gradient-to-r from-blue-200 to-blue-300"
            />
          </div>
          <div className="w-full">
            <InfoBox
              label="Overall"
              colleges={state.selectedData.overall?.colleges || 0}
              seats={state.selectedData.overall?.seats || 0}
              color="bg-gradient-to-r from-teal-200 to-teal-300"
            />
          </div>
          <div className="w-full">
            <InfoBox
              label="Private"
              colleges={state.selectedData.private?.colleges || 0}
              seats={state.selectedData.private?.seats || 0}
              color="bg-gradient-to-r from-orange-200 to-orange-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSeats;
