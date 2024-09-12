import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import './OrdersCard.css'; 

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
  onCompleteOrder: (orderId: string) => void;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ order, onCompleteOrder }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  return (
    <>
      <Card className="card-container" title={`Заказ №${order.id}`} bordered={false}>
        <div className="card-content">
          <p>Количество товаров: {totalItems}</p>
          <p>Стоимость заказа: {order.total} ₽</p>
          <p>Способ доставки: {order.deliveryWay}</p>
          <p>Дата создания: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Статус: {statusText(order.status)}</p>

          <Button
            className="button-primary"
            onClick={() => onCompleteOrder(order.id)}
            disabled={order.status === 4}
          >
            Завершить заказ
          </Button>

          <Button
            type="link"
            style={{ marginTop: "10px" }}
            onClick={showModal}
          >
            Показать все товары
          </Button>
        </div>
      </Card>

      <Modal
        title={`Товары в заказе №${order.id}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
        ]}
        className="modal-container"
      >
        <div className="modal-items-list">
          {order.items.map((item) => (
            <div key={item.id} className="modal-item">
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
              <p><strong>Название:</strong> {item.name}</p>
              <p><strong>Цена:</strong> {item.price} ₽</p>
              <p><strong>Количество:</strong> {item.count}</p>
              {item.description && <p><strong>Описание:</strong> {item.description}</p>}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default OrdersCard;
