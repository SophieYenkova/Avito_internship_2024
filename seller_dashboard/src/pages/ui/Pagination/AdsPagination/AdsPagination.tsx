import { Pagination } from "antd";
import "./AdsPagination.css"

interface AdsPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const AdsPagination: React.FC<AdsPaginationProps> = ({
  current,
  pageSize,
  total,
  onPageChange,
}) => (
  <div className="ads_pagination">
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onPageChange}
      showSizeChanger
      pageSizeOptions={[10, 20, 30]}
      showTotal={(total, range) =>
        `${range[0]}-${range[1]} из ${total} объявлений`
      }
    />
  </div>
);

export default AdsPagination;
