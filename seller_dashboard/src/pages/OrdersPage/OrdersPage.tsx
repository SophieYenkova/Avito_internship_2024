import OrdersList from "../../entities/OrdersList/OrdersList";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { useGetOrdersQuery } from "../../shared/api/api";
import OrdersPagination from "../ui/Pagination/AdsPagination/AdsPagination";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [ordersData, setOrdersData] = useState([]); 

  const { data: ordersResponse, isLoading, isFetching, error } = useGetOrdersQuery({
    page: page,
    pageSize: pageSize,
  });

  console.log("ordersResponse:", ordersResponse);

  useEffect(() => {
    if (Array.isArray(ordersResponse)) {
      setOrdersData(ordersResponse);
      setTotal(ordersResponse.length);
    }
  }, [ordersResponse]);

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleCompleteOrder = (orderId: string) => { 
    console.log(`Заказ ${orderId} завершен`);
  };

  if (error) return <div>Ошибка при загрузке заказов</div>;

  return (
    <div className="OrdersPage">
      <h1 className="OrdersPage_title">Список заказов</h1>
      {isLoading || isFetching ? (
        <Spin size="large" />
      ) : (
        <OrdersList orders={ordersData} onCompleteOrder={handleCompleteOrder} />
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
