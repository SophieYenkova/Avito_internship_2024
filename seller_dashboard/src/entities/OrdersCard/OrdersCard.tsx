import React from "react";
import { Card, Button } from "antd";
import "./OrdersCard.css";
import { useUpdateOrderMutation } from "../../shared/api/api";
interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description?: string;
  imageUrl?: string;
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

interface OrdersCardProps {
  order: Order;
  onClick: () => void
}

const OrdersCard: React.FC<OrdersCardProps> = ({
  order,
  onClick,
}) => {
  const statusText = (status: number) => {
    switch (status) {
      case 0:
        return "Новый";
      case 4:
        return "Завершен";
      default:
        return "В процессе";
    }
  };

  const totalItems = order.items.reduce((acc, item) => acc + item.count, 0);
  const [updateOrder] = useUpdateOrderMutation()

  const handleCompleteOrder = (orderId: string) => {
    updateOrder({id: orderId, status: 5})
    .unwrap()
      .then((resp) => {
        window.location.reload();
      })
      .catch(() => {
       
      })
      .finally(() => {

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
          <p>Статус: {statusText(order.status)}</p>

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
