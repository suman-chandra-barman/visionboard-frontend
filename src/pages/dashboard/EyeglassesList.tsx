import {
  Button,
  Flex,
  Popconfirm,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import {
  useBulkDeleteEyeglassesMutation,
  useDeleteEyeglassesMutation,
  useGetAllEyeglassesQuery,
} from "../../redux/features/eyeglasses/eyeglassesApi";
import { NavLink, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { TEyeglasses } from "../../types/common";
import Search, { SearchProps } from "antd/es/input/Search";
import { toast } from "sonner";
import { useState } from "react";

const EyeglassesList = () => {
  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading } = useGetAllEyeglassesQuery({});
  const [deleteEyeglasses] = useDeleteEyeglassesMutation();
  const [bulkDeleteEyeglasses, { isLoading: loading }] =
    useBulkDeleteEyeglassesMutation();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const confirm = async (id: string) => {
    const res = await deleteEyeglasses(id).unwrap();
    if (res.success) {
      toast.success("Deleted successfully");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const columns: TableColumnsType<Partial<TEyeglasses>> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, row) => {
        return (
          <div>
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
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Material",
      dataIndex: "frameMaterial",
    },
    {
      title: "Shape",
      dataIndex: "frameShape",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, row) => {
        return (
          <Flex gap={10}>
            <NavLink to="/dashboard/add-eyeglasses">
              <Tooltip title="Create Variant">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  shape="circle"
                />
              </Tooltip>
            </NavLink>
            <NavLink
              to={{
                pathname: "/dashboard/add-eyeglasses",
              }}
              state={{ eyeglass: row, from: location.pathname }}
            >
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  shape="circle"
                />
              </Tooltip>
            </NavLink>
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

  return (
    <div>
      <Title level={2}>Eyeglasses List</Title>
      <Flex
        gap={20}
        style={{
          margin: "20px 0px",
        }}
      >
        <Search
          placeholder="Search Here"
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
        <div style={{ marginBottom: 16 }}>
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
      {!isLoading ? (
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={eyeglasses}
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
