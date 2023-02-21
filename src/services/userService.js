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

// update user details
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const response = await fetch(api + "/users/", config)
      .then((response) => response.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user details
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const response = await fetch(`${api}/users/${id}`, config)
      .then((response) => response.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
