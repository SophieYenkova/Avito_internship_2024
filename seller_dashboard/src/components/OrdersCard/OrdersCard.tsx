import React from "react";
import { Card, Button } from "antd";
import "./OrdersCard.css";
import { useUpdateOrderMutation } from "../../utils/api/api";
import { Order, orderStatusLabel } from "../../app/types/types";

interface OrdersCardProps {
  order: Order;
  onClick: () => void;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ order, onClick }) => {
  const totalItems = order.items.reduce((acc, item) => acc + item.count, 0);
  const [updateOrder] = useUpdateOrderMutation();

  const handleCompleteOrder = (orderId: string) => {
    updateOrder({ id: orderId, status: 5 })
      .unwrap()
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <Card
        className="card-container"
        title={`Заказ №${order.id}`}
        bordered={false}
      >
        <div className="card-content">
          <p>Количество товаров: {totalItems}</p>
          <p>Стоимость заказа: {order.total} ₽</p>
          <p>Способ доставки: {order.deliveryWay}</p>
          <p>Дата создания: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Статус: {orderStatusLabel(order.status)}</p>

          <Button
            className="button-primary"
            onClick={() => handleCompleteOrder(order.id)}
            disabled={order.status !== 4}
          >
            Завершить заказ
          </Button>

          <Button type="link" style={{ marginTop: "10px" }} onClick={onClick}>
            Показать все товары
          </Button>
        </div>
      </Card>
    </>
  );
};

export default OrdersCard;
