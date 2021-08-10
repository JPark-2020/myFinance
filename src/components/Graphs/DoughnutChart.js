import { Doughnut } from "react-chartjs-2";


// This Chart will show monthly expenses and Total Money 

const DoughnutChart = () => {
  const expense = {
      rent: 500,
      food: 200,
      entertainment:300
  }
  
    return (
    <div className="doughnutChart">
      <Doughnut
        data={{
          labels: ["Rent", "Food", "Entertainment"],
          datasets: [
            {
              label: "My First Dataset",
              data: [expense.rent, expense.food, expense.entertainment],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
