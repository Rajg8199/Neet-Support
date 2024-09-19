import React, { useState, useEffect } from "react";
import BarChart from "./Competition/CandidateDataTable";
import HorizontalBarChart from "./Competition/NeetStats";
import GenderWise from "./Competition/GenderWise";
import CategoryWise from "./Competition/CategoryWise";
import LanguageWiseComponents from "./Competition/LanguageWise";
import { dataApi } from "@/store/api/api";
import { setPast5YearData } from "@/store/FeatureSlice/past5yearapi";
import { useDispatch } from 'react-redux';
import NationalityChart from "./Competition/NationalityData";
import StateWiseNumber from "./Competition/StateWiseNumber";
import PercentileTable from "./Competition/PercentileData";

const Competition = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dataApi({
          endPoint: `${import.meta.env.VITE_API_URL}/api/getCandidateData`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(setPast5YearData(res));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30 mt-0">
          <div className="container">
            <h1 className="text-35 font-semibold">Five Year Competition</h1>
            <p>
              An in-depth statistical analysis of NEET candidates: registered,
              appeared, and qualified.
            </p>
            
          </div>
          <div className="bg-white rounded m-2">

            <BarChart />
          </div>
          <div className="bg-white rounded m-2 ">
           
            {/* <NeetStatistics /> */}
            <HorizontalBarChart />
          </div>
          <div className="bg-white rounded m-2">
            <NationalityChart />
          </div>
          <div className="bg-white rounded  m-2">
           
            <GenderWise />
          </div>
          <div className="bg-white rounded m-2">
            
            <CategoryWise />
          </div>
          <div className="bg-white rounded m-2">
           
            <PercentileTable />
          </div>
          <div className="bg-white rounded m-2">
            <LanguageWiseComponents />
          </div>
          < div className="bg-white rounded m-2">
            <StateWiseNumber />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;
