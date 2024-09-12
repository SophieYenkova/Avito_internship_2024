import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrdersByIdQuery } from "../../shared/api/api";
import "./OneOrderPage.css";
import AdsImage from "../ui/Image/AdsImage/AdsImage";

const OneOrderPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useGetOrdersByIdQuery(id);
  const [isTextVisible, setTextVisible] = useState(false);

  console.log(order);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  if (!order) return <div>Заказ не найден</div>;

  const handleToggleText = () => {
    setTextVisible((prev) => !prev);
  };
  const goToAdsPage = (id: string) => {
    navigate(`/advertisements/${id}`);
  };
  return (
    <div className="oneOrderPage">
      <h1>Детали заказа</h1>
      <div className="order-details">
        <div className="order-info">
          <h2>Номер заказа: {order.id}</h2>
          <p>
            <strong>Дата создания:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Дата завершения:</strong>{" "}
            {order.finishedAt
              ? new Date(order.finishedAt).toLocaleDateString()
              : "Не завершен"}
          </p>
          <p>
            <strong>Статус:</strong> {"статус заказа"}
          </p>
          <p>
            <strong>Цена:</strong> {order.total} ₽
          </p>
          <p>
            <strong>Способ доставки:</strong> {order.deliveryWay}
          </p>
          <div className="order-items">
            <strong>Товары в заказе:</strong>
            <ul>
              {order.items.map((item) => (
                <li className="order-item" key={item.id} onClick={() => goToAdsPage(item.id) }>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="order-item-image"
                  />

                  <div>
                    <p>
                      <strong>Название:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Описание:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Цена:</strong> {item.price} ₽
                    </p>
                    <p>
                      <strong>Количество:</strong> {item.count}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneOrderPage;
