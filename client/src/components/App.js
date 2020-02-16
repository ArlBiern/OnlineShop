import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Footer from './Footer';
import AboutUs from './nav/AboutUs';
import Cart from './nav/Cart';
import Contact from './nav/Contact';
import Home from './nav/Home';
import Login from './nav/Login';
import Registration from './nav/Registration';
import Services from './nav/Services';
import CustomPaintings from './services/CustomPaintings';
import Shop from './nav/Shop';
import Delivery from './footer/Delivery';
import Privacy from './footer/Privacy';
import Regulations from './footer/Regulations';
import Warranty from './footer/Warranty';
import PageNotFound from './PageNotFound';
import Product from './Product';
import { loadUser } from '../actions/authActions';
import '../styles/App.css';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadUser());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/aboutUs" exact component={AboutUs} />
              <Route path="/products" exact component={Shop} />
              <Route path="/products/:id" exact component={Product} />
              <Route path="/services" exact component={Services} />
              <Route path="/services/custom_paintings" exact component={CustomPaintings} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/login" exact component={Login} />
              <Route path="/delivery" exact component={Delivery} />
              <Route path="/warranty" exact component={Warranty} />
              <Route path="/regulations" exact component={Regulations} />
              <Route path="/privacy" exact component={Privacy} />
              <Route component={PageNotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(App);
