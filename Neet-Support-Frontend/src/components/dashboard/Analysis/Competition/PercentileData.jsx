import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTable, useSortBy } from "react-table";

const PercentileTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [activeYear, setActiveYear] = useState("All");

  const data = useSelector((state) => {
    const combinedData = state?.past5Years?.data?.combinedData;
    return combinedData?.[0]?.percentileData || [];
  });

  useEffect(() => {
    if (!data) return;

    if (activeYear === "All") {
      setFilteredData(data);  // No unnecessary re-render
    } else {
      const updatedData = data.map((row) => ({
        id: row._id,
        percentile: row.percentile,
        category: row.category,
        markRange: row[`markRange${activeYear}`] || "N/A",
        candidates: row[`candidates${activeYear}`] || "N/A",
      }));
      setFilteredData(updatedData);  // Trigger re-render only if data changes
    }
  }, [activeYear, data]);
  const handleFilter = (year) => {
    setActiveYear(year);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Qualifying Criteria", accessor: "percentile" },
      { Header: "Category", accessor: "category" },
    ];

    if (activeYear === "All") {
      return [
        ...baseColumns,
        {
          Header: "Mark Range",
          columns: [
            { Header: "2022", accessor: "markRange2022" },
            { Header: "2023", accessor: "markRange2023" },
            { Header: "2024", accessor: "markRange2024" },
          ],
        },
        {
          Header: "No. of Candidates",
          columns: [
            { Header: "2022", accessor: "candidates2022" },
            { Header: "2023", accessor: "candidates2023" },
            { Header: "2024", accessor: "candidates2024" },
          ],
        },
      ];
    } else {
      return [
        ...baseColumns,
        { Header: `Mark Range (${activeYear})`, accessor: "markRange" },
        { Header: `No. of Candidates (${activeYear})`, accessor: "candidates" },
      ];
    }
  }, [activeYear]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
  }, useSortBy);

  return (
    <div className="container mx-auto p-2 bg-white rounded-lg">
      
      <div className="flex gap-2 mb-4">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">NEET(UG) Percentile Data</h1>
      </div>

      {/* Year Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["All", "2022", "2023", "2024"].map((year) => (
          <button
            key={year}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeYear === year
                ? "bg-[#005f59] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFilter(year)}
          >
            NEET(UG) {year}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="min-w-full table-auto border-collapse bg-white text-sm md:text-base"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <React.Fragment key={index}>
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-[#005f59] custom-header-border"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 border-b border-l-0 border-r-0 border-gray-300 text-center"
                      colSpan={column.columns ? column.columns.length : 1}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-[#eae9e9] transition"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-l-0 border-r-0 border-gray-300 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PercentileTable;
