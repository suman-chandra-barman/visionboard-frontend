import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Controller } from "react-hook-form";

type TLNFileProps = {
  name: string;
  label?: string;
};

const LNFile = ({ name, label }: TLNFileProps) => {
  const [file, setFile] = useState<UploadFile | null>(null);

  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (newFile) => {
      setFile(newFile);
      return false;
    },
    fileList: file ? [file] : [],
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field: { onChange } }) => (
          <Form.Item label={label} style={{ fontWeight: 500 }}>
            <Upload
              {...props}
              style={{ width: "100%", display: "block" }}
              onChange={() => onChange(file)}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Select File
              </Button>
            </Upload>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default LNFile;
