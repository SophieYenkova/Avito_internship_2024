import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAdvertisementsByIdQuery } from "../../utils/api/api";
import "./OneAdPage.css";
import AdsModal from "../../components/ui/Modal/AdsModal";
import { AdsModalMode } from "../../app/types/enums";
import { Button } from "antd";

const OneAdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ad, isLoading, isError } = useGetAdvertisementsByIdQuery(id);
  const [isTextVisible, setTextVisible] = useState(false);

  const handleToggleText = () => {
    setTextVisible((prev) => !prev);
  };

  const handleGoBack = () => {
    navigate("/advertisements");
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <div className="oneAdPage">
      <Button className="back-button" onClick={handleGoBack} type="primary">
        Вернуться к объявлениям
      </Button>

      <h1>Детали объявления</h1>
      <div className="ad-details">
        <img src={ad.imageUrl} alt={ad.name} className="ad-image" />
        <div className="ad-info">
          <h2>{ad.name}</h2>
          <div className="ad-description">
            <strong>Описание:</strong>
            <p className={isTextVisible ? "visible" : "hidden"}>
              {ad.description}
            </p>
            {ad.description && ad.description.length > 1000 && (
              <button onClick={handleToggleText} className="toggle-button">
                {isTextVisible ? "Скрыть" : "Показать полностью"}
              </button>
            )}
          </div>
          <p>
            <strong>Цена:</strong> {ad.price} ₽
          </p>
          <p>
            <strong>Просмотры:</strong> {ad.views}
          </p>
          <p>
            <strong>Лайки:</strong> {ad.likes}
          </p>
          <p>
            <strong>Дата создания:</strong>{" "}
            {new Date(ad.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
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
