import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/hooks/useDebounce";
import AdsSearch from "../../components/ui/Search/AdsSearch/AdsSearch";
import AdsList from "../../components/AdsList/AdsList";
import AdsPagination from "../../components/ui/Pagination/AdsPagination/AdsPagination";
import AdsModal from "../../components/ui/Modal/AdsModal";
import { AdsModalMode } from "../../app/types/enums";
import Sort from "../../components/Sort/Sort";
import { Spin } from "antd";

import {
  useGetAdvertisementsQuery,
  useGetAdvertisementsTotalQuery,
} from "../../utils/api/api";

const AdsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [pageData, setPageData] = useState<[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const sort = useSelector((state) => state.sort.value);

  const { data: totalDataResponse } = useGetAdvertisementsTotalQuery({
    search: debouncedSearchQuery,
  });

  const {
    data: allDataResponse,
    isLoading,
    isFetching,
    error,
  } = useGetAdvertisementsQuery({
    page: page,
    pageSize: pageSize,
    sort: sort,
    search: debouncedSearchQuery,
  });

  useEffect(() => {
    if (totalDataResponse && allDataResponse) {
      setTotal(totalDataResponse.length);
      setPageData(allDataResponse);
    }
  }, [totalDataResponse, allDataResponse]);

  if (error) return <div>Error loading ads</div>;

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="AdsPage">
      <AdsModal buttonText="Создать" mode={AdsModalMode.CREATE} />
      <AdsSearch onSearch={handleSearch} />
      <h1 className="AdsPage_title">Объявления</h1>
      <Sort />
      {isLoading || isFetching ? (
        <Spin size="large" />
      ) : (
        <AdsList ads={pageData} />
      )}

      <AdsPagination
        current={page}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdsPage;
