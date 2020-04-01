window.addEventListener('DOMContentLoaded', () => {  
  const checkInpostContainer = () => {
    let inpostContainer = document.querySelector('.inpost_container');
    if (inpostContainer !== null) {
      let easypackCnt = inpostContainer.querySelector('.easypack-widget');
      if (easypackCnt === null) {
        if (window.easyPackAsyncInit instanceof Function) {
          easyPackAsyncInit();
        } else {
          window.easyPackAsyncInit = function () {
            easyPack.init({});
            easyPack.mapWidget('easypack-map', function(point){ });
          };
        }
        easypackCnt = inpostContainer.querySelector('.easypack-widget');
      }
    }
  }
  
  let inpostInterval = setInterval(checkInpostContainer, 3000);
});
