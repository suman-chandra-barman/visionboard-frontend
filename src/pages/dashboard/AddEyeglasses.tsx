import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import LNForm from "../../components/form/LNForm";
import LNInput from "../../components/form/LNInput";
import LNFile from "../../components/form/LNFile";
import LNSelect from "../../components/form/LNSelect";
import {
  eyeglassesBrands,
  frameMaterials,
  frameShapes,
  genderCategories,
  lensTypes,
} from "../../constants/eyeglasses";
import formDataConverter from "../../utils/formDataConverter";
import { useCreateEyeglassesMutation } from "../../redux/features/eyeglasses/eyeglassesApi";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const AddEyeglasses = () => {
  const [createEyeglasses, { isLoading }] = useCreateEyeglassesMutation();
  const location = useLocation();
  const eyeglass = location?.state?.eyeglass;
  const from = location?.state?.from;

  let defaultValues = {};
  if (eyeglass && from === "/dashboard/eyeglassesList") {
    defaultValues = {
      ...eyeglass,
    };
  }

  const onSubmit = async (data: FieldValues) => {
    const { price, quantity, bridgeSize, templeLength } = data;
    const values = {
      ...data,
      price: Number(price),
      quantity: Number(quantity),
      bridgeSize: Number(bridgeSize),
      templeLength: Number(templeLength),
    };

    const formData = formDataConverter(values);
    try {
      const res = await createEyeglasses(formData).unwrap();
      if (res.success) {
        toast.success("Eyeglasses created successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LNForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Row gutter={20}>
        <Col sm={24} lg={8}>
          <LNInput
            type="text"
            name="name"
            label="Eyeglasses Name"
            placeholder="Enter Eyeglasses Name"
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNInput
            type="number"
            name="price"
            label="Product Price"
            placeholder="Enter Product Price"
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNSelect
            name="brand"
            label="Brand Name"
            options={eyeglassesBrands}
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNInput
            type="number"
            name="quantity"
            label="Product Quantity"
            placeholder="Enter Product Quantity"
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNSelect
            name="frameMaterial"
            label="Frame Material"
            options={frameMaterials}
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNSelect
            name="frameShape"
            label="Frame Shape"
            options={frameShapes}
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNSelect name="lensType" label="Lense Type" options={lensTypes} />
        </Col>
        <Col sm={24} lg={8}>
          <LNSelect name="gender" label="Gender" options={genderCategories} />
        </Col>
        <Col sm={24} lg={8}>
          <LNInput
            type="text"
            name="color"
            label="Color Name"
            placeholder="Enter Color Name"
          />
        </Col>

        <Col sm={24} lg={8}>
          <LNInput
            type="number"
            name="templeLength"
            label="Temple Length(mm)"
            placeholder="Enter Temple Length "
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNInput
            type="number"
            name="bridgeSize"
            label="Bridge Size (mm)"
            placeholder="Enter Bridge Size"
          />
        </Col>
        <Col sm={24} lg={8}>
          <LNFile name="file" label="Add Image" />
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
        Create Eyeglasses
      </Button>
    </LNForm>
  );
};

export default AddEyeglasses;
