import styles from "./Like.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const Like = ({ photo, user, handleLike }) => {
  return (
    <div className={styles.like}>
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          {photo.likes.length > 1 ? (
            <p>{photo.likes.length} likes</p>
          ) : (
            <p>{photo.likes.length} like</p>
          )}
        </>
      )}
    </div>
  );
};

export default Like;
