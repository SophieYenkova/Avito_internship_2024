import { useParams } from "react-router-dom";
import { useGetAdvertisementsByIdQuery } from "../../shared/api/api";
import "./OneAdPage.css";
import AdsModal from "../ui/Modal/AdsModal";
import AdsCard from "../../entities/AdsCard/AdsCard";

import { AdsModalMode } from "../../app/types/enums";

const OneAdPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, isError } = useGetAdvertisementsByIdQuery(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <div className="oneAdPage">
      <h1>Детали объявления</h1>
      <AdsCard {...ad} />
      <AdsModal
        buttonText="Изменить объявление"
        mode={AdsModalMode.UPDATE}
        adsId={id}
        adsData={ad}
      />
    </div>
  );
};

export default OneAdPage;
