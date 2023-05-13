import React from 'react';
import { Link } from "react-router-dom";

const ServicesCard = ({service}) => {
  //const {_id,img,title,price} = service;
  console.log(service);
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl mt-10">
      <figure>
        <img src={service?.img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{service?.title}</h2>
        <p>{service?.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/book/${service?._id}`}>
            <button className="btn btn-primary">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;