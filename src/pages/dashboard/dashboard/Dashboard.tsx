import { Col, Divider, Flex, Row } from "antd";
import EyeglassesList from "../eyeglasses/EyeglassesList";
import Sales from "../sales/Sales";
import TotalUsersCard from "../../../components/ui/TotalUsersCard";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import TotalProductCard from "../../../components/ui/TotalProductCard";
import { useGetAllEyeglassesQuery } from "../../../redux/features/eyeglasses/eyeglassesApi";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";
import TotalSaleCard from "../../../components/ui/TotalSaleCard";

const Dashboard = () => {
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: eyeGlassesData } = useGetAllEyeglassesQuery({});
  const { data: saleData } = useGetAllSalesQuery({});


  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={8}>
          <TotalUsersCard users={usersData?.data} />
        </Col>
        <Col xs={24} sm={24} md={8}>
           <TotalProductCard eyeGlasses={eyeGlassesData?.data} />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <TotalSaleCard sales={saleData?.data} />
        </Col>
      </Row>
      <EyeglassesList />
      <Divider />
      <Sales />
    </>
  );
};

export default Dashboard;
