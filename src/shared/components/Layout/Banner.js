import React, { useEffect, useState } from "react";
import { getBanners } from "../../../services/Api";
import { getImageBanner } from "../../ultils";
const Banner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanners({
      params: {
        sort: 1,
        limit: 10,
      },
    })
      .then(({ data }) => setBanners(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div id="banner">
      {banners.map((item, index) => (
        <div key={index} className="banner-item">
          <a href="#">
            <img className="img-fluid" src={getImageBanner(item.image)} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Banner;
