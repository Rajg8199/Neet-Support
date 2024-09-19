import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const MarksRangeChart = () => {
  const [marks, setMarks] = useState(0); // Default marks
  const [state, setState] = useState("Uttarakhand"); // Default state
  const [year, setYear] = useState("2023"); // Default year
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "No. of Candidates",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [scoreLabels, setScoreLabels] = useState([]);
  const apiurl = import.meta.env.VITE_API_URL;

  // Function to fetch the chart data based on the API response
  const fetchChartData = async (highlightMarks = null) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/fetchMeritChartData?state=${state}&year=${year}`
      );

      const data = response.data.data.rank_data;

      // Process the data to create labels and candidates per seat data
      const candidatesData = data.map((item) => item.candidates_per_seat);
      const airRanges = data.map(
        (item) => `${item.min_range}-${item.max_range}`
      ); // AIR range for the x-axis
      const scoreLabels = data.map(
        (item) => `${item.min_neet_score}-${item.max_neet_score}`
      ); // NEET score range

      // Set scoreLabels for tooltips
      setScoreLabels(scoreLabels);

      // Set up colors based on the provided highlight marks
      const backgroundColors = data.map((item) => {
        if (
          highlightMarks &&
          highlightMarks >= item.min_neet_score &&
          highlightMarks <= item.max_neet_score
        ) {
          return "#FF9C55"; // Highlight this range if it matches the user's marks
        }
        return "#097F78"; // Default color for other ranges
      });

      // Update the chart data with real API data
      setChartData({
        labels: airRanges, // Show AIR ranges on x-axis
        datasets: [
          {
            label: "No. of Candidates",
            data: candidatesData, // Number of candidates per seat
            backgroundColor: backgroundColors, // Dynamically change colors
            maxBarThickness: 40, // Enforce consistent bar thickness
            minBarLength: 2, // Optional: ensure minimum visible bar
            datalabels: {
              display: true,
              align: "end",
              anchor: "end",
              formatter: (value, ctx) => {
                return scoreLabels[ctx.dataIndex]; // Show NEET score range
              },
              color: "#000", // Black text for better contrast
              font: {
                weight: "bold",
              },
            },
          },
        ],
      });

      // Show the total number of candidates across all ranges
      const total = candidatesData.reduce((acc, curr) => acc + curr, 0);
      setTotalCandidates(total);
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
    }
    setLoading(false);
  };

  // Fetch the data when the component loads
  useEffect(() => {
    fetchChartData(); // Fetch data initially without highlighting
  }, [state, year]);

  // Handles the "Check now" button click
  const handleCheckNow = () => {
    // Validate marks input
    if (marks < 0 || marks > 720 || isNaN(marks)) {
      alert("Please enter a valid NEET mark between 0 and 720");
      return;
    }

    // Fetch data and highlight based on marks entered
    fetchChartData(marks);
  };

  // Chart.js config
  // Chart.js config with consistent bar size
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `NEET Score (Total marks: 720)`,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `No. of Candidates: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        display: true,
        align: "top",
        color: "#000",
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "All India Ranking (AIR)",
        },
        // Setting the bar thickness for consistent bar size
        barThickness: 30, // Adjust this value to control the bar thickness
      },
      y: {
        title: {
          display: true,
          text: "No of Candidates",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-3 shadow-xl rounded-2xl max-w-full">
      <div className="flex gap-2">
        <div className="hidden sm:block  h-[25px] w-[6px] lg:h-[35px] lg:w-[8px] bg-[#B7804A] rounded"></div>
        <h1 className="text-xl font-semibold">
          Eligible Candidates Within a 50 Marks Range Difference
        </h1>
      </div>
      <p className="mt-2">Enter your NEET MARKS and know your competition</p>

      {/* Input for NEET marks */}
      <div className="mt-2 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4  sm:justify-start">
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
          placeholder="Enter NEET marks"
        />
        <button
          onClick={handleCheckNow}
          className="bg-[#005f59] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Check now
        </button>
      </div>

      {/* Legend with color indicators */}
      <div className="flex justify-center sm:justify-start items-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#FF9C55] mr-2"></div>
          <span>Highlighted Range (Matches your marks)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#3F99F9] mr-2"></div>
          <span>Other Ranges</span>
        </div>
      </div>

      <div className="mt-4 text-center sm:text-right">
        <span className="text-blue-500">Overall Candidates: </span>
        <span className="text-lg font-bold">{totalCandidates}</span>
      </div>

      {/* Chart is now scrollable horizontally */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[600px]">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksRangeChart;
