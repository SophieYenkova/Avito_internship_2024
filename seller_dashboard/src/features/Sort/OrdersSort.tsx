import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {sortOrders } from "../../shared/store/ordersSortSlice";
import "./OrdersSort.css";

const OrdersSort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sortOrders.value) ?? "total";

  const handleChange = (value: string) => {
    dispatch(sortOrders(value));
  };

  return (
    <Space wrap className="OrdersSort-container">
      <span>Показать:</span>
      <Select
        defaultValue={sort}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "total", label: "Сумма ↑" },
          { value: "-total", label: "Сумма ↓" },
        ]}
      />
    </Space>
  );
};

export default OrdersSort;
