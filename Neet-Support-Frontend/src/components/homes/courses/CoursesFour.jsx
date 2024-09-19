import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MentorList.css"; // Import the CSS file

// Sample mentor data
const mentorsData = [
  {
    name: "John Doe",
    role: "Junior Mentor",
    image: "assets/img/coursesCards/1.png",
    social: {
      facebook: "https://facebook.com/john",
      twitter: "https://twitter.com/john",
      linkedin: "https://linkedin.com/in/john",
    },
  },
  {
    name: "Jane Smith",
    role: "Senior Mentor",
    image: "assets/img/coursesCards/2.webp",
    social: {
      facebook: "https://facebook.com/jane",
      twitter: "https://twitter.com/jane",
      linkedin: "https://linkedin.com/in/jane",
    },
  },
  {
    name: "Jane Smith",
    role: "Academic Mentor",
    image: "assets/img/coursesCards/3.webp",
    social: {
      facebook: "https://facebook.com/jane",
      twitter: "https://twitter.com/jane",
      linkedin: "https://linkedin.com/in/jane",
    },
  },
  {
    name: "Jane Smith",
    role: "Success Coach",
    image: "assets/img/coursesCards/4.webp",
    social: {
      facebook: "https://facebook.com/jane",
      twitter: "https://twitter.com/jane",
      linkedin: "https://linkedin.com/in/jane",
    },
  },
  // Add more mentor profiles here
];

export default function MentorList() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <section
      style={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">Meet Our Mentors</h2>
              <p className="sectionTitle__text">
                Guidance from experienced professionals
              </p>
            </div>
          </div>
        </div>

        <div
          className="relative pt-60 lg:pt-50 js-section-slider"
          data-aos="fade-left"
          data-aos-offset="80"
          data-aos-duration={800}
        >
          {showSlider && (
            <Swiper
              className="overflow-visible"
              modules={[Navigation, Pagination]}
              pagination={{
                el: ".mentor-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: ".mentor-slider-next",
                prevEl: ".mentor-slider-prev",
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                450: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {mentorsData.map((mentor, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="mentor-card"
                    style={{
                      position: "relative",
                      textAlign: "center",
                      transition: "transform 0.3s",
                    }}
                  >
                    <div
                      className="mentor-card__image"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10%",
                        width: "250px",
                        height: "350px",
                        margin: "0 auto",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.children[1].style.opacity = 1)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.children[1].style.opacity = 0)
                      }
                    >
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10%",
                        }}
                      />
                      <div
                        className="mentor-card__overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          opacity: 0,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          transition: "opacity 0.3s",
                        }}
                      >
                        <a
                          href={mentor.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <i className="icon icon-facebook"></i>
                        </a>
                        <a
                          href={mentor.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <i className="icon icon-twitter"></i>
                        </a>
                        <a
                          href={mentor.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <i className="icon icon-linkedin"></i>
                        </a>
                      </div>
                    </div>
                    <div
                      className="mentor-card__info"
                      style={{ marginTop: "15px" }}
                    >
                      <h3
                        className="mentor-card__name"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {mentor.name}
                      </h3>
                      <p
                        className="mentor-card__role"
                        style={{ fontSize: "14px", color: "#777" }}
                      >
                        {mentor.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <button
            className="mentor-slider-prev section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-prev"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <i className="icon icon-arrow-left"></i>
          </button>

          <button
            className="mentor-slider-next section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-next"
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <i className="icon icon-arrow-right"></i>
          </button>
        </div>

        <div className="row justify-center pt-60 lg:pt-50">
          <div className="col-auto">
            <Link
              to="/mentors-list"
              className="button -icon -orange-1 text-white"
              style={{
                display: "inline-block",
               
                backgroundColor: "rgb(255,146,69)",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Browse All Mentors
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
