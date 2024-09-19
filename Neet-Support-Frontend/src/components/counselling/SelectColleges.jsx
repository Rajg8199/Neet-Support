import React from "react";
import { Button } from "antd";
const SelectColleges = ({ mccColleges, stateColleges }) => {
  return (
    <div className="rounded-xl p-6 bg-white mx-auto">
      <h4 className="text-center text-lg font-semibold mb-6 text-[#097F78]">
        College List Based on Your Details
      </h4>

      {/* Rank and Category */}
      <div className="flex justify-between mb-8 px-10">
        <div>
          <span className="text-md font-medium">Rank:</span>{" "}
          <span>/* Rank Value */</span>
        </div>
        <div>
          <span className="text-md font-medium">Category:</span>{" "}
          <span>/* Category Value */</span>
        </div>
      </div>

      {/* MCC College List */}
      <div className="mb-10 px-10">
        <div className="text-center mb-4">
          <h5 className="text-md font-bold text-[#097F78]">MCC (AIQ)</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse ">
            <thead className="custom-header-border">
              <tr className="bg-[#F9FAFB]  border-gray-300">
                <th className="p-3 text-sm font-semibold text-left border-r-0 border-l-0">
                  College Name
                </th>
                <th className="p-3 text-sm font-semibold text-left border-r-0 border-l-0">
                  College Type
                </th>
                <th className="p-3 text-sm font-semibold text-left border-r-0 border-l-0">
                  Course
                </th>
                <th className="p-3 text-sm font-semibold text-center border-r-0 border-l-0">
                  Round
                </th>
              </tr>
            </thead>
            <tbody>
              {mccColleges.length > 0 ? (
                mccColleges.map((college, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="p-3 border-r-0 border-l-0  ">
                      {college.name}
                    </td>
                    <td className="p-3   border-r-0 border-l-0">
                      {college.type}
                    </td>
                    <td className="p-3  border-r-0 border-l-0 ">
                      {college.course}
                    </td>
                    <td className="p-3 text-center border-r-0 border-l-0">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="text-orange-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 border-r-0 border-l-0">
                    No MCC Colleges Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* State College List */}
      <div className="mb-10 px-10">
        <div className="text-center mb-4">
          <h5 className="text-md font-bold text-[#097F78]">State</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="custom-header-border">
              <tr className="bg-[#F9FAFB]  border-gray-300">
                <th className="p-3 text-sm font-semibold text-left  border-r-0 border-l-0">
                  College Name
                </th>
                <th className="p-3 text-sm font-semibold text-left  border-r-0 border-l-0">
                  College Type
                </th>
                <th className="p-3 text-sm font-semibold text-left  border-r-0 border-l-0">
                  Course
                </th>
                <th className="p-3 text-sm font-semibold text-center border-r-0 border-l-0">Round</th>
              </tr>
            </thead>
            <tbody>
              {stateColleges.length > 0 ? (
                stateColleges.map((college, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="p-3 border-r-0 border-l-0">{college.name}</td>
                    <td className="p-3 border-r-0 border-l-0">{college.type}</td>
                    <td className="p-3 border-r-0 border-l-0">{college.course}</td>
                    <td className="p-3 text-center border-r-0 border-l-0">
                      <input
                        type="checkbox "
                        checked
                        disabled
                        className="text-orange-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 border-r-0 border-l-0">
                    No State Colleges Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="primary"
          className="bg-[#FF9245] px-6 py-2 rounded-3xl text-white font-medium text-sm hover:bg-orange-600 transition"
        >
          Submit Details
        </Button>
      </div>
    </div>
  );
};

export default SelectColleges;
