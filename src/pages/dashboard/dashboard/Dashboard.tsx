import { Divider } from "antd";
import EyeglassesList from "../eyeglasses/EyeglassesList";
import Sales from "../sales/Sales";

const Dashboard = () => {
  return (
    <>
      <EyeglassesList />
      <Divider />
      <Sales />
    </>
  );
};

export default Dashboard;
