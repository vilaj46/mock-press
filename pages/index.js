import { useState } from "react";

import api from "../api";

export default function Home() {
  const [file, setFile] = useState();
  const [blob, setBlob] = useState();

  const onChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);

    const obj = URL.createObjectURL(pdf);
    setBlob(obj);
  };

  const uploadToDrive = async () => {
    const response = api.uploadFile(file);
  };

  return (
    <div>
      HOME PAGE!
      <div>
        <input type="file" name="pdf" accept="pdf" onChange={onChange} />
      </div>
      <div>
        <iframe src={blob}></iframe>
        <button type="button" onClick={uploadToDrive}>
          Upload to Google Drive
        </button>
      </div>
    </div>
  );
}
