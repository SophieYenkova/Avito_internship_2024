import { Card } from "antd";
import { EyeOutlined, HeartTwoTone } from "@ant-design/icons";
import { formatDate } from "../../shared/utils/formatDate";
import { Image } from "antd";
import ErrorImg from "../../pages/AdsPage/errorImg";
import { IAdsProps } from "../../app/types/types";
const { Meta } = Card;

import "./AdsCard.css";
interface AdsCardProps extends IAdsProps {
  onClick: () => void;
}

const AdsCard = (props: AdsCardProps) => {
  const {
    imageUrl,
    description,
    name,
    price,
    views,
    likes,
    createdAt,
    onClick,
  } = props;
  let croppedText = "";
  if (description) {
    croppedText = description.split(" ").slice(0, 12).join(" ");
    if (croppedText.length < description.length) {
      croppedText += "...";
    }
  }

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
  };

  return (
    <Card style={{ width: 300 }} className="card" onClick={onClick}>
      <div className="image-wrapper" onClick={handleImageClick}>
        {imageUrl ? (
          <Image
            className="card_image"
            src={imageUrl}
          />
        ) : (
          <ErrorImg />
        )}
      </div>
      <div className="card_wrapper">
        {" "}
        <span className="card_bg card_views">
          <EyeOutlined />
          {views}
        </span>
        <span className="card_bg card_likes">
          <HeartTwoTone twoToneColor="#eb2f96" />
          {likes}
        </span>
      </div>
      <div className="card_description">
        <div className="card_wrapper">
          <Meta title={name} description={croppedText} />
          <span>{price}₽</span>
        </div>

        <span className="card_time">
          {" "}
          Опубликовано: {formatDate(createdAt)}
        </span>
      </div>
    </Card>
  );
};

export default AdsCard;
