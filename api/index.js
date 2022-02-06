import authentication from "./authentication";
import files from "./files";

const url = "http://127.0.0.1:5000";

const api = {
  // Authentication
  adminLogin: (username, password) =>
    authentication.adminLogin(`${url}/admin`, username, password),
  getAdmins: () => authentication.getAdmins(`${url}/admin`),
  uploadFile: (file) => files.uploadFile(`${url}/upload`, file),
};

export default api;
