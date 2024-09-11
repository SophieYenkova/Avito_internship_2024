import { useState } from "react";
import { Input, Button } from "antd";

interface PriceFilterProps {
  onChange: (min?: number, max?: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const handleApply = () => {
    onChange(minPrice, maxPrice);
  };

  return (
    <div className="price-filter">
      <Input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <Button onClick={handleApply}>Apply</Button>
    </div>
  );
};

export default PriceFilter;
