import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const GenderWise = () => {
  const [chartData, setChartData] = useState(null);

  const data1 = useSelector(
    (state) => state.past5Years.data?.combinedData?.[0]?.genderData
  );

  const formatData = (data) => {
    const years = Object.keys(data)
      .filter((key) => key.startsWith("NEET_UG_"))
      .map((key) => key.split("_")[2]);

    const datasets = [
      {
        label: "Male",
        data: years.map((year) => ({
          x: parseInt(year),
          y: data[`NEET_UG_${year}`].Male.qualified,
          appeared: data[`NEET_UG_${year}`].Male.appeared,
          registered: data[`NEET_UG_${year}`].Male.registered,
        })),
        backgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 6, // Medium dot size
      },
      {
        label: "Female",
        data: years.map((year) => ({
          x: parseInt(year),
          y: data[`NEET_UG_${year}`].Female.qualified,
          appeared: data[`NEET_UG_${year}`].Female.appeared,
          registered: data[`NEET_UG_${year}`].Female.registered,
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6, // Medium dot size
      },
      {
        label: "Transgender",
        data: years.map((year) => ({
          x: parseInt(year),
          y: data[`NEET_UG_${year}`].Transgender.qualified,
          appeared: data[`NEET_UG_${year}`].Transgender.appeared,
          registered: data[`NEET_UG_${year}`].Transgender.registered,
        })),
        backgroundColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6, // Medium dot size
      },
    ];

    setChartData({ datasets });
  };

  useEffect(() => {
    if (data1) {
      formatData(data1);
    }
  }, [data1]);

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const point = context.raw;
            return [
              `Qualified: ${point.y}`,
              `Appeared: ${point.appeared}`,
              `Registered: ${point.registered}`,
            ];
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-2xl ">
      <div className="flex gap-2">
        {/* Add the vertical bar */}
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          Gender-wise number of Candidates
        </h1>
      </div>

      <div className="mt-4 overflow-x-auto">
        {chartData ? (
          <div className="relative  md:h-[600px] min-w-[600px]">
            <Scatter data={chartData} options={options} />
          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
};

export default GenderWise;
