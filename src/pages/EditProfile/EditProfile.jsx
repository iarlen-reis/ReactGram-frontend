import styles from "./EditProfile.module.css";
import { upload } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const EditProfile = () => {
  const dispatch = useDispatch();

  const resetMessageComponents = useResetComponentMessage(dispatch);

  const { user, message, error, loading } = useSelector((state) => state.user);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setpreviewImage] = useState("");
  const [errors, setErrors] = useState("");

  // load user date
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setBio(user.bio);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || name.length < 3) {
      setErrors("O nome precisa ter no mínimo 3 caracteres.");
      return;
    }

    if (password && password.length < 6) {
      setErrors("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    // Gether user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // builder form data

    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage);
    }, 2000);

    // resetMessageComponents();
  };

  const handleFile = (e) => {
    // Image preview

    const image = e.target.files[0];

    setpreviewImage(image);
    setProfileImage(image);
  };

  return (
    <div className={styles.edit__profile}>
      <h2>Edite seus dados</h2>
      <p className={styles.subtitle}>
        Adicione uma imagem de perfil e conte mais sobre você..
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className={styles.profile__image}
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${upload}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={({ target }) => setName(target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={({ target }) => setEmail(target.value)}
          value={email || ""}
          disabled
        />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={({ target }) => setBio(target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={({ target }) => setPassword(target.value)}
            value={password || ""}
          />
          {error && <Message message={error} type="error" />}
          {errors && <Message message={errors} type="error" />}
          {message && <Message message={message} type="success" />}
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="aguarde..." disabled />}
      </form>
    </div>
  );
};

export default EditProfile;
