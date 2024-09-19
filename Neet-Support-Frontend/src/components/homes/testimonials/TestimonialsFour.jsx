import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { testimonialsTwoFour } from "../../../data/tesimonials";
import "swiper/swiper-bundle.min.css";

// Import FontAwesome icons and library
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function TestimonialsFour() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <section className="testimonials-section m-7 rounded-md">
      <div className="container">
        <div className="testimonials-header">
          <h2 className=" text-2xl lg:text-4xl font-semibold  capitalize">Success Stories: Hear from <span className="text-orange-1">NEET Achievers</span> with NEET Support!</h2>
        </div>

        <div className="testimonials-slider ">
          {showSlider && (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".testimonials-next",
                prevEl: ".testimonials-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {testimonialsTwoFour.map((testimonial, index) => (
                <SwiperSlide key={index} className="testimonial-slide" >
                  <div className="testimonial-card ">
                    <div className="testimonial-image">
                      <img src={testimonial.image} className=" m-auto mb-20" alt={`Testimonial from ${testimonial.name}`} />
                    </div>
                    <div className="testimonial-content">
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      <p className="testimonial-text">{testimonial.text}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* <div className="testimonials-navigation">
          <div className="testimonials-prev">
            <button className="navigation-button testimonials-button-prev">
              <FontAwesomeIcon icon={faChevronLeft} className="icon-prev" />
            </button>
          </div>
          <div className="testimonials-next">
            <button className="navigation-button testimonials-button-next">
              <FontAwesomeIcon icon={faChevronRight} className="icon-next" />
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
