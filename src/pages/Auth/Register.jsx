import React from "react";

import styles from "./Auth.module.css";

// components
import { Link } from "react-router-dom";
import { validate } from "email-validator";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors("");

    if (!name || name.length < 3) {
      setErrors("O nome precisa ter no mínimo 3 caracteres.");
      return;
    }

    if (!email) {
      setErrors("O e-mail é obrigatório.");
      return;
    }

    if (!validate(email)) {
      setErrors("Por favor, digite um e-mail válido.");
      return;
    }

    if (!password) {
      setErrors("A senha é obrigatória.");
      return;
    }

    if (!confirmPassword) {
      setErrors("Por favor confirme sua senha.");
      return;
    }

    if (password !== confirmPassword) {
      setErrors("As senhas não são iguais.");
      return;
    }

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
  };

  return (
    <div className={styles.register}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>
        Cadastre-se para ver as fotos dos seus amigos.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name || ""}
          onChange={({ target }) => setname(target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword || ""}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      {errors && <p className="errors">{errors}</p>}
      <p>
        Já tem uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
