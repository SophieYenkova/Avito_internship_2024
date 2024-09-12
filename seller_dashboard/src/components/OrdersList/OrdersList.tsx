import { useNavigate } from "react-router-dom";
import OrdersCard from "../OrdersCard/OrdersCard";
import { Order } from "../../app/types/types";

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const navigate = useNavigate();
  if (!orders || orders.length === 0) {
    return <p>Нет заказов для отображения</p>;
  }

  const goToOrdersPage = (id: string) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {orders.map((order) => (
        <OrdersCard
          key={order.id}
          order={order}
          onClick={() => goToOrdersPage(order.id)}
        />
      ))}
    </div>
  );
};

export default OrdersList;
