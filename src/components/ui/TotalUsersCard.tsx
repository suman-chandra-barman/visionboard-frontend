import { Card, Flex } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { TUser } from "../../types/common";

const TotalUsersCard = ({users}:{users:TUser[]}) => {
    const totalManagers = users?.filter(user => user.role === 'Manager').length || 0;
    const totalUsers = users?.filter(user => user.role === 'User').length || 0;
    return (
        <Card style={{ backgroundColor: "#f0f2f5"}}>
            <Flex justify="space-between" align="center" gap={20}>
                <div>
                    <p style={{color:"GrayText", fontWeight:"bold", fontSize:"20px"}}>USERS</p>
                    <Flex justify="space-between" align="center" gap={20}>
                        <span>Total managers</span>
                        <span style={{ color: "#1677ff", fontWeight:"bold" }}>{totalManagers}</span>
                    </Flex>
                    <Flex justify="space-between" align="center" gap={10}>
                        <span>Total users</span>
                        <span style={{ color: "#1677ff", fontWeight:"bold" }}>{totalUsers}</span>
                    </Flex>
                </div>
                <div>
                    <UsergroupAddOutlined style={{fontSize:"40px", color:"#1677ff"}}/>
                </div>
            </Flex>
        </Card>
    );
}

export default TotalUsersCard;