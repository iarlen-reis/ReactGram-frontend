import styles from "./Home.module.css";

// Components
import Like from "../../components/Like/Like";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className={styles.home}>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <Like photo={photo} user={user} handleLike={handleLike} />
            <Link className={styles.btn} to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className={styles.no__photos}>
          Nenhuma foto encontrada.
          <Link to={`/users/${user._id}`}>Clique aqui!</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
