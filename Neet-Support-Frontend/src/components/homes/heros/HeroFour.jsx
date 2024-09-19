import gsap from "gsap";

import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HeroFour() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);
  return (
    <section className="masthead -type-3 bg-light-6  p-7  js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 items-center  justify-center">
          <div
            className="col-xl-7 col-lg-11 relative z-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="masthead__content pl-32 lg:pl-0">
              <h1 className="masthead__title">
                <span className="text-white">Guiding You Every Step </span>
                <br />{" "}
                <span className="text-orange-1">
                  from Dream to Dream College!
                </span>
              </h1>

              <p className="masthead__text text-18 text-white mt-25">
                Empowering Students on Their NEET Journey Since 2022!
                <br className="lg:d-none" />
              </p>

              <div className="masthead-search mt-30">
                <div className="masthead-search__form">
                  <form onSubmit={handleSubmit}>
                    <input
                      required
                      type="text"
                      placeholder="Enter Keywords, Topics, Questions & more"
                    />

                    <button
                      className="button -orange-1 text-white"
                      onClick={() => navigate("/courses-list-2")}
                    >
                      <i className="icon icon-search"></i>
                    </button>
                  </form>
                </div>

                <div className="masthead-search__searches mt-40">
                  {/* Trending Search:
                  <Link to={`/courses/${6}`}>Development</Link>,
                  <Link to="/courses-single-2/3">Business</Link>,
                  <Link to="/courses-single-6/3">Design</Link>,
                  <a href="#">Merketing</a> */}
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-7 relative z-2"
            data-aos="fade-up"
            data-aos-delay="750"
          >
            <div className="masthead-image">
              <div className="masthead-image__img1">
                <div className="masthead-image__shape xl:d-none">
                  <img
                    src="/assets/img/home-4/masthead/shape.svg"
                    alt="image"
                  />
                </div>
                <img
                  data-move="20"
                  className="js-mouse-move"
                  src="/assets/img/home-4/masthead/1.png"
                  alt="image"
                />
              </div>

              {/* <div className="masthead-image__el1">
                <div
                  data-move="40"
                  className="lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                >
                  <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                    <img src="/assets/img/masthead/1.svg" alt="icon" />
                  </div>
                  <div className="ml-20">
                    <div className="text-orange-1 text-16 fw-500 lh-1">
                      3.000 +
                    </div>
                    <div className="mt-3">Free Courses</div>
                  </div>
                </div>
              </div> */}

              <div className="masthead-image__el2">
                <div
                  data-move="40"
                  className="shadow-4 img-el  px-20 bg-white py-5   d-flex items-center  rounded-8 js-mouse-move"
                >
                  <div className="img-el__side bg-orange-400 rounded-full ">
                    <div className="size-50 d-flex justify-center items-center rounded-full">
                      <img src="/assets/img/masthead/2.svg" alt="icon" />
                    </div>
                  </div>
                  <div>
                    <div className=" text-orange-400 px-6 mt-10 pt-10 text-center  text-15 fw-500 lh-1">
                      Welcome to NEET Support!
                    </div>
                    <div className="mt-4">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
