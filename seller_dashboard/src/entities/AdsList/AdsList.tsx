import AdsCard from "../../entities/AdsCard/AdsCard";
import { Advertisement } from "../../app/types/types";
import { useNavigate } from "react-router-dom";
import "./AdsList.css";

interface AdsListProps {
  ads: Advertisement[];
}

const AdsList: React.FC<AdsListProps> = ({ ads }) => {
  const navigate = useNavigate();
  if (!ads) {
    return <div>Нет данных для отображения</div>;
  }

  const goToAdPage = (id: string) => {
    navigate(`/advertisements/${id}`);
  };
  return (
    <div className="ads_list">
      {ads.map((ad) => (
        <AdsCard key={ad.id} {...ad} onClick={() => goToAdPage(ad.id)} />
      ))}
    </div>
  );
};

export default AdsList;
