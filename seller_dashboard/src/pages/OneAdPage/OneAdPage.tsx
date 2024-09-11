import { useParams } from "react-router-dom";
import { useGetAdvertisementsByIdQuery } from "../../shared/api/api";
import AdsCard from "../../entities/AdsCard/AdsCard";
import "./OneAdPage.css";

const OneAdPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, isError } = useGetAdvertisementsByIdQuery(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <div className="AdsPage">
      <h1>Детали объявления</h1>
      <AdsCard {...ad} />
    </div>
  );
};

export default OneAdPage;
