import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const LanguageWiseComponents = () => {
  const data = useSelector(
    (state) => state.past5Years?.data?.combinedData?.[0]?.languageData
  );

  const [year, setYear] = useState("2024"); // Default year
  const [selectedLanguage, setSelectedLanguage] = useState("All"); // Default to show all languages

  // Check if data is available
  if (!data) {
    return <div>Loading...</div>;
  }

  // Transform data into Chart.js format
  const transformData = (data) => {
    if (!data[year]) return [];
    return Object.entries(data[year]).map(([language, candidates]) => ({
      language,
      candidates: candidates === "NA" ? 0 : candidates,
    }));
  };

  // Filter data based on the selected language
  const filteredData =
    selectedLanguage === "All"
      ? transformData(data)
      : transformData(data).filter(
          (item) => item.language === selectedLanguage
        );

  const chartData = {
    labels: filteredData.map((item) => item.language),
    datasets: [
      {
        data: filteredData.map((item) => item.candidates),
        backgroundColor: [
          "#FF9C55", // Use consistent brand colors
          "#3F99F9",
          "#FEA016",
          "#097F78",
          "#FFD700",
          "#FF6347",
          "#FFDDC1",
          "#6699CC",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverBackgroundColor: [
          "#FFB07A",
          "#6CB1FF",
          "#FEB44C",
          "#32A393",
          "#FFE066",
          "#FF8571",
          "#FFE1D3",
          "#83A9E6",
        ],
      },
    ],
  };

  const options = {
    cutout: "60%", // Create donut effect
    plugins: {
      legend: {
        position: "top",
        display: false, // Hide legend for cleaner design
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const language = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${language}: ${count} Appeared`;
          },
          title: function () {
            return `Year: ${year}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true, // Make it fully responsive
  };

  const handleTabClick = (selectedYear) => {
    setYear(selectedYear);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const years = Object.keys(data);
  const languages = Array.from(
    new Set(transformData(data).map((item) => item.language))
  );

  return (
    <div className="flex flex-col gap-6 p-2 bg-white rounded-lg  mx-auto">
      <div className="flex gap-2 ">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          {" "}
          Language-wise number of Candidates - {year.split("_").pop()}
        </h1>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-2 mx-auto w-full justify-end">
          {/* Dropdown for years */}
          <select
            value={year}
            onChange={(e) => handleTabClick(e.target.value)}
            className="w-[200px] lg:w-[120px] px-4 py-2 border rounded-lg text-white bg-[#005f59] appearance-none dropdown"
          >
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>

          {/* Language dropdown */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-[200px] lg:w-auto px-4 py-2 border rounded-lg text-white bg-[#005f59] appearance-none  dropdown"
          >
            <option value="All">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Centered and Responsive Donut Chart */}
      <div className="flex justify-center items-center w-full h-auto p-4">
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg h-64 md:h-80 lg:h-96">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LanguageWiseComponents;
