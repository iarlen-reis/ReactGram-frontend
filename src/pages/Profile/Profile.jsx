import styles from "./Profile.module.css";

import { upload } from "../../utils/config";

// Components
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import Loading from "../../components/Loading/Loading";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, resetMessage } from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  // photo
  const newPhotoform = useRef();
  const editPhotoForm = useRef();

  // new fomr and edit form refs

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (title.length < 4) {
      setError("O título precisa ter no minimo 4 caracteres.");
      return;
    }

    if (!image) {
      setError("A imagem é obrigatória.");
      return;
    }

    const photoData = {
      title,
      image,
    };

    // build from data
    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );
    dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage);
    }, 2000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        {user.profileImage && (
          <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className={styles.profile__description}>
          <h2>{user.name}</h2>
          <div className={styles.profile__publications}>
            <span>Publicações: 0</span>
          </div>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className={styles.new__photo} ref={newPhotoform}>
            <h3>Crie uma nova publicação:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={({ target }) => setTitle(target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {error && <Message message={error} type="error" />}
              {errorPhoto && <Message message={errorPhoto} type="error" />}
              {messagePhoto && (
                <Message message={messagePhoto} type="success" />
              )}

              {loadingPhoto && (
                <input type="submit" value="Aguarde..." disabled />
              )}
              {!loadingPhoto && (
                <input type="submit" value="Criar publicação" />
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
