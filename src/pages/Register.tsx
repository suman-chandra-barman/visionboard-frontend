/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Flex, Row, Col, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import { jwtVerify } from "../utils/jwtVerify";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import LNForm from "../components/form/LNForm";
import LNInput from "../components/form/LNInput";
import { FieldValues } from "react-hook-form";
import LNSelect from "../components/form/LNSelect";
import { toast } from "sonner";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];
const roleOptions = [
  { label: "Manager", value: "Manager" },
  { label: "User", value: "User" },
];
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [createUser, { isError: registerError }] = useCreateUserMutation();
  const [login, { isError: loginError }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onSubmit = async (value: FieldValues) => {
    setLoading(true);
    const user = {
      name: {
        firstName: value.fName,
        lastName: value.lName,
      },
      role: value.role,
      email: value.email,
      password: value.password,
      gender: value.gender,
      age: Number(value.age),
      contactNo: value.contactNumber,
      address: value.address,
    };

    try {
      //register user
      const createdUser = await createUser(user).unwrap();

      if (createdUser.success) {
        const loginData = {
          email: value.email,
          password: value.password,
        };

        //login user
        const res = await login(loginData).unwrap();
        if (res.success) {
          toast.success("Registration successful!", { duration: 2000 });
          const userInfo = jwtVerify(res?.data?.accessToken);
          dispatch(setUser({ user: userInfo, token: res?.data?.accessToken }));
          form.resetFields();
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error: any) {
      setError(error?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error(error);
    }
  };

  //if error
  if (registerError) {
    console.error(registerError);
  } else if (loginError) {
    console.error(loginError);
  }

  return (
    <Flex justify="center" align="center">
      <Row
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "30px",
          margin: "30px 0px",
          backgroundColor: "whitesmoke",
          borderRadius: "15px",
        }}
      >
        <LNForm onSubmit={onSubmit}>
          <Row justify="center" style={{ marginBottom: "15px" }}>
            <Title level={2}>
              Register Lens<span style={{ color: "#1677ff" }}>Hub</span>
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
            <Col xs={24} sm={12}>
              <LNInput
                type="text"
                name="fName"
                placeholder="First Name"
                rules={{ required: "First name is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="text"
                name="lName"
                placeholder="Last Name"
                rules={{ required: "Last name is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="email"
                name="email"
                placeholder="Email"
                rules={{ required: "Email is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="password"
                name="password"
                placeholder="Password"
                rules={{ required: "Password is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNSelect
                name="gender"
                options={genderOptions}
                placeholder="Select gender"
                rules={{ required: "Gender is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNSelect
                name="role"
                options={roleOptions}
                placeholder="Select role"
                rules={{ required: "Gender is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="number"
                name="age"
                placeholder="Age"
                rules={{ required: "Age is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="text"
                name="address"
                placeholder="Address"
                rules={{ required: "Address is required" }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <LNInput
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                rules={{ required: "Password is required" }}
              />
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{
                  padding: "0 30px",
                  width: "100%",
                }}
              >
                Register Now
              </Button>
            </Col>
            <Col lg={24} style={{ marginTop: "10px", textAlign: "center" }}>
              <Typography>
                Already have an account? <Link to="/login">Login here!</Link>
              </Typography>
            </Col>
          </Row>
        </LNForm>
      </Row>
    </Flex>
  );
};

export default Register;
