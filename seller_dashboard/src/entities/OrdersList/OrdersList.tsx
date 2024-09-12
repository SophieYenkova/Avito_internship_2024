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
  onCompleteOrder: (orderId: string) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onCompleteOrder }) => {
  if (!orders || orders.length === 0) {
    return <p>Нет заказов для отображения</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {orders.map((order) => (
        <OrdersCard
          key={order.id}
          order={order}
          onCompleteOrder={onCompleteOrder}
        />
      ))}
    </div>
  );
};

export default OrdersList;
