import { Card, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { TSale } from "../../types/common";

const TotalSaleCard = ({ sales }: { sales: TSale[] }) => {
    const totalSales = sales?.reduce((acc, sale) => acc + (sale.quantity * sale.productId.price), 0) || 0;
    const totalProductSales = sales?.reduce((acc, sale) => acc + sale.quantity , 0) || 0;

    return (
        <Card style={{ backgroundColor: "#f0f2f5" }}>
            <Flex justify="space-between" align="center">
                <div>
                    <p style={{ color: "GrayText", fontWeight:"bold", fontSize:"20px" }}>SALE</p>
                    <Flex justify="space-between" align="center" gap={10}>
                        <span>Total earing</span>
                        <span style={{ color: "#1677ff", fontWeight: "bold" }}>{totalSales.toFixed(2)}</span>
                    </Flex>
                    <Flex justify="space-between" align="center" gap={10}>
                        <span>Total product</span>
                        <span style={{ color: "#1677ff", fontWeight: "bold" }}>{totalProductSales}</span>
                    </Flex>
                </div>
                <div>
                    <ShoppingCartOutlined style={{ fontSize: "40px", color: "#1677ff" }} />
                </div>
            </Flex>
        </Card>
    );
}

export default TotalSaleCard;