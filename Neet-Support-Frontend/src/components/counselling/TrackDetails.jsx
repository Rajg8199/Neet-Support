import React from "react";
import { Pie } from "react-chartjs-2";
import DocumentUpload from "./DocumentUpload";
import SelectColleges from "./SelectColleges";

const data = {
  labels: ["College A", "College B", "College C", "College D"],
  datasets: [
    {
      data: [10, 10, 10, 10], // Example data for each section
      backgroundColor: ["#ff595e", "#8ac926", "#1982c4", "#ffca3a"], // Chart colors
      hoverBackgroundColor: ["#ff595e", "#8ac926", "#1982c4", "#ffca3a"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide the default legend
    },
  },
};

const TrackDetails = ({
  mccColleges,
  stateColleges,
  documentList,
  uploadedFiles,
  handleFileChange,
}) => {
  return (

    <div className=" bg-white rounded-xl max-w-[90%] mx-auto pb-4 ">
      <div className="py-4 flex gap-2  items-center">

        <img src="assets/img/dashboard/icons/Mobile Analytics.png" />
        <h4 className="text-center text-2xl font-semibold  text-[#097F78]">
          Track Your Progress
        </h4>
      </div>

      <div className="flex flex-col lg:flex-row pb-5 gap-6">
        <div className="chart-section w-full  p-4 md:shadow-xl md:rounded-2xl md:border ">

          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={data} options={options} />
            </div>
          </div>
          {/* Chart Labels */}
          <div className="chart-legend grid grid-cols-2 gap-2 justify-center mx-4 mt-4">
            <div className="flex items-center ">
              <span className="inline-block w-4 h-4 mr-2 bg-red-400"></span>{" "}
              College A
            </div>
            <div className="flex items-center ">
              <span className="inline-block w-4 h-4 mr-2 bg-green-400"></span>{" "}
              College B
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 mr-2 bg-yellow-400"></span>{" "}
              College C
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 mr-2 bg-gray-400"></span>{" "}
              College D
            </div>
          </div>
        </div>

        {/* College List Counseling Table */}
        <div className="counseling-table-section w-full md:p-4 md:shadow-xl md:rounded-2xl md:border">
          <h2 className="text-lg font-semibold text-teal-700 mb-4">
            College list counselling Started
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse ">
              <thead className="custom-header-border  ">
                <tr className="bg-gray-50 text-teal-700 ">
                  <th className="border px-4 py-2 border-l-0 border-r-0">
                    College Name
                  </th>
                  <th className="border px-4 py-2 border-l-0 border-r-0">
                    College Type
                  </th>
                  <th className="border px-4 py-2 border-l-0 border-r-0">
                    Course
                  </th>
                  <th className="border px-4 py-2 border-l-0 border-r-0">
                    Round
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Add your dynamic table rows here */}
                <tr>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Example College
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Govt
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    MBBS
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Round 1
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Example College 2
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Private
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    BDS
                  </td>
                  <td className="border px-4 py-2 border-l-0 border-r-0">
                    Round 2
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="md:shadow-xl md:rounded-2xl md:border  mx-auto mt-4">
        <div className=" flex gap-2 items-center p-4 mb-4">
          <img src="assets/img/dashboard/icons/hat.png" />
          <h4 className="text-center text-2xl font-semibold  text-[#097F78]">
            College Verification Status
          </h4>
        </div>

        <SelectColleges
          mccColleges={mccColleges}
          stateColleges={stateColleges}
        />
      </div>

      <div className="mt-4 md:shadow-xl md:border md:rounded-xl">
        <div className=" flex gap-2 items-center p-2">
          <img src="assets/img/dashboard/icons/Document Search.png" />
          <h4 className="text-center text-2xl font-semibold  text-[#097F78]">
            Documents Status
          </h4>
        </div>
        <DocumentUpload
          documentList={documentList}
          uploadedFiles={uploadedFiles}
          handleFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};
export default TrackDetails;
