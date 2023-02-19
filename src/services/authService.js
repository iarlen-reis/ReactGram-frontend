import { json } from "react-router-dom";
import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  // Configurando a requisição http
  const config = requestConfig("POST", data);

  try {
    // Fazendo a requisição e pegando o dado.
    const response = await fetch(api + "/users/register", config).then(
      (response) => response.json().catch((error) => error)
    );

    // Se o dado retornar (Usuário e token) salvo no localstorage.
    if (response._id) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Logout an user

const logout = () => {
  localStorage.removeItem("user");
};

// Sign an user
const login = async (user) => {
  const config = requestConfig("POST", user);

  try {
    const response = await fetch(api + "/users/login", config)
      .then((response) => response.json())
      .catch((error) => error);

    if (response._id) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
