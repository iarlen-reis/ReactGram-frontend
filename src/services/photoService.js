import { api, requestConfig } from "../utils/config";

// publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const response = await fetch(api + "/photos", config)
      .then((response) => response.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(api + "/photos/user/" + id, config)
      .then((response) => response.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
};

export default photoService;
