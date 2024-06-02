import {
  Avatar,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Typography,
  theme,
} from "antd";
import { useAppDispatch } from "../../redux/hook";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";

const { Text } = Typography;

const Header = () => {
  const { data, refetch } = useGetMeQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography
          onClick={() => dispatch(logout())}
          style={{ fontWeight: "bold", margin: "5px 30px" }}
        >
          Logout
        </Typography>
      ),
    },
  ];
  return (
    <div style={{ padding: "10px 46px", background: colorBgContainer }}>
      <Flex justify="end" align="center">
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <a onClick={(e) => e.preventDefault()}>
            <Flex justify="center" align="center" gap={10}>
              <Space>
                {data?.data?.image ? (
                  <Avatar size="large" src={data.data?.image} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </Space>

              {data?.data?.name && (
                <Flex vertical>
                  <Text style={{ fontWeight: "bold" }}>
                    {data?.data?.name?.firstName +
                      " " +
                      data?.data?.name?.lastName}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {data?.data?.role}
                  </Text>
                </Flex>
              )}
            </Flex>
          </a>
        </Dropdown>
      </Flex>
    </div>
  );
};

export default Header;
