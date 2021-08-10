import React from "react";
import { Line } from "react-chartjs-2";

// This will show monthly $ spent
const LineChart = () => {
  return (
    <div>
      <Line
        data={{
          labels: ['jan', 'feb', 'march', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
          datasets: [
            {
              label: "My First Dataset",
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
