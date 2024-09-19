import React, { useState, useEffect } from "react";
import SeatIntake from "./components/Feesandseatmatrix";

const FeesSeatMatrix = () => {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container text-center">
            <h1 className="text-35 font-semibold underline decoration-[#B7804A]  underline-offset-8 pb-2">Fee and Seat matrix </h1>
            <p className="font-semibold">
            View seat distributions and corresponding fee structures offered by colleges for every category and subcategory
            </p>
          </div>
          <div className="flex">
          <div className="bg-white rounded m-2 w-full p-4">
            <SeatIntake />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesSeatMatrix;
