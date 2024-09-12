import { Image } from "antd";
import ErrorImg from "../../AdsPage/ErrorImg";
import "./AdsImage.css"

interface ImageProps {
  imageUrl: string;
}

const AdsImage = ({ imageUrl }: ImageProps) => {
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
  };
  return (
    <div className="image-wrapper" onClick={handleImageClick}>
      {imageUrl ? (
        <Image className="card_image" src={imageUrl} />
      ) : (
        <ErrorImg />
      )}
    </div>
  );
};

export default AdsImage;
