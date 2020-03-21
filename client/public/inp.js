window.addEventListener('DOMContentLoaded', () => {  
  const checkInpostContainer = () => {
    console.log('inpost check')
    let inpostContainer = document.querySelector('.inpost_container');
    if (inpostContainer !== null) {
      console.log('inpost active')
      window.easyPackAsyncInit = function () {
        easyPack.init({});
        var map = easyPack.mapWidget('easypack-map', function(point){ });
      };
      clearInterval(inpostInterval);
    }
  }
  
  let inpostInterval = setInterval(checkInpostContainer, 3000);

});
