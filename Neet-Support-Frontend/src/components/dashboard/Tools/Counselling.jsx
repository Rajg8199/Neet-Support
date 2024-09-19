import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { toast } from "react-toastify";
import { dataApi } from "@/store/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const CollegeCard = ({ isSelected, onSelect, item, onOpenModal }) => {
  return (
    <div
      className={` relative text-white flex flex-col m-auto  justify-evenly items-center p-1 w-full max-w-xs md:h-[320px] sm:h-[400px]  rounded-3xl bg-[#005F59] border ${
        isSelected ? "border-[#FF9245] border-[3px] shadow-md" : ""
      }`}
    >
      <input
        type="checkbox"
        className="checkbox-medium absolute top-2 left-3 accent-[#FF9245] "
        checked={isSelected}
        onChange={onSelect}
      />

      <img
        crossOrigin="anonymous"
        src={item.logo}
        className="m-auto w-[60px] h-[60px] mt-4 rounded-3xl"
        alt="Logo"
      />
      <br />
      {/* Heading with support for displaying up to three lines */}
      <h1 className="text-lg text-center text-white line-clamp-2  overflow-hidden max-h-[72px]">
        {item.Counselling}
      </h1>
      <p className="text-center p-3">{item.State}</p>
      <div className="flex justify-between items-center p-2">
        <p className="text-xs font-semibold text-[#FFA667]">
          State Type:{" "}
          <span className="text-white text-xs">{item.StateType}</span>
        </p>
        <p className="text-xs font-semibold text-[#FFA667]">
          Counselling Type:{" "}
          <span className="text-white text-xs">
            {item.CounsellingType === "Medical Counselling Committee"
              ? "MCC"
              : item.CounsellingType}
          </span>
        </p>
      </div>
      <div className="p-2 bottom-2 w-full flex flex-col sm:flex-row justify-evenly items-center gap-2 sm:gap-1">
        <a
          href={item.Website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
        >
          Official Website
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2"
            style={{ fontSize: "12px" }}
          />
        </a>
        <div
          className="flex items-center border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
          onClick={() => toast.success("Coming soon ....")}
        >
          Coming soon ....
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2"
            style={{ fontSize: "12px" }}
          />
        </div>
        <div
          className="flex items-center border rounded-3xl text-xs cursor-pointer border-white py-2 px-10 text-white"
          onClick={() => onOpenModal(item)}
        >
          Know More
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2"
            style={{ fontSize: "12px" }}
          />
        </div>
      </div>
    </div>
  );
};

const MCCComponent = ({ item }) => {
  const [counsellingType, setCounsellingType] = useState("");
  const [stateType, setStateType] = useState("");
  const [state, setState] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dataApi({
      endPoint: `${apiUrl}/api/getCommitteeDetails`,
      params: { global: "state" },
    }).then((res) => {
      setData(res.data);
      setSelectedCards(Array(res.data.length).fill(false));
    });
  }, []);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedCards(Array(data.length).fill(newSelectAll));
  };

  const handleSelectCard = (index) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[index] = !newSelectedCards[index];
    setSelectedCards(newSelectedCards);
    setSelectAll(newSelectedCards.every((selected) => selected));
  };

  const handleOpenModal = (item) => {
    setModalContent(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent({});
  };

  useEffect(() => {
    dataApi({
      endPoint: `${apiUrl}/api/getCommitteeDetails`,
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    dataApi({
      endPoint: `${apiUrl}/api/getCommitteeDetails`,
      params: { counsellingType: counsellingType },
    }).then((res) => {
      setData(res.data);
    });
  }, [counsellingType]);

  useEffect(() => {
    dataApi({
      endPoint: `${apiUrl}/api/getCommitteeDetails`,
      params: { counsellingType: counsellingType, stateType: stateType },
    }).then((res) => {
      setData(res.data);
    });
  }, [stateType]);

  useEffect(() => {
    dataApi({
      endPoint: `${apiUrl}/api/getCommitteeDetails`,
      params: {
        counsellingType: counsellingType,
        stateType: stateType,
        state: state,
      },
    }).then((res) => {
      setData(res.data);
    });
  }, [state]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.Counselling.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 m-2">
      <div className="flex gap-4 align-items-center flex-col sm:flex-row p-4">
        <h1 className="text-24 font-medium">Admission Committee </h1>
        <div className="h-[4px] sm:h-[30px] bg-[#B7804A] w-[30px] sm:w-[4px] rounded"></div>
        <p className="font-medium">
          Important particulars of medical institutes falling under desired
          universities
        </p>
      </div>
      <div className="  flex border-[#B7804A] border-b-2 justify-around flex-wrap gap-2 py-4">
        <select
          className="p-2 h-[45px] border w-[250px] bg-[#005F59] text-white rounded-xl appearance-none dropdown"
          value={counsellingType}
          onChange={(e) => setCounsellingType(e.target.value)}
        >
          <option>Select Counselling Type</option>
          <option value="MCC">MCC</option>
          <option value="State">State</option>
        </select>
        <select
          id="stateType"
          className="p-2 h-[45px] border w-[250px] bg-[#005F59] text-white rounded-xl appearance-none dropdown"
          value={stateType}
          onChange={(e) => setStateType(e.target.value)}
        >
          <option value="Open State">Open State</option>
          <option value="Closed State">Closed State</option>
          <option value="All Over India">All Over India</option>
        </select>
        <select
          id="state"
          className="p-2 h-[45px] border w-[250px] bg-[#005F59] text-white rounded-xl appearance-none dropdown"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {data.map((item, index) => (
            <option key={index} value={item.state}>
              {item.State}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between gap-2 p-2 px-30">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="checkbox-medium accent-[#ff9245] text-white"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <p className="font-semibold">Select All</p>
        </div>
        <input
          type="text"
          className="bg-[#005F59] mt-2 rounded-3xl w-full md:w-1/2 lg:w-1/4 text-white px-4 py-2 placeholder-white"
          placeholder="Search by Counselling Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-3 ">
        {filteredData?.map((item, index) => (
          <CollegeCard
            item={item}
            key={index}
            isSelected={selectedCards[index]}
            onSelect={() => handleSelectCard(index)}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      <Modal visible={modalVisible} onCancel={handleCloseModal} footer={null}>
        <h1 className="text-lg text-center font-semibold capitalize">
          {modalContent.Counselling} <br />,{modalContent.State}
        </h1>
        <div>
          <p>
            <span>State Type:</span> {modalContent.StateType}
          </p>
          <p>
            <strong>Counselling Type:</strong> {modalContent.CounsellingType}
          </p>
          <p className="text-blue-500">
            <strong className="text-black">PDF:</strong>{" "}
            <a href={`${modalContent.Prospects}`} target="_blank">
              Click to go
            </a>
          </p>
          <div className="text-center text-2xl text-gray-300 bg-[#f2f2f2] p-3 mt-2 shadow rounded-md h-[300px]">
            PDF
          </div>
        </div>
      </Modal>
      <button className="button -sm -orange-1 text-white p-4 rounded-3xl mx-10 my-2 ">
        Save Details
      </button>
    </div>
  );
};

const Counselling = () => {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-10 -mb-6">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-35 font-semibold underline decoration-[#B7804A] underline-offset-[12px] pb-2">
                Admission Committee
              </h1>
              <p className="text-[#565656] font-bold">
                Learn about all the colleges under different institute types.
                Access college-specific <br /> important counselling links &
                resources
              </p>
            </div>

            <MCCComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counselling;
