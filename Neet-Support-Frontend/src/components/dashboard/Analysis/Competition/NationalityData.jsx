import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import ChartDataLabels

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register ChartDataLabels
);

const NationalityChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("NEET_UG_2024");

  // Fetch data from Redux store
  const data = useSelector(
    (state) => state.past5Years.data?.combinedData?.[0]?.nationalityData
  );

  useEffect(() => {
    if (!data) return;

    const currentYearData = data[selectedYear];

    if (!currentYearData) {
      console.error("No data found for the selected year");
      return;
    }

    const { Indian, Foreigner, NRI, OCI } = currentYearData;

    if (!Indian || !Foreigner || !NRI || !OCI) {
      console.error("Missing data for some nationalities");
      return;
    }

    // Prepare chart data
    setChartData({
      labels: ["Indian", "Foreigner", "NRI", "OCI"],
      datasets: [
        {
          label: "Registered",
          data: [
            Indian.registered,
            Foreigner.registered,
            NRI.registered,
            OCI.registered,
          ],
          backgroundColor: "rgba(9, 127, 120, 1)",
          borderColor: "rgba(9, 127, 120, 1)",
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
        {
          label: "Appeared",
          data: [
            Indian.appeared,
            Foreigner.appeared,
            NRI.appeared,
            OCI.appeared,
          ],
          backgroundColor: "rgba(9, 127, 120, 0.8)",
          borderColor: "rgba(9, 127, 120, 1)",
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
        {
          label: "Qualified",
          data: [
            Indian.qualified,
            Foreigner.qualified,
            NRI.qualified,
            OCI.qualified,
          ],
          backgroundColor: "rgba(9, 127, 120, 0.6)",
          borderColor: "rgba(9, 127, 120, 1)",
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
      ],
    });
  }, [selectedYear, data]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Check if chartData is null or undefined
  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-2 rounded-2xl ">
      <div className="flex gap-2">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">Nationality-wise Candidates</h1>
      </div>
      <div className="flex justify-between items-center ">
        <p className="text-gray-600">
          Nationality-wise number of Candidates for {selectedYear.replace("NEET_UG_", "")}
        </p>
        <div>
          <label className="mr-2"></label>
          <select
            className="px-4 py-2 border rounded-lg bg-[#005f59] text-white"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="NEET_UG_2024">2024</option>
            <option value="NEET_UG_2023">2023</option>
            <option value="NEET_UG_2022">2022</option>
            {/* Add more years as needed */}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
      <div className="relative h-[500px] md:h-[600px] min-w-[600px]">
        <Bar
          data={chartData}
          options={{
            indexAxis: "y", // Horizontal chart
            responsive: true,
            maintainAspectRatio: false, // Ensures it resizes with the container
            scales: {
              x: {
                type: "logarithmic", // Logarithmic scale for x-axis
                title: {
                  display: true,
                  text: "Number of Candidates",
                },
                min: 1,
                ticks: {
                  callback: function (value) {
                    if (
                      value === 1 ||
                      value === 10 ||
                      value === 100 ||
                      value === 1000 ||
                      value === 10000 ||
                      value === 100000 ||
                      value === 1000000
                    ) {
                      return value.toLocaleString(); // Ensure the ticks are numbers
                    }
                    return null;
                  },
                },
              },
              y: {
                title: {
                  display: false,
                  text: "Nationality",
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "start",
                color: "#ffffff", // Label color
                formatter: (value) => value, // You can format the label here
                font: {
                  weight: "semibold",
                },
              },
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Nationality-wise number of Candidates - ${selectedYear.replace(
                  "NEET_UG_",
                  ""
                )}`,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    label += context.raw;
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default NationalityChart;