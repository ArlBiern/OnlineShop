import React from 'react';

const CustomPaintings = () => {
  return (
    <div className="container">
      <h1>Obrazy na zamówienie</h1>
      <p>Chętnie przygotuje obraz lub szkic na zamówienie w wybranej przez Ciebie kolorystyce, stylu i rozmiarze. Przedstaw mi swoją wizję ja dostosuje się do Twoich potrzeb. Razem stworzymy coś niepowtarzalnego i pięknego</p>
      <h3>Cennik</h3>
      <p>Cenna usługi jest uzależniona od wielkości, czasochłonności i wybranej techniki wykonania obrazu/szkicu, może wachać się od 50 zł wzwyż. Przykładowe koszty usługi:</p>
      <table>
        <thead>
          <tr>
            <th>Opis</th>
            <th>Cena*</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Portret A4 szkic</td>
            <td>99</td>
          </tr>
          <tr>
            <td>Portret A4 płótno farby akrylowe</td>
            <td>299</td>
          </tr>
          <tr>
            <td>Portret A4 farby akwarelowe</td>
            <td>199</td>
          </tr>
        </tbody>
      </table>
      <small>*cena brutto W PLN</small>
      <h3>Przykłady wykonania dla portretu:</h3>
      <div>
        <p>Wybierz styl:</p>
        <button class="main_button" data-style=".grey">odcienie szarości</button>
        <button class="main_button" data-style=".sepia">sepia</button>
        <div class="imgSwap"></div>
        <div class="imgSwap style grey choosenImg"></div>
        <div class="imgSwap style sepia"></div>
      </div>
    </div>
  );
};

export default CustomPaintings;