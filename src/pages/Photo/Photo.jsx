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
import { getPhoto, like, comment } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // comments
  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // insert a like
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  // insert a comment
  const handleComment = (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!commentText) {
      setErrorMessage("O comentário é obrigatório.");
      return;
    }

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");
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
      <div className={styles.comments}>
        <h3>Comentários: {photo.comments && photo.comments.length}</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Insira seu comentário..."
            onChange={({ target }) => setCommentText(target.value)}
            value={commentText || ""}
          />
          <input type="submit" value="Comentar" />
        </form>
        {errorMessage && <Message message={errorMessage} type="error" />}
      </div>
      {photo.comments && photo.comments.length === 0 && (
        <p className={styles.no__comments}>Nenhum comentário encontrado.</p>
      )}
      {photo.comments &&
        photo.comments.map((comment) => (
          <div className={styles.comment} key={comment.comment}>
            <div className={styles.author}>
              {comment.userImage && (
                <img
                  src={`${upload}/users/${comment.userImage}`}
                  alt={comment.userName}
                />
              )}
              <Link to={`/users/${comment.userId}`}>
                <p>{comment.userName}</p>
              </Link>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
    </div>
  );
};

export default Photo;
