import React, { useEffect, useState, useRef } from "react";
import { Modal, Input, Skeleton, message } from "antd";
import { dataApi } from "@/store/api/api";
const apurl = import.meta.env.VITE_API_URL;
import { CiSearch } from "react-icons/ci";
import { Player } from "@lottiefiles/react-lottie-player";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CollegeCompare = () => {
  const [medicalColleges, setMedicalColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(null);
  const [selectedCollege1, setSelectedCollege1] = useState(null);
  const [selectedCollege2, setSelectedCollege2] = useState(null);
  const [selectedCollege3, setSelectedCollege3] = useState(null);
  const [collegeDetails1, setCollegeDetails1] = useState(null);
  const [collegeDetails2, setCollegeDetails2] = useState(null);
  const [collegeDetails3, setCollegeDetails3] = useState(null);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const ListData = [
    "Date of LOP",
    "OPD",
    "IPD",
    "Fee Structure",
    "Annual Intake",
    "Courses Offered",
    "Beds",
    "Closing Rank",
    "Bond Details",
  ];

  const showModal = (index) => {
    setIsModalVisible(index);
  };

  const handleOk = () => {
    setIsModalVisible(null);
  };

  const handleCancel = () => {
    setIsModalVisible(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (college) => {
    if (
      (isModalVisible === 0 && college === selectedCollege2) ||
      (isModalVisible === 0 && college === selectedCollege3) ||
      (isModalVisible === 1 && college === selectedCollege1) ||
      (isModalVisible === 1 && college === selectedCollege3) ||
      (isModalVisible === 2 && college === selectedCollege1) ||
      (isModalVisible === 2 && college === selectedCollege2)
    ) {
      message.error("This college is already selected in another box.");
      return;
    }

    switch (isModalVisible) {
      case 0:
        setSelectedCollege1(college);
        break;
      case 1:
        setSelectedCollege2(college);
        break;
      case 2:
        setSelectedCollege3(college);
        break;
      default:
        break;
    }
    setIsModalVisible(null);
  };

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlayerSpeed(0.5);
    }
  }, []);

  const filteredColleges = medicalColleges.filter((college) =>
    college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    dataApi({ endPoint: `${apurl}/api/fetchColleges`, method: "GET" })
      .then((res) => {
        setMedicalColleges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to load colleges.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCollegeDetails = async (college, setCollegeDetails) => {
      if (!college) return;
      setDetailsLoading(true);
      try {
        const res = await dataApi({
          endPoint: `${apurl}/api/getCollegeDetails`,
          method: "POST",
          data: { collegeName: college },
        });
        setCollegeDetails(res.data);
      } catch (err) {
        message.error(`Failed to load details for ${college}.`);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchCollegeDetails(selectedCollege1, setCollegeDetails1);
    fetchCollegeDetails(selectedCollege2, setCollegeDetails2);
    fetchCollegeDetails(selectedCollege3, setCollegeDetails3);
  }, [selectedCollege1, selectedCollege2, selectedCollege3]);

  const renderCollegeDetails = (details) => {
    return ListData.map((item, index) => (
      <p key={index} className="py-2 text-[#565656]">
        {details
          ? details[item] || (
              <span className="text-[#FF9245] text-2xl font-semibold">X</span>
            )
          : "----"}
      </p>
    ));
  };

  const handleDownloadPDF = () => {
    if (!selectedCollege1 && !selectedCollege2 && !selectedCollege3) {
      message.error(
        "Please select at least one college before downloading the PDF."
      );
      return;
    }

    const input = document.querySelector(".pdf-content");

    if (!input) {
      console.error("PDF content element not found");
      return;
    }

    html2canvas(input, { useCORS: true, scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("college-comparison.pdf");
      })
      .catch((err) => console.error("Error generating PDF", err));
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container text-center">
            <h1 className="text-35 font-semibold underline decoration-[#B7804A] underline-offset-[12px] pb-2">
              College Compare
            </h1>
            <p className="mt-10 font-bold">
              Compare colleges based on Courses, Fee Structures, Closing Ranks,{" "}
              <br /> Approved Intakes, Student Reviews, and MM rating
            </p>
          </div>

          <div className="flex bg-white rounded p-4">
            <div className="flex items-center gap-3 ">
              <h2 className="font-medium text-2xl">Compare College</h2>
              <div className="h-[30px] bg-[#B7804A] w-[4px] rounded"></div>
              <p className="text-gray-600 font-medium">
                Round-wise updates with the latest seat intakes of medical
                colleges
              </p>
            </div>
          </div>
          <div className="bg-white  ">
            <div className="overflow-x-auto pdf-content">
              <div className="md:min-w-fit min-w-[600px] ">
                {" "}
                {/* Ensure enough width for horizontal scrolling */}
                {/* Header SELECT BOXES + College Details Data */}
                <div className="flex flex-col">
                  {/* CardBoxCollegeCompare: College Selection Buttons */}
                  <div className="flex justify-between bg-[#005F59] text-white py-2 h-[100px] items-center pr-2 gap-2 rounded-lg">
                    <div className="w-[200px]"></div>

                    <div className="border w-[24%] overflow-hidden text-xs px-2 py-2 h-[40px] rounded-3xl flex">
                      <button
                        className="w-full h-full"
                        onClick={() => showModal(0)}
                      >
                        {selectedCollege1 || "Select College"}
                      </button>
                      <CiSearch size={23} />
                    </div>

                    <div className="border w-[24%] overflow-hidden text-xs px-2 py-2 h-[40px] rounded-3xl flex">
                      <button
                        className="w-full h-full"
                        onClick={() => showModal(1)}
                      >
                        {selectedCollege2 || "Select College"}
                      </button>
                      <CiSearch size={23} />
                    </div>

                    <div className="border w-[24%] overflow-hidden text-xs px-2 py-2 h-[40px] rounded-3xl flex">
                      <button
                        className="w-full h-full"
                        onClick={() => showModal(2)}
                      >
                        {selectedCollege3 || "Select College"}
                      </button>
                      <CiSearch size={23} />
                    </div>
                  </div>

                  {/* College Details Data */}
                  <div className="flex justify-between mt-2">
                    <div className="bg-white w-[200px] flex flex-col gap-1">
                      {ListData.map((item, index) => (
                        <p
                          key={index}
                          className="bg-white py-2 px-1 text-[#005F59] font-semibold text-center"
                        >
                          {item}
                        </p>
                      ))}
                    </div>

                    <div className="text-center w-[24%] p-2 rounded">
                      {detailsLoading ? (
                        <Skeleton active />
                      ) : (
                        renderCollegeDetails(collegeDetails1)
                      )}
                    </div>

                    <div className="text-center w-[24%] p-2 rounded">
                      {detailsLoading ? (
                        <Skeleton active />
                      ) : (
                        renderCollegeDetails(collegeDetails2)
                      )}
                    </div>

                    <div className="text-center w-[24%] p-2 rounded">
                      {detailsLoading ? (
                        <Skeleton active />
                      ) : (
                        renderCollegeDetails(collegeDetails3)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#005F59] flex flex-col lg:flex-row  justify-center items-center  mt-10 rounded-xl gap-6 p-2">
              <div className="text-center lg:text-start flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
                <p className="text-[#ff9245] font-medium text-lg lg:text-2xl">
                  Download complete <br></br>
                  <span className="text-white font-medium text-lg lg:text-2xl">
                    comparison in the form of PDF
                  </span>
                </p>
                <Player
                  ref={playerRef}
                  autoplay
                  loop
                  src="https://lottie.host/2a2f1b6f-0277-495d-805d-fb2753e3eaf1/AFjdziP971.json"
                  style={{ height: "150px", width: "250px" }}
                />
                <button
                  className="bg-[#FF9245] text-white py-2 px-4 lg:px-6 rounded-3xl font-bold text-sm lg:text-base"
                  onClick={handleDownloadPDF}
                  
                >
                  Download Comparison PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Select College"
        open={isModalVisible !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Search for colleges"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "10px" }}
        />
        <div className="overflow-scroll overflow-x-visible h-[300px] scrollbar-custom">
          {loading ? (
            <Skeleton active />
          ) : filteredColleges.length > 0 ? (
            filteredColleges.map((item, index) => (
              <div
                key={index}
                className="flex bg-white p-1 mr-2 border-gray-100 border-b-2 mt-3 justify-between items-center py-2 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                <p>{item}</p>
              </div>
            ))
          ) : (
            <p>No colleges found</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CollegeCompare;
