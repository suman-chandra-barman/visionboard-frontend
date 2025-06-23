import { Button, Row, Col, Flex, Typography, Tag, Card } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { jwtVerify } from "../utils/jwtVerify";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import LNForm from "../components/form/LNForm";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import VBInput from "../components/form/VBInput";
const { Text, Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (value: FieldValues) => {
    const data = {
      email: value.email,
      password: value.password,
    };
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Login successful!", { duration: 2000 });
        const userInfo = jwtVerify(res?.data?.accessToken);
        dispatch(setUser({ user: userInfo, token: res?.data?.accessToken }));
        navigate("/");
      }
    } catch (error: unknown) {
      console.error(error);
      setError(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Row
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          margin: "30px 0px",
          backgroundColor: "whitesmoke",
          borderRadius: "15px",
        }}
      >
        <LNForm onSubmit={onSubmit}>
          <Row justify="center" style={{ marginBottom: "15px" }}>
            <Title level={2}>
              Login Vision<span style={{ color: "#1677ff" }}>Board</span>
            </Title>
          </Row>

          {error && (
            <Row
              justify="center"
              align="middle"
              style={{
                marginBottom: "15px",
                backgroundColor: "#f8d7da",
                padding: "5px",
              }}
            >
              <Title level={5}>{error}</Title>
            </Row>
          )}

          <Row gutter={15}>
            <Col span={24}>
              <VBInput
                type="email"
                name="email"
                placeholder="Email"
                rules={{ required: "Email is required" }}
              />
            </Col>
            <Col span={24}>
              <VBInput
                type="password"
                name="password"
                placeholder="Password"
                rules={{ required: "Password is required" }}
              />
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                block
              >
                Login
              </Button>
            </Col>

            {/* Demo Credentials */}
            <Col span={24}>
              <Card title="Demo Credentials" style={{ marginTop: "20px" }} bordered>
                <div style={{ marginLeft: '5px' }}>
                  <Tag color="blue" style={{fontWeight:"bold"}}>User</Tag><br />
                  <Text>Email: </Text><Text copyable>suman@gmail.com</Text><br />
                  <Text>Password: </Text><Text copyable>123456</Text>

                  <br />

                  <Tag color="green" style={{marginTop:"10px", fontWeight:"bold"}}>Manager</Tag><br />
                  <Text>Email: </Text><Text copyable>sam@gmail.com</Text><br />
                  <Text>Password: </Text><Text copyable>123456</Text>
                </div>
              </Card>
            </Col>

            <Col lg={24} style={{ marginTop: "10px", textAlign: "center" }}>
              <Typography>
                Don't have an account?{" "}
                <Link to="/register">Register here!</Link>
              </Typography>
            </Col>
          </Row>
        </LNForm>
      </Row>
    </Flex>
  );
};

export default Login;
