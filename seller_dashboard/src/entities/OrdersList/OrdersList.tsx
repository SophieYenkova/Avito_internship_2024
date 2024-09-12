import { useNavigate } from "react-router-dom";
import OrdersCard from "../OrdersCard/OrdersCard";

interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
}

interface Order {
  id: string;
  status: number;
  createdAt: string;
  finishedAt?: string;
  total: number;
  deliveryWay: string;
  items: Item[];
}

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
