import React, { useEffect, useState } from "react";
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

// Register Chart.js components and the datalabels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ClauseChart = ({ year, state }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/fetchClauseData?state=${state}&year=${year}`
        );
        const { data } = response.data;

        const clauses = data.map((item) => item.clause);
        const candidatesPerSeat = data.map((item) => item.candidates_per_seat);

        setChartData({
          labels: clauses,
          datasets: [
            {
              label: "Candidates per Seat",
              data: candidatesPerSeat,
              backgroundColor: "#097F78",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data from the API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [state, year]);

  // Detect if the screen is small (mobile)
  const isMobile = window.innerWidth <= 640;

  return (
    <div className="bg-white p-3 shadow-xl rounded-2xl overflow-x-auto">
      <div className="flex gap-2">
        {/* Bar: Hidden on smaller screens */}
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          Clause and Category-wise Candidates Applied
        </h1>
      </div>
      <p className="pl-2">
        Insights of KEA applicant distribution across various clauses.
      </p>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : chartData ? (
        <div className=" overflow-x-auto">
            <div className="relative h-[400px] md:h-[550px] min-w-[600px]">
          <Bar
            data={chartData}
            options={{
              indexAxis: 'y', // Set indexAxis to 'y' to create horizontal bars
              responsive: true,
              maintainAspectRatio: !isMobile, // Maintain aspect ratio for large screens only
              maxBarThickness: 40, // Enforce consistent bar thickness
        minBarLength: 2, // Optional: ensure minimum visible bar
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Clause-wise Candidate Data",
                },
                datalabels: {
                  display: !isMobile, // Disable datalabels for mobile view
                  anchor: "end",
                  align: "right",
                  formatter: (value) => value, // Display the candidates per seat as label
                  color: "#000",
                  font: {
                    weight: "bold",
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Candidates per Seat",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Clause",
                  },
                },
              },
            }}
          />
          </div>
        </div>
      ) : (
        <p>No data available for the selected state and year.</p>
      )}
    </div>
  );
};

export default ClauseChart;
