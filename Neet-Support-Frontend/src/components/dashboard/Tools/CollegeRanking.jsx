import React, { useState, useEffect } from "react";
import axios from "axios";

function CollegeRanking() {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstituteType, setSelectedInstituteType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state

  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiurl}/api/getCollegeRankDetails`)
      .then((response) => {
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
        setLoading(false); // Set loading to false on error
      });
  }, [apiurl]);

  useEffect(() => {
    let filteredData = colleges;

    if (selectedCourse) {
      filteredData = filteredData.filter(
        (college) =>
          college["Courses Name"] &&
          college["Courses Name"].includes(selectedCourse)
      );
    }

    if (selectedInstituteType) {
      filteredData = filteredData.filter(
        (college) =>
          college["Management of College"] &&
          college["Management of College"] === selectedInstituteType
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter(
        (college) =>
          college["Name and Address of Medical College/Medical Institution"] &&
          college["Name and Address of Medical College/Medical Institution"]
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredColleges(filteredData);
    setCurrentPage(1);
  }, [selectedCourse, selectedInstituteType, searchQuery, colleges]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredColleges.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredColleges.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container text-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold underline decoration-[#B7804A] underline-offset-[12px] pb-2">
                College Ranking
              </h1>
              <p className="mt-6 md:mt-10 font-extrabold text-sm md:text-lg">
                View seat distributions and corresponding fee structures offered
                by colleges for <br /> every category and subcategory
              </p>
            </div>
          </div>
          <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
            <header className="text-center mb-8  w-full p-4 flex flex-col md:flex-row gap-4 items-center">
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800">
                College Filter
              </h1>{" "}
              <div className="h-[4px] md:h-[30px] bg-[#B7804A] w-[30px] md:w-[4px] rounded"></div>
              <div className="text-sm md:text-base text-[#565656] pt-5 font-bold ">
                Round-wise updates with the latest seat intakes of medical
                colleges
              </div>
            </header>
            <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
              Fill Your Details
            </h2>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8 gap-5 items-center">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="bg-[#005F59] text-white px-4 py-2 rounded-xl appearance-none dropdown w-[250px]"
              >
                <option value="">Select Course</option>
                <option value="MBBS">MBBS</option>
                <option value="PG">PG</option>
                <option value="SS">SS</option>
              </select>

              <select
                value={selectedInstituteType}
                onChange={(e) => setSelectedInstituteType(e.target.value)}
                className="bg-[#005F59] text-white px-4 py-2 rounded-xl appearance-none dropdown w-[250px] "
              >
                <option value="">Select Institute Types</option>
                <option value="Govt.">Govt.</option>
                <option value="Trust">Trust</option>
              </select>
            </div>

            <h2 className="text-center text-lg md:text-xl font-semibold mb-4 mt-4">
              Result
            </h2>

            {/* Loading Indicator */}
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="bg-white md:border md:shadow-lg md:rounded-xl ">
                <div className="p-4 bg-white flex flex-col md:flex-row justify-between items-center">
                  <span className="text-gray-700 font-medium mb-2 md:mb-0">
                    <span className="font-bold">Showing </span>
                    {filteredColleges.length} records
                  </span>
                  <select
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#005F59] text-white px-4 py-1 rounded-3xl appearance-none  dropdown w-[250px]"
                  >
                    <option value="">Search Institute</option>
                    {colleges.map((college) => (
                      <option
                        key={college._id}
                        value={
                          college[
                            "Name and Address of Medical College/Medical Institution"
                          ]
                        }
                      >
                        {
                          college[
                            "Name and Address of Medical College/Medical Institution"
                          ]
                        }
                      </option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left ">
                  
                  <thead className=" text-[#004959] md:text-md custom-header-border">
                    <tr>
                      <th className="px-4 py-2 border-l-0 border-r-0">Sl. No</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">Institute & Institute Type</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">State</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">Degree(s) Offered</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">Year of Establishment</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">Total Seats</th>
                      <th className="px-4 py-2 border-l-0 border-r-0">NS Ranking</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentRecords.map((college, index) => (
                      <tr
                        key={college._id}
                        className=" hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {indexOfFirstRecord + index + 1}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {
                            college[
                              "Name and Address of Medical College/Medical Institution"
                            ]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {college.State}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {college["Courses Name"]}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {college["Year of Inspection of College"]}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base border-l-0 border-r-0">
                          {college["Annual Seats"]}
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base  border-l-0 border-r-0">
                          {college["NEET Support Ranking"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  
                </table>
                </div>
              </div>
              
            )}

            {/* Pagination Controls */}
            {!loading && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
                <div>
                  <select
                    value={recordsPerPage}
                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    className="bg-[#005F59] text-white px-4 py-2 rounded-lg"
                  >
                    <option value={10}>10 records per page</option>
                    <option value={25}>25 records per page</option>
                    <option value={50}>50 records per page</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-[#005F59] text-white px-4 py-2 rounded-lg mx-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-[#005F59] text-white px-4 py-2 rounded-lg mx-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeRanking;



