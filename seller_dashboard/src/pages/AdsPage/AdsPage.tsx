import { useGetAdvertisementsQuery } from "../../shared/api/api";
import { Flex } from "antd";
import { IAds } from "../../app/types/types";

import "./AdsPage.css";
import AdsCard from "../../entities/AdsCard/AdsCard";

const AdsPage = () => {
  const { data: ads, isLoading: adsLoading } = useGetAdvertisementsQuery(0);
  if (adsLoading) return <div>Загрузка...</div>;

  return (
    <div className="AdsPage">
      <h1 className="AdsPage_title">Объявления</h1>
      <ul>
        <Flex wrap gap="small">
          {ads.map((ad: IAds) => (
            <li key={ad.id}>
              <AdsCard {...ad} />
            </li>
          ))}
        </Flex>
      </ul>
    </div>
  );
};

export default AdsPage;
