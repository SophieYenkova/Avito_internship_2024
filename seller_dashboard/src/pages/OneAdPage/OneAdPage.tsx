import { useParams } from "react-router-dom";
import { useGetAdvertisementsByIdQuery } from "../../shared/api/api";
import "./OneAdPage.css";
import AdsModal, { AdsModalMode } from "../ui/Modal/AdsModal";
import AdsCard from "../../entities/AdsCard/AdsCard";
// import { useDispatch } from "react-redux";

const OneAdPage = () => {
  // const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, isError } = useGetAdvertisementsByIdQuery(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  if (!ad) return <div>Объявление не найдено</div>;

  // if (ad) {
  //   dispatch(setOneAdData(ad));
  // }

  return (
    <div className="oneAdPage">
      <h1>Детали объявления</h1>
      <AdsCard {...ad} />
      <AdsModal buttonText="Изменить объявление" mode={AdsModalMode.UPDATE} adsId={gitid} adsData={ad}/>
    </div>
  );
};

export default OneAdPage;
