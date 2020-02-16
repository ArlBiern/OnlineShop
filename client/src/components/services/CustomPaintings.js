import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CustomPaintings.css';

class CustomPaintings extends React.Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  mouseMove = (e) => {
    const el = document.querySelector('.basic');
    const size = el.getBoundingClientRect();
    const horizontal = ((e.clientX - size.x) / size.width) * 100;
    this.element.current.style.setProperty('--x', horizontal + '%');
  }

  onChangeStyleClick = (e) => {
    const color = e.currentTarget.dataset.style;
    const img = document.querySelector('.choosenImg');
    const urlAdress = `url(/img/services/${color}.jpg)`
    img.style.setProperty('--img', urlAdress);
  }

  render () {
    return (
      <div className="container paintings">
        <h1>Obrazy na zamówienie</h1>
        <div className="desc_container">
          <p>Chętnie przygotuję obraz lub szkic na zamówienie w wybranej przez Ciebie kolorystyce, stylu i rozmiarze. Przedstaw mi swoją wizję, ja dostosuje się do Twoich potrzeb. Razem stworzymy coś niepowtarzalnego i pięknego.</p>
          <h3>Cennik</h3>
          <p>Cena usługi jest uzależniona od wielkości, czasochłonności i wybranej techniki wykonania obrazu/szkicu. Może wachać się od 50 zł wzwyż. Przykładowe koszty usługi:</p>
          <table>
            <thead>
              <tr>
                <th>Opis</th>
                <th>Cena*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Portret A4, szkic</td>
                <td>99 zł</td>
              </tr>
              <tr>
                <td>Portret A4, płótno, farby akrylowe</td>
                <td>299 zł</td>
              </tr>
              <tr>
                <td>Portret A4, farby akwarelowe</td>
                <td>199 zł</td>
              </tr>
            </tbody>
          </table>
          <small>*cena brutto</small>
          <h3>Przykłady wykonania dla portretu:</h3>
          <div className="imgBox">
            <p>Wybierz styl:</p>
            <button className="main_button" onClick={this.onChangeStyleClick} data-style="grey">odcienie szarości</button>
            <button className="main_button" onClick={this.onChangeStyleClick} data-style="sepia">sepia</button>
            <div className="imgSwapBox">
              <div className="imgSwap basic" ref={this.element} onMouseMove={this.mouseMove}></div>
              <div className="imgSwap choosenImg" ref={this.element} onMouseMove={this.mouseMove}></div>
            </div>
          </div>
          <p className="elementContact">
            Zapraszam do kontaktu:
            <Link to="/contact" className="main_button">Kontakt</Link>
          </p>
        </div>
      </div>
    );
  };
};

export default CustomPaintings;