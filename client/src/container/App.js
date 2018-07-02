import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "./asyncComponent";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<Router>
				<div>
					{window.location.pathname !== "/" ? <Navbar /> : null}
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Auth.Login} />
					<Footer />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => state;

export default connect(state => state)(App);
