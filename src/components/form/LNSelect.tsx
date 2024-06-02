import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TLNSelectProps = {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  rules?: object;
  size?: "large" | "small";
};

const LNSelect = ({
  name,
  label,
  options,
  rules,
  placeholder = "Please Select",
  size = "large",
}: TLNSelectProps) => {
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
          <Select
            placeholder={placeholder}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size={size}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default LNSelect;
