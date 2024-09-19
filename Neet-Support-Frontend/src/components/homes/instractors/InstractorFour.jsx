import React from "react";

export default function InstructorSection() {
  return (
    <section className="instructor-section">
      <div className="container">
        <div className="row gap-30 justify-between ">
          <div className="col-lg-6 video-container">
            <iframe
              className="responsive-iframe rounded-md mb-4 "
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/PqNqHJMCo1A?si=Z0l-CBzYjRzqk4Cl"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="col-xl-5 p-3  col-lg-6 col-md-9   ">
            <h3 className=" text-4xl font-semibold section-title">
              What Students Say
            </h3>
            <p className="section-description mt-30 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            {/* <div className="button-container">
              <div>
                <a href="#" className="custom-button button-primary">
                  Start Teaching Today
                </a>
              </div>
              <div>
                <a href="#" className="custom-button button-secondary">
                  Browse Teachers
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
