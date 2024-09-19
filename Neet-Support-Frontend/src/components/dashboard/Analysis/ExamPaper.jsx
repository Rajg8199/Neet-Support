import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExamPaper = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [viewType, setViewType] = useState("Graphical");
  const [selectedSection, setSelectedSection] = useState("Overall");

  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiurl}/api/fetchExamDetails`).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const availableYears = Object.keys(data.data[0].yearData);

  const subjects = data.data[0].yearData[selectedYear].subjects;

  const subjectData = subjects.find(
    (subject) => subject.subjectName === selectedSubject
  );

  // Group topics by the same name for both sections
  const graphicalData = subjectData.sections.reduce((acc, section) => {
    section.topics.forEach((topic) => {
      if (topic.Topics !== "Total") {
        const existingTopic = acc.find((item) => item.topic === topic.Topics);
        if (existingTopic) {
          existingTopic[`${section.sectionName}_Easy`] = topic.Easy;
          existingTopic[`${section.sectionName}_Medium`] = topic.Medium;
          existingTopic[`${section.sectionName}_Hard`] = topic.Hard;
          existingTopic[`${section.sectionName}_Total`] = topic.Total;
        } else {
          acc.push({
            topic: topic.Topics,
            [`${section.sectionName}_Easy`]: topic.Easy,
            [`${section.sectionName}_Medium`]: topic.Medium,
            [`${section.sectionName}_Hard`]: topic.Hard,
            [`${section.sectionName}_Total`]: topic.Total,
          });
        }
      }
    });
    return acc;
  }, []);

  // Filter the data based on section
  const filteredData =
    selectedSection === "Overall" ? graphicalData : graphicalData;

  // Render graphical view of the data
  const renderGraphicalView = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={filteredData} barCategoryGap="20%"> {/* Adjust gap here */}
        <XAxis dataKey="topic" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedSection === "Overall" ? (
          <>
            <Bar
              dataKey="Section A_Easy"
              fill="rgba(9, 127, 120, 1)"  // Primary orange
              name="Section A Easy"
              barSize={20}
            />
            <Bar
              dataKey="Section A_Medium"
              fill="rgba(9, 127, 120, 0.8)"  // Warm amber
              name="Section A Medium"
              barSize={20}
            />
            <Bar
              dataKey="Section A_Hard"
              fill="rgba(9, 127, 120, 0.6)"  // Muted yellow
              name="Section A Hard"
              barSize={20}
            />
            <Bar
              dataKey="Section B_Easy"
              fill="rgba(9, 127, 120, 1)"  // Repeating primary orange for consistency
              name="Section B Easy"
              barSize={20}
            />
            <Bar
              dataKey="Section B_Medium"
              fill="rgba(9, 127, 120, 0.8)"  // Repeating warm amber for consistency
              name="Section B Medium"
              barSize={20}
            />
            <Bar
              dataKey="Section B_Hard"
              fill="rgba(9, 127, 120, 0.6)"  // Repeating muted yellow for consistency
              name="Section B Hard"
              barSize={20}
            />
          </>
        ) : (
          <>
            <Bar
              dataKey={`${selectedSection}_Easy`}
              fill="rgba(9, 127, 120, 1)"  // Primary orange for Easy
              name={`${selectedSection} Easy`}
              barSize={20}
            />
            <Bar
              dataKey={`${selectedSection}_Medium`}
              fill="rgba(9, 127, 120, 0.8)"  // Warm amber for Medium
              name={`${selectedSection} Medium`}
              barSize={20}
            />
            <Bar
              dataKey={`${selectedSection}_Hard`}
              fill="rgba(9, 127, 120, 0.6)"  // Muted yellow for Hard
              name={`${selectedSection} Hard`}
              barSize={20}
            />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );


  // Render tabular view of the data
  const renderTabularView = () => {
    // Calculate totals for Section A
    const totalSectionA = {
      easy: filteredData.reduce(
        (acc, row) => acc + (row["Section A_Easy"] || 0),
        0
      ),
      medium: filteredData.reduce(
        (acc, row) => acc + (row["Section A_Medium"] || 0),
        0
      ),
      hard: filteredData.reduce(
        (acc, row) => acc + (row["Section A_Hard"] || 0),
        0
      ),
      total: filteredData.reduce(
        (acc, row) => acc + (row["Section A_Total"] || 0),
        0
      ),
    };

    // Calculate totals for Section B
    const totalSectionB = {
      easy: filteredData.reduce(
        (acc, row) => acc + (row["Section B_Easy"] || 0),
        0
      ),
      medium: filteredData.reduce(
        (acc, row) => acc + (row["Section B_Medium"] || 0),
        0
      ),
      hard: filteredData.reduce(
        (acc, row) => acc + (row["Section B_Hard"] || 0),
        0
      ),
      total: filteredData.reduce(
        (acc, row) => acc + (row["Section B_Total"] || 0),
        0
      ),
    };

    return (
      <div className="">
        {/* Section A Table */}
        <h2 className="text-lg font-bold  mb-2">Section A</h2>
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full bg-white border ">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Topic</th>
                <th className="px-4 py-2 border">Easy</th>
                <th className="px-4 py-2 border">Medium</th>
                <th className="px-4 py-2 border">Hard</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{row.topic}</td>
                  <td className="px-4 py-2 border">{row["Section A_Easy"]}</td>
                  <td className="px-4 py-2 border">
                    {row["Section A_Medium"]}
                  </td>
                  <td className="px-4 py-2 border">{row["Section A_Hard"]}</td>
                  <td className="px-4 py-2 border">{row["Section A_Total"]}</td>
                </tr>
              ))}
              {/* Total Row for Section A */}
              <tr className="font-bold bg-gray-100">
                <td className="px-4 py-2 border">Total</td>
                <td className="px-4 py-2 border">{totalSectionA.easy}</td>
                <td className="px-4 py-2 border">{totalSectionA.medium}</td>
                <td className="px-4 py-2 border">{totalSectionA.hard}</td>
                <td className="px-4 py-2 border">{totalSectionA.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section B Table */}
        <h2 className="text-lg font-bold mt-4 mb-2">Section B</h2>
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full bg-white border ">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Topic</th>
                <th className="px-4 py-2 border">Easy</th>
                <th className="px-4 py-2 border">Medium</th>
                <th className="px-4 py-2 border">Hard</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{row.topic}</td>
                  <td className="px-4 py-2 border">{row["Section B_Easy"]}</td>
                  <td className="px-4 py-2 border">
                    {row["Section B_Medium"]}
                  </td>
                  <td className="px-4 py-2 border">{row["Section B_Hard"]}</td>
                  <td className="px-4 py-2 border">{row["Section B_Total"]}</td>
                </tr>
              ))}
              {/* Total Row for Section B */}
              <tr className="font-bold bg-gray-100">
                <td className="px-4 py-2 border">Total</td>
                <td className="px-4 py-2 border">{totalSectionB.easy}</td>
                <td className="px-4 py-2 border">{totalSectionB.medium}</td>
                <td className="px-4 py-2 border">{totalSectionB.hard}</td>
                <td className="px-4 py-2 border">{totalSectionB.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSectionalAnalysis = () => (
    <div className="bg-white mx-auto py-6 rounded-lg px-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Analyze the question difficulty and distribution by chapters in{" "}
        {selectedSubject}
      </h2>
      <div className="flex space-x-4 mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            value="Overall"
            checked={selectedSection === "Overall"}
            onChange={() => setSelectedSection("Overall")}
            className="mr-2"
          />
          <span className="text-gray-600">Overall (Section A & Section B)</span>
        </label>
        {subjectData.sections.map((section, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={section.sectionName}
              checked={selectedSection === section.sectionName}
              onChange={() => setSelectedSection(section.sectionName)}
              className="mr-2"
            />
            <span className="text-gray-600">{section.sectionName}</span>
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={800}>
        <BarChart
          layout="vertical"
          data={filteredData}
          margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
        >
          <XAxis
            type="number"
            tick={{
              fontSize: 12, // Adjust font size
            }}
          />
          <YAxis
            type="category"
            dataKey="topic"
            tick={{
              angle: 60, // Keep labels horizontal
              textAnchor: "end", // Center align the labels
              fontSize: 12, // Adjust the font size
            }}
            tickLine={false} // Optional: Hide the tick lines
          />
          <Tooltip />
          <Legend />
          {selectedSection === "Overall" ? (
            <>
              <Bar
                dataKey="Section A_Easy"
                fill="rgba(9, 127, 120, 1)"  // Main color
                name="Section A Easy"
                barSize={20}
              />
              <Bar
                dataKey="Section A_Medium"
                fill="rgba(9, 127, 120, 0.8)"  // Slightly lighter shade
                name="Section A Medium"
                barSize={20}
              />
              <Bar
                dataKey="Section A_Hard"
                fill="rgba(9, 127, 120, 0.6)"  // Lightest shade
                name="Section A Hard"
                barSize={20}
              />
              <Bar
                dataKey="Section B_Easy"
                fill="rgba(9, 127, 120, 1)"  // Same main color for Section B
                name="Section B Easy"
                barSize={20}
              />
              <Bar
                dataKey="Section B_Medium"
                fill="rgba(9, 127, 120, 0.8)"  // Lighter shade for Section B
                name="Section B Medium"
                barSize={20}
              />
              <Bar
                dataKey="Section B_Hard"
                fill="rgba(9, 127, 120, 0.6)"  // Lightest shade for Section B
                name="Section B Hard"
                barSize={20}
              />
            </>
          ) : (
            <>
              <Bar
                dataKey={`${selectedSection}_Easy`}
                fill="rgba(9, 127, 120, 1)"  // Main color
                name={`${selectedSection} Easy`}
                barSize={20}
              />
              <Bar
                dataKey={`${selectedSection}_Medium`}
                fill="rgba(9, 127, 120, 0.8)"  // Medium shade
                name={`${selectedSection} Medium`}
                barSize={20}
              />
              <Bar
                dataKey={`${selectedSection}_Hard`}
                fill="rgba(9, 127, 120, 0.8)"  // Lightest shade
                name={`${selectedSection} Hard`}
                barSize={20}
              />
            </>
          )}
        </BarChart>

      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="">
            <h1 className="text-35 font-semibold text-gray-700">
              NEET UG 2024 Exam Analysis
            </h1>
            <p className="text-gray-600">
              Explore the subject difficulty for NEET UG 2023. View the section—
              and topic-wise distribution of questions in the past five NEET UG
              papers.
            </p>
          </div>
          <div className="bg-white container mx-auto  py-8 rounded-xl shadow-lg">
            <div className="border-b border-gray-300 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                {/* Subjects buttons */}
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.subjectName}
                      className={`px-4 py-2 text-base md:text-lg font-semibold bg-white rounded-t-xl shadow-md  ${selectedSubject === subject.subjectName
                        ? "border-b-4 border-blue-600 text-[#097F78]"
                        : "text-gray-500 hover:text-[#FF9245]"
                        }`}
                      onClick={() => setSelectedSubject(subject.subjectName)}
                    >
                      {subject.subjectName}
                    </button>
                  ))}
                </div>

                {/* Year dropdown aligned to the right on larger screens */}
                <div className="w-full sm:w-auto  sm:mt-2">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-[120px] px-4 py-2 border bg-[#005f59] rounded-3xl text-white appearance-none dropdown"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div>
                <h2 className="text-lg font-bold pl-4 text-gray-700">
                  Visualizing question difficulty and distribution by sections
                  in {selectedSubject}
                </h2>
              </div>

              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 text-lg font-semibold transition ${viewType === "Graphical"
                    ? "border-b-4 border-blue-600 text-[#097F78]"
                    : "text-gray-500 hover:text-[#FF9245]"
                    }`}
                  onClick={() => setViewType("Graphical")}
                >
                  Graphical View
                </button>
                <button
                  className={`px-4 py-2 text-lg font-semibold transition ${viewType === "Tabular"
                    ? "border-b-4 border-blue-600 text-[#097F78]"
                    : "text-gray-500 hover:text-[#FF9245]"
                    }`}
                  onClick={() => setViewType("Tabular")}
                >
                  Tabular View
                </button>
              </div>
            </div>

            <div>
              {viewType === "Graphical"
                ? renderGraphicalView()
                : renderTabularView()}
            </div>
            {viewType !== "Tabular" && (
              <div className="mt-8">{renderSectionalAnalysis()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPaper;

