import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { useState } from "react";

function AppCard() {
  const [unMaskedImage, setunMaskedImage] = useState();

  const sendImage = () => {
    const uploadData = new FormData();
    uploadData.append("unMaskedImage", unMaskedImage, unMaskedImage.name);
    console.log("image-image-image");
    fetch("http://127.0.0.1:8000/Images/", { method: "POST", body: uploadData })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container" style={{ width: 500, height: 600 }}>
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex">
              <div>
                <label htmlFor="/" className="btn btn-primary">
                  Upload Image
                  <input
                    type="file"
                    onChange={(evt) => setunMaskedImage(evt.target.files[0])}
                  />
                </label>
                <button onClick={() => sendImage()}>sendImage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppCard;
