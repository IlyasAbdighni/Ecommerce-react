import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../components/Home";
import Navbar from "../components/Navbar";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<Router>
				<div>
					<Navbar />
					<Route path="/" component={Home} />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => state;

export default connect(state => state)(App);
