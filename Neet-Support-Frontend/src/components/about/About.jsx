import React from "react";

import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">About Us</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver comprehensive and engaging
                    counselling services at a reasonable price for NEET
                    aspirants across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50 justify-between items-center">
            <div className="col-lg-6 pr-50 sm:pr-15">
              <div className="composition -type-8">
                <div className="-el-1">
                  <img src="/assets/img/about-1/1.png" alt="image" />
                </div>
                <div className="-el-2">
                  <img src="/assets/img/about-1/2.png" alt="image" />
                </div>
                <div className="-el-3">
                  <img src="/assets/img/about-1/3.png" alt="image" />
                </div>
              </div>
            </div>

            <div className="col-lg-5 ">
              <h2 className="text-30 lh-16 text-orange-1">
                Welcome to NEET Support
              </h2>
              <h4 className="">
              Our vision is to create a stress-free path for medical aspirants to their dream medical college.
              </h4>
              <p className="text-dark-1 mt-30">
                We are India’s fastest-growing Organization that manifests in
                providing students with a perfect solution to all their
                complications with the best team of young professionals
                dedicated to resolving your doubts about NEET Counselling and
                supporting you in the crucial application process,
                documentation, and admission procedures for medical colleges
                across the Country. You can begin with the counselling process
                with our master direction – at no cost! Connect with us for more
                subtle elements and begin your successful medical journey.
              </p>
              {/* <p className="pr-50 lg:pr-0 mt-25">
                Neque convallis a cras semper auctor. Libero id faucibus nisl
                tincidunt egetnvallis a cras semper auctonvallis a cras semper
                aucto. Neque convallis a cras semper auctor. Liberoe convallis a
                cras semper atincidunt egetnval
              </p> */}
              {/* <div className="d-inline-block">
                <Link
                  to="/signup"
                  className="button -md -purple-1 text-white mt-30"
                >
                  Start Learning For Free
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
