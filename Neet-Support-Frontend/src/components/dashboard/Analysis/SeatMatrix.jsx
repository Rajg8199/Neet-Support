import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Plugin for labels

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Helper function to apply same shade with transparency for all children of a parent
const generateSameShadeForChildren = (baseColor, numChildren) => {
  const transparency = 0.8; // Fixed transparency for all child categories
  const shade = `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(
    baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${transparency})`;
  return new Array(numChildren).fill(shade); // Same shade for all children
};

const MccComponent = () => {
  const [year, setYear] = useState("2021"); // Default year set to 2021
  const [yearsData, setYearsData] = useState([]);
  const [selectedState, setSelectedState] = useState("Bihar"); // Default state set to Karnataka
  const [focusedParent, setFocusedParent] = useState(null); // Focused parent for child view
  const [highlightedParentColor, setHighlightedParentColor] = useState(null); // Store the parent color for child segments
  const [filteredData, setFilteredData] = useState({ mcc: [], state: [] });

  const apiurl = import.meta.env.VITE_API_URL;

  // Fetch years data and initialize it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/fetchSheetData`);
        setYearsData(response.data.data); // Store all year data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on the selected year
  useEffect(() => {
    if (year) {
      const yearData = yearsData.find((item) => item.year === year);
      if (yearData) {
        setFilteredData({
          mcc: yearData.data.find((item) => item.mcc)?.mcc || [],
          state: yearData.data.find((item) => item.state)?.state || [],
        });
      }
    }
  }, [year, yearsData]);

  const selectedStateData = filteredData.mcc?.find(
    (state) => state.name === selectedState
  );

  if (!selectedStateData || !selectedStateData?.children) {
    return <div>No state or state data available</div>;
  }

  // Prepare parent and child categories for the doughnut chart
  const parentCategories = selectedStateData?.children.map((category) => ({
    name: category.name,
    seatCount: category.seatCount,
  }));

  let childCategories = selectedStateData?.children
    ?.flatMap((category) =>
      category.children?.map((child) => ({
        parentName: category.name,
        name: child.name,
        seatCount: child.value,
        instituteCount: child.instituteCount,
      }))
    )
    .filter((child) => child.seatCount > 0);

  // If a parent is clicked, focus only on its children
  if (focusedParent) {
    childCategories = childCategories.filter(
      (child) => child.parentName === focusedParent
    );
  }

  const parentLabels = parentCategories.map((cat) => cat.name);
  const childLabels = childCategories.map((subcat) => subcat.name);
  const parentSeatCounts = parentCategories.map((cat) => cat.seatCount);
  const childSeatCounts = childCategories.map((subcat) => subcat.seatCount);

  const baseParentColors = ["#FFB74D", "#FF9800", "#4CAF50", "#8BC34A", "#03A9F4"];

  // If a parent is highlighted, generate child shades based on that parent's color
  const childColors = highlightedParentColor
    ? generateSameShadeForChildren(highlightedParentColor, childCategories.length)
    : selectedStateData?.children.flatMap((category, index) => {
        const parentColor = baseParentColors[index % baseParentColors.length]; // Ensure colors are reused if more categories
        return generateSameShadeForChildren(parentColor, category.children?.length || 1);
      });

  // Handle chart click to switch between parent and child view
  const handleChartClick = (elements) => {
    if (elements.length === 0) return;

    const chartElement = elements[0];

    // If a parent (inner ring) was clicked
    if (chartElement.datasetIndex === 1) {
      const clickedParentLabel = parentLabels[chartElement.index];
      const parentColor = baseParentColors[chartElement.index % baseParentColors.length];

      setFocusedParent(focusedParent === clickedParentLabel ? null : clickedParentLabel);
      setHighlightedParentColor(parentColor); // Highlight the clicked parent color for child segments
    }

    // If a child (outer ring) was clicked, reset the view
    if (chartElement.datasetIndex === 0 && focusedParent) {
      setFocusedParent(null); // Reset to show both parent and child
      setHighlightedParentColor(null); // Reset color highlighting for children
    }
  };

  // Custom plugin to draw the selected state name in the center of the doughnut chart with customizable text size
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: function (chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      // Custom font size based on chart dimensions (or set a fixed size)
      const fontSize = Math.min(height / 8, 20); // Dynamically adjust or set a fixed size
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textBaseline = "middle";

      const text = selectedStateData.name; // Fetch the selected state name from data
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container">
            <h1 className="text-2xl sm:text-4xl font-semibold">Seat Matrix</h1>
            <p className="text-sm sm:text-base">
              An overview of the seat distributions in medical colleges, updated
              regularly for state and central counselling rounds, according to
              different categories and subcategories.
            </p>
          </div>

         <div className="bg-white rounded-lg ">
          <div className=" p-2 flex justify-end gap-2 flex-wrap ">
            <select
              className="p-2 shadow-md bg-[#005f59] text-white w-[150px] sm:w-[180px] rounded-3xl appearance-none dropdown px-4"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setFocusedParent(null); // Reset focus on state change
                setHighlightedParentColor(null); // Reset parent color on state change
              }}
            >
              {filteredData.mcc?.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              className="p-2 shadow-md bg-[#005f59] text-white w-[150px] sm:w-[180px] rounded-3xl appearance-none dropdown px-4"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {yearsData.map((item, index) => (
                <option key={index} value={item.year}>
                  {item.year}
                </option>
              ))}
            </select>
          </div>

          {/* Doughnut Chart */}
          <div
            style={{ height: "500px", width: "100%" }}
            className="flex justify-center items-center mx-auto my-4 max-w-[100%] sm:max-w-[70%]"
          >
            <Doughnut
              data={{
                labels: focusedParent ? childLabels : [...childLabels, ...parentLabels],
                datasets: [
                  {
                    label: "Child Categories",
                    data: focusedParent ? childSeatCounts : childSeatCounts,
                    backgroundColor: focusedParent ? childColors : childColors,
                    borderColor: 'white', // White border for all segments
                    borderWidth: 2,
                    hoverOffset: 4,
                  },
                  {
                    label: "Parent Categories",
                    data: focusedParent ? [] : parentSeatCounts, // Hide the parent when focused
                    backgroundColor: focusedParent ? [] : baseParentColors,
                    borderColor: 'white', // White border for all segments
                    borderWidth: 2,
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                cutout: "30%", // Add gap between parent and child
                onClick: (_, elements) => handleChartClick(elements),
                plugins: {
                  legend: {
                    display: false, // Disable extra legends
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.label || "";
                        if (context.parsed) {
                          label += `: ${context.parsed} seats`;
                        }
                        return label;
                      },
                    },
                  },
                  datalabels: {
                    color: "#1C1C1CFF", // Label color
                    anchor: "center", // Place the label in the center of the arc
                    align: "center", // Align the label to the center of the arc
                    clip: true, // Prevent clipping of labels outside the chart area
                    textAlign: "start", // Center align the text itself
                    font: {
                      size: window.innerWidth <= 768 ? 6 : 10, // Adjust font size based on screen width
                    },
                    formatter: (dataValue, context) => {
                      const label = context.chart.data.labels[context.dataIndex];
                      const dataset = context.dataset;
                      const total = dataset.data.reduce((sum, val) => sum + val, 0); // Calculate total of all segments
                      const percentage = ((dataValue / total) * 100).toFixed(2); // Calculate percentage and format to 2 decimal places
                      
                      return `${label} - ${percentage}%`; // Display label with percentage
                    },
                    display: function (context) {
                      const dataset = context.dataset;
                      const total = dataset.data.reduce((sum, val) => sum + val, 0); // Calculate total of all segments
                      const value = dataset.data[context.dataIndex];
                      const percentage = (value / total) * 100;
                  
                      // Only display the label if the segment occupies more than 5% of the chart
                      return percentage > 5; // Adjust this threshold based on your needs
                    },
                    padding: 4,
                  },                                
                },
              }}
              plugins={[centerTextPlugin]} // Add custom plugin for center text
              key={selectedState}
               // Ensure chart re-renders on state change
            />
          </div>

          {/* Data Table */}
          <div className="bg-[#F5F5F5] rounded-md mt-[10px] pt-2 pb-2 overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="text-[#097F78] border-b-2 border-t-2 border-r-0 border-l-0 border-[#B7804A] text-lg md:text-md">
                <tr>
                  <th className="px-4 border-r-0 border-l-0 py-2">Sl. No</th>
                  <th className="px-4 border-r-0 border-l-0 py-2">Seat Type</th>
                  <th className="px-4 border-r-0 border-l-0 py-2">Total Seats</th>
                  <th className="px-4 border-r-0 border-l-0 py-2">Total Categories</th>
                  <th className="px-4 border-r-0 border-l-0 py-2">Total Colleges</th>
                </tr>
              </thead>
              <tbody>
                {selectedStateData?.children.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.seatCount}</td>
                    <td className="px-4 py-2">
                      {item.children
                        ? item.children.reduce((acc, cur) => acc + cur.value, 0)
                        : 0}
                    </td>
                    <td className="px-4 py-2">
                      {item.children ? item.children.length : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
   </div>
  );
};

export default MccComponent;
