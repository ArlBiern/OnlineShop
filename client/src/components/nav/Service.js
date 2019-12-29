import React from 'react';

const Service = props => {
  return (
    <div className="gallery-3d-element" data-angle="">
      <h2 className="element-title">
        {props.service.title}
      </h2>
      <div className="element-text">
        {props.service.description}
      </div>
      <div className="element-price">
        Cena: {props.service.price}
      </div>
    </div>
  )
} 

export default Service;
