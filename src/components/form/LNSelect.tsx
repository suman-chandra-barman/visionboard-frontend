import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TLNSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

const LNSelect = ({ name, label, options }: TLNSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          style={{ marginBottom: "20px", fontWeight: 500 }}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            {...field}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default LNSelect;
