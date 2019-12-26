import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AboutUs from './nav/AboutUs';
import Contact from './nav/Contact';
import Home from './nav/Home';
import Login from './nav/Login';
import Registration from './nav/Registration';
import Services from './nav/Services';
import Shop from './nav/Shop';
import Delivery from './footer/Delivery';
import Privacy from './footer/Privacy';
import Regulations from './footer/Regulations';
import Warranty from './footer/Warranty';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navigation />
          <Route path="/" exact component={Home} />
          <Route path="/aboutUs" exact component={AboutUs} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/services" exact component={Services} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/delivery" exact component={Delivery} />
          <Route path="/warranty" exact component={Warranty} />
          <Route path="/regulations" exact component={Regulations} />
          <Route path="/privacy" exact component={Privacy} />
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
