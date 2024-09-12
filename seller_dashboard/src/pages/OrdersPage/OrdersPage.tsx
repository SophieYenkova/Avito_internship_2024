import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { useGetOrdersQuery, useGetOrdersTotalQuery } from "../../utils/api/api";
import OrdersList from "../../components/OrdersList/OrdersList";
import OrdersPagination from "../../components/ui/Pagination/AdsPagination/AdsPagination";
import OrderFilter from "../../components/OrdersFilter/OrdersFilter";
import OrdersSort from "../../components/OrdersSort/OrdersSort";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<number>(-1);

  const sort = useSelector((state) => state.sortOrders.value);

  const { data: totalOrdersResponse } = useGetOrdersTotalQuery({
    status: selectedStatus,
  });

  const {
    data: ordersResponse,
    isLoading,
    isFetching,
    error,
  } = useGetOrdersQuery({
    page: page,
    pageSize: pageSize,
    sort: sort,
    status: selectedStatus,
  });

  useEffect(() => {
    if (ordersResponse && totalOrdersResponse) {
      setOrdersData(ordersResponse);
      setTotal(totalOrdersResponse.length);
    }
  }, [ordersResponse, totalOrdersResponse]);

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleStatusChange = (status: number) => {
    setSelectedStatus(status);
  };

  if (error) return <div>Ошибка при загрузке заказов</div>;

  return (
    <div className="OrdersPage">
      <h1 className="OrdersPage_title">Список заказов</h1>
      <OrderFilter
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      <OrdersSort />
      {isLoading || isFetching ? (
        <Spin size="large" />
      ) : (
        <OrdersList orders={ordersData} />
      )}
      <OrdersPagination
        current={page}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrdersPage;
