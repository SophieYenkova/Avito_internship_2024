import { Input } from "antd";
import "../AdsSearch/AdsSearch.css";

interface AdsSearchProps {
  onSearch: (value: string) => void;
}

const AdsSearch: React.FC<AdsSearchProps> = ({ onSearch }) => (
  <Input.Search
    className="adsSearch"
    placeholder="Поиск"
    enterButton="Найти"
    size="large"
    onSearch={onSearch}
  />
);

export default AdsSearch;
