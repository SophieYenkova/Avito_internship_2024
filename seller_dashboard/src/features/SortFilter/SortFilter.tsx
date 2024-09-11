import { Select } from "antd";

interface SortFilterProps {
  onChange: (sortBy: 'likes' | 'views', direction: 'asc' | 'desc') => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onChange }) => {
  const handleSortChange = (value: string) => {
    const [sortBy, direction] = value.split('_') as ['likes' | 'views', 'asc' | 'desc'];
    onChange(sortBy, direction);
  };

  return (
    <Select
      defaultValue="likes_asc"
      style={{ width: 200 }}
      onChange={handleSortChange}
    >
      <Select.Option value="likes_asc">Likes Ascending</Select.Option>
      <Select.Option value="likes_desc">Likes Descending</Select.Option>
      <Select.Option value="views_asc">Views Ascending</Select.Option>
      <Select.Option value="views_desc">Views Descending</Select.Option>
    </Select>
  );
};

export default SortFilter;
