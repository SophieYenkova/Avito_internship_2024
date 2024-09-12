import { Card } from "antd";
import { EyeOutlined, HeartTwoTone } from "@ant-design/icons";
import { formatDate } from "../../shared/utils/formatDate";
import { IAdsProps } from "../../app/types/types";
import AdsImage from "../../pages/ui/Image/AdsImage/AdsImage";
import "./AdsCard.css";

const { Meta } = Card;

interface AdsCardProps extends IAdsProps {
  className?: string;
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

  return (
    <Card
      className="ads-card"
      hoverable
      onClick={onClick}
      cover={<AdsImage imageUrl={imageUrl} />}
    >
      <Meta
        title={name}
        description={croppedText}
      />
      <div className="ads-card-footer">
        <span className="ads-card-price">{price}₽</span>
        <div className="ads-card-stats">
          <span className="ads-card-stat">
            <EyeOutlined /> {views}
          </span>
          <span className="ads-card-stat">
            <HeartTwoTone twoToneColor="#eb2f96" /> {likes}
          </span>
        </div>
      </div>
      <div className="ads-card-date">
        Опубликовано: {formatDate(createdAt)}
      </div>
    </Card>
  );
};

export default AdsCard;
