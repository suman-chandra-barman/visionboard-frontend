import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TLNInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const LNInput = ({ type, name, label, placeholder }: TLNInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item
          label={label}
          style={{ marginBottom: "20px", fontWeight: 500 }}
        >
          <Input {...field} type={type} id={name} placeholder={placeholder} />
        </Form.Item>
      )}
    />
  );
};

export default LNInput;
