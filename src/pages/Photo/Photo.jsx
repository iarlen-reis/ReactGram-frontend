import styles from "./Photo.module.css";

import { upload } from "../../utils/config";

// components
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // comments

  // load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // like and comments

  if (loading) {
    <Loading />;
  }

  return (
    <div className={styles.photo}>
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
