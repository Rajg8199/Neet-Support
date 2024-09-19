// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const statesOfIndia = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Delhi",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
// ];

// const SeatIntake = () => {
//   const [globalParam, setGlobalParam] = useState("mcc");
//   const [state, setState] = useState("Uttar Pradesh");
//   const [mcc, setMcc] = useState("");
//   const [course, setCourse] = useState("");
//   const [instituteType, setInstituteType] = useState("");
//   const [seatType, setSeatType] = useState("");
//   const [category, setCategory] = useState("");
//   const [quota, setQuota] = useState("");
//   const [data, setData] = useState([]);
//   const [filters, setFilters] = useState({
//     courses: [],
//     instituteTypes: [],
//     seatTypes: [],
//     categories: [],
//     quotas: [],
//   });
//   const [search, setSearch] = useState("");
//   const [institutes, setInstitutes] = useState([]);

//   const apurl = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetchFilters();
//   }, [globalParam, state]);

//   useEffect(() => {
//     fetchData();
//   }, [
//     globalParam,
//     state,
//     mcc,
//     course,
//     instituteType,
//     seatType,
//     category,
//     quota,
//   ]);

//   const fetchFilters = async () => {
//     try {
//       const params = {
//         global: globalParam,
//         ...(globalParam === "state" && { state }),
//         ...(globalParam === "mcc" && { state }),
//       };
//       console.log("Fetching filters with params:", params); // Debugging log
//       const response = await axios.get(
//         `${apurl}/api/fetchInstituteFeeSheetMatrix`,
//         { params }
//       );

//       const rawData = response.data.data;
//       const courses = [...new Set(rawData.map((item) => item.Course))];
//       const instituteTypes = [
//         ...new Set(rawData.map((item) => item["Institute Type"])),
//       ];
//       const seatTypes = [...new Set(rawData.map((item) => item.Quota))];
//       const categories = [...new Set(rawData.map((item) => item.Category))];
//       const quotas = [...new Set(rawData.map((item) => item.Quota))];
//       const uniqueInstitutes = [...new Set(rawData.map(item => item["Institute & Institute Type"]))];

//       setInstitutes(uniqueInstitutes);

//       setFilters({ courses, instituteTypes, seatTypes, categories, quotas });
//     } catch (error) {
//       console.error("Error fetching filters:", error.message);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const params = {
//         global: globalParam,
//         ...(globalParam === "state" && { state }),
//         ...(globalParam === "mcc" && { state, mcc }),
//         ...(course && { course }),
//         ...(instituteType && { instituteType }),
//         ...(seatType && { seatType }),
//         ...(category && { category }),
//         ...(quota && { quota }),
//       };

//       console.log("Fetching data with params:", params); // Debugging log

//       const response = await axios.get(
//         `${apurl}/api/fetchInstituteFeeSheetMatrix`,
//         { params }
//       );
//       console.log("Data fetched:", response.data); // Debugging log

//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     }
//   };

//   return (
// <div className="p-2">
//   <div className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-4">
//     <h1 className={`text-2xl font-medium ${globalParam === "state" ? "text-black" : "text-black"}`}>
//       {globalParam === "state" ? "State" : "MCC"}
//     </h1>
//     <div className="h-[30px] bg-[#B7804A] w-[4px] rounded hidden md:block"></div>
//     <p className="text-gray-600 font-medium">
//       Round-wise updates with the latest seat intakes of medical colleges
//     </p>
//     <select
//       value={globalParam}
//       onChange={(e) => setGlobalParam(e.target.value)}
//       className="border border-gray-300 rounded-3xl w-[100px] bg-[#005F59] text-white text-sm ml-auto px-4 mt-3 md:mt-0 appearance-none dropdown"
//     >
//       <option value="state">State</option>
//       <option value="mcc">MCC</option>
//     </select>
//   </div>

//   <h3 className="text-center text-black font-bold text-xl p-4 md:p-10">Fill Your Details</h3>

//   <div className="flex flex-wrap justify-center items-center gap-4 mb-5 mt-5 ">
//     {globalParam === "state" && (
//       <>
//         <select
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           {statesOfIndia.map((state, index) => (
//             <option key={index} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//         <select
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Course</option>
//           {filters.courses.map((course, index) => (
//             <option key={index} value={course}>
//               {course}
//             </option>
//           ))}
//         </select>
//         <select
//           value={instituteType}
//           onChange={(e) => setInstituteType(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Institute Type</option>
//           {filters.instituteTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Category</option>
//           {filters.categories.map((cat, index) => (
//             <option key={index} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </>
//     )}

//     {globalParam === "mcc" && (
//       <>
//         <select
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px]  px-4 appearance-none dropdown"
//         >
//           <option value="">Select State</option>
//           {statesOfIndia.map((state, index) => (
//             <option key={index} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//         <select
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Course</option>
//           {filters.courses.map((course, index) => (
//             <option key={index} value={course}>
//               {course}
//             </option>
//           ))}
//         </select>
//         <select
//           value={instituteType}
//           onChange={(e) => setInstituteType(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Institute Type</option>
//           {filters.instituteTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//         <select
//           value={quota}
//           onChange={(e) => setQuota(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Quota</option>
//           {filters.quotas.map((quota, index) => (
//             <option key={index} value={quota}>
//               {quota}
//             </option>
//           ))}
//         </select>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[230px] px-4 appearance-none dropdown"
//         >
//           <option value="">Select Category</option>
//           {filters.categories.map((cat, index) => (
//             <option key={index} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </>
//     )}
//   </div>

//   <h3 className="text-center text-black font-bold text-xl p-4 md:p-10">Result</h3>

//   <div className="border rounded-2xl shadow-xl p-4">
//     <div className="overflow-x-auto">
//       <div className="flex justify-between items-center">
//         <h3>
//           <span className="font-semibold">Showing </span>
//           {data.filter((item) => item["Institute & Institute Type"].toLowerCase().includes(search.toLowerCase())).length} Records
//         </h3>
//         <select
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-gray-300 rounded-3xl p-2 w-full md:w-[28%] bg-[#005F59] text-white text-sm mb-4 px-4 appearance-none dropdown"
//         >
//           <option value="">Select Institute</option>
//           {institutes.map((institute, index) => (
//             <option key={index} value={institute}>
//               {institute}
//             </option>
//           ))}
//         </select>
//       </div>
//       <table className="w-full table-auto border-collapse">
//         <thead className="bg-gray-100 text-md text-[#004959] custom-header-border">
//           <tr>
//             <th className="p-2 border-b">S.No</th>
//             <th className="p-2 border-b">Institute & Institute Type</th>
//             <th className="p-2 border-b">Course</th>
//             <th className="p-2 border-b">Seat Type</th>
//             <th className="p-2 border-b">Category</th>
//             <th className="p-2 border-b">2023 Fees</th>
//             <th className="p-2 border-b">2023 R1</th>
//             <th className="p-2 border-b">2023 R2</th>
//             <th className="p-2 border-b">2023 R3</th>
//             <th className="p-2 border-b">2023 R4</th>
//             <th className="p-2 border-b">2023 R5</th>
//           </tr>
//         </thead>
//         <tbody className="text-md text-gray-700">
//           {data
//             .filter((item) =>
//               item["Institute & Institute Type"]
//                 .toLowerCase()
//                 .includes(search.toLowerCase())
//             )
//             .map((item, index) => (
//               <tr key={item._id} className="border-b mt-2 py-2">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">
//                   {item["Institute & Institute Type"]}
//                   <br />
//                   <span className="text-gray-500 text-xs">{item["Institute Type"]}</span>
//                 </td>
//                 <td className="p-2">{item.Course}</td>
//                 <td className="p-2">{item.Quota}</td>
//                 <td className="p-2">{item.Category}</td>
//                 <td className="p-2">{item["2023 Fees"]}</td>
//                 <td className="p-2">{item["2023 R1"]}</td>
//                 <td className="p-2">{item["2023 R2"]}</td>
//                 <td className="p-2">{item["2023 R3"]}</td>
//                 <td className="p-2">{item["2023 R4"]}</td>
//                 <td className="p-2">{item["2023 R5"]}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//   );
// };

// export default SeatIntake;

import React, { useState, useEffect } from "react";
import axios from "axios";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const SeatIntake = () => {
  const [globalParam, setGlobalParam] = useState("mcc");
  const [state, setState] = useState("Uttar Pradesh");
  const [mcc, setMcc] = useState("");
  const [course, setCourse] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [seatType, setSeatType] = useState("");
  const [category, setCategory] = useState("");
  const [quota, setQuota] = useState("");
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    courses: [],
    instituteTypes: [],
    seatTypes: [],
    categories: [],
    quotas: [],
  });
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState([]);

  const apurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFilters();
  }, [globalParam, state]);

  useEffect(() => {
    fetchData();
  }, [
    globalParam,
    state,
    mcc,
    course,
    instituteType,
    seatType,
    category,
    quota,
  ]);

  const fetchFilters = async () => {
    try {
      const params = {
        global: globalParam,
        ...(globalParam === "state" && { state }),
        ...(globalParam === "mcc" && { state }),
      };
      const response = await axios.get(
        `${apurl}/api/fetchInstituteFeeSheetMatrix`,
        { params }
      );

      const rawData = response.data.data;
      const courses = [...new Set(rawData.map((item) => item.Course))];
      const instituteTypes = [
        ...new Set(rawData.map((item) => item["Institute Type"])),
      ];
      const seatTypes = [...new Set(rawData.map((item) => item.Quota))];
      const categories = [...new Set(rawData.map((item) => item.Category))];
      const quotas = [...new Set(rawData.map((item) => item.Quota))];
      const uniqueInstitutes = [
        ...new Set(rawData.map((item) => item["Institute & Institute Type"])),
      ];

      setInstitutes(uniqueInstitutes);

      setFilters({ courses, instituteTypes, seatTypes, categories, quotas });
    } catch (error) {
      console.error("Error fetching filters:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const params = {
        global: globalParam,
        ...(globalParam === "state" && { state }),
        ...(globalParam === "mcc" && { state, mcc }),
        ...(course && { course }),
        ...(instituteType && { instituteType }),
        ...(seatType && { seatType }),
        ...(category && { category }),
        ...(quota && { quota }),
      };

      const response = await axios.get(
        `${apurl}/api/fetchInstituteFeeSheetMatrix`,
        { params }
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className="p-0 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-4">
        <h1
          className={`text-2xl md:text-3xl font-semibold ${
            globalParam === "state" ? "text-black" : "text-black"
          }`}
        >
          {globalParam === "state" ? "State" : "MCC"}
        </h1>
        <div className="h-[30px] bg-[#B7804A] w-[4px] rounded hidden md:block"></div>
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Round-wise updates with the latest seat intakes of medical colleges
        </p>
        <select
          value={globalParam}
          onChange={(e) => setGlobalParam(e.target.value)}
          className="border border-gray-300 rounded-3xl w-full md:w-[120px] bg-[#005F59] text-white text-sm ml-auto  mt-3 md:mt-0 px-4 appearance-none dropdown"
        >
          <option value="state">State</option>
          <option value="mcc">MCC</option>
        </select>
      </div>

      <h3 className="text-center text-black font-bold text-lg md:text-xl p-4 md:p-10">
        Fill Your Details
      </h3>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-5 mt-5">
        {globalParam === "state" && (
          <>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              {statesOfIndia.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Course</option>
              {filters.courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Institute Type</option>
              {filters.instituteTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Category</option>
              {filters.categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </>
        )}

        {globalParam === "mcc" && (
          <>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select State</option>
              {statesOfIndia.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Course</option>
              {filters.courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Institute Type</option>
              {filters.instituteTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Quota</option>
              {filters.quotas.map((quota, index) => (
                <option key={index} value={quota}>
                  {quota}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg bg-[#005F59] text-white text-sm w-[200px] md:w-[230px] px-4 appearance-none dropdown"
            >
              <option value="">Select Category</option>
              {filters.categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Result Section */}
      <h3 className="text-center text-black font-bold text-lg md:text-xl p-4 md:p-10">
        Result
      </h3>

      {/* Data Table */}
      <div className="md:border md:rounded-2xl md:shadow-xl shadow-none md:p-3">
        <div className="flex justify-between items-center">
          <h3>
            <span className="font-semibold">Showing </span>
            {
              data.filter((item) =>
                item["Institute & Institute Type"]
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ).length
            }{" "}
            Records
          </h3>
          <select
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-3xl p-2 w-full md:w-[28%] bg-[#005F59] text-white text-sm mb-2 px-4 appearance-none dropdown"
          >
            <option value="">Select Institute</option>
            {institutes.map((institute, index) => (
              <option key={index} value={institute}>
                {institute}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-md text-[#004959] custom-header-border ">
              <tr>
                <th className="p-2 border-l-0 border-r-0">S.No</th>
                <th className="p-2 border-l-0 border-r-0">
                  Institute & Institute Type
                </th>
                <th className="p-2 border-l-0 border-r-0">Course</th>
                <th className="p-2 border-l-0 border-r-0">Seat Type</th>
                <th className="p-2 border-l-0 border-r-0">Category</th>
                <th className="p-2 border-l-0 border-r-0">2023 Fees</th>
                <th className="p-2 border-l-0 border-r-0">2023 R1</th>
                <th className="p-2 border-l-0 border-r-0">2023 R2</th>
                <th className="p-2 border-l-0 border-r-0">2023 R3</th>
                <th className="p-2 border-l-0 border-r-0">2023 R5</th>
                <th className="p-2 border-l-0 border-r-0">2023 R4</th>
              </tr>
            </thead>
            <tbody className="text-md text-gray-700">
              {data
                .filter((item) =>
                  item["Institute & Institute Type"]
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={item._id} className="border-b mt-2 py-2">
                    <td className="p-2 border-l-0 border-r-0">{index + 1}</td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["Institute & Institute Type"]}
                      <br />
                      <span className="text-gray-500 text-xs"></span>
                      {item["Institute Type"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">{item.Course}</td>
                    <td className="p-2 border-l-0 border-r-0">{item.Quota}</td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item.Category}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 Fees"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 R1"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 R2"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 R3"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 R4"]}
                    </td>
                    <td className="p-2 border-l-0 border-r-0">
                      {item["2023 R5"]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeatIntake;
