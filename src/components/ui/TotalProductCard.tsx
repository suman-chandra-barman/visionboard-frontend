import { Card, Flex } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { TEyeglasses } from "../../types/common";

const TotalProductCard = ({ eyeGlasses }: { eyeGlasses: TEyeglasses[] }) => {
    const totalProductItems = eyeGlasses?.length || 0;
    const totalProduct = eyeGlasses?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

    return (
        <Card style={{backgroundColor: "#f0f2f5" }}>
            <Flex justify="space-between" align="center">
                <div>
                    <p style={{ color: "GrayText", fontWeight:"bold", fontSize:"20px" }}>PRODUCT</p>
                    <Flex justify="space-between" align="center" gap={10}>
                        <span>Total product items</span>
                        <span style={{ color: "#1677ff", fontWeight:"bold" }}>{totalProductItems}</span>
                    </Flex>
                    <Flex justify="space-between" align="center" gap={10}>
                        <span>Total product</span>
                        <span style={{ color: "#1677ff", fontWeight:"bold" }}>{totalProduct}</span>
                    </Flex>
                </div>
                <div>
                    <GiftOutlined style={{ fontSize: "40px", color: "#1677ff" }} />
                </div>
            </Flex>
        </Card>
    );
}

export default TotalProductCard;