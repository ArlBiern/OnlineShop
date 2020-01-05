const { Product, validateProduct } = require('../models/product');

const products = [
  {
    name: 'Deska do krojenia end grain',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 299,
    completion: '2-3 tygodnie plus czas dostawy',
    photo: '/img/products/deska_do_krojenia_end_grain.png',
    weight: '1kg',
    height: '3cm',
    width: '20cm',
    length: '25cm',
    material: 'sosna',
    montage: 'produkt nie wymaga montażu',
    color: 'jasny brąz, pinia',
    category: 'kuchnia, drewno, deska do krojenia',
    media: 'in progress',
  },
  {
    name: 'Kolczyki LUDEK marzyciel',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 49,
    completion: '1 tydzień plus czas dostawy',
    photo: '/img/products/kolczyki_ludek.png',
    weight: '10g',
    height: 'nd',
    width: '1,3cm',
    length: '2cm',
    material: 'szkło, cyna, miedź',
    montage: 'produkt nie wymaga montażu',
    color: 'niebieski, błękitny, srebrny',
    category: 'ozdoby, witraż, kolczyki',
    media: 'in progress',
  },
  {
    name: 'Poduszka Chmurka',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 99,
    completion: '1 tydzień plus czas dostawy',
    photo: '/img/products/poduszka_chmurka.png',
    weight: '100g',
    height: 'nd',
    width: '60cm',
    length: '30cm, z nóżkami 70cm',
    material: 'bawełna, flanela',
    montage: 'produkt nie wymaga montażu',
    color: 'biały, biel, szary, kratka, prążki',
    category: 'poduszka, dla dzieci, zabawka',
    media: 'in progress',
  },
  {
    name: 'Ramka na zdjęcia',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 29,
    completion: '1 tydzień plus czas dostawy',
    photo: '/img/products/ramka_na_zdjecie.png',
    weight: '200g',
    height: 'nd',
    width: '30cm',
    length: '30cm',
    material: 'sosna',
    montage: 'produkt nie wymaga montażu',
    color: 'niebieski, błękit',
    category: 'ozdoby ścienne, ramka na zdjecia, drewno',
    media: 'in progress',
  },
  {
    name: 'Świecznik poduszka',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 19,
    completion: '1 tydzień plus czas dostawy',
    photo: '/img/products/swiecznik_poduszka_beton.png',
    weight: '300g',
    height: '2cm',
    width: '10cm',
    length: '10cm',
    material: 'beton',
    montage: 'produkt nie wymaga montażu',
    color: 'szary',
    category: 'beton, wystrój wnętrz',
    media: 'in progress',
  },
  {
    name: 'Szopka świąteczna',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 499,
    completion: '2-4 tygodnie plus czas dostawy',
    photo: '/img/products/szopka_swiateczna.png',
    weight: '2kg',
    height: '40cm',
    width: '25cm',
    length: '45cm',
    material: 'sosna, buk',
    montage: 'produkt nie wymaga montażu',
    color: 'jasny brąz, pinia, antracyt, szary',
    category: 'ozdoby świąteczne, szopka, drewno',
    media: 'in progress',
  },
  {
    name: 'Wieszak na klucze RETRO',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 149,
    completion: '1-2 tygodnie plus czas dostawy',
    photo: '/img/products/wieszak_na_klucze_retro.png',
    weight: '0,5kg',
    height: '15cm',
    width: '40cm',
    length: 'nd',
    material: 'sosna, stal',
    montage: 'produkt nie wymaga montażu',
    color: 'szary, biały, biel, srebrny',
    category: 'wystrój wnętrz, drewno, wieszak na klucze, retro',
    media: 'in progress',
  },
  {
    name: 'Wieszak na klucze',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 149,
    completion: '1-2 tygodnie plus czas dostawy',
    photo: '/img/products/wieszak_na_klucze.png',
    weight: '0,5kg',
    height: '15cm',
    width: '40cm',
    length: 'nd',
    material: 'sosna, stal',
    montage: 'produkt nie wymaga montażu',
    color: 'jasny brąz, pinia, antracyt, szary',
    category: 'wystrój wnętrz, drewno, wieszak na klucze',
    media: 'in progress',
  },
  {
    name: 'Żyrandol Żarówka',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 249,
    completion: '1-3 tygodnie plus czas dostawy',
    photo: '/img/products/zyrandol_zarowka.png',
    weight: '300g',
    height: '50cm',
    width: '30cm',
    length: 'nd',
    material: 'sklejka, sosna',
    montage: 'produkt wysyłany w częściach do samodzielnego złożenia',
    color: 'tik, brązowy',
    category: 'wystrój wnętrz, drewno, żyrandol',
    media: 'in progress',
  },
  {
    name: 'Żyrandol Mozaika',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.',
    price: 799,
    completion: 'plus czas dostawy',
    photo: '/img/products/zyrandol_mozaika.png',
    weight: '14kg',
    height: '2cm',
    width: '60cm',
    length: '1,2m',
    material: 'drewno, sklejka, stal',
    montage: 'w zestawie komplet haków, oraz łańcuchy do podwieszenia',
    color: 'niebieski, błękit, błękitny, szary, czerń, czarny, biel, biały, brąz, brązowy, mahoń',
    category: 'wystrój wnętrz, drewno, żyrandol',
    media: 'in progress',
  },
];

const seedProducts = () => {
  Product.remove({}, (er) => {
    if (er) {
      console.log(er);
    }
    console.log('products were removed');
    products.forEach((product) => {
      const { error } = validateProduct(product);
      if (error) { return console.log(error); }
      return Product.create(product, (err, createProduct) => {
        if (err) {
          console.log(err);
        } else {
          console.log('product created');
          createProduct.save();
        }
      });
    });
  });
};

module.exports = seedProducts;
