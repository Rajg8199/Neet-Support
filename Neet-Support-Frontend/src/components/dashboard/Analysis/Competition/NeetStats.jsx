import React from "react";
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
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels, // Register ChartDataLabels plugin
  Legend
);

const HorizontalBarChart = () => {
  const data = useSelector((state) => state.past5Years.data);

  // Transform Redux data to the format needed for Chart.js
  const transformData = () => {
    if (!data || !data.combinedData) return null;

    const yearsData = data.combinedData[0].pastFiveYearData;
    const years = Object.keys(yearsData).filter(
      (year) => !year.includes("_id")
    );

    const registeredData = [];
    const appearedData = [];
    const qualifiedData = [];

    years.forEach((year) => {
      registeredData.push(yearsData[year].registered);
      appearedData.push(yearsData[year].appeared);
      qualifiedData.push(yearsData[year].qualified);
    });

    return {
      labels: years,
      datasets: [
        {
          label: "Registered",
          data: registeredData,
          backgroundColor: "rgba(9, 127, 120, 1)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
        {
          label: "Appeared",
          data: appearedData,
          backgroundColor: "rgba(9, 127, 120, 0.8)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
        {
          label: "Qualified",
          data: qualifiedData,
          backgroundColor: "rgba(9, 127, 120, 0.6)",
          borderColor: "rgba(9, 127, 120, 1)",
          borderWidth: 1,
          maxBarThickness: 40, // Ensure consistent bar thickness
        },
      ],
    };
  };

  const chartData = transformData();

  const options = {
    indexAxis: "y", // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Candidates",
        },
      },
      y: {
        title: {
          display: true,
          text: "Years",
        },
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "left",
        color: "#ffffff", // Adjust label color
        formatter: (value) => value, // Format value
        font: {
          weight: "semibold",
        },
      },
      legend: {
        position: "top", // Set legend at the top
      },
    },
    responsive: true, // Ensure the chart is responsive
  };

  return (
    <div className="bg-white p-2 rounded-2xl ">
      <div className="flex gap-2">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold extrasmall">NEET (UG) - Past Five Year Statistical Analysis</h1>
      </div>
      <p className="pl-2">
        Comparison of registered, appeared, and qualified candidates over the
        past five years.
      </p>
      <div className="overflow-x-auto mt-4">
        {/* Here, we are adjusting the height of the chart container */}
        <div className="relative h-[450px] md:h-[600px] min-w-[800px] ">
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <Skeleton active />
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;