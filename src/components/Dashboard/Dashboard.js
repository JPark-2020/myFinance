import BarChart from "../Graphs/BarChart";
import DoughnutChart from "../Graphs/DoughnutChart";
import LineChart from "../Graphs/LineChart";
import BankBalance from '../Graphs/BankBalance';
import Reminders from '../Graphs/Reminders';
import DebtHelp from '../Graphs/DebtHelp';
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content">
      <h1 className="dashboard__heading">Dashboard</h1>
        <div className="dashboard__chart">
          <BarChart />
        </div>
        <div className="dashboard__chart">
          <DoughnutChart />
        </div>
        <div className="dashboard__chart">
          <LineChart />
        </div>
        <div className="dashboard__chart">
          <BankBalance />
        </div>
        <div className="dashboard__chart">
            <Reminders />
        </div>
        <div className="dashboard__chart">
            <DebtHelp/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
