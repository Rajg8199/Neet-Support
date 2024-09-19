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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EligibleCandidate = () => {
  const [year, setYear] = useState("2024");
  const [global, setGlobal] = useState("mcc");
  const [state, setState] = useState("Uttarakhand");
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marks, setMarks] = useState("");
  const [highlightedBars, setHighlightedBars] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/fetchMeritData?global=${global}${
            global === "mcc" ? `&state=${state}` : ""
          }`
        );
        const years = response.data.data.map((item) => item.year);
        setAvailableYears(years);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
      setLoading(false);
    };
    fetchYears();
  }, [global, state]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "http://34.47.160.12/api/fetchStateList"
        );
        setAvailableStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/fetchMeritData?global=${global}${
            global === "state" ? `&state=${state}` : ""
          }&year=${year}`
        );
        const data = response.data.data.rank_data;
        const sortedData = data.sort((a, b) => a.min_marks - b.min_marks);
        setRankData(sortedData);
        setHighlightedBars([]);
      } catch (error) {
        console.error("Error fetching merit data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [global, year, state]);

  const handleMarksInput = () => {
    if (!marks || isNaN(marks) || marks < 0 || marks > 720) {
      alert("Please enter a valid number between 0 and 720.");
      return;
    }

    const newHighlightedBars = rankData
      .map((rank, index) => {
        if (parseInt(rank.min_marks) >= parseInt(marks, 10)) {
          return index;
        }
        return null;
      })
      .filter((index) => index !== null);

    setHighlightedBars(newHighlightedBars);
  };

  const chartData = {
    labels: rankData.map((rank) => `${rank.max_marks}-${rank.min_marks}`),
    datasets: [
      {
        label: `No of Candidates`,
        data: rankData.map((rank) =>
          Math.abs(rank.max_rank - rank.min_rank + 1)
        ),
        backgroundColor: rankData.map((_, index) => {
          return highlightedBars.includes(index) ? "#FF9C55" : "#097F78";
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x", // Always vertical
    barPercentage: isMobile ? 1 : 1.5, // Adjust bar width on smaller screens
    categoryPercentage: isMobile ? 0.8 : 0.5, // Adjust category width on smaller screens
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Merit List Analysis for ${global === "mcc" ? "MCC" : state}`,
      },
      datalabels: !isMobile && {
        // Disable datalabels for mobile
        anchor: "end",
        align: "top",
        formatter: Math.round,
        color: "#000",
        font: {
          weight: "bold",
          size: 9,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Marks Range",
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "No of Candidates",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-xl rounded-2xl max-w-full">
      
      <div className="flex gap-2 ">
        <div className="hidden sm:block  h-[25px] w-[6px] lg:h-[35px] lg:w-[8px] bg-[#B7804A] rounded"></div>

        <h1 className="text-xl font-semibold">Eligible Candidates</h1>
      </div>
      <p className="pl-2  ">
        View the candidates falling in the same mark range. Check the overall
        competition.
      </p>

      {/* Marks Input */}
      <div className="my-4 flex flex-col md:flex-row gap-2">
        <input
          type="tel"
          placeholder="Enter your marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-auto"
        />
        <button
          onClick={handleMarksInput}
          className="p-2 bg-[#167872] text-white rounded-lg w-full md:w-auto"
        >
          Find Rank
        </button>
      </div>

      {/* Select Dropdowns */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 my-4 justify-end">
        <select
          className="p-2 border border-gray-300 rounded-2xl bg-[#167872] text-white w-full md:w-[120px] appearance-none dropdown px-4"
          value={global}
          onChange={(e) => setGlobal(e.target.value)}
        >
          <option value="mcc">MCC</option>
          <option value="state">State</option>
        </select>

        {global === "state" && (
          <select
            className="p-2 border border-gray-300 rounded-2xl bg-[#167872] text-white w-full md:w-[120px] appearance-none dropdown px-4"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {availableStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        )}

        <select
          className=" border border-gray-300 rounded-2xl bg-[#167872] text-white w-full md:w-[120px] appearance-none dropdown px-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      
      {/* Scrollable Chart Container */}
      <div className=" overflow-x-auto ">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="relative h-[400px] md:h-[550px] min-w-[600px] p-0">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleCandidate;
