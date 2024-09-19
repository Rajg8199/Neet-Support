import React, { useState } from "react";
import EligibleCandidate from "./MeritList/EligibleCandidate";
import ReligiousMinority from "./MeritList/ReligionMinority";
import LinguisticMinorityChart from "./MeritList/LinguisticMinority";
import ClauseChart from "./MeritList/ClauseChart";
import CategoryChart from "./MeritList/CategoryClause";
import RangeDiffer from "./MeritList/RangeDiffer";

function MeritList() {
  const [year, setYear] = useState("2024");
  const [state, setState] = useState("Karnataka");

  const statesOfIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
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
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container mx-auto  px-4 md:px-0">
            <h1 className="text-2xl sm:text-3xl font-semibold pl-2 sm:pl-4 ">
              Merit List
            </h1>
            <p className="text-gray-600 pl-2 sm:pl-4 pb-4 text-sm sm:text-base">
              Evaluating merit lists containing data about applied and
              participating candidates
            </p>

            {/* Global Selection for Year and State */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 my-2 bg-white p-4 rounded-2xl shadow-lg">
              <select
                className="p-2 border border-gray-300 rounded-2xl bg-[#167872] text-white w-full md:w-[150px] appearance-none dropdown px-4"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {statesOfIndia.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>

              <select
                className="p-2 border border-gray-300 rounded-2xl bg-[#167872] text-white w-full md:w-[120px] appearance-none dropdown px-4"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            {/* Pass Global State and Year as Props */}
            <div className="mt-6">
              <EligibleCandidate year={year} state={state} />
            </div>
            <div className="mt-6">
              <RangeDiffer year={year} state={state} />
            </div>
            <div className="mt-10">
              <ReligiousMinority year={year} state={state} />
            </div>

            <div className="mt-10">
              <LinguisticMinorityChart year={year} state={state} />
            </div>

            <div className="mt-10">
              <ClauseChart year={year} state={state} />
            </div>

            <div className="mt-10">
              <CategoryChart year={year} state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeritList;
