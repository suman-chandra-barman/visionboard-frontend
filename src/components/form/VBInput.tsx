import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TVBInputProps = {
  type: "text"| "number" | "email" | "password";
  name: string;
  label?: string;
  placeholder?: string;
  rules?: object;
  size?: "large" | "small";
};

const VBInput = ({ type, name, label, placeholder, rules, size = "large" }: TVBInputProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          style={{ marginBottom: "20px", fontWeight: 500 }}
          validateStatus={error ? "error" : ""}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              id={name}
              placeholder={placeholder}
              size={size}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size={size}
            />
          )}
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default VBInput;

