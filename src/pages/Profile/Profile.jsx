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
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

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

  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  // new fomr and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
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
    setImage("");

    resetComponentMessage();
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  // show or hide form
  const hideOrShowForm = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  // update a photo
  const handleUpdate = (event) => {
    event.preventDefault();

    if (editTitle.length < 4) {
      setError("O título precisa ter no minimo 4 caracteres.");
      return;
    }

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  // open edit form
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForm();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();
    hideOrShowForm();
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
            <span>Publicações: {photos.length}</span>
          </div>
          <p>{user.bio}</p>
        </div>
      </div>

      {id === userAuth._id && (
        <>
          <div className={styles.new__photo} ref={newPhotoForm}>
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
          <div className="edit__photo hide" ref={editPhotoForm}>
            <h3>Editar publicação:</h3>
            {editImage && (
              <img src={`${upload}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira um título"
                onChange={({ target }) => setEditTitle(target.value)}
                value={editTitle || ""}
              />
              {error && <Message message={error} type="error" />}
              {errorPhoto && <Message message={errorPhoto} type="error" />}
              {messagePhoto && (
                <Message message={messagePhoto} type="success" />
              )}
              <input type="submit" value="Atualizar" />
              <button
                className={styles.cancel__button}
                onClick={handleCancelEdit}
              >
                Cancelar edição
              </button>
            </form>
          </div>
        </>
      )}
      <div className={styles.user__photos}>
        <h2>Fotos publicadas:</h2>
        <div className={styles.photos__container}>
          {photos &&
            photos.map((photo) => (
              <div className={styles.photo} key={photo._id}>
                {photo.image && (
                  <img
                    src={`${upload}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className={styles.actions}>
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link
                    className={styles.button__see}
                    to={`/photos/${photo._id}`}
                  >
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
