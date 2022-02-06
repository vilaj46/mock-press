import axios from "axios";

async function uploadFile(url, file) {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    url,
    method: "POST",
    data: formData,
    responseType: "blob",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };

  const response = await axios(config);

  console.log(response);
}

export default uploadFile;
