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
import {
  useCreateEyeglassesMutation,
  useUpdateEyeglassesMutation,
} from "../../../redux/features/eyeglasses/eyeglassesApi";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";
import imageUploader from "../../../utils/imageUploader";
import { TEyeglasses } from "../../../types/common";
import LHModal from "../../../components/modal/LHModal";
import { Dispatch, SetStateAction } from "react";

type TEyeglassModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: TEyeglasses;
  title: string;
};

const EyeglassesModal = ({
  open,
  setOpen,
  product,
  title,
}: TEyeglassModalProps) => {
  const defaultValues = { ...product };

  const [updateEyeglasses, { isLoading: updating }] =
    useUpdateEyeglassesMutation();
  const [createEyeglasses, { isLoading: creating }] =
    useCreateEyeglassesMutation();

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
      // Update eyeglasses
      if (product && title === "Update Eyeglass") {
        const updateData = {
          id: product?._id,
          data: values,
        };
        const res = await updateEyeglasses(updateData).unwrap();
        if (res.success) {
          toast.success("Eyeglasses updated successful!");
          setOpen(false);
        }
        // Create New Eyeglasses and New Eyeglasses Variant
      } else if (title === "Create New Eyeglass") {
        const res = await createEyeglasses(values).unwrap();
        if (res.success) {
          toast.success("Eyeglasses created successful!");
          setOpen(false);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <LHModal open={open} setOpen={setOpen} width={1000}>
      <Title level={2} style={{ margin: "20px 0px", fontWeight: "bold" }}>
        {title}
      </Title>
      {/* form section */}
      <LNForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
              label="Product Price"
              rules={{ required: "Product Price is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="brand"
              label="Brand Name"
              options={eyeglassesBrands}
              rules={{ required: "Brand is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNInput
              type="number"
              name="quantity"
              label="Product Quantity"
              rules={{ required: "Product Quantity is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameMaterial"
              label="Frame Material"
              options={frameMaterials}
              rules={{ required: "Frame Material is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="frameShape"
              label="Frame Shape"
              options={frameShapes}
              rules={{ required: "Frame Shape is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="lensType"
              label="Lens Type"
              options={lensTypes}
              rules={{ required: "Lens Type is required" }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <LNSelect
              name="gender"
              label="Gender"
              options={genderCategories}
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
              rules={product?.image ? {} : { required: "Image is required" }}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={updating || creating}
        >
          {title}
        </Button>
      </LNForm>
    </LHModal>
  );
};

export default EyeglassesModal;
