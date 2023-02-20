import styles from "./EditProfile.module.css";
import { upload } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";

const EditProfile = () => {
  const dispacth = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setpreviewImage] = useState("");

  // load user date
  useEffect(() => {
    dispacth(profile());
  }, [dispacth]);

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

  console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();
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
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
