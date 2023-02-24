import styles from "./Photo.module.css";

import { upload } from "../../utils/config";

// components
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Like from "../../components/Like/Like";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto, like } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // comments

  // load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className={styles.photo}>
      <PhotoItem photo={photo} />
      <Like photo={photo} user={user} handleLike={handleLike} />
      <div className={styles.message__container}>
        {error && <Message message={error} type="error" />}
        {message && <Message message={message} type="success" />}
      </div>
    </div>
  );
};

export default Photo;
