export type Advertisement = {
  /* Уникальный идентификатор. */
  id: string;
  /* Название. */
  name: string;
  /* Описание. */
  description?: string;
  /* Цена. */
  price: number;
  /* Дата и время создания. */
  createdAt: string;
  /* Количество просмотров. */
  views: number;
  /* Количество лайков. */
  likes: number;
  /* Ссылка на изображение. */
  imageUrl?: string;
}


export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6
} as const;

export const AllStatuses = -1

export const orderStatusLabel = (status: number) => {
    switch (status) {
      case OrderStatus.Created: return "Новый";
      case OrderStatus.Paid: return "Оплачен";
      case OrderStatus.Transport: return "В пути";
      case OrderStatus.DeliveredToThePoint: return "Доставлен";
      case OrderStatus.Received: return "Получен";
      case OrderStatus.Archived: return "Архивирован";
      case OrderStatus.Refund: return "Возврат";
      default: return "Все статусы";
    }
}

export type OrderItem = Advertisement & { count: number; };

export type Order = {
  /* Уникальный идентификатор. */
  id: string;
  /* Статус. */
  status: typeof OrderStatus[keyof typeof OrderStatus];
  /* Дата и время создания. */
  createdAt: string;
  /* Дата и время завершения. */
  finishedAt?: string;
  /* Товары в заказе. */
  items: Array<OrderItem>;
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string;
  /* Сумма заказа */
  total: number;
}

type Image = {
  /* Уникальный идентификатор. */
  id: number;
  /* Ссылка. */
  url: string;
  /* Название. */
  name: string;
}