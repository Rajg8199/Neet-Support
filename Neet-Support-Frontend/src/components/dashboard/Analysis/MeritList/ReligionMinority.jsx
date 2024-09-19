import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the necessary Chart.js components and the DataLabels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ReligiousMinority = ({ year, state }) => {
  const [religionData, setReligionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReligionData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/fetchReligiousMeritChartData?state=${state}&year=${year}`
        );
        setReligionData(response.data[0].data);
      } catch (error) {
        console.error("Error fetching religion data:", error);
      }
      setLoading(false);
    };
    fetchReligionData();
  }, [state, year]);

  // Detect if the screen is small (mobile)
  const isMobile = window.innerWidth <= 640;

  const chartData = {
    labels: religionData.map((entry) => entry.religion),
    datasets: [
      {
        label: "No. of Candidates",
        data: religionData.map((entry) => entry.candidates_per_seat),
        backgroundColor: "#097F78",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        maxBarThickness: 40, // Enforce consistent bar thickness
        minBarLength: 2, // Optional: ensure minimum visible bar
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Religious Minority Data for ${state}`,
      },
      // DataLabels plugin configuration
      datalabels: {
        display: !isMobile, // Disable datalabels for mobile view
        anchor: "end",
        align: "top",
        color: "#000",
        font: {
          weight: "bold",
        },
        formatter: (value) => value, // Format to show the value
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Religion",
        },
        // Set the bar thickness to ensure consistent bar size
        barThickness: 30, // You can adjust this value to match the bar size used in other charts
      },
      y: {
        title: {
          display: true,
          text: "No. of Candidates",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-xl rounded-2xl overflow-x-auto">
      <div className="flex gap-2">
        {/* Bar: Hidden on smaller screens */}
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">Religious Minority</h1>
      </div>
      <p className="pl-2">
        Evaluate religious minority data based on state and year.
      </p>

      {/* State and Year Selection */}
      <div className="flex space-x-4 my-4 justify-end">
        {/* You can add select elements for state and year here if needed */}
      </div>

      <div className=" overflow-x-auto">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="relative h-[400px] md:h-[550px] min-w-[600px]">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReligiousMinority;
