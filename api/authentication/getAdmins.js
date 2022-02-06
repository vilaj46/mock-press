import axios from "axios";

async function getAdmins(url) {
  try {
    const token = localStorage.getItem("token");
    // const response = await axios.get(url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      data: {
        admins: [],
      },
    };
  }
}

export default getAdmins;
