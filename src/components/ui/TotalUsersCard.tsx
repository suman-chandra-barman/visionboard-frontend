import { Card, Flex } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";

const TotalUsersCard = ({users}:{users:number}) => {
    return (
        <Card style={{ width: 300, backgroundColor: "#f0f2f5"}}>
            <Flex justify="space-between" align="center">
                <div style={{fontWeight:"bold", fontSize:"20px"}}>
                    <p style={{color:"GrayText"}}>TOTAL USERS</p>
                    <p style={{color:"#1677ff"}}>{users}</p>
                </div>
                <div>
                    <UsergroupAddOutlined style={{fontSize:"40px", color:"#1677ff"}}/>
                </div>
            </Flex>
        </Card>
    );
}

export default TotalUsersCard;