// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// // Register the necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const CategoryChart = ({ year, state }) => {
//   const [chartData, setChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `http://34.47.160.12/api/fecthCategoryData?state=${state}&year=${year}`
//         );
//         const { data } = response.data;

//         const categories = data.map((item) => item.category);
//         const candidatesPerSeat = data.map((item) => item.candidates_per_seat);

//         setChartData({
//           labels: categories,
//           datasets: [
//             {
//               label: "Candidates per Seat",
//               data: candidatesPerSeat,
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data from the API.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [state, year]);

//   return (
//     <div className="bg-white p-5 shadow-xl rounded-2xl ">
//       <div className="flex gap-2">
//         <div className="h-[4px] sm:h-[25px] bg-[#B7804A] w-[30px] sm:w-[6px] rounded"></div>
//         <h1 className="text-xl font-semibold">
//           Category-Wise Candidates Applied in KEA
//         </h1>
//       </div>
//       <p className="pl-2">
//         Category-wise applicants based on All India Ranks & seat distributions for all categories under KEA.
//       </p>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : chartData ? (
//         <div className="mt-8 bg-white p-4 shadow-xl rounded-2xl">
//           <Bar
//             data={chartData}
//             options={{
//               indexAxis: 'y', // Horizontal bars
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: "top",
//                 },
//                 title: {
//                   display: true,
//                   text: "Category-wise Candidates per Seat Data",
//                 },
//                 datalabels: {
//                   anchor: "end",
//                   align: "right",
//                   formatter: (value) => value,
//                   color: "#000",
//                   font: {
//                     weight: "bold",
//                   },
//                 },
//               },
//               scales: {
//                 x: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: "Candidates per Seat",
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: "Category",
//                   },
//                 },
//               },
//             }}
//           />
//         </div>
//       ) : (
//         <p>No data available for the selected state and year.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryChart;

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

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CategoryChart = ({ year, state }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://34.47.160.12/api/fecthCategoryData?state=${state}&year=${year}`
        );
        const { data } = response.data;

        const categories = data.map((item) => item.category);
        const candidatesPerSeat = data.map((item) => item.candidates_per_seat);

        setChartData({
          labels: categories,
          datasets: [
            {
              label: "Candidates per Seat",
              data: candidatesPerSeat,
              backgroundColor: "#097F78",
              borderColor: "#097F78",
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
          Category-Wise Candidates Applied in KEA
        </h1>
      </div>
      <p className="pl-2">
        Category-wise applicants based on All India Ranks & seat distributions
        for all categories under KEA.
      </p>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : chartData ? (
        <div className=" overflow-x-auto">
          <div className="relative h-[400px] md:h-[550px] min-w-[550px]">
            <Bar
              data={chartData}
              options={{
                indexAxis: "y", // Horizontal bars
                responsive: true,
                maintainAspectRatio: !isMobile, // Disable aspect ratio for small screens
                maxBarThickness: 40, // Enforce consistent bar thickness
        minBarLength: 2, // Optional: ensure minimum visible bar
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Category-wise Candidates per Seat Data",
                  },
                  datalabels: {
                    display: !isMobile, // Disable datalabels for mobile view
                    anchor: "end",
                    align: "start",
                    formatter: (value) => value,
                    color: "#ffffff",
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
                      text: "Category",
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

export default CategoryChart;
