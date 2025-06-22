import { Divider } from "antd";
import EyeglassesList from "../eyeglasses/EyeglassesList";
import Sales from "../sales/Sales";
import TotalUsersCard from "../../../components/ui/TotalUsersCard";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const Dashboard = () => {
  const { data } = useGetAllUsersQuery({});


  return (
    <>
      <TotalUsersCard users={data?.data?.length? data.data.length : 0} />
      <EyeglassesList />
      <Divider />
      <Sales />
    </>
  );
};

export default Dashboard;
