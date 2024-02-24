import React from "react";

function AppCard() {
  return (
    <>
      <div className="container" style={{ width: 500, height: 600 }}>
        <div className="card">
          <img
            src="https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/279294985_538531524321277_4748734065476347861_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=f_Pv31BVudIAX_qw0j4&_nc_ht=scontent.fktm10-1.fna&oh=00_AfAy4EyRmZKldvWpJU66PDqpVdrrMBPZrggxw1ZXplruGA&oe=65DEF1B5"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex">
            <div><a href="/" className="btn btn-primary">
              Upload
            </a></div>
            <div>
            <a href="/" className="btn btn-primary">
              Segment Image
            </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppCard;
