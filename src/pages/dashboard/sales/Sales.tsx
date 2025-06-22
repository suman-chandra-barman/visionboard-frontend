import { Button, Dropdown, Flex, Spin, Table } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";
import { TSale, TSaleWithProduct } from "../../../types/common";

const Sales = () => {
  const [query, setQuery] = useState({});
  const { data, isLoading, refetch } = useGetAllSalesQuery(query);

  const columns: TableColumnsType<TSaleWithProduct> = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
    },
    {
      title: "Product Name & Brand",
      render: (_value, record) => {
        return (
          <div>
            <p>Name: {record?.productId?.name}</p>
            <p> Brand: {record?.productId?.brand}</p>
          </div>
        );
      },
    },
    {
      title: "Price",
      render: (_value, record) => {
        return <p>{record?.productId?.price}</p>;
      },
      sorter: (a, b) => a.productId.price - b.productId.price,
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => {
        const date = new Date(value);
        return (
          <>
            {date.toLocaleDateString()}
          </>
        );
      },
      sorter: (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    }

  ];

  const items: MenuProps["items"] = [
    {
      label: "Daily",
      key: 1,
    },
    {
      type: "divider",
    },
    {
      label: "Weekly",
      key: 7,
    },
    {
      type: "divider",
    },

    {
      label: "Monthly",
      key: 30,
    },
    {
      type: "divider",
    },
    {
      label: "Yearly",
      key: 365,
    },
    {
      type: "divider",
    },
  ];

  const sales = data?.data?.map((sale: TSale, id: number) => {
    return { ...sale, key: id };
  });

  const handleHistory: MenuProps["onClick"] = (e) => {
    const day = e.key;
    setQuery({ day });
    refetch();
  };

  return (
    <div>
      <Title level={2}>Sale History</Title>
      <Dropdown menu={{ items, onClick: handleHistory }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Button style={{ marginBottom: "30px" }} loading={isLoading}>
            View Sale History
            <DownOutlined />
          </Button>
        </a>
      </Dropdown>
      {!isLoading ? (
        <div>
          <Table
            columns={columns}
            dataSource={sales}
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

export default Sales;
