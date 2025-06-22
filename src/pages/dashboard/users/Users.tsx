import Title from "antd/es/typography/Title";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { Table, Skeleton } from "antd";
import { TableProps } from "antd";
import { TUser } from "../../../types/common";

const Users = () => {
  const { data, isLoading } = useGetAllUsersQuery({});
  console.log("Users data:", data);

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <>
          {name.firstName} {name.lastName}
        </>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
        { text: 'Other', value: 'Other' },
      ],
       onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age
    },
    { title: "Contact No", dataIndex: "contactNo", key: "contactNo" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Role", 
      dataIndex: "role", 
      key: "role",
      filters: [
        { text: 'Manager', value: 'Manager' },
        { text: 'User', value: 'User' }
      ],
       onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (text) => <span>{text ? "Deleted" : "Active"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <a onClick={() => console.log("Edit", record._id)}>Delete</a>
        </span>
      ),
    },
  ];



  return (
    <div>
      <Title level={2}>User List</Title>
      <Title level={4}>Total {data?.data?.length ? data.data.length : 0}</Title>
      {isLoading ? (
        <div style={{ padding: "16px" }}>
          <Skeleton active title={false} paragraph={{ rows: 10 }} />
        </div>
      ) : (
        <Table<TUser> columns={columns} dataSource={data?.data} loading={isLoading} />
      )}
    </div>
  );
};

export default Users;
