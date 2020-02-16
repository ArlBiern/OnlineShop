import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <Link to={props.service.link} className="main_button">Czytaj więcej</Link>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
  ])).isRequired,
};

export default Service;
