import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../utils/store/sortSlice";

import "./Sort.css";

const Sort = () => {
  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(setSort(value));
  };

  const value = useSelector((state) => state.sort.value) ?? "likes";

  return (
    <Space wrap className="sort-container">
      <span>Показать:</span>
      <Select
        defaultValue={value}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "likes", label: "Лайки↑" },
          { value: "-likes", label: "Лайки↓" },
          { value: "views", label: "Просмотры↑" },
          { value: "-views", label: "Просмотры↓" },
          { value: "price", label: "Цена↑" },
          { value: "-price", label: "Цена↓" },
        ]}
      />
    </Space>
  );
};

export default Sort;
