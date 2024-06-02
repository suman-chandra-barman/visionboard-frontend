/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row, Col, Flex, Typography } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { jwtVerify } from "../utils/jwtVerify";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import LNForm from "../components/form/LNForm";
import LNInput from "../components/form/LNInput";
import { FieldValues } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useState } from "react";

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
    } catch (error: any) {
      console.error(error);
      setError(error.data.message || "Something went wrong!");
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
              Login Lens<span style={{ color: "#1677ff" }}>Hub</span>
            </Title>
          </Row>
          {error && (
            <Row
              justify="center"
              style={{
                marginBottom: "15px",
                backgroundColor: "#f8d7da",
                padding: "8px",
              }}
            >
              <Title level={5}>{error}</Title>
            </Row>
          )}
          <Row gutter={15}>
            <Col span={24}>
              <LNInput
                type="email"
                name="email"
                placeholder="Email"
                rules={{ required: "Email is required" }}
              />
            </Col>
            <Col span={24}>
              <LNInput
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
