import { dataApi } from "@/store/api/api";
import React, { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { Modal, Button } from "antd";
import { Switch } from "antd";

const MCCComponents = ({ selectState }) => {
  const [data, setData] = useState([]);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10000);
  const [selectedState, setSelectedState] = useState("");
  const [selectedInstituteType, setSelectedInstituteType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuota, setSelectedQuota] = useState("");

  const [selectedRounds, setSelectedRounds] = useState({
    2021: [],
    2022: [],
    2023: [],
    2024: [],
  });
  const [switches, setSwitches] = useState({
    fees: true,
    feesSession: true,
    beds: true,
    bond: false,
    bondPenalty: false,
  });

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue < endValue) {
      setStartValue(newValue);
    } else {
      setEndValue(newValue);
    }
  };

  useEffect(() => {
    dataApi({
      endPoint: `${import.meta.env.VITE_API_URL}/api/getcutoffdata`,
      params: { global: selectState },
    }).then((res) => {
      setData(res.paginatedResponse);
    });
  }, [selectState]);
  const roundKeys = data.length > 0 ? Object.keys(data[0].Rounds) : [];

  const uniqueStates = data.reduce((acc, curr) => {
    if (!acc.includes(curr.State)) {
      acc.push(curr.State);
    }
    return acc;
  }, []);

  const uniqueInstTypes = data.reduce((acc, curr) => {
    const instType = curr["View More"]["Institute Details"]["Institute Type"];
    if (!acc.includes(instType)) {
      acc.push(instType);
    }
    return acc;
  }, []);

  const uniqueQuotas = data.reduce((acc, curr) => {
    if (!acc.includes(curr.Quota)) {
      acc.push(curr.Quota);
    }
    return acc;
  }, []);

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
    console.log("Selected State:", selectedValue);
  };

  const handleInstituteTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedInstituteType(selectedValue);
    console.log("Selected Institute Type:", selectedValue);
  };

  const handleQuotaChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedQuota(selectedValue);
    console.log("Selected Quota:", selectedValue);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    console.log("Selected Category:", selectedValue);
  };

  const uniqueCategories = data.reduce((acc, curr) => {
    if (!acc.includes(curr.Category)) {
      acc.push(curr.Category);
    }
    return acc;
  }, []);

  useEffect(() => {
    dataApi({
      endPoint: `${import.meta.env.VITE_API_URL}/api/getcutoffdata`,
      params: {
        global: selectState,
        state: selectedState,
      },
    }).then((res) => {
      setData(res.paginatedResponse);
    });
  }, [selectedState]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(selectedYear === year ? null : year);
  };
  const handleRoundToggle = (year, round) => {
    setSelectedRounds((prev) => {
      const newRounds = { ...prev };
      if (newRounds[year].includes(round)) {
        newRounds[year] = newRounds[year].filter((r) => r !== round);
      } else {
        newRounds[year].push(round);
      }
      return newRounds;
    });
  };
  const handleSwitchToggle = (field) => {
    setSwitches((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white p-1">
      <p className="text-center text-black font-semibold text-xl p-4">
        Fill Your Details
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-5 mt-5">
        <select
          className="w-[230px] bg-[#005F59] text-white px-4 text-sm rounded-lg outline-none border-none appearance-none dropdown"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select state</option>
          {uniqueStates.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select className="w-[230px] sm:w-[200px] bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown">
          <option value="">Select Course</option>
        </select>

        <select
          className="w-[230px] sm:w-[200px] bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown"
          value={selectedInstituteType}
          onChange={handleInstituteTypeChange}
        >
          <option value="">Select InstituteType</option>
          {uniqueInstTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="w-[230px] sm:w-[200px] bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown"
          value={selectedQuota}
          onChange={handleQuotaChange}
        >
          <option value="">Select Quota</option>
          {uniqueQuotas.map((quota, index) => (
            <option key={index} value={quota}>
              {quota}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-10 mt-10 p-2">
        <select
          className="w-[230px]  bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="bg-[#005F59] flex gap-2 justify-around items-center text-white h-[42px] rounded-lg p-3 w-auto">
          <p className="text-start text-sm">Select rank range</p>
          <div className="flex items-center space-x-2">
            <div className="shadow-xl bg-[#0e504b] rounded-xl text-center p-1 h-[30px] w-[90px] text-white">
              {startValue}
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              value={startValue < endValue ? startValue : endValue}
              onChange={handleRangeChange}
              className="w-full"
            />
            <div className="shadow-2xl bg-[#0e504b] rounded text-center p-1 h-[30px] text-white">
              {endValue}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-black font-semibold text-xl">Result</p>
      <div className="bg-white m-2 md:rounded-2xl md:border md:p-2 md:drop-shadow-xl ">
        <p
          className="flex items-center gap-3 px-4 justify-end cursor-pointer"
          onClick={showModal}
        >
          Filter <IoFilter size={20} />
        </p>

        <div className="mt-[10px]  overflow-x-auto">
          <table className="min-w-full text-left table-auto">
            <thead className="text-lg text-[#005F59] capitalize custom-header-border ">
              <tr>
                <th className="p-2 border-l-0 border-r-0">SI.No</th>
                <th className="p-2  border-l-0 border-r-0">Institute</th>
                <th className="p-2 border-l-0 border-r-0">State</th>
                <th className="p-2 border-l-0 border-r-0">Category</th>
                {switches.fees && (
                  <th className="p-2 border-l-0 border-r-0">Fee</th>
                )}
                {switches.feesSession && (
                  <th className="p-2 border-l-0 border-r-0">Fee Session</th>
                )}
                {switches.beds && (
                  <th className="p-2 border-l-0 border-r-0">Beds</th>
                )}
                {switches.bond && (
                  <th className="p-2 border-l-0 border-r-0">Bond</th>
                )}
                {switches.bondPenalty && (
                  <th className="p-2 border-l-0 border-r-0">Bond Penalty</th>
                )}
                {Object.keys(selectedRounds).map((year) =>
                  selectedRounds[year].map((round) => (
                    <th
                      key={`${year}_${round}`}
                      className="p-2 border-l-0 border-r-0"
                    >
                      {year} R{round}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="text-md capitalize text-gray-700">
              {data?.map((item, index) => (
                <tr key={index} className="border-[#CDCDCD] mt-2 p-2">
                  <td className="p-2 border-l-0 border-r-0">{index + 1}</td>
                  <td className="p-2 border-l-0 border-r-0">
                    {item["Institute Name"].slice(0, 10)}
                  </td>
                  <td className="p-2 border-l-0 border-r-0">{item.State}</td>
                  <td className="p-2 border-l-0 border-r-0">{item.Category}</td>
                  {switches.fees && (
                    <td className="p-2 border-l-0 border-r-0">
                      {item.Fees || "-"}
                    </td>
                  )}
                  {switches.feesSession && (
                    <td className="p-2 border-l-0 border-r-0">
                      {item["Fee Session"] || "-"}
                    </td>
                  )}
                  {switches.beds && (
                    <td className="p-2 border-l-0 border-r-0">
                      {item.Beds || "-"}
                    </td>
                  )}
                  {switches.bond && (
                    <td className="p-2 border-l-0 border-r-0">
                      {item["View More"]["Bond Details"]["Bond Years"] || "-"}
                    </td>
                  )}
                  {switches.bondPenalty && (
                    <td className="p-2 border-l-0 border-r-0">
                      {item["View More"]["Bond Details"]["Bond Penalty"] || "-"}
                    </td>
                  )}
                  {Object.keys(selectedRounds).map((year) =>
                    selectedRounds[year].map((round) => (
                      <td
                        key={`${year}_${round}`}
                        className="p-2 border-l-0 border-r-0"
                      >
                        {item.Rounds[`Round_${round}_${year}`]?.Data || "-"}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Customize"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1 className="text-base font-semibold">Year & Rounds</h1>
        {[2023, 2022, 2024].map((year) => (
          <div key={year} className="mb-4">
            <p className="font-semibold mb-2">{year}</p>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((round) => (
                <Button
                  key={`${year}_${round}`}
                  onClick={() => handleRoundToggle(year, round)}
                  className={`${
                    selectedRounds[year].includes(round)
                      ? "bg-[#005F59] text-white"
                      : "bg-gray-300"
                  } rounded-md py-2 px-4`}
                >
                  {round}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {/* Switch Buttons */}
        <div className="mt-6">
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-semibold">Fees</p>
            <Switch
              checked={switches.fees}
              onChange={() => handleSwitchToggle("fees")}
              style={{
                backgroundColor: switches.fees ? "#FF9245" : "",
                borderColor: switches.fees ? "#FF9245" : "",
              }}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-semibold">Fees Session</p>
            <Switch
              checked={switches.feesSession}
              onChange={() => handleSwitchToggle("feesSession")}
              style={{
                backgroundColor: switches.feesSession ? "#FF9245" : "",
                borderColor: switches.feesSession ? "#FF9245" : "",
              }}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-semibold">Beds</p>
            <Switch
              checked={switches.beds}
              onChange={() => handleSwitchToggle("beds")}
              style={{
                backgroundColor: switches.beds ? "#FF9245" : "",
                borderColor: switches.beds ? "#FF9245" : "",
              }}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-semibold">Bond</p>
            <Switch
              checked={switches.bond}
              onChange={() => handleSwitchToggle("bond")}
              style={{
                backgroundColor: switches.bond ? "#FF9245" : "",
                borderColor: switches.bond ? "#FF9245" : "",
              }}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-semibold">Bond Penalty</p>
            <Switch
              checked={switches.bondPenalty}
              onChange={() => handleSwitchToggle("bondPenalty")}
              style={{
                backgroundColor: switches.bondPenalty ? "#FF9245" : "",
                borderColor: switches.bondPenalty ? "#FF9245" : "",
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const StateComponents = ({ selectState }) => {
  const [data, setData] = useState([]);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10000);
  const [selectedState, setSelectedState] = useState(selectState || "");
  const [selectedInstituteType, setSelectedInstituteType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuota, setSelectedQuota] = useState("");

  const [selectedRounds, setSelectedRounds] = useState({
    2021: [],
    2022: [],
    2023: [],
    2024: [],
  });
  const [switches, setSwitches] = useState({
    fees: true,
    feesSession: true,
    beds: true,
    bond: true,
    bondPenalty: true,
  });

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue < endValue) {
      setStartValue(newValue);
    } else {
      setEndValue(newValue);
    }
  };

  useEffect(() => {
    dataApi({
      endPoint: `${import.meta.env.VITE_API_URL}/api/getcutoffdata`,
      params: { global: "state", state: selectedState },
    }).then((res) => {
      setData(res.paginatedResponse);
    });
  }, [selectedState]);

  const roundKeys = data.length > 0 ? Object.keys(data[0].Rounds) : [];

  const uniqueStates = data.reduce((acc, curr) => {
    if (!acc.includes(curr.State)) {
      acc.push(curr.State);
    }
    return acc;
  }, []);

  const uniqueInstTypes = data.reduce((acc, curr) => {
    const instType = curr["View More"]["Institute Details"]["Institute Type"];
    if (!acc.includes(instType)) {
      acc.push(instType);
    }
    return acc;
  }, []);

  const uniqueQuotas = data.reduce((acc, curr) => {
    if (!acc.includes(curr.Quota)) {
      acc.push(curr.Quota);
    }
    return acc;
  }, []);

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
    console.log("Selected State:", selectedValue);
  };

  const handleInstituteTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedInstituteType(selectedValue);
    console.log("Selected Institute Type:", selectedValue);
  };

  const handleQuotaChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedQuota(selectedValue);
    console.log("Selected Quota:", selectedValue);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    console.log("Selected Category:", selectedValue);
  };

  const uniqueCategories = data.reduce((acc, curr) => {
    if (!acc.includes(curr.Category)) {
      acc.push(curr.Category);
    }
    return acc;
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleRoundToggle = (year, round) => {
    setSelectedRounds((prev) => {
      const newRounds = { ...prev };
      if (newRounds[year].includes(round)) {
        newRounds[year] = newRounds[year].filter((r) => r !== round);
      } else {
        newRounds[year].push(round);
      }
      return newRounds;
    });
  };

  const handleSwitchToggle = (field) => {
    setSwitches((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white p-1">
      <p className="text-center text-black font-semibold text-xl p-4">
        Fill Your Details (State)
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-5 mt-5">
        <select
          className="w-[200px] bg-[#005F59] text-white px-4 text-sm rounded-lg outline-none border-none appearance-none dropdown"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select state</option>
          {uniqueStates.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className="w-[200px] bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown"
          value={selectedInstituteType}
          onChange={handleInstituteTypeChange}
        >
          <option value="">Select InstituteType</option>
          {uniqueInstTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="w-[200px] bg-[#005F59] text-white text-sm px-4 rounded-lg outline-none border-none appearance-none dropdown"
          value={selectedQuota}
          onChange={handleQuotaChange}
        >
          <option value="">Select Quota</option>
          {uniqueQuotas.map((quota, index) => (
            <option key={index} value={quota}>
              {quota}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-5 mt-5">
        <select
          className="w-[200px]  bg-[#005F59] text-white text-sm rounded-lg outline-none border-none px-4 appearance-none dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="bg-[#005F59] flex gap-2 justify-around items-center text-white h-[42px] rounded-lg px-3 w-[73%]">
          <p className="text-start text-sm">Select rank range</p>
          <div className="flex items-center space-x-2">
            <div className="shadow-xl bg-[#0e504b] rounded-xl text-center p-1 h-[30px] w-[90px] text-white">
              {startValue}
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              value={startValue < endValue ? startValue : endValue}
              onChange={handleRangeChange}
              className=" w-full" /* Apply custom class */
            />
            <div className="shadow-2xl bg-[#0e504b] rounded text-center p-1 h-[30px] text-white">
              {endValue}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-black font-semibold text-xl">Result</p>
      <div className="bg-white m-4 rounded-2xl drop-shadow-xl overflow-x-auto">
        <p
          className="flex items-center gap-3 px-4 justify-end"
          onClick={showModal}
        >
          Filter <IoFilter size={20} />
        </p>

        <div className="mt-[10px] p-4">
          <table className="min-w-full text-left table-auto">
            <thead className="text-lg text-[#005F59] capitalize custom-header-border">
              <tr>
                <th className="p-2">SI.No</th>
                <th className="p-2">Institute</th>
                <th className="p-2">State</th>
                <th className="p-2">Category</th>
                {switches.fees && <th className="p-2">Fee</th>}
                {switches.feesSession && <th className="p-2">Fee Session</th>}
                {switches.beds && <th className="p-2">Beds</th>}
                {switches.bond && <th className="p-2">Bond</th>}
                {switches.bondPenalty && <th className="p-2">Bond Penalty</th>}
                {Object.keys(selectedRounds).map((year) =>
                  selectedRounds[year].map((round) => (
                    <th key={`${year}_${round}`} className="p-2">
                      {year} R{round}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="text-md capitalize">
              {data
                ?.filter(
                  (item) =>
                    item["All India Rank"] >= startValue &&
                    item["All India Rank"] <= endValue &&
                    (!selectedInstituteType ||
                      item["View More"]["Institute Details"][
                        "Institute Type"
                      ] === selectedInstituteType) &&
                    (!selectedQuota || item.Quota === selectedQuota) &&
                    (!selectedCategory || item.Category === selectedCategory)
                )
                .map((item, index) => (
                  <tr
                    key={index}
                    className="border-[#CDCDCD] mt-2 p-2 capitalize"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item["Institute Name"]}</td>
                    <td className="p-2">{item.State}</td>
                    <td className="p-2">{item.Category}</td>
                    {switches.fees && (
                      <td className="p-2">
                        {
                          item["View More"]["Institute Details"][
                            "Institute Fee"
                          ]
                        }
                      </td>
                    )}
                    {switches.feesSession && (
                      <td className="p-2">
                        {
                          item["View More"]["Institute Details"][
                            "Institute Fee per Session"
                          ]
                        }
                      </td>
                    )}
                    {switches.beds && (
                      <td className="p-2">
                        {item["View More"]["Institute Details"]["Total Beds"]}
                      </td>
                    )}
                    {switches.bond && (
                      <td className="p-2">
                        {item["View More"]["Institute Details"]["Bond Details"]}
                      </td>
                    )}
                    {switches.bondPenalty && (
                      <td className="p-2">
                        {item["View More"]["Institute Details"]["Bond Penalty"]}
                      </td>
                    )}
                    {Object.keys(selectedRounds).map((year) =>
                      selectedRounds[year].map((round) => (
                        <td key={`${year}_${round}`} className="p-2">
                          {item.Rounds[year]?.[round]}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Filters"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span>Show Institute Fees</span>
            <Switch
              checked={switches.fees}
              onChange={() => handleSwitchToggle("fees")}
            />
          </div>
          <div className="flex justify-between">
            <span>Show Fees Per Session</span>
            <Switch
              checked={switches.feesSession}
              onChange={() => handleSwitchToggle("feesSession")}
            />
          </div>
          <div className="flex justify-between">
            <span>Show Beds</span>
            <Switch
              checked={switches.beds}
              onChange={() => handleSwitchToggle("beds")}
            />
          </div>
          <div className="flex justify-between">
            <span>Show Bond</span>
            <Switch
              checked={switches.bond}
              onChange={() => handleSwitchToggle("bond")}
            />
          </div>
          <div className="flex justify-between">
            <span>Show Bond Penalty</span>
            <Switch
              checked={switches.bondPenalty}
              onChange={() => handleSwitchToggle("bondPenalty")}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          {roundKeys.map((year) => (
            <div key={year} className="flex flex-col">
              <h4
                className="text-xl font-semibold cursor-pointer"
                onClick={() => handleYearClick(year)}
              >
                {year}
              </h4>
              {selectedYear === year && (
                <div className="flex flex-wrap gap-2">
                  {Object.keys(data[0].Rounds[year]).map((round) => (
                    <button
                      key={round}
                      className={`py-1 px-3 rounded-lg ${
                        selectedRounds[year].includes(round)
                          ? "bg-[#005F59] text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => handleRoundToggle(year, round)}
                    >
                      Round {round}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const CutoffsAllotments = () => {
  const [selectedValue, setSelectedValue] = useState("mcc");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container text-center">
            <h1 className="text-35 font-semibold underline decoration-[#B7804A] underline-offset-8 pb-2">
              Cut-off and Allotments
            </h1>
            <p className="font-semibold text-md text-[#565656]">
              Detailed college lists, college rank, allotment insights,
              round-wise closing ranks,
              <br className="hidden lg:block" /> Category, Quota, and all-India
              or State rank
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4">
            <div className="bg-white rounded-lg flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4 items-center w-full p-4">
              <h1 className="text-2xl font-semibold">
                {selectedValue.toUpperCase()}
              </h1>
              <div className="h-[4px] sm:h-[30px] bg-[#B7804A] w-[30px] sm:w-[4px] rounded"></div>
              <p className="text-center sm:text-left">
                Access round-wise seat allotment data & trends based on Rank,
                different categories & Rounds
              </p>
              <select
                className="h-[40px] w-[100px] md:w-[110px] rounded-3xl outline-none border-none text-white text-sm bg-[#005F59] px-4 appearance-none ml-auto dropdown"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="mcc">MCC</option>
                <option value="state">State</option>
              </select>
            </div>
          </div>
        </div>
        {selectedValue === "mcc" ? (
          <MCCComponents selectState={selectedValue} />
        ) : (
          <StateComponents selectState={selectedValue} />
        )}
      </div>
    </div>
  );
};

export default CutoffsAllotments;
