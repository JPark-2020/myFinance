import BarChart from "../Graphs/BarChart";
import DoughnutChart from "../Graphs/DoughnutChart";
import LineChart from "../Graphs/LineChart";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = props => {
  return (
    <div>
      <Sidebar logoutHandler={props.logoutHandler} />
      <BarChart />
      <DoughnutChart />
      <LineChart />
    </div>
  );
};

export default Dashboard;
