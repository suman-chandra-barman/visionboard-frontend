/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import LNForm from "../../../components/form/LNForm";
import LNInput from "../../../components/form/LNInput";
import LNFile from "../../../components/form/LNFile";
import LNSelect from "../../../components/form/LNSelect";
import {
  eyeglassesBrands,
  frameMaterials,
  frameShapes,
  genderCategories,
  lensTypes,
} from "../../../constants/eyeglasses";
import { useCreateEyeglassesMutation } from "../../../redux/features/eyeglasses/eyeglassesApi";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";
import imageUploader from "../../../utils/imageUploader";
import { TEyeglasses } from "../../../types/common";

const AddEyeglasses = () => {
  const [createEyeglasses, { isLoading }] = useCreateEyeglassesMutation();

  const onSubmit = async (data: FieldValues) => {
    const { price, quantity, bridgeSize, templeLength } = data;
    const values: Partial<TEyeglasses> = {
      ...data,
      price: Number(price),
      quantity: Number(quantity),
      bridgeSize: Number(bridgeSize),
      templeLength: Number(templeLength),
    };

    if (data.file) {
      const imageLink = await imageUploader(data.file);
      values.image = imageLink;
    }

    try {
      // Create New Eyeglasses
      const res = await createEyeglasses(values).unwrap();
      if (res.success) {
        toast.success(res?.message || "Successful!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: "20px", fontWeight: "bold" }}>
        Add New Eyeglasses
      </Title>
      {/* form section start  */}
      <LNForm onSubmit={onSubmit}>
        <Row gutter={20}>
          <Col sm={24} lg={8}>
            <LNInput
              type="text"
              name="name"
              label="Eyeglasses Name"
              rules={{ required: "Eyeglasses Name is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="price"
              label="Price"
              rules={{ required: "Product Price is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="brand"
              label="Brand"
              options={eyeglassesBrands}
              placeholder="Select brand"
              rules={{ required: "Brand is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="quantity"
              label="Quantity"
              rules={{ required: "Product Quantity is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameMaterial"
              label="Frame Material"
              options={frameMaterials}
              placeholder="Select material"
              rules={{ required: "Frame Material is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameShape"
              label="Frame Shape"
              options={frameShapes}
              placeholder="Select shape"
              rules={{ required: "Frame Shape is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="lensType"
              label="Lens Type"
              options={lensTypes}
              placeholder="Select type"
              rules={{ required: "Lens Type is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="gender"
              label="Gender"
              options={genderCategories}
              placeholder="Select gender"
              rules={{ required: "Gender is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="text"
              name="color"
              label="Color Name"
              rules={{ required: "Color Name is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="templeLength"
              label="Temple Length(mm)"
              rules={{ required: "Temple Length is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="bridgeSize"
              label="Bridge Size (mm)"
              rules={{ required: "Bridge Size is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNFile
              name="file"
              label="Add Image"
              rules={{ required: "Image is required" }}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          Add New Eyeglasses
        </Button>
      </LNForm>
    </div>
  );
};

export default AddEyeglasses;
