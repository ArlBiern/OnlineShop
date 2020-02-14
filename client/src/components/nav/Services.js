import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getServices } from '../../actions/servicesActions';
import Service from './Service';
import '../../styles/Services.css';

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.gallery = null;
    this.galleryElementsContainer = null;
    this.galleryElements = null;
    this.count = this.props.services.length;
    this.rotateAngle = 360 / this.count;
  }

  componentDidMount() {
    this.props.dispatch(getServices());

    this.styleAdjustment();
    this.checkActive();
    this.buttonAction();
    this.showDetails();
    this.setTransformValue();

    window.addEventListener('resize', () => this.setTransformValue());
  }

  setTransformValue() {
    const elementCntStyle = getComputedStyle(this.galleryElementsContainer);
    const width = parseInt(elementCntStyle.width.slice(0, -2), 10);

    for (let i = 0; i < this.galleryElements.length; i += 1) {
      this.galleryElements[i].style.transform = `rotateY(${this.rotateAngle * i}deg) translateZ(${width * 0.4}px)`;
    }
  }

  showDetails() {
    const title = this.gallery.querySelector('.gallery-3d-title');
    const text = this.gallery.querySelector('.gallery-3d-text');
    const price = this.gallery.querySelector('.gallery-3d-price');
    const activeElement = this.galleryElementsContainer.querySelector('.active');

    title.innerText = activeElement.querySelector('.element-title').innerText;
    text.innerText = activeElement.querySelector('.element-text').innerText;
    price.innerText = activeElement.querySelector('.element-price').innerText;
  }

  buttonAction() {
    const next = this.gallery.querySelector('.gallery-3d-next');
    const previous = this.gallery.querySelector('.gallery-3d-previous');

    next.addEventListener('click', () => {
      let [previous, active, next] = this.checkActive();

      next.dataset.angle = `${parseInt(active.dataset.angle, 10) - this.rotateAngle}`;
      previous.dataset.angle = `${parseInt(active.dataset.angle, 10) + this.rotateAngle}`;

      this.galleryElementsContainer.style.transform = `rotateY(${next.dataset.angle}deg)`;
      active.classList.remove('active');
      next.classList.add('active');
      this.showDetails();
    });

    previous.addEventListener('click', () => {
      let [previous, active, next] = this.checkActive();

      next.dataset.angle = `${parseInt(active.dataset.angle, 10) - this.rotateAngle}`;
      previous.dataset.angle = `${parseInt(active.dataset.angle, 10) + this.rotateAngle}`;

      this.galleryElementsContainer.style.transform = `rotateY(${previous.dataset.angle}deg)`;
      active.classList.remove('active');
      previous.classList.add('active');
      this.showDetails();
    });
  }

  checkActive() {
    this.galleryElementsContainer = this.gallery.querySelector('.gallery-3d-elements');
    const activeElement = this.galleryElementsContainer.querySelector('.active');
    let nextElement;
    let previousElement;

    if (activeElement.dataset.count === '1') {
      previousElement = this.galleryElementsContainer.lastElementChild;
    } else {
      previousElement = activeElement.previousElementSibling;
    }

    if (activeElement.dataset.count === `${activeElement.parentElement.children.length}`) {
      nextElement = this.galleryElementsContainer.firstElementChild;
    } else {
      nextElement = activeElement.nextElementSibling;
    }

    return [previousElement, activeElement, nextElement];
  }

  styleAdjustment() {
    this.gallery = document.querySelector('.gallery-3d');

    const prevButton = this.gallery.querySelector('.gallery-3d-previous');
    prevButton.innerText = '<';

    const nextButton = this.gallery.querySelector('.gallery-3d-next');
    nextButton.innerText = '>';

    const width = (this.count > 4) ? (250 / this.count) : 65;
    const height = (this.count > 4) ? (200 / this.count) : 65;

    // Setting basic styling for each element
    this.galleryElements = this.gallery.querySelectorAll('.gallery-3d-element');
    for (let i = 0; i < this.count; i += 1) {
      this.galleryElements[i].dataset.count = 1 + i;
      this.galleryElements[i].style.transform = `rotateY(${this.rotateAngle * i}deg) translateZ(400px)`;
      const path = process.env.PUBLIC_URL + this.props.services[i].image;
      this.galleryElements[i].style.backgroundImage = `url(${path})`;
      this.galleryElements[i].style.backgroundPosition = 'center';
      this.galleryElements[i].style.backgroundSize = 'cover';
      this.galleryElements[i].style.width = `${width}%`;
      this.galleryElements[i].style.height = `${height}`;
    }
    this.galleryElements[0].classList.add('active');
    this.galleryElements[0].dataset.angle = '0';
  }

  render() {
    return (
      <div>
        <h1 className="h_services">Usługi</h1>
        <div className="gallery-3d">
          <div className="gallery-3d-cnt">
            <div className="gallery-3d-images">
              <button className="gallery-3d-previous" type="button" aria-label="Previous" />
              <div className="gallery-3d-elements">
                {this.props.services.map((service) => {
                  return (
                    <Service key={service.title} service={service} />
                  );
                })}
              </div>
              <button className="gallery-3d-next" type="button" aria-label="Next" />
            </div>
            <div className="gallery-3d-element-details">
              <h2 className="gallery-3d-title">Tytuł</h2>
              <p className="gallery-3d-text" />
              <p className="gallery-3d-price" />
              <Link to={service.link} className="main_button">Czytaj więcej</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Services.propTypes = {
  services: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  services: store.services.servicesData,
});

export default connect(mapStateToProps)(Services);
