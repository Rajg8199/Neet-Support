import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
); // Register the plugin

const CategoryWise = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedYear, setSelectedYear] = useState("2024");
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from Redux store
  const categoryData = useSelector((state) => {
    const data = state.past5Years.data?.combinedData;
    return data && data.length > 0 ? data[0]?.categoryData : {}; // Safeguard against undefined
  });

  useEffect(() => {
    if (categoryData) {
      const yearKeys = Object.keys(categoryData);
      const yearLabels = yearKeys.map((key) => key.replace("NEET_UG_", "")); // Strip the prefix
      setYears(yearLabels);
      updateChartData(selectedYear, categoryData);
      setLoading(false);
    } else {
      setError("Data unavailable or loading failed.");
    }
  }, [categoryData]);

  useEffect(() => {
    if (categoryData) {
      updateChartData(selectedYear, categoryData);
    }
  }, [selectedYear, categoryData]);

  const updateChartData = (year, categoryData) => {
    const yearKey = `NEET_UG_${year}`;
    const currentYearData = categoryData[yearKey] || {};

    const labels = Object.keys(currentYearData);
    const registeredValues = labels.map((label) =>
      currentYearData[label] ? currentYearData[label].registered : 0
    );
    const appearedValues = labels.map((label) =>
      currentYearData[label] ? currentYearData[label].appeared : 0
    );
    const qualifiedValues = labels.map((label) =>
      currentYearData[label] ? currentYearData[label].qualified : 0
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Registered",
          data: registeredValues,
          backgroundColor: "rgba(9, 127, 120,1)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
        },
        {
          label: "Appeared",
          data: appearedValues,
          backgroundColor: "rgba(9, 127, 120, 0.8)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
        },
        {
          label: "Qualified",
          data: qualifiedValues,
          backgroundColor: "rgba(9, 127, 120, 0.6)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart resizes with the container
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Number of Candidates",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      datalabels: {
        display: false, // Enable data labels
        color: "black", // Change text color
        align: "top", // Align text at the top of the bar
        anchor: "end", // Anchoring text at the end of the bar
        font: {
          weight: "bold", // Make it bold
          size: 12, // Font size
        },
        formatter: (value) => value, // Format the data labels
      },
      legend: {
        position: "top",
      },
    },
  };

  if (loading) {
    return <div>Loading data...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="bg-white p-2 rounded-2xl ">
      <div className="flex gap-2">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          Category-wise number of Candidates - {selectedYear}
        </h1>
      </div>

      <div className="flex justify-end my-4">
        <select
          value={selectedYear}
          className="px-4 py-2 bg-[#005f59] text-white rounded-lg"
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="relative h-[500px] md:h-[500px] min-w-[600px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CategoryWise;
