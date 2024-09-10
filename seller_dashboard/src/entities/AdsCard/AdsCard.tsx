import { Card } from "antd";
import { EyeOutlined, HeartTwoTone } from "@ant-design/icons";
import { formatDate } from "../../shared/utils/formatDate";
import { Image } from "antd";
import ErrorImg from "../../pages/AdsPage/errorImg";
import { IAdsProps } from "../../app/types/types";
const { Meta } = Card;

import "./AdsCard.css";

const AdsCard = (props: IAdsProps) => {
  const { imageUrl, description, name, price, views, likes, createdAt } = props;
  let cuttedText = "";
  if (description) {
    cuttedText = description.split(" ").slice(0, 12).join(" ");
    if (cuttedText.length < description.length) {
      cuttedText += "...";
    }
  }

  return (
    <Card style={{ width: 300 }} className="card">
      {imageUrl ? (
        <Image className="card_image" src={imageUrl} />
      ) : (
        <ErrorImg />
      )}

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
          <Meta title={name} description={cuttedText} />
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
