import { api, requestConfig } from "../utils/config";

// Get user Datails

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const response = await fetch(api + "/users/profile", config)
      .then((response) => response.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
};

export default userService;
