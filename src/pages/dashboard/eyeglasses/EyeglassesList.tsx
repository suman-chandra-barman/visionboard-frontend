import {
  Button,
  Col,
  Flex,
  Grid,
  Image,
  Menu,
  Popconfirm,
  Row,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import {
  useBulkDeleteEyeglassesMutation,
  useDeleteEyeglassesMutation,
  useGetAllEyeglassesQuery,
} from "../../../redux/features/eyeglasses/eyeglassesApi";
import { NavLink } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { TEyeglasses, TSale } from "../../../types/common";
import Search, { SearchProps } from "antd/es/input/Search";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SaleModal from "../sales/SaleModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../../../components/pdf/PDFDocument";
import { items } from "../../../constants/filter";
import EyeglassesModal from "./EyeglassesModal";

const EyeglassesList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [product, setProduct] = useState<TEyeglasses>();
  const [open, setOpen] = useState(false);
  const [openEyeglass, setOpenEyeglass] = useState(false);
  const [orderInvoice, setOrderInvoice] = useState<{
    product: TEyeglasses;
    sale: TSale;
  }>();
  const [query, setQuery] = useState({});
  const [title, setTitle] = useState("");

  const { data, isLoading, refetch } = useGetAllEyeglassesQuery(query);
  const [deleteEyeglasses] = useDeleteEyeglassesMutation();
  const [bulkDeleteEyeglasses, { isLoading: loading }] =
    useBulkDeleteEyeglassesMutation();

  const screens = Grid.useBreakpoint();

  useEffect(() => {
    refetch();
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setQuery({ queryName: "searchTerm", value: value });
    refetch();
  };

  const confirm = async (id: string) => {
    const res = await deleteEyeglasses(id).unwrap();
    if (res.success) {
      toast.success("Deleted successfully");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleSale = (data: TEyeglasses) => {
    setOpen(true);
    setProduct(data);
  };
  const handleCreateOrUpdate = (data: TEyeglasses, heading: string) => {
    setProduct(data);
    setTitle(heading);
    setOpenEyeglass(true);
  };

  const columns: TableColumnsType<TEyeglasses> = [
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      render: (text, row) => {
        return (
          <Row gutter={5} align={"middle"} style={{ marginRight: "-40px" }}>
            <Col xs={24} lg={8}>
              <NavLink
                to="/"
                style={{
                  fontWeight: "500",
                }}
              >
                <Image
                  alt="eyeglasses"
                  width={60}
                  height={60}
                  src={row?.image}
                  preview={{
                    mask: (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#fff",
                          fontSize: "14px"
                        }}
                      >
                        View
                      </div>
                    ),
                  }}
                />
              </NavLink>
            </Col>
            <Col xs={24} lg={16}>
              <Row>
                <Col>
                  <NavLink
                    to="/"
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {text}
                  </NavLink>
                  <Typography
                    style={{
                      fontWeight: "500",
                      color: "GrayText",
                    }}
                  >
                    Brand: {row?.brand}
                  </Typography>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      },
      filters: [
        { text: "Gucci", value: "Gucci" },
        { text: "Ray-Ban", value: "Ray-Ban" },
        { text: "Oakley", value: "Oakley" },
        { text: "Lenskart", value: "Lenskart" },
        { text: "Tom Ford", value: "Tom Ford" },
        { text: "Prada", value: "Prada" },
        { text: "Persol", value: "Persol" },
      ],
      onFilter: (value, record) => record.brand.includes(value as string),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Color & Shape",
      dataIndex: "color&shape",
      render: (_value, row) => {
        console.log("row", row)
        return (
          <Flex gap={5} align="center">
            <div
              style={{
                width: "16px",
                height: "16px",
                border: row.color === "White" ? "1px solid gray" : "",
                borderRadius: "50%",
                backgroundColor: row.color,
              }}
            ></div>
            <span>{row.frameShape}</span>
          </Flex>
        );
      }
    },
    { title: "Material", dataIndex: "frameMaterial" },
    { title: "Shape", dataIndex: "frameShape" },
    {title:"Gender", dataIndex:"gender"},
    {
      title: "Actions",
      dataIndex: "action",
      render: (_value, row) => {
        return (
          <Flex gap={screens.xs || screens.sm ? 10 : 20}>
            <Tooltip title="Sale Eyeglasses">
              <Button
                onClick={() => handleSale(row)}
                type="primary"
                size="small"
                icon={<ShoppingCartOutlined />}
              >
                sale
              </Button>
            </Tooltip>
            <Tooltip title="Create Variant">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleCreateOrUpdate(row, "Create New Eyeglass")}
                size="small"
                shape="circle"
              />
            </Tooltip>

            <Tooltip title="Edit">
              <Button
                type="primary"
                onClick={() => handleCreateOrUpdate(row, "Update Eyeglass")}
                icon={<EditOutlined />}
                size="small"
                shape="circle"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Popconfirm
                title="Delete eyeglasses?"
                placement="topLeft"
                description="Are you sure to delete this eyeglasses?"
                onConfirm={() => confirm(row?._id as string)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="small"
                  shape="circle"
                  style={{
                    backgroundColor: "red",
                  }}
                />
              </Popconfirm>
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const eyeglasses = data?.data?.map((eyeglass: TEyeglasses) => {
    return { ...eyeglass, key: eyeglass._id };
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleBulkDelete = async () => {
    const selectedEyeglasses = {
      ids: selectedRowKeys,
    };
    const res = await bulkDeleteEyeglasses(selectedEyeglasses).unwrap();
    if (res.success) {
      toast.success("Deleted successfully");
      setSelectedRowKeys([]);
    } else {
      toast.error("Something went wrong! Failed to delete");
    }
  };

  const handleFilter: MenuProps["onClick"] = (e) => {
    const queryName = e.keyPath[1];
    const value = e.keyPath[0];
    setQuery({ queryName, value });
    refetch();
  };

  return (
    <div>
      <Title level={2}>Eyeglasses List</Title>
      <SaleModal
        open={open}
        setOpen={setOpen}
        product={product as TEyeglasses}
        setOrderInvoice={setOrderInvoice as Dispatch<SetStateAction<object>>}
      />
      <EyeglassesModal
        title={title}
        open={openEyeglass}
        setOpen={setOpenEyeglass}
        product={product as TEyeglasses}
      />
      <Flex
        gap={20}
        wrap="wrap"
        style={{
          marginTop: "20px",
        }}
      >
        <Search
          placeholder="Name or color"
          size="large"
          onSearch={onSearch}
          enterButton
          style={{
            maxWidth: "350px",
          }}
        />
        <NavLink to="/dashboard/add-eyeglasses">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add New
          </Button>
        </NavLink>

        {orderInvoice && orderInvoice?.product && (
          <PDFDownloadLink
            document={<PDFDocument data={orderInvoice} />}
            fileName="invoice.pdf"
          >
            {({ loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button type="primary" icon={<DownloadOutlined />} size="large">
                  Download Invoice
                </Button>
              )
            }
          </PDFDownloadLink>
        )}

        <div>
          <Button
            type="primary"
            onClick={handleBulkDelete}
            disabled={!hasSelected}
            loading={loading}
            size="large"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
      </Flex>
      <div>
        <Menu
          onClick={handleFilter}
          mode={screens.xs ? "vertical" : "horizontal"}
          items={items}
          theme="light"
          defaultSelectedKeys={["Show All"]}
          style={{
            fontWeight: 500,
            fontSize: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            width: screens.xs ? 170 : "auto",
          }}
        />
      </div>

      {!isLoading ? (
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={eyeglasses}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 600 }}
          />
        </div>
      ) : (
        <Flex gap="small" align="center" justify="center">
          <Spin size="large"></Spin>
        </Flex>
      )}
    </div>
  );
};

export default EyeglassesList;
