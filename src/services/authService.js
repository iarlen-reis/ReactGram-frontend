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
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;
