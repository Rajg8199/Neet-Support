import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useTable, useSortBy } from "react-table";

const CandidateDataTable = () => {
  const data = useSelector((state) => state.past5Years.data.data) || [];

  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but received:", data);
    return <div>Error: Invalid data format.</div>;
  }

  const [filteredData, setFilteredData] = useState(data);
  const [activeYear, setActiveYear] = useState("All");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [viewAll, setViewAll] = useState(false); // State to track whether to show all rows

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleYearFilter = (year) => {
    setActiveYear(year);
    filterData(year, selectedCandidates);
  };

  const handleCandidateFilter = (selectedOptions) => {
    const candidates = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedCandidates(candidates);
    filterData(activeYear, candidates);
  };

  const filterData = (year, candidates) => {
    let filtered = data;

    if (candidates.length > 0) {
      filtered = filtered.filter((row) => candidates.includes(row.candidates));
    }

    if (year !== "All") {
      filtered = filtered.map((row) => {
        const yearData = row.data.find((d) => d.year === year);
        return {
          ...row,
          value: yearData ? yearData.value : "-",
        };
      });
    }

    setFilteredData(filtered);
  };

  const candidateOptions = useMemo(() => {
    const uniqueCandidates = [...new Set(data.map((row) => row.candidates))];
    return uniqueCandidates.map((candidate) => ({
      value: candidate,
      label: candidate,
    }));
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Candidates",
        accessor: "candidates",
      },
      ...(activeYear === "All"
        ? [
            { Header: "2019", accessor: "data.0.value" },
            { Header: "2020", accessor: "data.1.value" },
            { Header: "2021", accessor: "data.2.value" },
            { Header: "2022", accessor: "data.3.value" },
            { Header: "2023", accessor: "data.4.value" },
            { Header: "2024", accessor: "data.5.value" },
          ]
        : [{ Header: `${activeYear}`, accessor: "value" }]),
    ],
    [activeYear]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
      },
      useSortBy
    );

  // Show only 10 rows by default unless viewAll is true
  const displayedRows = viewAll ? rows : rows.slice(0, 10);

  return (
    <div className="container mx-auto p-2">
      <div className="flex gap-2 mb-4">
        <div className="hidden sm:block h-[25px] sm:h-[25px] bg-[#B7804A] w-[6px] sm:w-[6px] rounded"></div>
        <h1 className="text-xl font-semibold">
          Highlights of Neet (UG) - 2019 to 2025
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {["All", "2019", "2020", "2021", "2022", "2023", "2024"].map(
            (year) => (
              <button
                key={year}
                className={`px-4 py-2 bg-[#005f59] hover:bg-[#ff9245] text-white rounded-lg ${
                  activeYear === year ? "outline-[#ff9245] text-white" : ""
                }`}
                onClick={() => handleYearFilter(year)}
              >
                {year}
              </button>
            )
          )}
        </div>
        <div className="w-full md:w-[300px] mt-4 md:mt-4">
          <Select
            isMulti
            options={candidateOptions}
            onChange={handleCandidateFilter}
            placeholder="Select Candidates"
            className="w-full"
            classNamePrefix="select"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse " {...getTableProps()}>
          <thead className="custom-header-border">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-2 text-left border-b border-l-0 border-r-0 text-sm md:text-base"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {displayedRows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 text-sm md:text-base"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-l-0 border-r-0 text-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Conditionally render "View More" button */}
        {!viewAll && rows.length > 10 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setViewAll(true)}
              className="px-4 py-2 bg-[#005f59] text-white rounded-lg"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDataTable;
