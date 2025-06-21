import { Grid, Layout, theme } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const { Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const screens = useBreakpoint();

  return (
    <Layout>
      <Sidebar />
      <Layout
        style={{
          marginLeft: screens.lg ? 200 : 0,
        }}
      >
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          VisionBoard ©{new Date().getFullYear()} Created by Suman Chandra Barman.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
