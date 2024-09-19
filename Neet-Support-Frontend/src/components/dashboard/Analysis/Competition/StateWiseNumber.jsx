import { auto } from "@popperjs/core";
import React, { useState, useEffect } from "react";
import ReactDatamap from "react-datamaps-india";
import { useSelector } from "react-redux";

const StateWiseNumber = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [yearOptions, setYearOptions] = useState([]);
  const [stateData, setStateData] = useState({});
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoveredStateData, setHoveredStateData] = useState(null);

  // Get the combinedData from Redux store
  const data = useSelector(
    (state) => state?.past5Years?.data?.combinedData?.[0]?.stateData || {}
  );

  // Populate year options based on the data
  useEffect(() => {
    if (data) {
      const years = Object.keys(data);
      setYearOptions(
        [{ full: "all", display: "All Years" }].concat(
          years.map((year) => ({
            full: year,
            display: year.replace("NEET_UG_", ""),
          }))
        )
      );
    }
  }, [data]);

  // Update stateData whenever selectedYear or selectedCategory changes
  useEffect(() => {
    const aggregateData = (yearData) => {
      const aggregated = {};
      Object.keys(yearData).forEach((state) => {
        const registered = yearData[state]?.registered || 0;
        const appeared = yearData[state]?.appeared || 0;
        const qualified = yearData[state]?.qualified || 0;

        aggregated[state] = {
          registered: (aggregated[state]?.registered || 0) + registered,
          appeared: (aggregated[state]?.appeared || 0) + appeared,
          qualified: (aggregated[state]?.qualified || 0) + qualified,
        };
      });
      return aggregated;
    };

    const getAggregatedStateData = () => {
      let aggregatedData = {};

      // If "All Years" is selected, we need to combine data across all years
      if (selectedYear === "all") {
        const allYearsData = Object.values(data).reduce(
          (acc, yearData) => aggregateData(yearData),
          {}
        );
        aggregatedData = allYearsData;
      } else {
        aggregatedData = data[selectedYear] || {};
      }

      return aggregatedData;
    };

    const newStateData = {};
    const aggregatedData = getAggregatedStateData();

    Object.keys(aggregatedData).forEach((state) => {
      let value = 0;
      let title = `<strong>${state}</strong><br/>`;

      // If "All Categories" is selected, sum across all categories
      if (selectedCategory === "all") {
        value =
          (aggregatedData[state].registered || 0) +
          (aggregatedData[state].appeared || 0) +
          (aggregatedData[state].qualified || 0);
        title += `Registered: ${aggregatedData[state].registered || 0}<br/>
                  Appeared: ${aggregatedData[state].appeared || 0}<br/>
                  Qualified: ${aggregatedData[state].qualified || 0}`;
      } else {
        value = aggregatedData[state][selectedCategory] || 0;
        title += `${
          selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
        }: ${value}`;
      }

      newStateData[state] = { value, title };
    });

    setStateData(newStateData);
  }, [selectedYear, selectedCategory, data]);

  // Update mouse position and hover data
  const handleMouseMove = (event, value) => {
    const hoverBoxWidth = 180; // Fixed width of hover box
    const hoverBoxHeight = 100; // Estimated height of hover box
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let x = event.pageX + 20; // 20px to the right
    let y = event.pageY - 20; // 20px above

    // Check if hover box goes off screen horizontally
    if (x + hoverBoxWidth > screenWidth) {
      x = screenWidth - hoverBoxWidth - 20; // Adjust position to stay on screen
    }

    // Check if hover box goes off screen vertically
    if (y + hoverBoxHeight > screenHeight) {
      y = screenHeight - hoverBoxHeight - 20; // Adjust position to stay on screen
    }

    setHoverPosition({ x, y });
    setHoveredStateData(value); // Set hovered state's data
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="flex gap-2 mb-4">
        <div className="hidden sm:block h-[25px] bg-[#B7804A] w-[6px] rounded"></div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
          State-wise Data of Candidates -{" "}
          {selectedYear === "all" ? "All Years" : selectedYear.split("_").pop()}
        </h1>
      </div>

      <div className="flex flex-wrap justify-between gap-2 mb-4">
        <div className="flex gap-2 flex-wrap">
          {["all", "registered", "appeared", "qualified"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm lg:text-lg rounded cursor-pointer hover:bg-[#005f59] hover:text-white transition-all ${
                selectedCategory === category
                  ? "bg-[#005f59] text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {category === "all"
                ? "All Categories"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm lg:text-lg rounded-lg bg-[#005f59] text-white cursor-pointer"
          >
            {yearOptions.map((option) => (
              <option key={option.full} value={option.full}>
                {option.display}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="relative"
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "100%", // Responsive map
          }}
        >
          <ReactDatamap
            regionData={stateData}
            mapLayout={{
              title: "",
              legendTitle: `${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              } Data`,
              startColor: "#f2f2f2",
              endColor: "#005f59",
              noDataColor: "#f5f5f5",
              borderColor: "#888787",
              hoverColor: "#008A81",
            }}
            hoverComponent={({ value }) => (
              <div
                style={{
                  width: "180px", // Fixed width for hover box
                  position: "absolute",
                  left: `${hoverPosition.x}px`,
                  top: `${hoverPosition.y}px`,
                  padding: "8px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  pointerEvents: "none",
                  zIndex: 1000,
                  transition: "opacity 0.3s ease-in-out",
                  opacity: value ? 1 : 0,
                  wordWrap: "break-word", // Handle longer content
                }}
                dangerouslySetInnerHTML={{
                  __html: value ? value.title : "No data available",
                }}
              />
            )}
            onMouseEnter={(e, value) => handleMouseMove(e, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StateWiseNumber;
