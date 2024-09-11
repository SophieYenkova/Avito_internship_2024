import { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import { useGetAdvertisementsQuery } from "../../shared/api/api";
import AdsSearch from "../ui/Search/AdsSearch/AdsSearch";
import AdsList from "../../entities/AdsList/AdsList";
import AdsPagination from "../ui/Pagination/AdsPagination/AdsPagination";
import useDebounce from "../../shared/hooks/useDebounce";

const AdsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<{ [key: string]: string }>({});

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    data: allAdsData,
    isLoading,
    isFetching,
    error,
  } = useGetAdvertisementsQuery({
    page: 1,
    pageSize: 1000,
    filter,
  });

  useEffect(() => {
    if (allAdsData) {
      setTotal(allAdsData.length);
    }
  }, [allAdsData]);

  const filteredAds = useMemo(() => {
    if (!allAdsData) return [];

    return debouncedSearchQuery.trim()
      ? allAdsData.filter((ad) =>
          ad.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      : allAdsData;
  }, [debouncedSearchQuery, allAdsData]);

  const paginatedAds = useMemo(() => {
    if (!filteredAds) return [];

    const start = (page - 1) * pageSize;
    return filteredAds.slice(start, start + pageSize);
  }, [page, pageSize, filteredAds]);

  if (isLoading || isFetching) return <Spin size="large" />;
  if (error) return <div>Error loading ads</div>;

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const applyFilter = (filter: { [key: string]: string }) => {
    setFilter(filter);
    setPage(1);
  };

  return (
    <div className="AdsPage">
      <AdsSearch onSearch={handleSearch} />
      <h1 className="AdsPage_title">Объявления</h1>
      <AdsList ads={paginatedAds} />
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
