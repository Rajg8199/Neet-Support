import { news, states, upcomingWebinar } from "@/data/dashboard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import React from "react";
import FooterNine from "../layout/footers/FooterNine";
import { useState } from "react";
// import PieChartComponent from "./PieCharts";
import { Chart } from "react-google-charts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import VideoPlayIcon from "./Tools/playVideo.png";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pie } from "react-chartjs-2";
import { dataApi } from "@/store/api/api";
import CollegeSeats from "./College&Seats/College&Seats";

const steps = [
  {
    id: "step1",
    title: "Step 1: |",
    content: "Register your self for basic counseling webinar",
  },
  { id: "step2", title: "Step 2: |", content: "Complete your profile" },
  { id: "step3", title: "Step 3: |", content: "Book your counseling session" },
];

import SwiperCore from "swiper";
SwiperCore.use([Navigation]);

export default function DashboardOne() {
  const [activeSlide, setActiveSlide] = useState(1);

  const books = [
    { id: 1, title: "State name", image: "/assets/img/dashboard/books/1.png" },
    { id: 2, title: "State name", image: "/assets/img/dashboard/books/2.png" },
    { id: 3, title: "State name", image: "/assets/img/dashboard/books/3.png" },
    { id: 4, title: "State name", image: "/assets/img/dashboard/books/4.png" },
    { id: 5, title: "State name", image: "/assets/img/dashboard/books/5.png" },
  ];

  const bookSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (_, next) => setActiveSlide(next),
    afterChange: (current) => {
      const totalSlides = books.length;
      const middleSlide = Math.floor(totalSlides / 3);
      setActiveSlide((current + middleSlide) % totalSlides);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };

  const [selectedMentor, setSelectedMentor] = useState(states[0]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleTabClick = (mentor) => {
    setSelectedMentor(mentor);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const dataSets = {
    overall: [
      {
        label: "Overall",
        value: 442,
        color: "linear-gradient(to right, #ffd194, #FCA76A)",
      },
      {
        label: "Central",
        value: 2,
        color: "linear-gradient(to right, #B1D3DD, #76B0F7)",
      },
      {
        label: "AIQ",
        value: 355,
        color: "linear-gradient(to right, #ffecd2, #fcb69f)",
      },
      {
        label: "Deemed",
        value: 51,
        color: "linear-gradient(to right, #fddb92, #d1fdff)",
      },
      {
        label: "ESI",
        value: 11,
        color: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
      },
      {
        label: "AFMC",
        value: 1,
        color: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      },
      {
        label: "AIIMS",
        value: 20,
        color: "linear-gradient(to right, #89f7fe, #75A7EC)",
      },
      {
        label: "JIPMER",
        value: 2,
        color: "linear-gradient(to right, #ff9a9e, #fecfef)",
      },
    ],
    central: [
      {
        label: "Central",
        value: 2,
        color: "linear-gradient(to right, #00c6ff, #0072ff)",
      },
    ],
    aiq: [
      {
        label: "AIQ",
        value: 355,
        color: "linear-gradient(to right, #ffecd2, #fcb69f)",
      },
    ],
    deemed: [
      {
        label: "Deemed",
        value: 51,
        color: "linear-gradient(to right, #fddb92, #d1fdff)",
      },
    ],
    esi: [
      {
        label: "ESI",
        value: 11,
        color: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
      },
    ],
    afmc: [
      {
        label: "AFMC",
        value: 1,
        color: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      },
    ],
    aiims: [
      {
        label: "AIIMS",
        value: 20,
        color: "linear-gradient(to right, #89f7fe, #66a6ff)",
      },
    ],
    jipmer: [
      {
        label: "JIPMER",
        value: 2,
        color: "linear-gradient(to right, #ff9a9e, #fecfef)",
      },
    ],
  };

  const DonutChart = ({ data }) => {
    // Placeholder for actual chart rendering logic
    return <div className="donut-chart">Donut Chart Placeholder</div>;
  };

  const Card = ({ label, value, color }) => (
    <div className="card" style={{ background: color }}>
      <div className="card-content ">
        <h3>{label}</h3>
        <p>{value} Colleges</p>
      </div>
    </div>
  );

  const [selectedCategory, setSelectedCategory] = useState("overall");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const videos = [
    {
      id: 1,
      title: "Webinar 1",
      url: "https://www.youtube.com/embed/V0q9x_VcUPY?si=5T-7neGIE0_D_Awe",
    },
    { id: 2, title: "Webinar 2", url: "https://www.youtube.com/embed/video2" },
    { id: 3, title: "Webinar 3", url: "https://www.youtube.com/embed/video3" },
  ];

  const [activeTab, setActiveTab] = useState("ongoing");

  const handleTabClicks = (tab) => {
    setActiveTab(tab);
  };

  //  Pie Chart

  // const dataCollegeandSeats = dataApi({ endPoint: 'http://34.131.108.115:3001/api/getCollegeData', }).then((res) => { console.log(res) })

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options01 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || "";
            if (context.parsed !== null) {
              label += ": " + context.parsed + "%";
            }
            return label;
          },
        },
      },
    },
  };

  // const [activeTab, setActiveTab] = useState({
  //   application: 'past',
  //   counselling: 'past'
  // });

  // const handleTabClick = (section, tab) => {
  //   setActiveTab(prevState => ({
  //     ...prevState,
  //     [section]: tab
  //   }));
  // };

  return (
    <div className="dashboard__main ">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="dashboard-1">
            <div className="header-1 ">
              <h1 className="welcome-text text-4xl">Welcome,</h1>
              <h2 className="username">Raj Gupta</h2>
            </div>
            {/* content */}
            <div className=" flex gap-5  md:flex-row   flex-col-reverse lg:flex-row p-1 ">
              {/* chart */}
              <div className="chart">
                {/* <div className="chart-content">Pie Chart</div> */}
                {/* <Chart
                  chartType="PieChart"
                  data={data01}
                  // options={options}
                  width={"100%"}
                  height={"100%"}
                /> */}
                <Pie data={data} options={options01} />
              </div>
              {/* mentor-card */}
              <div className=" w-[100%] bg-white rounded-md shadow-md md:w-[60%]">
                <div className="mentor-details ">
                  <img
                    src={selectedMentor.img}
                    alt="Mentor"
                    // mentor-image
                    className="object-cover h-96 lg:w-64 "
                  />
                  <div className="mentor-info p-2">
                    <h3 className="mentor-name">{selectedMentor.name}</h3>
                    <p className="sessions-taken mb-20">
                      {selectedMentor.sessions}
                    </p>
                    <h3 className="session-invite mb-1">
                      Book a session with your {selectedMentor.name} :)
                    </h3>
                    <p className="mentor-description mb-20">
                      {selectedMentor.description}
                    </p>
                    <button className="col-auto button -sm -orange-1 text-white bw">
                      Book Now
                    </button>
                  </div>
                </div>
                <div className="mentor-tabs  ">
                  {states.map((mentor) => (
                    <span
                      key={mentor.id}
                      className={`tab ${
                        mentor.id === selectedMentor.id ? "active" : ""
                      }  p-2`}
                      onClick={() => handleTabClick(mentor)}
                    >
                      {mentor.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="multi-step-form">
          <div className="step-content">
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].content}</p>
            <div className="step-buttons">
              {currentStep > 0 && <button onClick={prevStep}>Back</button>}
              {currentStep < steps.length - 1 ? (
                <button onClick={nextStep}>Next</button>
              ) : (
                <button onClick={() => alert("Submit")}>Submit</button>
              )}
            </div>
          </div>
        </div>
        <br />
        {/* <div className="container-grid bg-emerald-200   ">
          <div className="flex justify-between items-stretch">
            <div>
              <h1 className=" text-2xl sm:text-2xl  md:text-2xl text-start px-4 md:px-20 font-semibold ">
                College & Seats
              </h1>
            </div>
            <select
              onChange={ handleCategoryChange }
              className=" bg-slate-100 h-[40px] p-2 rounded-3xl"
            >
              <option value="overall">MCC</option>
              <option value="central">Central</option>
              <option value="aiq">AIQ</option>
              <option value="deemed">Deemed</option>
              <option value="esi">ESI</option>
              <option value="afmc">AFMC</option>
              <option value="aiims">AIIMS</option>
              <option value="jipmer">JIPMER</option>
            </select>
          </div>
          <div>
            <p className=" text-gray-400  text-start text-clip px-20 py-2 ">
              Navigate across different medical college seat distributions
            </p>
          </div>
          <div className=" flex gap-5 flex-col md:flex-col lg:flex-row  p-2">

            <div className=" p-4 w-[100%]  ">

              <Pie data={ data } options={ options01 } />

            </div>
            <div className="   w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
              { dataSets[selectedCategory].map((item, index) => (
                <Card
                  key={ index }
                  label={ item.label }
                  value={ item.value }
                  color={ item.color }
                />
              )) }
            </div>
          </div>
        </div> */}
        <CollegeSeats />
        <br />

        <div className="container-grid-1 ">
          <h1 className=" text-3xl font-semibold text-start">E-books</h1>
          {/* subheading-1 */}
          <p className=" text-gray-400 text-start mt-10">
            Download this virtual guide to the NEET Counselling process of all
            28 states & MCC Counselling
          </p>
          <div className="book-slider-container">
            {/* <Slider {...bookSliderSettings}>
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className={`book-slide ${
                    index === activeSlide ? "active" : ""
                  }`}
                >
                  <img src={book.image} alt={book.title} />
                  <p
                    className={`book-title  ${
                      index === activeSlide ? "active-title" : ""
                    }`}
                  >
                    {book.title}
                  </p>
                </div>
              ))}
            </Slider> */}
            <div>
              <Swiper
                spaceBetween={50} // Space between slides
                slidesPerView={1} // Number of slides per view
                navigation // Enable navigation
                className="mySwiper"
                // style={{ width: 700 }}
              >
                {books.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <p className=" text-xl mb-2">{item.title}</p>
                      <img
                        src={item.image}
                        class="object-cover shadow-md m-auto h-80 rounded"
                      />
                      <button className="px-6 mt-10 w-[170px]  rounded py-2 font-medium bg-indigo-500 text-white  transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                        Buy Now
                      </button>
                    </SwiperSlide>
                  );
                })}
                {/* <SwiperSlide className=" bg-orange-400 p-2 " style={{width:200}}>
                  slide 1
                </SwiperSlide> */}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="webinar-container">
          {/* webinar-header */}
          <div className=" flex justify-between gap-3 items-center">
            <h2 className=" text-2xl  font-semibold text-orange-500  mb-10">
              Glimpse of Webinar
            </h2>
            <Link to="/view-all" className=" font-semibold ">
              View All
            </Link>
          </div>
          <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {videos.map((video, index) => (
              <div
                key={index}
                className=" bg-[#f2f2f2] flex justify-center items-center border p-2 w-[100%] rounded-md h-[200px]"
              >
                <img
                  src={VideoPlayIcon}
                  className=" object-contain cursor-pointer w-24  "
                  onClick={() => alert("VideoPlay")}
                  alt=""
                />
              </div>
              // <iframe
              //   key={ index }
              //   className=" h-[300px] w-[100%] rounded-md shadow"
              //   src={ video.url }
              //   title={ video.title }
              //   frameBorder="0"
              //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //   allowFullScreen
              // ></iframe>
            ))}
          </div>
        </div>

        <div className="handbook-container p-3 ">
          {/* handbook-header */}
          <div className="px-10 md:px-0">
            <h2 className="heading-1  mb-4">Medical Guide Handbook</h2>
            <p>
              Track the delivery status of your MM Medical Guidebook - The NEET
              UG Counselling encyclopedia
            </p>
          </div>
          <div className="handbook-content flex  p-1 gap-2">
            {/* tracking-box */}
            <div className=" p-2 rounded-md w-[100%] md:w-[100%] lg:w-[50%] h-[300px]  bg-[#f2f2f2] ">
              <h3 className=" text-3xl font-semibold">Tracking</h3>
              <div className=" p-2 py-2 rounded  mt-2 bg-white border">
                No Data Available
              </div>
            </div>
            <div className="video-box">
              {/* <div className="video-placeholder"> */}
              {/* <iframe
                className=" w-[100%] rounded-md h-[300px]"
                src="https://www.youtube.com/embed/sample-video"
                title="Sample Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
              <div className=" bg-[#f2f2f2] flex justify-center  items-center border p-2 w-[100%] rounded-md h-[300px]">
                <img
                  src={VideoPlayIcon}
                  className=" object-contain cursor-pointer w-36  "
                  onClick={() => alert("VideoPlay")}
                  alt=""
                />
              </div>
              {/* </div> */}
              <div className=" flex w-[100%]">
                <button className="read-now-button w-[200px] hover:w-[100%] transition-all ease-linear  ml-3  mb-2">
                  Read Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__main-1">
          <div className="news-and-webinar">
            <div className="news-section">
              {/* section-header */}
              <div className=" text-black flex justify-between py-4 ">
                <h2 className=" font-semibold text-lg   md:text-2xl ">
                  News blogs and <br /> Update
                </h2>
                <Link to="/view-all-news" className="view-all">
                  View All
                </Link>
              </div>
              <div className="news-list">
                {news.map((item) => (
                  <div key={item.id} className="news-item mt-12">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="webinar-section    ">
              <h2 className="Upcoming-webinar-h1 text-2xl font-semibold ">
                Upcoming Webinar
              </h2>
              <div className="section-header">
                {/* <Link to="/view-all-webinars" className="view-all">
              View All
            </Link> */}
              </div>

              <div className="webinar-details ">
                <div className="webinar-date-time">
                  {upcomingWebinar.date} - {upcomingWebinar.time}
                </div>
                <div className="webinar-video-1">
                  <iframe
                    width="100%"
                    height="100%"
                    src={upcomingWebinar.videoUrl}
                    title="Upcoming Webinar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="webinar-title">{upcomingWebinar.title}</h3>
                <p className="webinar-description">
                  {upcomingWebinar.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__main-links">
          <div className=" p-1 flex flex-col  lg:flex-row gap-4 ">
            <div className="application-links  bgr">
              <div className="section-header-2">
                <h2 className=" text-2xl font-bold">Application Links</h2>
                <p>Latest NEET UG Application links at your fingertips</p>
              </div>
              <div className="tabs-1  ">
                <button
                  className={`tab-button-1 ${
                    activeTab === "past" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("past")}
                >
                  Past
                </button>
                <button
                  className={`tab-button-1 ${
                    activeTab === "ongoing" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("ongoing")}
                >
                  Ongoing
                </button>
              </div>
              <div className="tab-content"></div>
            </div>
            <div className="counselling-links  bgr">
              <div className="section-header-2">
                <h2 className=" text-2xl font-bold">Counselling Links</h2>
                <p>Important NEET UG Counselling links</p>
              </div>
              <div className="tabs-1">
                <button
                  className={`tab-button-1 ${
                    activeTab === "past" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("past")}
                >
                  Past
                </button>
                <button
                  className={`tab-button-1 ${
                    activeTab === "ongoing" ? "active" : ""
                  }`}
                  onClick={() => handleTabClicks("ongoing")}
                >
                  Ongoing
                </button>
              </div>
              <div className="tab-content"></div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
