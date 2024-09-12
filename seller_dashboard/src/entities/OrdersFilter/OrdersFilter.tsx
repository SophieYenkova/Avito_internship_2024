import React from "react";
import { Select, Space } from "antd";
import "./OrdersFilter.css"

interface OrderFilterProps {
  selectedStatus: number;
  onStatusChange: (status: number) => void;
}

const statusOptions = [
  { value: -1, label: "Все статусы" },
  { value: 0, label: "Новый" },
  { value: 1, label: "В процессе" },
  { value: 4, label: "Завершен" },
];

const OrderFilter: React.FC<OrderFilterProps> = ({ selectedStatus, onStatusChange }) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <span>Фильтр по статусу:</span>
      <Select
        value={selectedStatus}
        onChange={onStatusChange}
        style={{ width: 200 }}
        options={statusOptions.map(option => ({ value: option.value, label: option.label }))}
      />
    </Space>
  );
};

export default OrderFilter;
