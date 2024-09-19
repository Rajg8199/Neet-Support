// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { Chart } from "chart.js";

// // Register the plugin
// Chart.register(ChartDataLabels);

// function LinguisticMinorityChart({ state, year }) {
//   const [marks, setMarks] = useState(0);
//   const [chartData, setChartData] = useState(null); // Initially set to null
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from the API based on the state and year
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `${
//             import.meta.env.VITE_API_URL
//           }/api/fetchLinguisticMeritChartData?state=${state}&year=${year}`
//         );
//         const data = await response.json();

//         if (data && data.length > 0) {
//           const meritData = data[0].data;

//           if (meritData && meritData.length > 0) {
//             const languages = meritData.map((item) => item.language);
//             const candidatesPerSeat = meritData.map(
//               (item) => item.candidates_per_seat
//             );

//             setChartData({
//               labels: languages,
//               datasets: [
//                 {
//                   label: "No. of candidates per state",
//                   data: candidatesPerSeat,
//                   backgroundColor: "#3F99F9",
//                 },
//               ],
//             });
//           } else {
//             setError("Merit data is not available.");
//           }
//         } else {
//           setError("API returned no data.");
//         }
//       } catch (error) {
//         console.error("Error fetching linguistic merit data:", error);
//         setError("Failed to fetch data from the API.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [state, year]);

//   // Handle the input change for NEET marks
//   const handleMarksChange = (e) => {
//     setMarks(e.target.value);
//   };

//   return (
//     <div className="bg-white p-5 shadow-xl rounded-2xl">
//       <div className="flex gap-2">
//         <div className="h-[4px] sm:h-[25px] bg-[#B7804A] w-[30px] sm:w-[6px] rounded"></div>
//         <h1 className="text-xl font-semibold">
//           Linguistic Minority / Mother Tongue (group)
//         </h1>
//       </div>

//       <div className="flex items-center space-x-4">
//         {/* <input
//           type="number"
//           value={marks}
//           onChange={handleMarksChange}
//           placeholder="Enter NEET Marks"
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button className="p-2 bg-blue-500 text-white rounded">
//           Check now
//         </button> */}
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : chartData ? (
//         <div className="mt-8 bg-white p-4 shadow-xl rounded-2xl">
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   position: "top",
//                 },
//                 datalabels: {
//                   display: true,
//                   align: "end",
//                   anchor: "end",
//                   color: "#000",
//                   font: {
//                     weight: "bold",
//                   },
//                   formatter: function (value) {
//                     return value;
//                   },
//                 },
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: "No of candidates per state",
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
// }

// export default LinguisticMinorityChart;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";

// Register the plugin
Chart.register(ChartDataLabels);

function LinguisticMinorityChart({ state, year }) {
  const [marks, setMarks] = useState(0);
  const [chartData, setChartData] = useState(null); // Initially set to null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API based on the state and year
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/fetchLinguisticMeritChartData?state=${state}&year=${year}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const meritData = data[0].data;

          if (meritData && meritData.length > 0) {
            const languages = meritData.map((item) => item.language);
            const candidatesPerSeat = meritData.map(
              (item) => item.candidates_per_seat
            );

            setChartData({
              labels: languages,
              datasets: [
                {
                  label: "No. of candidates per state",
                  data: candidatesPerSeat,
                  backgroundColor: "#097F78",
                },
              ],
            });
          } else {
            setError("Merit data is not available.");
          }
        } else {
          setError("API returned no data.");
        }
      } catch (error) {
        console.error("Error fetching linguistic merit data:", error);
        setError("Failed to fetch data from the API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [state, year]);

  // Handle the input change for NEET marks
  const handleMarksChange = (e) => {
    setMarks(e.target.value);
  };

  // Detect if the screen is small (mobile)
  const isMobile = window.innerWidth <= 640;

  return (
    <div className="bg-white p-3 shadow-xl rounded-2xl">
      <div className="flex gap-2">
        {/* Bar: Hidden on smaller screens */}
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          Linguistic Minority / Mother Tongue (group)
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Input section, you can uncomment if needed */}
      </div>

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
                responsive: true,
                maxBarThickness: 40, // Enforce consistent bar thickness
                minBarLength: 2, // Optional: ensure minimum visible bar
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  datalabels: {
                    display: !isMobile, // Disable datalabels for mobile view
                    align: "end",
                    anchor: "end",
                    color: "#000",

                    font: {
                      weight: "bold",
                    },
                    formatter: function (value) {
                      return value;
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "No. of candidates per state",
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
}

export default LinguisticMinorityChart;
