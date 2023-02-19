import React from "react";

import styles from "./Auth.module.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "email-validator";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors("");

    if (!validate(email)) {
      setErrors("Por favor, digite um e-mail válido.");
      return;
    }

    if (!password || password.length < 6) {
      setErrors("E-mail ou senha inválido.");
      return;
    }

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Limpar todos estados ao fazer login
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className={styles.login}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>Faça login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={email || ""}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password || ""}
          onChange={({ target }) => setPassword(target.value)}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="aguarde..." disabled />}
      </form>
      {error && <Message message={error} type="error" />}
      {errors && <Message message={errors} type="error" />}
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui!</Link>
      </p>
    </div>
  );
};

export default Login;
