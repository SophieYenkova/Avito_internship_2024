import React from "react";
import { Select, Space } from "antd";
import "./OrdersFilter.css";
import { AllStatuses, OrderStatus, orderStatusLabel } from "../../app/types/types";

interface OrderFilterProps {
  selectedStatus: number;
  onStatusChange: (status: number) => void;
}

const extendedStatuses = [AllStatuses, ...Object.values(OrderStatus)]

const OrderFilter: React.FC<OrderFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <span>Фильтр по статусу:</span>
      <Select
        value={selectedStatus}
        onChange={onStatusChange}
        style={{ width: 200 }}
        options={extendedStatuses.map((status) => ({
          value: status,
          label: orderStatusLabel(status),
        }))}
      />
    </Space>
  );
};

export default OrderFilter;
