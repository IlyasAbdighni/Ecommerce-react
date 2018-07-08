import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Auth as AuthPage, User, Products, Admin } from "./asyncComponent";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {ApiClient} from '../utils/ApiClient';
import Auth from '../utils/Auth';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {

  state = {
    user: null
  }

componentDidMount() {
  console.log('App componentDidMount');
    if (Auth.isUserAuthenticated()) {
      ApiClient.me()
        .then((res) => {
          console.log('App res: ', res);
          this.setState({ user: res.data.user })
        }).catch(() => {
          console.log("App js user could not get");
        })
    } else {
      this.setState({ user: null })
    }
  }

  redirect = (path) => {
    window.location = window.location.origin + path;
  }

	render() {
    const {user} = this.state;
		return (
			<Router>
				<div>
					<Navbar user={user} />
					<Route path="/" exact component={Home} />
					<Route exact path="/login" component={AuthPage.Login} />
					<Route exact path="/register" component={AuthPage.Register} />
          <Route exact path='/products' component={Products.Products} />
          <Route exact path='/admin/product/add' component={Admin.AddProduct} />
          <Route exact path='/account' component={User.Profile} />
					<Footer />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => state;

export default connect(state => state)(App);
