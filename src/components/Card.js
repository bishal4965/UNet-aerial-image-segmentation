import React, { useState, useEffect } from "react";
import '../styles/Card.css'

function AppCard() {
  const classColorMap = {
    "Building": [60, 16, 152],
    "Land": [132, 41, 246],
    "Road": [110, 193, 228],
    "Vegetation": [254, 221, 58],
    "Water": [226, 169, 41],
    "Unlabeled": [155, 155, 155]
  };

  const [unMaskedImage, setUnMaskedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [maskImageUrl, setMaskImageUrl] = useState("");
  const [classAreas, setClassAreas] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUnMaskedImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const sendImage = () => {
    if (!unMaskedImage) return; // Check if unMaskedImage is set
    const uploadData = new FormData();
    uploadData.append("unMaskedImage", unMaskedImage, unMaskedImage.name);

    fetch("http://127.0.0.1:8000/Images/", { method: "POST", body: uploadData })
      .then(response => response.json())
      .then(data => {
        setMaskImageUrl(data.predictedMaskUrl);
        setClassAreas(data.classAreas);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (classAreas) {
      console.log(classAreas);
    }
  }, [classAreas]);

  return (
    <div className={`container ${imageUrl ? 'image-uploaded' : ''}`}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Semantic Segmentation</h5>
          {unMaskedImage && (
            <div className="mb-3">
              <p>Uploaded Image: {unMaskedImage.name}</p>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              {imageUrl && (
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Uploaded Image</h6>
                  <img src={imageUrl} className="card-img-top mb-3" alt="Uploaded" style={{ 
                    maxWidth: "100%", 
                    maxHeight: "100%", 
                    width: "auto", 
                    height: "auto" 
                  }} 
                  />
                </div>
              )}
            </div>
            <div className="col-md-6">
              {maskImageUrl && (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="mb-3">
                    <h6 className="card-subtitle mb-2 text-muted">Predicted Mask</h6>
                    <img src={maskImageUrl} className="card-img-top mb-3" alt="Predicted Mask" style={{ 
                      maxWidth: "100%", 
                      maxHeight: "100%", 
                      width: "auto", 
                      height: "auto" 
                    }} 
                    />
                  </div>
                  <div className="class-color-map">
                    {Object.entries(classColorMap).map(([className, color]) => (
                      <div key={className} className="class-color-item">
                        <div className="color-rectangle" style={{ backgroundColor: `rgb(${color.join(", ")})` }}></div>
                        <p className="class-name">{className}: {classAreas ? classAreas[className].toFixed(2) + "%" : ""}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center"> {/* Use Bootstrap's justify-content-center class */}
          <div className="btn-container">
            <label htmlFor="upload" className="btn btn-secondary">
              Upload Image
              <input
                id="upload"
                type="file"
                className="d-none"
                onChange={handleFileChange}
              />
            </label>
            <button className="btn btn-primary ms-2" onClick={sendImage}>Predict Mask</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppCard;
