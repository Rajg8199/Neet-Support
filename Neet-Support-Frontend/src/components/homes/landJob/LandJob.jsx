import React from "react";

export default function LandJob() {
  return (
    <section
      style={{
        backgroundColor: "rgb(0,77,64,0.85)",
        padding: "10px",
        borderRadius: "50px",
        color: "#fff",
        textAlign: "center",
        height: "auto",
        margin: 18,
      }}
    >
      {/* flex-col-reverse */}
      <div className=" flex gap-2 flex-wrap flex-col-reverse md:flex-row    ">
        {/* Text Section */}
        <div className="  w-[100%] md:w-[50%]  text-start p-3   ">
          <h3 className=" text-2xl    lg:text-4xl text-orange-400 font-semibold  capitalize">
            Instant access to information!
          </h3>
          <p className=" py-3 text-base lg:text-base  mt-[20px]   ">
            Download the Ultimate Guide to the NEET Counselling Process Here
          </p>
          <div className=" p-3   text-lg bg-orange-500 shadow-lg mt-12 w-[200px]  rounded-3xl text-center ">
            Download
          </div>
        </div>
        {/* Image Section */}
        <div className="  p-2 m-auto    md:m-0">
          <div className="image-container">
            <img
              src="/assets/img/home-4/dreamJob/Bookwithpage.png"
              alt="Static Image"
              className="object-cover m-auto h-64 py-5 pb-5  sm:h-56 2xl:h-96  "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
