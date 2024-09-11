import AdsCard from "../../entities/AdsCard/AdsCard";
import { IAds } from "../../app/types/types";
import { useNavigate } from "react-router-dom";
import "./AdsList.css";

interface AdsListProps {
  ads: IAds[];
}

const AdsList: React.FC<AdsListProps> = ({ ads }) => {
  const navigate = useNavigate();
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
