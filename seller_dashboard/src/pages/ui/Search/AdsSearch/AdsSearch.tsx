import { Input } from "antd";

interface AdsSearchProps {
  onSearch: (value: string) => void;
}

const AdsSearch: React.FC<AdsSearchProps> = ({ onSearch }) => (
  <Input.Search
    placeholder="Поиск"
    enterButton="Найти"
    size="large"
    onSearch={onSearch}
  />
);

export default AdsSearch;
