import axios from "axios";

async function adminLogin(url, username, password) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axios.post(url, formData);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default adminLogin;
