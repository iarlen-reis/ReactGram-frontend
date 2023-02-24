import styles from "./PhotoItem.module.css";

import { upload } from "../../utils/config";
import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
  return (
    <>
      <div className={styles.photo__item}>
        {photo.image && (
          <img src={`${upload}/photos/${photo.image}`} alt={photo.title} />
        )}
      </div>
      <div className={styles.info__container}>
        <h2>{photo.title}</h2>
        <p className={styles.photo__author}>
          Publicado por:
          <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
        </p>
      </div>
    </>
  );
};

export default PhotoItem;
