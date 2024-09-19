import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../../firebase'; // Adjust the path as needed

const NEETRankPredictor = () => {
  const [predictionData, setPredictionData] = useState([]);
  const [marks, setMarks] = useState('');
  const [predictedRanks, setPredictedRanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'rank_predictions'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setPredictionData(data);
    };

    fetchData();
  }, []);

  const findExactRank = (marks) => {
    for (const item of predictionData) {
      const [minMarks, maxMarks] = item.marks_range.split('-').map(Number);
      const [minRank, maxRank] = item.rank_range.split('-').map(Number);

      if (maxMarks <= marks && marks <= minMarks) {
        if (minMarks === maxMarks) {
          return { rank: minRank, minRank, maxRank };
        }

        const rank = minRank + ((marks - minMarks) * (maxRank - minRank)) / (maxMarks - minMarks);
        return { rank: Math.round(rank), minRank, maxRank };
      }
    }
    return { rank: 'Marks out of range', minRank: null, maxRank: null };
  };

  const handlePredictRank = (e) => {
    e.preventDefault();
    const marksInt = parseInt(marks, 10);
    if (isNaN(marksInt)) {
      alert('Please enter a valid number');
      return;
    }
    // Clear previous results
    setPredictedRanks([]);
    const { rank, minRank, maxRank } = findExactRank(marksInt);
    setPredictedRanks([{ marks, rank, minRank, maxRank }]);
  };

  return (
    <div className="flex gap-4 flex-col-reverse md:flex-row   lg:p-14  ">
      <div className="predict-content m-auto  w-[100%]  md:w-[50%] p-10 lg:p-5">
        <h1 className=' text-3xl lg:text-4xl  font-semibold  ' style={{textAlign:"start"}}>
          Predict your <span className="predict-highlight">NEET Rank</span>
        </h1>
        <p className="predict-desc ">
          Our AI-powered Rank Predictor tool forecasts your NEET All India Rank
          within seconds based on your score. The insights you gain with this
          tool and our personalized mentoring help you stay ahead of the
          competition.
        </p>
        <form onSubmit={handlePredictRank} className="predict-input-container flex gap-4">
          <input
            type="number"
            placeholder="Enter Your NEET Score"
            value={marks}
            className=' p-2'
            onChange={(e) => setMarks(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {predictedRanks.map((predictedRank, index) => (
          <div key={index} className="predict-result">
            <p>For Marks: {predictedRank.marks}</p>
            <p>Predicted Rank: {predictedRank.rank}</p>
            {predictedRank.minRank && predictedRank.maxRank && (
              <>
                <p>Maximum Predicted Rank: {predictedRank.maxRank}</p>
                <p>Minimum Predicted Rank: {predictedRank.minRank}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="predict-image-container  w-[100%] md:w-[50%] ">
        <img
          src="assets/img/home-4/NeetPredict/1.png"
          alt="Dashboard"
          className="predict-dashboard-image object-cover m-auto lg:w-4/5 "
        />
      </div>
    </div>
  );
};

export default NEETRankPredictor;